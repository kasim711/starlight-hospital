import React, { useEffect, useState } from 'react';
import { Shield, Clock, Search } from 'lucide-react';

export const AdminAuditLog: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('starlight_token');
    fetch('/api/audit', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(d => setLogs(d.logs || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">System Audit Log</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time immutable log of administrative actions, user logins, post edits, and setting changes.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading audit logs...</div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <Shield className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-navy-500 text-base">No Audit Logs Recorded Yet</h4>
            <p className="text-xs text-slate-500">Audit logs begin recording automatically as administrators perform actions in the CMS.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 pl-6">Timestamp</th>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                  <th className="p-4 pr-6">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6 font-mono text-slate-500 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-4 font-bold text-navy-500">{log.user_name}</td>
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {log.user_role}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-teal-600 font-bold">{log.action}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-400">{log.entity}</td>
                    <td className="p-4 pr-6 text-slate-600 font-medium">{log.details}</td>
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
