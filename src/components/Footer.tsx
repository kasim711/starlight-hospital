import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight, Lock, ShieldCheck } from 'lucide-react';

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
      .then(d => {
        if (d.settings) setSettings(prev => ({ ...prev, ...d.settings }));
      })
      .catch(err => console.error(err));
  }, []);

  const phoneLink1 = `tel:${settings.phone_primary.replace(/\s+/g, '')}`;
  const phoneLink2 = `tel:${settings.phone_secondary.replace(/\s+/g, '')}`;

  return (
    <footer className="bg-navy-500 text-white font-sans border-t border-navy-600">
      
      {/* Top Banner Disclaimer Notice */}
      <div className="bg-navy-600/80 border-b border-navy-600 py-3 px-4 text-center text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
          <span>General medical & clinical services in Jajo, Ikorodu, Lagos. <strong className="text-gold-400 font-extrabold">DEO MEDICE</strong>.</span>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Column 1: Hospital Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/starlight-logo.png" 
                alt="Starlight Hospital Official Logo" 
                className="w-12 h-12 object-contain bg-white rounded-full p-0.5 shadow-sm"
              />
              <div>
                <h3 className="font-extrabold text-white text-lg tracking-tight">{settings.hospital_name}</h3>
                <span className="text-[10px] font-extrabold text-gold-400 uppercase tracking-widest font-mono">
                  {settings.motto}
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Starlight Hospital provides accessible, patient-centered clinical healthcare services for individuals and families in Jajo, Ikorodu, Lagos.
            </p>

            <div className="pt-2">
              <Link 
                to="/appointment"
                className="btn-gold text-xs py-2.5 px-4"
              >
                Book Appointment Request <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-400">Website Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link to="/" className="hover:text-gold-400 transition-colors inline-block py-0.5">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-400 transition-colors inline-block py-0.5">About Starlight Hospital</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gold-400 transition-colors inline-block py-0.5">Clinical Services Catalog</Link>
              </li>
              <li>
                <Link to="/health-information" className="hover:text-gold-400 transition-colors inline-block py-0.5">Health Information Hub</Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-gold-400 transition-colors inline-block py-0.5">Appointment Request</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-400 transition-colors inline-block py-0.5">Contact Hospital</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Clinical Services Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-400">Clinical Focus Areas</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <Link to="/services/general-outpatient" className="hover:text-gold-400 transition-colors inline-block py-0.5">General Medical Consultation</Link>
              </li>
              <li>
                <Link to="/services/obstetrics-gynaecology" className="hover:text-gold-400 transition-colors inline-block py-0.5">Obstetrics & Gynaecology</Link>
              </li>
              <li>
                <Link to="/services/paediatrics" className="hover:text-gold-400 transition-colors inline-block py-0.5">Paediatrics Care</Link>
              </li>
              <li>
                <Link to="/services/surgery" className="hover:text-gold-400 transition-colors inline-block py-0.5">Surgical Procedures</Link>
              </li>
              <li>
                <Link to="/services/health-education-counseling" className="hover:text-gold-400 transition-colors inline-block py-0.5">Health Education & Counselling</Link>
              </li>
              <li>
                <Link to="/services/laboratory-diagnostic" className="hover:text-gold-400 transition-colors inline-block py-0.5">Laboratory & Diagnostics</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-gold-400">Contact & Address</h4>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <div className="flex flex-wrap gap-1 font-semibold text-white">
                  <a href={phoneLink1} className="hover:text-gold-400 transition-colors">{settings.phone_primary}</a>
                  <span>/</span>
                  <a href={phoneLink2} className="hover:text-gold-400 transition-colors">{settings.phone_secondary}</a>
                </div>
              </div>
            </div>

            {/* Staff CMS Portal Access */}
            <div className="pt-3 border-t border-navy-600/80">
              <Link 
                to="/admin/login" 
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-400 hover:text-gold-400 transition-colors"
              >
                <Lock className="w-3 h-3 text-gold-400" /> Staff CMS Portal Access
              </Link>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Links */}
      <div className="border-t border-navy-600 bg-navy-600/50 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div className="space-y-1">
            <p>© {new Date().getFullYear()} Starlight Hospital — DEO MEDICE. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-400">Jajo, Ikorodu, Lagos, Nigeria.</p>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>

        </div>
      </div>

    </footer>
  );
};
