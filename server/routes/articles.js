import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-');
}

function normalizeStatus(statusStr) {
  if (!statusStr) return 'Draft';
  const s = statusStr.toString().toLowerCase().trim();
  if (s === 'published') return 'Published';
  if (s === 'draft') return 'Draft';
  if (s === 'pending review' || s === 'pending') return 'Pending Review';
  if (s === 'archived') return 'Archived';
  return 'Draft';
}

// Public: Get published articles (with Relational Joins)
router.get('/', async (req, res) => {
  try {
    const { category, search, limit = 20, page = 1 } = req.query;
    let query = `
      SELECT a.*, c.name as category, c.slug as category_slug, u.name as author
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      JOIN users u ON a.author_id = u.id
      WHERE a.status = 'Published'
    `;
    const params = [];

    if (category) {
      query += ' AND (c.name = ? OR c.slug = ?)';
      params.push(category, category);
    }

    if (search) {
      query += ' AND (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    query += ' ORDER BY a.published_at DESC LIMIT ? OFFSET ?';
    const offset = (parseInt(page) - 1) * parseInt(limit);
    params.push(parseInt(limit), offset);

    const articles = await db.all(query, params);

    // Get count for total
    let countQuery = `
      SELECT count(*) as total
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'Published'
    `;
    const countParams = [];
    if (category) {
      countQuery += ' AND (c.name = ? OR c.slug = ?)';
      countParams.push(category, category);
    }
    if (search) {
      countQuery += ' AND (a.title LIKE ? OR a.excerpt LIKE ? OR a.content LIKE ?)';
      const searchParam = `%${search}%`;
      countParams.push(searchParam, searchParam, searchParam);
    }
    const totalRow = await db.get(countQuery, countParams);
    const total = totalRow ? totalRow.total : 0;

    res.json({ articles, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error('Error fetching public articles:', err);
    res.status(500).json({ error: 'Failed to fetch health articles.' });
  }
});

// Admin: Get all articles (Must be before /:slug)
router.get('/admin/all', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author', 'Enquiry Manager']), async (req, res) => {
  try {
    const { status, category, search } = req.query;
    let query = `
      SELECT a.*, c.name as category, c.slug as category_slug, u.name as author
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      JOIN users u ON a.author_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Authors only see their own posts
    if (req.user.role === 'Author') {
      query += ' AND a.author_id = ?';
      params.push(req.user.id);
    }

    if (status) {
      query += ' AND a.status = ?';
      params.push(normalizeStatus(status));
    }

    if (category) {
      query += ' AND c.name = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (a.title LIKE ? OR a.excerpt LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam);
    }

    query += ' ORDER BY a.created_at DESC';
    const articles = await db.all(query, params);

    res.json({ articles });
  } catch (err) {
    console.error('Error fetching admin articles:', err);
    res.status(500).json({ error: 'Failed to fetch admin articles.' });
  }
});

// Public: Get single article by slug
router.get('/:slug', async (req, res) => {
  try {
    const query = `
      SELECT a.*, c.name as category, c.slug as category_slug, u.name as author
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      JOIN users u ON a.author_id = u.id
      WHERE a.slug = ? AND a.status = 'Published'
    `;
    const article = await db.get(query, [req.params.slug]);

    if (!article) {
      return res.status(404).json({ error: 'Article not found or not yet published.' });
    }

    // Get related articles
    const related = await db.all(`
      SELECT a.id, a.title, a.slug, c.name as category, a.featured_image, a.excerpt, a.published_at, a.reading_time 
      FROM articles a
      JOIN categories c ON a.category_id = c.id
      WHERE a.category_id = ? AND a.slug != ? AND a.status = 'Published'
      ORDER BY a.published_at DESC LIMIT 3
    `, [article.category_id, article.slug]);

    res.json({ article, related });
  } catch (err) {
    console.error('Error fetching article detail:', err);
    res.status(500).json({ error: 'Failed to load article detail.' });
  }
});

// Admin: Create article
router.post('/', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author']), async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      category_id,
      category,
      featured_image,
      image_alt,
      status = 'Draft',
      medical_review_status = 'Not Required',
      reading_time = 4,
      seo_title,
      meta_description,
      related_post_ids
    } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ error: 'Title, excerpt, and content are required.' });
    }

    // Resolve Category ID
    let finalCatId = category_id;
    if (!finalCatId && category) {
      const catRow = await db.get('SELECT id FROM categories WHERE name = ? OR slug = ?', [category, category]);
      if (catRow) finalCatId = catRow.id;
    }
    if (!finalCatId) {
      const fallbackCat = await db.get('SELECT id FROM categories ORDER BY id ASC LIMIT 1');
      finalCatId = fallbackCat ? fallbackCat.id : 1;
    }

    // Generate unique slug
    let baseSlug = slug ? slugify(slug) : slugify(title);
    if (!baseSlug) baseSlug = 'article-' + Date.now().toString().slice(-6);

    let finalSlug = baseSlug;
    let counter = 1;
    while (await db.get('SELECT id FROM articles WHERE slug = ?', [finalSlug])) {
      finalSlug = `${baseSlug}-${counter++}`;
    }

    // Casing and role check for status
    let finalStatus = normalizeStatus(status);
    if (req.user.role === 'Author' && ['Published', 'Scheduled'].includes(finalStatus)) {
      finalStatus = 'Pending Review';
    }

    const published_at = finalStatus === 'Published' ? new Date().toISOString() : null;
    const authorId = req.user.id;

    const resRun = await db.run(`
      INSERT INTO articles (title, slug, excerpt, content, category_id, author_id, featured_image, image_alt, status, medical_review_status, published_at, reading_time, seo_title, meta_description, related_post_ids)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      title,
      finalSlug,
      excerpt,
      content,
      finalCatId,
      authorId,
      featured_image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      image_alt || title,
      finalStatus,
      medical_review_status,
      published_at,
      reading_time,
      seo_title || title,
      meta_description || excerpt,
      related_post_ids || ''
    ]);

    await logAuditAction(req, 'CREATE_POST', 'articles', resRun.lastID, `Created post "${title}" in state ${finalStatus}`);

    res.status(201).json({ message: 'Article created successfully', id: resRun.lastID, slug: finalSlug, status: finalStatus });
  } catch (err) {
    console.error('Error creating article:', err);
    res.status(500).json({ error: 'Failed to create article. Please check input data.' });
  }
});

// Admin: Duplicate article
router.post('/:id/duplicate', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author']), async (req, res) => {
  try {
    const existing = await db.get('SELECT * FROM articles WHERE id = ?', [req.params.id]);
    if (!existing) return res.status(404).json({ error: 'Article not found' });

    const newTitle = `${existing.title} (Copy)`;
    const newSlug = slugify(newTitle) + '-' + Date.now().toString().slice(-4);

    const resRun = await db.run(`
      INSERT INTO articles (title, slug, excerpt, content, category_id, author_id, featured_image, image_alt, status, medical_review_status, published_at, reading_time, seo_title, meta_description, related_post_ids)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Draft', ?, NULL, ?, ?, ?, ?)
    `, [
      newTitle, newSlug, existing.excerpt, existing.content, existing.category_id, req.user.id,
      existing.featured_image, existing.image_alt, existing.medical_review_status,
      existing.reading_time, existing.seo_title, existing.meta_description, existing.related_post_ids
    ]);

    await logAuditAction(req, 'DUPLICATE_POST', 'articles', resRun.lastID, `Duplicated post "${existing.title}" as "${newTitle}"`);

    res.status(201).json({ message: 'Article duplicated as draft', id: resRun.lastID });
  } catch (err) {
    console.error('Error duplicating article:', err);
    res.status(500).json({ error: 'Failed to duplicate article.' });
  }
});

// Admin: Update article
router.put('/:id', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author']), async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get('SELECT * FROM articles WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    if (req.user.role === 'Author' && existing.author_id !== req.user.id) {
      return res.status(403).json({ error: 'Authors can only edit their own posts.' });
    }

    const {
      title,
      slug,
      excerpt,
      content,
      category_id,
      category,
      featured_image,
      image_alt,
      status,
      medical_review_status,
      reading_time,
      seo_title,
      meta_description,
      related_post_ids
    } = req.body;

    let finalCatId = category_id || existing.category_id;
    if (category && !category_id) {
      const catRow = await db.get('SELECT id FROM categories WHERE name = ? OR slug = ?', [category, category]);
      if (catRow) finalCatId = catRow.id;
    }

    let baseSlug = slug ? slugify(slug) : existing.slug;
    let finalSlug = baseSlug;
    let counter = 1;
    while (await db.get('SELECT id FROM articles WHERE slug = ? AND id != ?', [finalSlug, id])) {
      finalSlug = `${baseSlug}-${counter++}`;
    }

    let finalStatus = status ? normalizeStatus(status) : existing.status;
    if (req.user.role === 'Author' && ['Published', 'Scheduled'].includes(finalStatus)) {
      finalStatus = 'Pending Review';
    }

    let published_at = existing.published_at;
    if (finalStatus === 'Published' && !existing.published_at) {
      published_at = new Date().toISOString();
    }

    await db.run(`
      UPDATE articles 
      SET title = ?, slug = ?, excerpt = ?, content = ?, category_id = ?, featured_image = ?, image_alt = ?, status = ?, medical_review_status = ?, published_at = ?, reading_time = ?, seo_title = ?, meta_description = ?, related_post_ids = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      title || existing.title,
      finalSlug,
      excerpt || existing.excerpt,
      content || existing.content,
      finalCatId,
      featured_image || existing.featured_image,
      image_alt || existing.image_alt,
      finalStatus,
      medical_review_status || existing.medical_review_status,
      published_at,
      reading_time || existing.reading_time,
      seo_title || existing.seo_title,
      meta_description || existing.meta_description,
      related_post_ids || existing.related_post_ids,
      id
    ]);

    await logAuditAction(req, 'UPDATE_POST', 'articles', id, `Updated post "${title || existing.title}" (status: ${finalStatus})`);

    res.json({ message: 'Article updated successfully' });
  } catch (err) {
    console.error('Error updating article:', err);
    res.status(500).json({ error: 'Failed to update article.' });
  }
});

// Admin: Delete article
router.delete('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get('SELECT title FROM articles WHERE id = ?', [id]);
    const result = await db.run('DELETE FROM articles WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Article not found.' });
    }

    await logAuditAction(req, 'DELETE_POST', 'articles', id, `Deleted post "${existing?.title || id}"`);

    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    console.error('Error deleting article:', err);
    res.status(500).json({ error: 'Failed to delete article.' });
  }
});

export default router;
