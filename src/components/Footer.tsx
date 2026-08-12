import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Shield, Heart, ArrowUpRight } from 'lucide-react';
import { fetchServices } from '../services/api';

export const Footer: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: string }>({
    hospital_name: 'Starlight Hospital',
    motto: 'DEO MEDICE',
    phone_primary: '08053587646',
    phone_secondary: '07079333090',
    address: 'Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.',
    footer_microcopy: 'Starlight Hospital - DEO MEDICE. Healthcare services for individuals and families in Jajo, Ikorodu, Lagos.'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(d => {
        if (d.settings) setSettings(prev => ({ ...prev, ...d.settings }));
      })
      .catch(err => console.error(err));

    fetchServices()
      .then(d => {
        if (d.services) setServices(d.services);
      })
      .catch(err => console.error(err));
  }, []);

  const phoneLink1 = `tel:${settings.phone_primary.replace(/\s+/g, '')}`;
  const phoneLink2 = `tel:${settings.phone_secondary.replace(/\s+/g, '')}`;

  return (
    <footer className="bg-navy-500 text-white font-sans border-t border-navy-600">
      
      {/* Upper Footer Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Hospital Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 text-navy-900 flex items-center justify-center font-bold">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg tracking-tight leading-none text-white">{settings.hospital_name}</h3>
                <span className="text-[11px] font-bold text-gold-500 tracking-widest uppercase font-mono">{settings.motto}</span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              {settings.footer_microcopy}
            </p>

            <div className="pt-2">
              <Link
                to="/appointment"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-xs font-bold uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-sm"
              >
                Request Appointment <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold-500 border-b border-navy-600 pb-2">Clinical Services</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {services.map((s) => (
                <li key={s.service_id}>
                  <Link to={`/services/${s.service_id}`} className="hover:text-teal-400 transition-colors flex items-center gap-1">
                    <span>•</span> {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold-500 border-b border-navy-600 pb-2">Website Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home Page</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About Starlight Hospital</Link></li>
              <li><Link to="/services" className="hover:text-teal-400 transition-colors">Services Overview</Link></li>
              <li><Link to="/health-information" className="hover:text-teal-400 transition-colors">Health Information Hub</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/appointment" className="hover:text-teal-400 transition-colors">Request an Appointment</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-disclaimer" className="hover:text-teal-400 transition-colors">Terms & Disclaimer</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gold-500 border-b border-navy-600 pb-2">Location & Contact</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href={phoneLink1} className="hover:text-gold-500 font-bold">{settings.phone_primary}</a>
                  <a href={phoneLink2} className="hover:text-gold-500 font-bold">{settings.phone_secondary}</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Medical Disclaimer Banner */}
      <div className="bg-navy-600 py-4 px-4 border-t border-navy-600 text-slate-300 text-xs leading-relaxed">
        <div className="max-w-7xl mx-auto flex items-start gap-3">
          <Heart className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-slate-300">
            <strong>Medical Disclaimer:</strong> The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional. Always consult a healthcare provider for symptoms or medical concerns.
          </p>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-navy-700 py-4 px-4 text-center text-[11px] text-slate-400 border-t border-navy-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Starlight Hospital. Motto: <strong className="text-gold-500 font-mono">DEO MEDICE</strong>. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-disclaimer" className="hover:underline">Terms & Disclaimer</Link>
            <Link to="/admin/login" className="text-slate-400 hover:text-white font-semibold">Staff CMS Login</Link>
          </div>
        </div>
      </div>

    </footer>
  );
};
