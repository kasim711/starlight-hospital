import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

function slugify(text) {
  return text.toString().toLowerCase().trim().replace(/[\s\W-]+/g, '-');
}

// Public: Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await db.all('SELECT * FROM categories ORDER BY name ASC');
    res.json({ categories });
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
});

// Admin: Add category
router.post('/', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Category name is required.' });
    }

    const slug = slugify(name);
    const result = await db.run('INSERT INTO categories (name, slug) VALUES (?, ?)', [name.trim(), slug]);

    await logAuditAction(req, 'CREATE_CATEGORY', 'categories', result.lastID, `Created category "${name}"`);

    res.status(201).json({ message: 'Category added', id: result.lastID, name, slug });
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Failed to create category or category already exists.' });
  }
});

// Admin: Edit category
router.put('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Category name required' });

    const slug = slugify(name);
    await db.run('UPDATE categories SET name = ?, slug = ? WHERE id = ?', [name.trim(), slug, id]);

    await logAuditAction(req, 'UPDATE_CATEGORY', 'categories', id, `Updated category to "${name}"`);

    res.json({ message: 'Category updated' });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Failed to update category.' });
  }
});

// Admin: Delete category
router.delete('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM categories WHERE id = ?', [id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Category not found' });

    await logAuditAction(req, 'DELETE_CATEGORY', 'categories', id, `Deleted category ID ${id}`);

    res.json({ message: 'Category deleted' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Failed to delete category.' });
  }
});

export default router;
