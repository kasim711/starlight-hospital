import React, { useEffect, useState } from 'react';
import { Users, UserPlus, Shield, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Editor');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    const token = localStorage.getItem('starlight_token');
    fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(d => {
        if (d.users) setUsers(d.users);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');
      setName('');
      setEmail('');
      setPassword('');
      setFeedback(`User "${name}" created with role "${role}".`);
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      setError(err.message || 'Error creating user');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this user account?')) return;
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete user');
      setFeedback('User account deleted.');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error deleting user');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Users & RBAC Permissions</h1>
          <p className="text-sm text-slate-500 mt-1">Manage staff user accounts and role-based access permissions.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Create Staff Form */}
      <form onSubmit={handleCreateUser} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <h3 className="font-bold text-navy-500 text-sm uppercase tracking-wider flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-teal-600" /> Create New Staff Account
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <input
            type="text"
            required
            placeholder="Staff Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm font-bold text-navy-500 bg-white"
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Editor">Editor</option>
            <option value="Author">Author</option>
            <option value="Enquiry Manager">Enquiry Manager</option>
          </select>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-navy-600 transition-colors shadow-md"
        >
          <UserPlus className="w-4 h-4 text-gold-500" /> Create Account
        </button>
      </form>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading user accounts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 pl-6">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Assigned Role</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 pl-6 font-bold text-navy-500">{u.name}</td>
                    <td className="p-4 font-mono text-slate-600">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        u.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
                        u.role === 'Editor' ? 'bg-teal-100 text-teal-800' :
                        u.role === 'Author' ? 'bg-amber-100 text-amber-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                        title="Delete User Account"
                      >
                        <Trash2 className="w-4 h-4" />
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
