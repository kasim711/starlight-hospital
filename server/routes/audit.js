import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// Admin: Get audit logs
router.get('/', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { limit = 50, action, entity } = req.query;
    let query = 'SELECT * FROM audit_logs WHERE 1=1';
    const params = [];

    if (action) {
      query += ' AND action = ?';
      params.push(action);
    }
    if (entity) {
      query += ' AND entity = ?';
      params.push(entity);
    }

    query += ' ORDER BY timestamp DESC LIMIT ?';
    params.push(parseInt(limit));

    const logs = await db.all(query, params);
    res.json({ logs });
  } catch (err) {
    console.error('Error fetching audit logs:', err);
    res.status(500).json({ error: 'Failed to fetch audit logs.' });
  }
});

export default router;
