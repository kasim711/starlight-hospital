import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, FileText, Tag, Image, FileSpreadsheet, Stethoscope, 
  Calendar, MessageSquare, Settings, Users, Search, ShieldAlert, LogOut, 
  ExternalLink, Menu, X, ChevronRight 
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, roles: ['Super Admin', 'Editor', 'Author', 'Enquiry Manager'] },
    { name: 'Posts', path: '/admin/articles', icon: <FileText className="w-4 h-4" />, roles: ['Super Admin', 'Editor', 'Author'] },
    { name: 'Categories', path: '/admin/categories', icon: <Tag className="w-4 h-4" />, roles: ['Super Admin', 'Editor'] },
    { name: 'Media Library', path: '/admin/media', icon: <Image className="w-4 h-4" />, roles: ['Super Admin', 'Editor', 'Author'] },
    { name: 'Pages', path: '/admin/pages', icon: <FileSpreadsheet className="w-4 h-4" />, roles: ['Super Admin', 'Editor'] },
    { name: 'Services', path: '/admin/services', icon: <Stethoscope className="w-4 h-4" />, roles: ['Super Admin', 'Editor'] },
    { name: 'Appointments', path: '/admin/appointments', icon: <Calendar className="w-4 h-4" />, roles: ['Super Admin', 'Editor', 'Enquiry Manager'] },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare className="w-4 h-4" />, roles: ['Super Admin', 'Editor', 'Enquiry Manager'] },
    { name: 'Site Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" />, roles: ['Super Admin'] },
    { name: 'Users & Roles', path: '/admin/users', icon: <Users className="w-4 h-4" />, roles: ['Super Admin'] },
    { name: 'SEO Controls', path: '/admin/seo', icon: <Search className="w-4 h-4" />, roles: ['Super Admin', 'Editor'] },
    { name: 'Audit Log', path: '/admin/audit-logs', icon: <ShieldAlert className="w-4 h-4" />, roles: ['Super Admin', 'Editor'] },
  ];

  const userRole = user?.role || 'Editor';
  const visibleItems = navItems.filter(item => userRole === 'Super Admin' || item.roles.includes(userRole));

  return (
    <div className="min-h-screen bg-slate-100/90 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-500 text-white p-4 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2.5">
          <img src="/starlight-logo.png" alt="Starlight Logo" className="w-8 h-8 object-contain bg-white rounded-full p-0.5 shadow-xs" />
          <div>
            <h2 className="font-extrabold text-white text-xs leading-none tracking-tight">STARLIGHT CMS</h2>
            <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest">{userRole}</span>
          </div>
        </div>

        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="p-2 rounded-xl bg-navy-600 text-white focus:outline-none"
        >
          {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileNavOpen && (
        <div 
          onClick={() => setIsMobileNavOpen(false)}
          className="fixed inset-0 bg-navy-900/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Sidebar Navigation (Responsive Drawer) */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 bg-navy-500 text-white flex-shrink-0 flex flex-col justify-between p-5 border-r border-navy-600
        transform transition-transform duration-300 ease-in-out shadow-xl md:shadow-none
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="space-y-6">
          
          {/* Logo & Branding */}
          <div className="flex items-center justify-between border-b border-navy-600/80 pb-5">
            <div className="flex items-center gap-3">
              <img src="/starlight-logo.png" alt="Starlight Logo" className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shadow-sm" />
              <div>
                <h2 className="font-extrabold text-white text-sm leading-none tracking-tight">STARLIGHT CMS</h2>
                <span className="text-[10px] font-extrabold text-gold-400 uppercase tracking-widest font-mono">DEO MEDICE ADMIN</span>
              </div>
            </div>

            <button onClick={() => setIsMobileNavOpen(false)} className="md:hidden text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)] scrollbar-none pr-1">
            {visibleItems.map((item) => {
              const active = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-teal-500 text-white shadow-md'
                      : 'text-slate-300 hover:bg-navy-600 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 text-white" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer Actions */}
        <div className="pt-4 border-t border-navy-600/80 space-y-3">
          <div className="px-1.5 py-1 bg-navy-600/50 rounded-xl border border-navy-600/60 p-2.5">
            <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-widest">Logged in user</span>
            <span className="text-xs font-extrabold text-white block truncate">{user?.name || 'Administrator'}</span>
            <span className="text-[10px] text-gold-400 font-bold uppercase tracking-wider">{userRole}</span>
          </div>

          <div className="space-y-2">
            <Link
              to="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-navy-600 text-slate-200 text-xs font-bold hover:bg-navy-700 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold-400" /> View Public Site
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-red-500/40 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
