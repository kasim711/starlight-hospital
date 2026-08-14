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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl border border-slate-100 space-y-6">
        
        {/* Header & Logo */}
        <div className="text-center space-y-2.5">
          <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
            <img src="/starlight-logo.png" alt="Starlight Hospital" className="w-11 h-11 object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-navy-500">Admin Portal</h1>
            <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mt-0.5">Starlight Hospital CMS</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-3.5 rounded-xl text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email Input with Clean Left Icon Padding */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                <Mail className="w-4 h-4 text-teal-600" />
              </div>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '2.75rem' }}
                className="w-full pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm text-navy-500 font-medium transition-all placeholder:text-slate-400 bg-white"
                placeholder="admin@starlight.com" 
              />
            </div>
          </div>

          {/* Password Input with Clean Left Icon Padding */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">Password</label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
                <Lock className="w-4 h-4 text-teal-600" />
              </div>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.75rem' }}
                className="w-full pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 text-sm text-navy-500 font-medium transition-all placeholder:text-slate-400 bg-white"
                placeholder="••••••••" 
              />
            </div>
          </div>

          {/* Demo Credentials Box */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
            <span className="font-semibold text-navy-500 block">Demo Credentials</span>
            <div className="font-mono text-slate-500 text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 inline-block">
              admin@starlight.com / password123
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full btn-teal text-sm py-3 rounded-xl font-semibold shadow-md mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In to Portal'}
          </button>

        </form>

      </div>
    </div>
  );
};
