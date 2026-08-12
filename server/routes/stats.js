import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin: Get overview dashboard stats
router.get('/', authenticateToken, async (req, res) => {
  try {
    const totalArticles = (await db.get('SELECT count(*) as count FROM articles')).count;
    const publishedArticles = (await db.get("SELECT count(*) as count FROM articles WHERE status = 'Published'")).count;
    const draftArticles = (await db.get("SELECT count(*) as count FROM articles WHERE status = 'Draft'")).count;

    const totalAppts = (await db.get('SELECT count(*) as count FROM appointment_requests')).count;
    const newAppts = (await db.get("SELECT count(*) as count FROM appointment_requests WHERE status = 'New'")).count;
    const confirmedAppts = (await db.get("SELECT count(*) as count FROM appointment_requests WHERE status = 'Confirmed'")).count;

    const totalEnquiries = (await db.get('SELECT count(*) as count FROM enquiries')).count;
    const newEnquiries = (await db.get("SELECT count(*) as count FROM enquiries WHERE status = 'New'")).count;

    res.json({
      articles: {
        total: totalArticles,
        published: publishedArticles,
        draft: draftArticles
      },
      appointments: {
        total: totalAppts,
        new: newAppts,
        confirmed: confirmedAppts
      },
      enquiries: {
        total: totalEnquiries,
        new: newEnquiries
      }
    });
  } catch (err) {
    console.error('Error fetching dashboard stats:', err);
    res.status(500).json({ error: 'Failed to fetch dashboard stats.' });
  }
});

export default router;
