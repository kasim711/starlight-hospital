import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PageTransition } from './components/PageTransition';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { HealthInfoPage } from './pages/HealthInfoPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminArticleEdit } from './pages/admin/AdminArticleEdit';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminMedia } from './pages/admin/AdminMedia';
import { AdminPages } from './pages/admin/AdminPages';
import { AdminServices } from './pages/admin/AdminServices';
import { AdminAppointments } from './pages/admin/AdminAppointments';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminSEO } from './pages/admin/AdminSEO';
import { AdminAuditLog } from './pages/admin/AdminAuditLog';

// Public Layout Component
const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-slate-800">
      <div>
        <Header />
        <main>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
            <Route path="/health-information" element={<HealthInfoPage />} />
            <Route path="/health-information/:slug" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="/terms-disclaimer" element={<TermsPage />} />
          </Route>

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin CMS Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/articles" element={<AdminArticles />} />
              <Route path="/admin/articles/new" element={<AdminArticleEdit />} />
              <Route path="/admin/articles/:id/edit" element={<AdminArticleEdit />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/media" element={<AdminMedia />} />
              <Route path="/admin/pages" element={<AdminPages />} />
              <Route path="/admin/services" element={<AdminServices />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/enquiries" element={<AdminEnquiries />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/seo" element={<AdminSEO />} />
              <Route path="/admin/audit-logs" element={<AdminAuditLog />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<PublicLayout />}>
            <Route path="*" element={
              <div className="max-w-lg mx-auto px-5 py-32 text-center space-y-4">
                <h1 className="text-3xl font-semibold text-navy-500">Page Not Found</h1>
                <p className="text-slate-500">The page you're looking for doesn't exist or has been moved.</p>
                <a href="/" className="btn-teal text-sm inline-flex">Return Home</a>
              </div>
            } />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
