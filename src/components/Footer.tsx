import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<{ [key: string]: string }>({
    hospital_name: 'Starlight Hospital',
    motto: 'DEO MEDICE',
    phone_primary: '08053587646',
    phone_secondary: '07079333090',
    address: 'Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(d => { if (d.settings) setSettings(prev => ({ ...prev, ...d.settings })); })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-navy-500 text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-14">
        
        {/* Top: Brand + Contact */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/starlight-logo.png" alt="Starlight Hospital" className="w-9 h-9 object-contain" />
              <div>
                <span className="font-semibold text-white text-base block leading-tight">{settings.hospital_name}</span>
                <span className="text-[10px] font-medium text-gold-500 uppercase tracking-widest">{settings.motto}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed max-w-xs">{settings.address}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <a href={`tel:${settings.phone_primary}`} className="text-white font-medium hover:text-gold-400 transition-colors">{settings.phone_primary}</a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <a href={`tel:${settings.phone_secondary}`} className="text-white font-medium hover:text-gold-400 transition-colors">{settings.phone_secondary}</a>
            </div>
          </div>
        </div>

        {/* Links row */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-300">
            <Link to="/about" className="hover:text-white transition-colors">About</Link>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <Link to="/health-information" className="hover:text-white transition-colors">Health Information</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-disclaimer" className="hover:text-white transition-colors">Terms</Link>
          </div>
          <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-300 transition-colors flex items-center gap-1">
            <Lock className="w-3 h-3" /> Staff Portal
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 mt-6 pt-6 text-xs text-slate-400 space-y-1">
          <p>© {new Date().getFullYear()} Starlight Hospital — DEO MEDICE. All rights reserved.</p>
          <p className="leading-relaxed max-w-3xl">
            The information on this website is for general guidance only and does not constitute medical advice.
            Always consult a qualified healthcare professional for diagnosis and treatment.
          </p>
        </div>

      </div>
    </footer>
  );
};
