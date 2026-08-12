import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminStats } from '../../services/api';
import { 
  FileText, Calendar, MessageSquare, Plus, ArrowRight, CheckCircle, Clock 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats()
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-slate-200 rounded w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => <div key={n} className="h-32 bg-slate-200 rounded-2xl animate-pulse"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Website Admin Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Manage health education articles, appointment requests, and website contact enquiries.</p>
        </div>

        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Health Articles Metric */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Health Information</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-navy-500">{stats?.articles?.total || 0}</div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
              <span className="text-teal-600 font-semibold">{stats?.articles?.published || 0} Published</span>
              <span>•</span>
              <span className="text-amber-600 font-semibold">{stats?.articles?.draft || 0} Drafts</span>
            </div>
          </div>
          <Link to="/admin/articles" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-navy-500 pt-2 border-t border-slate-100 w-full">
            Manage Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Appointments Metric */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Appointment Requests</span>
            <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-navy-500">{stats?.appointments?.total || 0}</div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
              <span className="text-blue-600 font-semibold">{stats?.appointments?.new || 0} New</span>
              <span>•</span>
              <span className="text-emerald-600 font-semibold">{stats?.appointments?.confirmed || 0} Confirmed</span>
            </div>
          </div>
          <Link to="/admin/appointments" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-navy-500 pt-2 border-t border-slate-100 w-full">
            Manage Appointments <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Contact Enquiries Metric */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Contact Enquiries</span>
            <div className="w-10 h-10 rounded-xl bg-gold-50 text-gold-600 flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-navy-500">{stats?.enquiries?.total || 0}</div>
            <div className="flex items-center gap-3 text-xs text-slate-600 mt-1">
              <span className="text-blue-600 font-semibold">{stats?.enquiries?.new || 0} Unhandled New</span>
            </div>
          </div>
          <Link to="/admin/enquiries" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-navy-500 pt-2 border-t border-slate-100 w-full">
            View Enquiries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>

      {/* Admin Shortcuts Grid */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-navy-500">Quick Administrator Shortcuts</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <Link
            to="/admin/articles/new"
            className="p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <h4 className="font-bold text-navy-500 text-base group-hover:text-teal-600">Publish New Health Article</h4>
              <p className="text-xs text-slate-500">Write educational articles for patient guidance and SEO.</p>
            </div>
            <Plus className="w-5 h-5 text-teal-500" />
          </Link>

          <Link
            to="/admin/appointments"
            className="p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition-all flex items-center justify-between group"
          >
            <div className="space-y-1">
              <h4 className="font-bold text-navy-500 text-base group-hover:text-teal-600">Review Appointment Requests</h4>
              <p className="text-xs text-slate-500">Check incoming appointment inquiries and update follow-up statuses.</p>
            </div>
            <Calendar className="w-5 h-5 text-teal-500" />
          </Link>

        </div>
      </div>

    </div>
  );
};
