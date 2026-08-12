import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { initDb } from './db.js';
import { seedInitialData } from './seed.js';

import authRoutes from './routes/auth.js';
import articleRoutes from './routes/articles.js';
import categoryRoutes from './routes/categories.js';
import appointmentRoutes from './routes/appointments.js';
import enquiryRoutes from './routes/enquiries.js';
import statsRoutes from './routes/stats.js';
import serviceRoutes from './routes/services.js';
import pageRoutes from './routes/pages.js';
import settingRoutes from './routes/settings.js';
import userRoutes from './routes/users.js';
import mediaRoutes from './routes/media.js';
import auditRoutes from './routes/audit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const INITIAL_PORT = process.env.PORT ? parseInt(process.env.PORT) : 5050;

// Initialize Database Schemas and Seed Production Data
await initDb();
await seedInitialData();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

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

// Serve Frontend Static Bundle in Production
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: `API endpoint ${req.method} ${req.path} not found` });
  }
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.send('Starlight Hospital Express API Server is running.');
    }
  });
});

function startServer(portToTry, attempts = 0) {
  if (attempts > 10) {
    console.error('Could not find an available port after 10 attempts.');
    process.exit(1);
  }

  const server = app.listen(portToTry, '0.0.0.0', () => {
    console.log(`Starlight Hospital Express API Server running on http://127.0.0.1:${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      const nextPort = portToTry + 1;
      console.warn(`Port ${portToTry} is in use. Trying port ${nextPort}...`);
      startServer(nextPort, attempts + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(INITIAL_PORT);
