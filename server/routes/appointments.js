import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Public: Submit appointment request
router.post('/', async (req, res) => {
  try {
    const { full_name, phone_number, service_needed, preferred_date, preferred_time, message, consent } = req.body;

    if (!full_name || !phone_number || !service_needed || !message) {
      return res.status(400).json({ error: 'Full name, phone number, service needed, and message are required.' });
    }

    if (!consent) {
      return res.status(400).json({ error: 'You must consent to data processing for appointment requests.' });
    }

    const result = await db.run(`
      INSERT INTO appointment_requests (full_name, phone_number, service_needed, preferred_date, preferred_time, message, consent, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'New')
    `, [
      full_name.trim(),
      phone_number.trim(),
      service_needed,
      preferred_date || '',
      preferred_time || '',
      message.trim(),
      consent ? 1 : 0
    ]);

    res.status(201).json({
      message: 'Your request has been submitted to Starlight Hospital. Please keep your phone available for confirmation.',
      id: result.lastID
    });
  } catch (err) {
    console.error('Error submitting appointment request:', err);
    res.status(500).json({ error: 'Failed to process appointment request.' });
  }
});

// Admin: Get all appointment requests
router.get('/', authenticateToken, requireRole(['Super Admin', 'Editor', 'Enquiry Manager']), async (req, res) => {
  try {
    const { status, search } = req.query;
    let query = 'SELECT * FROM appointment_requests WHERE 1=1';
    const params = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (full_name LIKE ? OR phone_number LIKE ? OR service_needed LIKE ?)';
      const searchParam = `%${search}%`;
      params.push(searchParam, searchParam, searchParam);
    }

    query += ' ORDER BY created_at DESC';
    const appointments = await db.all(query, params);

    res.json({ appointments });
  } catch (err) {
    console.error('Error fetching admin appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointment requests.' });
  }
});

// Admin: Update appointment status & internal notes
router.put('/:id', authenticateToken, requireRole(['Super Admin', 'Editor', 'Enquiry Manager']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    const existing = await db.get('SELECT * FROM appointment_requests WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Appointment request not found.' });
    }

    const validStatuses = ['New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'];
    const newStatus = validStatuses.includes(status) ? status : existing.status;
    const newNotes = admin_notes !== undefined ? admin_notes : existing.admin_notes;

    await db.run(`
      UPDATE appointment_requests
      SET status = ?, admin_notes = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newStatus, newNotes, id]);

    await logAuditAction(req, 'UPDATE_APPOINTMENT_STATUS', 'appointment_requests', id, `Updated status to "${newStatus}"`);

    res.json({ message: 'Appointment request updated successfully' });
  } catch (err) {
    console.error('Error updating appointment request:', err);
    res.status(500).json({ error: 'Failed to update appointment request.' });
  }
});

// Admin: Delete appointment request
router.delete('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.run('DELETE FROM appointment_requests WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Appointment request not found.' });
    }

    await logAuditAction(req, 'DELETE_APPOINTMENT', 'appointment_requests', id, `Deleted appointment request ID ${id}`);

    res.json({ message: 'Appointment request deleted successfully' });
  } catch (err) {
    console.error('Error deleting appointment request:', err);
    res.status(500).json({ error: 'Failed to delete appointment request.' });
  }
});

export default router;
