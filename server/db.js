import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbPath = path.join(__dirname, 'starlight.db');

// Support Vercel serverless writable /tmp directory
if (process.env.VERCEL) {
  const tmpPath = path.join('/tmp', 'starlight.db');
  if (!fs.existsSync(tmpPath)) {
    if (fs.existsSync(dbPath)) {
      try {
        fs.copyFileSync(dbPath, tmpPath);
      } catch (e) {
        console.error('Failed to copy starlight.db to /tmp:', e);
      }
    }
  }
  dbPath = tmpPath;
}

const sqlite = sqlite3.verbose();
const rawDb = new sqlite.Database(dbPath);

// Enable foreign keys
rawDb.run('PRAGMA foreign_keys = ON;');

// Async Promise Wrappers
const db = {
  get: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      rawDb.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  all: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      rawDb.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  run: (sql, params = []) => {
    return new Promise((resolve, reject) => {
      rawDb.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },

  exec: (sql) => {
    return new Promise((resolve, reject) => {
      rawDb.exec(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

// Initialize Table Schemas
export async function initDb() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT CHECK(role IN ('Super Admin', 'Editor', 'Author', 'Enquiry Manager')) DEFAULT 'Editor',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      category_id INTEGER NOT NULL,
      author_id INTEGER NOT NULL,
      featured_image TEXT NOT NULL,
      image_alt TEXT NOT NULL,
      status TEXT CHECK(status IN ('Draft', 'Pending Review', 'Scheduled', 'Published', 'Archived')) DEFAULT 'Draft',
      medical_review_status TEXT CHECK(medical_review_status IN ('Not Required', 'Needs Review', 'Reviewed')) DEFAULT 'Not Required',
      published_at DATETIME,
      reading_time INTEGER DEFAULT 4,
      seo_title TEXT,
      meta_description TEXT,
      related_post_ids TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      url TEXT NOT NULL,
      alt_text TEXT,
      uploaded_by INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content_json TEXT NOT NULL,
      meta_title TEXT,
      meta_description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      service_id TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_desc TEXT NOT NULL,
      hero_heading TEXT NOT NULL,
      description TEXT NOT NULL,
      what_to_expect TEXT NOT NULL,
      who_it_is_for TEXT NOT NULL,
      before_your_visit_json TEXT NOT NULL,
      faqs_json TEXT,
      icon_name TEXT NOT NULL,
      image_url TEXT NOT NULL,
      cta_label TEXT DEFAULT 'REQUEST AN APPOINTMENT',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS appointment_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone_number TEXT NOT NULL,
      service_needed TEXT NOT NULL,
      preferred_date TEXT,
      preferred_time TEXT,
      message TEXT NOT NULL,
      consent INTEGER DEFAULT 1,
      status TEXT CHECK(status IN ('New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled')) DEFAULT 'New',
      admin_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      preferred_contact TEXT DEFAULT 'Phone',
      consent INTEGER DEFAULT 1,
      status TEXT CHECK(status IN ('New', 'In Progress', 'Handled', 'Archived')) DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT UNIQUE NOT NULL,
      setting_value TEXT NOT NULL,
      group_name TEXT DEFAULT 'general',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_name TEXT NOT NULL,
      user_role TEXT NOT NULL,
      action TEXT NOT NULL,
      entity TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      ip_address TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export default db;
