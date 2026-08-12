import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Public: Submit contact enquiry
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, subject, message, preferred_contact = 'Phone', consent } = req.body;

    if (!name || !phone || !subject || !message) {
      return res.status(400).json({ error: 'Name, phone, subject, and message are required.' });
    }

    if (!consent) {
      return res.status(400).json({ error: 'You must consent to processing your contact information.' });
    }

    const result = await db.run(`
      INSERT INTO enquiries (name, phone, email, subject, message, preferred_contact, consent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'New')
    `, [
      name.trim(),
      phone.trim(),
      email ? email.trim() : '',
      subject,
      message.trim(),
      preferred_contact,
      consent ? 1 : 0
    ]);

    res.status(201).json({
      message: 'Thank you. Your enquiry has been received. The hospital team will contact you using the details provided.',
      id: result.lastID
    });
  } catch (err) {
    console.error('Error submitting contact enquiry:', err);
    res.status(500).json({ error: 'Failed to submit contact enquiry.' });
  }
});

// Admin: Get all contact enquiries
router.get('/', authenticateToken, requireRole(['Super Admin', 'Editor', 'Enquiry Manager']), async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM enquiries WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR phone LIKE ? OR email LIKE ? OR subject LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam, searchParam);
    }

    query += ' ORDER BY created_at DESC';
    const enquiries = await db.all(query, params);

    res.json({ enquiries });
  } catch (err) {
    console.error('Error fetching admin enquiries:', err);
    res.status(500).json({ error: 'Failed to fetch contact enquiries.' });
  }
});

// Admin: Update enquiry status
router.put('/:id', authenticateToken, requireRole(['Super Admin', 'Editor', 'Enquiry Manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const existing = await db.get('SELECT * FROM enquiries WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    const validStatuses = ['New', 'In Progress', 'Handled', 'Archived'];
    const newStatus = validStatuses.includes(status) ? status : existing.status;

    await db.run('UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [newStatus, id]);

    await logAuditAction(req, 'UPDATE_ENQUIRY_STATUS', 'enquiries', id, `Updated status to "${newStatus}"`);

    res.json({ message: 'Enquiry status updated successfully' });
  } catch (err) {
    console.error('Error updating enquiry status:', err);
    res.status(500).json({ error: 'Failed to update enquiry status.' });
  }
});

// Admin: Delete contact enquiry
router.delete('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM enquiries WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }

    await logAuditAction(req, 'DELETE_ENQUIRY', 'enquiries', id, `Deleted contact enquiry ID ${id}`);

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (err) {
    console.error('Error deleting enquiry:', err);
    res.status(500).json({ error: 'Failed to delete enquiry.' });
  }
});

export default router;
