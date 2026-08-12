import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Public: Get all services
router.get('/', async (req, res) => {
  try {
    const services = await db.all('SELECT * FROM services ORDER BY id ASC');
    const parsed = services.map(s => ({
      ...s,
      before_your_visit: JSON.parse(s.before_your_visit_json || '[]'),
      faqs: JSON.parse(s.faqs_json || '[]')
    }));
    res.json({ services: parsed });
  } catch (err) {
    console.error('Error fetching public services:', err);
    res.status(500).json({ error: 'Failed to fetch services.' });
  }
});

// Public: Get service by service_id (slug)
router.get('/:serviceId', async (req, res) => {
  try {
    const s = await db.get('SELECT * FROM services WHERE service_id = ?', [req.params.serviceId]);
    if (!s) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const service = {
      ...s,
      before_your_visit: JSON.parse(s.before_your_visit_json || '[]'),
      faqs: JSON.parse(s.faqs_json || '[]')
    };
    res.json({ service });
  } catch (err) {
    console.error('Error fetching service detail:', err);
    res.status(500).json({ error: 'Failed to load service.' });
  }
});

// Admin: Update service content
router.put('/:id', authenticateToken, requireRole(['Super Admin', 'Editor']), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      short_desc,
      hero_heading,
      description,
      what_to_expect,
      who_it_is_for,
      before_your_visit,
      faqs,
      icon_name,
      image_url,
      cta_label
    } = req.body;

    const existing = await db.get('SELECT * FROM services WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'Service record not found.' });
    }

    const beforeVisitJson = Array.isArray(before_your_visit) ? JSON.stringify(before_your_visit) : existing.before_your_visit_json;
    const faqsJson = Array.isArray(faqs) ? JSON.stringify(faqs) : existing.faqs_json;

    await db.run(`
      UPDATE services
      SET title = ?, short_desc = ?, hero_heading = ?, description = ?, what_to_expect = ?, who_it_is_for = ?, before_your_visit_json = ?, faqs_json = ?, icon_name = ?, image_url = ?, cta_label = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      title || existing.title,
      short_desc || existing.short_desc,
      hero_heading || existing.hero_heading,
      description || existing.description,
      what_to_expect || existing.what_to_expect,
      who_it_is_for || existing.who_it_is_for,
      beforeVisitJson,
      faqsJson,
      icon_name || existing.icon_name,
      image_url || existing.image_url,
      cta_label || existing.cta_label,
      id
    ]);

    await logAuditAction(req, 'UPDATE_SERVICE', 'services', id, `Updated service "${title || existing.title}"`);

    res.json({ message: 'Service updated successfully' });
  } catch (err) {
    console.error('Error updating service:', err);
    res.status(500).json({ error: 'Failed to update service.' });
  }
});

export default router;
