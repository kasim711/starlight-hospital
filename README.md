# Starlight Hospital — Marketing Website & Content Management System (CMS)

**DEO MEDICE** • *Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos*

A premium, trustworthy, and modern hospital marketing website and 12-section Content Management System (CMS) built for **Starlight Hospital**.

---

## 🌟 Features Overview

### 🏛️ Public Marketing Website
- **Home Page**: Dynamic hero, clinical service grid, facility highlights, featured health articles, and appointment call-to-action.
- **About Us**: Hospital profile, clinical history, mission, core values, and community commitment in Jajo, Ikorodu.
- **Services Catalog & 6 Clinical Detail Pages**:
  - General Outpatient / Medical Consultation
  - Obstetrics & Gynaecology (Women’s Health & Antenatal Care)
  - Paediatrics (Child Healthcare)
  - Surgical Services & Care Pathways
  - Health Education & Counselling
  - Laboratory & Diagnostic Services
- **Health Information Hub**: Educational articles with category filters, search, estimated reading times, and medically reviewed badges.
- **Appointment Request Flow**: Patient booking request form with service selection, preferred date/time, and consent options.
- **Contact & Location Page**: Interactive contact details, opening hours, Google Maps directions, and click-to-call numbers (`08053587646`, `07079333090`).
- **Legal Pages**: Privacy Policy and Terms & Disclaimer notices.

---

### 🛡️ 12-Section Admin CMS (`/admin`)
- **Overview Dashboard**: Metrics for published posts, pending appointment requests, patient enquiries, and audit trail activity.
- **Posts Management**: Rich article creation/editing with slug auto-generation, status workflows (Draft, Pending Review, Published, Archived), and live front-end preview mode.
- **Categories Management**: Full CRUD operations for article topics.
- **Media Library**: Asset upload, search, and alt-text management.
- **Pages Manager**: Dynamic homepage and about page copy customization without touching source code.
- **Services Manager**: Customize clinical service headings, descriptions, preparation checklists, and FAQs.
- **Appointment Requests**: View, filter, and manage incoming patient appointment requests.
- **Contact Enquiries**: Track and resolve general patient inquiries.
- **Site Settings**: Global management of phone numbers, emergency lines, physical address, and microcopy.
- **Users & Roles (RBAC)**: Multi-role staff access control (`Super Admin`, `Editor`, `Author`, `Enquiry Manager`).
- **SEO Controls**: Custom meta titles, meta descriptions, open graph settings, dynamic `sitemap.xml`, and `robots.txt`.
- **Audit Log**: Immutable administrative activity tracking for compliance and auditability.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React Icons
- **Backend API**: Node.js, Express.js, JWT Authentication, Bcrypt password hashing
- **Database**: Native Relational SQLite (`server/starlight.db`) with Foreign Keys & automatic fallback seeding
- **Deployment**: Vercel Serverless Function adaptor (`api/index.js` & `vercel.json`)

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Mode
Start both the backend API server and the Vite development server concurrently:
```bash
npm run dev
```
- **Public Site & Admin Portal**: `http://localhost:3100`
- **Admin Login Route**: `http://localhost:3100/admin/login`

### 🔑 Default Staff Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@starlight.com` | `password123` |
| **Editor** | `editor@starlight.com` | `password123` |
| **Author** | `author@starlight.com` | `password123` |
| **Enquiry Manager** | `enquiry@starlight.com` | `password123` |

---

## 📦 Production Build & Server

### Build Production Bundle
```bash
npm run build
```

### Run Node Production Express Server
```bash
npm run server
```

---

## ☁️ Deploying to Vercel

This repository is pre-configured for 1-click deployment on **Vercel**.

### Deploy via Vercel CLI
```bash
npx vercel
```

### Deploy via GitHub
1. Push this repository to GitHub / GitLab.
2. Import the repository in [Vercel Dashboard](https://vercel.com/new).
3. Vercel automatically uses `vercel.json` to deploy both static frontend bundles and serverless API endpoints.

---

## 📄 License & Ownership

Developed for **Starlight Hospital** (Jajo, Ikorodu, Lagos, Nigeria). All rights reserved.
