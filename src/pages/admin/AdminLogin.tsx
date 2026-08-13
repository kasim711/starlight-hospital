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
    <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8 border border-slate-200/80 relative z-10">
        
        <div className="text-center space-y-3">
          <img 
            src="/starlight-logo.png" 
            alt="Starlight Hospital Official Logo" 
            className="w-20 h-20 object-contain mx-auto bg-white rounded-full p-1 shadow-md border border-slate-100"
          />
          <h1 className="text-2xl font-extrabold text-navy-500 tracking-tight">Starlight Hospital CMS</h1>
          <p className="text-xs font-extrabold text-amber-700 tracking-widest uppercase font-mono">DEO MEDICE • ADMIN LOGIN</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-navy-600 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-navy-700 font-medium transition-all placeholder:text-slate-400 bg-white"
                placeholder="admin@starlight.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-navy-600 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm text-navy-700 font-medium transition-all placeholder:text-slate-400 bg-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-extrabold text-navy-600 block uppercase tracking-wider text-[11px]">Default Admin Credentials</span>
            <div className="font-mono text-slate-800 font-semibold">Email: admin@starlight.com</div>
            <div className="font-mono text-slate-800 font-semibold">Password: password123</div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-xs uppercase tracking-wider py-3.5"
          >
            {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
          </button>
        </form>

      </div>
    </div>
  );
};
