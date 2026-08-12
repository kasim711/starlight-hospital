import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../../public/uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const router = express.Router();

// Admin: Get all media items
router.get('/', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author']), async (req, res) => {
  try {
    const media = await db.all('SELECT * FROM media ORDER BY created_at DESC');
    res.json({ media });
  } catch (err) {
    console.error('Error fetching media library:', err);
    res.status(500).json({ error: 'Failed to fetch media library.' });
  }
});

// Admin: Add media record (Image URL or uploaded file metadata)
router.post('/', authenticateToken, requireRole(['Super Admin', 'Editor', 'Author']), async (req, res) => {
  try {
    const { filename, original_name, mime_type, size, url, alt_text } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'Media URL is required.' });
    }

    const result = await db.run(`
      INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, uploaded_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [
      filename || 'external-image',
      original_name || 'Image Asset',
      mime_type || 'image/jpeg',
      size || 0,
      url,
      alt_text || 'Media Image',
      req.user.id
    ]);

    await logAuditAction(req, 'UPLOAD_MEDIA', 'media', result.lastID, `Added media asset "${url}"`);

    res.status(201).json({ message: 'Media asset added successfully', id: result.lastID });
  } catch (err) {
    console.error('Error adding media:', err);
    res.status(500).json({ error: 'Failed to add media asset.' });
  }
});

// Admin: Delete media record
router.delete('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await db.get('SELECT url FROM media WHERE id = ?', [id]);
    const result = await db.run('DELETE FROM media WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Media asset not found.' });
    }

    await logAuditAction(req, 'DELETE_MEDIA', 'media', id, `Deleted media asset ID ${id}`);

    res.json({ message: 'Media asset deleted successfully' });
  } catch (err) {
    console.error('Error deleting media:', err);
    res.status(500).json({ error: 'Failed to delete media asset.' });
  }
});

export default router;
