import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Public / Admin: Get page by slug
router.get('/:slug', async (req, res) => {
  try {
    const page = await db.get('SELECT * FROM pages WHERE slug = ?', [req.params.slug]);
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json({
      page: {
        ...page,
        content: JSON.parse(page.content_json || '{}')
      }
    });
  } catch (err) {
    console.error('Error fetching page content:', err);
    res.status(500).json({ error: 'Failed to load page content.' });
  }
});

// Admin: Get all editable pages
router.get('/', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const pages = await db.all('SELECT id, slug, title, meta_title, meta_description, updated_at FROM pages');
    res.json({ pages });
  } catch (err) {
    console.error('Error fetching pages list:', err);
    res.status(500).json({ error: 'Failed to fetch pages list.' });
  }
});

// Admin: Update page editable content
router.put('/:slug', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, meta_title, meta_description } = req.body;

    const existing = await db.get('SELECT * FROM pages WHERE slug = ?', [slug]);
    if (!existing) {
      return res.status(404).json({ error: 'Page not found.' });
    }

    const contentJson = typeof content === 'object' ? JSON.stringify(content) : existing.content_json;

    await db.run(`
      UPDATE pages
      SET title = ?, content_json = ?, meta_title = ?, meta_description = ?, updated_at = CURRENT_TIMESTAMP
      WHERE slug = ?
    `, [
      title || existing.title,
      contentJson,
      meta_title !== undefined ? meta_title : existing.meta_title,
      meta_description !== undefined ? meta_description : existing.meta_description,
      slug
    ]);

    await logAuditAction(req, 'UPDATE_PAGE', 'pages', existing.id, `Updated editable content for page "${slug}"`);

    res.json({ message: 'Page content updated successfully' });
  } catch (err) {
    console.error('Error updating page content:', err);
    res.status(500).json({ error: 'Failed to update page content.' });
  }
});

export default router;
