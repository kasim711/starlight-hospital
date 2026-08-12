import React, { useEffect, useState } from 'react';
import { fetchAdminAppointments, updateAppointmentApi } from '../../services/api';
import { AppointmentRequest } from '../../types';
import { 
  Calendar, Search, CheckCircle, Clock, Phone, User, MessageSquare, Save, Trash2 
} from 'lucide-react';

export const AdminAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState<AppointmentRequest | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [editingStatus, setEditingStatus] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadAppointments = () => {
    setLoading(true);
    fetchAdminAppointments(statusFilter || undefined, searchQuery || undefined)
      .then(data => setAppointments(data.appointments))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAppointments();
  }, [statusFilter, searchQuery]);

  const handleOpenDetail = (appt: AppointmentRequest) => {
    setSelectedAppt(appt);
    setEditingStatus(appt.status);
    setEditingNotes(appt.admin_notes || '');
  };

  const handleUpdate = async () => {
    if (!selectedAppt) return;
    try {
      setSaving(true);
      await updateAppointmentApi(selectedAppt.id, editingStatus, editingNotes);
      setFeedback('Appointment request updated successfully.');
      setSelectedAppt(null);
      loadAppointments();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update appointment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Appointment Requests Manager</h1>
          <p className="text-sm text-slate-500 mt-1">Review incoming appointment requests, update contact statuses, and log internal notes.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, phone, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Detail / Status Modal */}
      {selectedAppt && (
        <div className="fixed inset-0 z-50 bg-navy-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="font-bold text-lg text-navy-500">Appointment Request Details</h3>
              <button onClick={() => setSelectedAppt(null)} className="text-xs font-bold text-slate-400 hover:text-slate-600">Close</button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div><strong>Patient Name:</strong> {selectedAppt.full_name}</div>
              <div><strong>Phone Number:</strong> <a href={`tel:${selectedAppt.phone_number}`} className="text-teal-600 font-bold">{selectedAppt.phone_number}</a></div>
              <div><strong>Requested Service:</strong> {selectedAppt.service_needed}</div>
              <div><strong>Requested Date / Time:</strong> {selectedAppt.preferred_date || 'N/A'} at {selectedAppt.preferred_time || 'N/A'}</div>
              <div><strong>Patient Message:</strong> <p className="bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1 italic">{selectedAppt.message}</p></div>
              <div className="text-[11px] text-slate-400">Received on: {new Date(selectedAppt.created_at).toLocaleString()}</div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-navy-500 uppercase">Change Status</label>
                <select
                  value={editingStatus}
                  onChange={(e) => setEditingStatus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy-500 bg-white"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-navy-500 uppercase">Internal Staff Notes</label>
                <textarea
                  rows={3}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  placeholder="Notes on phone call outcome or confirmation..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedAppt(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="px-5 py-2 rounded-xl bg-teal-500 text-white font-bold text-xs hover:bg-teal-600 transition-colors shadow-md disabled:opacity-50"
              >
                {saving ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointments Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading appointment requests...</div>
        ) : appointments.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-navy-500">No appointment requests found</h3>
            <p className="text-xs text-slate-500">Submitted requests will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 pl-6">Patient Name</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Service Needed</th>
                  <th className="p-4">Preferred Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 pl-6 font-bold text-navy-500">{appt.full_name}</td>
                    <td className="p-4 font-semibold text-teal-600">
                      <a href={`tel:${appt.phone_number}`}>{appt.phone_number}</a>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{appt.service_needed}</td>
                    <td className="p-4 text-slate-500">{appt.preferred_date || 'Flexible'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        appt.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        appt.status === 'Contacted' ? 'bg-amber-100 text-amber-800' :
                        appt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                        appt.status === 'Completed' ? 'bg-teal-100 text-teal-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleOpenDetail(appt)}
                        className="px-3 py-1.5 rounded-lg bg-navy-500 text-white font-bold text-[11px] hover:bg-navy-600 transition-colors"
                      >
                        Manage Request
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
