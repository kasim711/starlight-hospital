import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginAdminApi } from '../../services/api';
import { Shield, Lock, Mail, AlertCircle } from 'lucide-react';

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
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-navy-500 text-gold-400 flex items-center justify-center mx-auto shadow-md border border-navy-600">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold text-navy-500 tracking-tight">Starlight Hospital CMS</h1>
          <p className="text-xs font-bold text-gold-600 tracking-widest uppercase font-mono">DEO MEDICE • ADMIN LOGIN</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-healthcare pl-11 text-xs"
                placeholder="admin@starlight.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-healthcare pl-11 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <span className="font-extrabold text-navy-500 block uppercase tracking-wider text-[10px]">Default Admin Credentials</span>
            <div className="font-mono text-slate-700">Email: admin@starlight.com</div>
            <div className="font-mono text-slate-700">Password: password123</div>
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
