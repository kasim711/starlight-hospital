import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginAdminApi } from '../../services/api';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('admin@starlight.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginAdminApi(email, password);
      login(data.token, data.user);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-xl p-8 shadow-lg border border-slate-100 space-y-6">
        
        <div className="text-center space-y-2">
          <img src="/starlight-logo.png" alt="Starlight Hospital" className="w-16 h-16 object-contain mx-auto" />
          <h1 className="text-xl font-semibold text-navy-500">Admin Portal</h1>
          <p className="text-xs font-medium text-gold-600 uppercase tracking-widest">Starlight Hospital CMS</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="input-healthcare pl-10 text-sm" placeholder="admin@starlight.com" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="input-healthcare pl-10 text-sm" placeholder="••••••••" />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-500 space-y-0.5">
            <span className="font-medium text-slate-600 block">Demo credentials</span>
            <div className="font-mono">admin@starlight.com / password123</div>
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary text-sm py-3">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

      </div>
    </div>
  );
};
