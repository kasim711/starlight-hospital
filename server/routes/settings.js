import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Public / Admin: Get all site settings
router.get('/', async (req, res) => {
  try {
    const rows = await db.all('SELECT setting_key, setting_value, group_name FROM site_settings');
    const settingsMap = {};
    rows.forEach(r => {
      settingsMap[r.setting_key] = r.setting_value;
    });
    res.json({ settings: settingsMap, raw: rows });
  } catch (err) {
    console.error('Error fetching site settings:', err);
    res.status(500).json({ error: 'Failed to fetch site settings.' });
  }
});

// Admin: Update site settings
router.put('/', authenticateToken, requireRole(['Super Admin']), async (req, res) => {
  try {
    const { settings } = req.body;
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ error: 'Settings object required' });
    }

    for (const [key, val] of Object.entries(settings)) {
      const existing = await db.get('SELECT id FROM site_settings WHERE setting_key = ?', [key]);
      if (existing) {
        await db.run('UPDATE site_settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?', [String(val), key]);
      } else {
        await db.run('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)', [key, String(val)]);
      }
    }

    await logAuditAction(req, 'UPDATE_SETTINGS', 'site_settings', null, 'Updated site settings values');

    res.json({ message: 'Site settings updated successfully' });
  } catch (err) {
    console.error('Error updating site settings:', err);
    res.status(500).json({ error: 'Failed to update site settings.' });
  }
});

export default router;
