import React, { useEffect, useState } from 'react';
import { fetchAdminEnquiries, updateEnquiryApi } from '../../services/api';
import { Enquiry } from '../../types';
import { MessageSquare, Search, CheckCircle, Mail, Phone } from 'lucide-react';

export const AdminEnquiries: React.FC = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    fetchAdminEnquiries(statusFilter || undefined, searchQuery || undefined)
      .then(data => setEnquiries(data.enquiries))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchQuery]);

  const handleStatusToggle = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Handled' ? 'New' : 'Handled';
    try {
      await updateEnquiryApi(id, newStatus);
      setFeedback(`Enquiry marked as ${newStatus}`);
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update enquiry status');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Contact & Enquiry Management</h1>
          <p className="text-sm text-slate-500 mt-1">Review contact form inquiries sent to Starlight Hospital.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enquiries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Handled">Handled</option>
        </select>
      </div>

      {/* Enquiries List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-navy-500">No enquiries found</h3>
            <p className="text-xs text-slate-500">Form submissions will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {enquiries.map((e) => (
              <div key={e.id} className="p-6 space-y-3 hover:bg-slate-50/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-bold text-navy-500 text-base">{e.name}</span>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-teal-600"><Phone className="w-3.5 h-3.5" /> {e.phone}</span>
                      {e.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {e.email}</span>}
                      <span>•</span>
                      <span>Preferred Contact: {e.preferred_contact}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase ${
                      e.status === 'New' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {e.status}
                    </span>
                    <button
                      onClick={() => handleStatusToggle(e.id, e.status)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold hover:bg-slate-100"
                    >
                      Toggle Handled
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-navy-500 text-xs uppercase tracking-wider">Reason: {e.subject}</div>
                  <p className="text-slate-700 text-sm">{e.message}</p>
                </div>
                <div className="text-[11px] text-slate-400">Received on: {new Date(e.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
