import express from 'express';
import cors from 'cors';
import db, { initDb } from '../server/db.js';

import authRoutes from '../server/routes/auth.js';
import articleRoutes from '../server/routes/articles.js';
import categoryRoutes from '../server/routes/categories.js';
import appointmentRoutes from '../server/routes/appointments.js';
import enquiryRoutes from '../server/routes/enquiries.js';
import statsRoutes from '../server/routes/stats.js';
import serviceRoutes from '../server/routes/services.js';
import pageRoutes from '../server/routes/pages.js';
import settingRoutes from '../server/routes/settings.js';
import userRoutes from '../server/routes/users.js';
import mediaRoutes from '../server/routes/media.js';
import auditRoutes from '../server/routes/audit.js';

const app = express();

app.use(cors());
app.use(express.json());

// Initialize Database Schemas
await initDb();

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/audit', auditRoutes);

// Dynamic robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://starlighthospital.com/sitemap.xml
`);
});

// Dynamic sitemap.xml
app.get('/sitemap.xml', async (req, res) => {
  res.type('application/xml');
  
  const baseUrl = 'https://starlighthospital.com';
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/general-outpatient',
    '/services/obstetrics-gynaecology',
    '/services/paediatrics',
    '/services/surgery',
    '/services/health-education-counseling',
    '/services/laboratory-diagnostic',
    '/health-information',
    '/contact',
    '/appointment',
    '/privacy-policy',
    '/terms-disclaimer'
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticPages.forEach(page => {
    xml += `  <url>\n    <loc>${baseUrl}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  try {
    const articles = await db.all("SELECT slug, updated_at FROM articles WHERE status = 'Published'");
    articles.forEach(art => {
      xml += `  <url>\n    <loc>${baseUrl}/health-information/${art.slug}</loc>\n    <lastmod>${new Date(art.updated_at).toISOString().split('T')[0]}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });
  } catch (err) {
    console.error('Error generating sitemap article entries:', err);
  }

  xml += `</urlset>`;
  res.send(xml);
});

export default app;
