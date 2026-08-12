import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Menu, X, Shield, ChevronDown } from 'lucide-react';
import { fetchServices } from '../services/api';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: string }>({
    hospital_name: 'Starlight Hospital',
    motto: 'DEO MEDICE',
    phone_primary: '08053587646',
    phone_secondary: '07079333090',
    address: 'Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.'
  });
  const location = useLocation();

  useEffect(() => {
    // Fetch dynamic site settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(d => {
        if (d.settings) setSettings(prev => ({ ...prev, ...d.settings }));
      })
      .catch(err => console.error(err));

    // Fetch dynamic services
    fetchServices()
      .then(d => {
        if (d.services) setServicesList(d.services);
      })
      .catch(err => console.error(err));
  }, []);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const phoneLink1 = `tel:${settings.phone_primary.replace(/\s+/g, '')}`;
  const phoneLink2 = `tel:${settings.phone_secondary.replace(/\s+/g, '')}`;

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 font-sans shadow-subtle">
      
      {/* Top Utility & Emergency Bar */}
      <div className="bg-navy-500 text-white text-xs py-2 px-4 border-b border-navy-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              <span className="truncate max-w-xs sm:max-w-md">{settings.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Contact Hospital:</span>
              <a href={phoneLink1} className="font-bold text-white hover:text-gold-500 transition-colors">
                {settings.phone_primary}
              </a>
              <span className="text-slate-400">|</span>
              <a href={phoneLink2} className="font-bold text-white hover:text-gold-500 transition-colors">
                {settings.phone_secondary}
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Hospital Motto */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-navy-500 to-teal-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Shield className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-navy-500 tracking-tight">{settings.hospital_name}</span>
              </div>
              <span className="text-[11px] font-bold text-gold-600 tracking-widest block uppercase font-mono">
                {settings.motto}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <Link to="/" className={`hover:text-teal-600 transition-colors ${location.pathname === '/' ? 'text-teal-600 font-bold' : ''}`}>
              Home
            </Link>

            <Link to="/about" className={`hover:text-teal-600 transition-colors ${location.pathname === '/about' ? 'text-teal-600 font-bold' : ''}`}>
              About Starlight
            </Link>

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <Link to="/services" className={`flex items-center gap-1 hover:text-teal-600 transition-colors py-2 ${location.pathname.startsWith('/services') ? 'text-teal-600 font-bold' : ''}`}>
                Services <ChevronDown className="w-4 h-4" />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 font-sans">
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Clinical Services
                  </div>
                  {servicesList.map((service) => (
                    <Link
                      key={service.service_id}
                      to={`/services/${service.service_id}`}
                      onClick={closeMenus}
                      className="block px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                    >
                      {service.title}
                    </Link>
                  ))}
                  <div className="border-t border-slate-100 mt-2 pt-2 px-4">
                    <Link to="/services" onClick={closeMenus} className="text-xs font-bold text-teal-600 hover:underline">
                      View All Services Overview →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/health-information" className={`hover:text-teal-600 transition-colors ${location.pathname.startsWith('/health-information') ? 'text-teal-600 font-bold' : ''}`}>
              Health Information
            </Link>

            <Link to="/contact" className={`hover:text-teal-600 transition-colors ${location.pathname === '/contact' ? 'text-teal-600 font-bold' : ''}`}>
              Contact
            </Link>
          </nav>

          {/* Action Call & Appointment Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={phoneLink1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-navy-500/20 text-navy-500 text-xs font-bold hover:bg-navy-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" /> {settings.phone_primary}
            </a>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-sm"
            >
              Request Appointment
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 font-sans">
          <Link to="/" onClick={closeMenus} className="block py-2 text-sm font-bold text-slate-800">Home</Link>
          <Link to="/about" onClick={closeMenus} className="block py-2 text-sm font-bold text-slate-800">About Starlight</Link>
          
          <div className="py-2 space-y-1">
            <span className="block text-xs font-bold text-slate-400 uppercase">Services</span>
            <Link to="/services" onClick={closeMenus} className="block pl-3 py-1.5 text-xs font-semibold text-teal-700">Services Overview</Link>
            {servicesList.map((service) => (
              <Link key={service.service_id} to={`/services/${service.service_id}`} onClick={closeMenus} className="block pl-3 py-1.5 text-xs font-medium text-slate-600">
                {service.title}
              </Link>
            ))}
          </div>

          <Link to="/health-information" onClick={closeMenus} className="block py-2 text-sm font-bold text-slate-800">Health Information</Link>
          <Link to="/contact" onClick={closeMenus} className="block py-2 text-sm font-bold text-slate-800">Contact</Link>
          
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link to="/appointment" onClick={closeMenus} className="w-full text-center py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase">
              Request Appointment
            </Link>
            <a href={phoneLink1} className="w-full text-center py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-navy-500">
              Call {settings.phone_primary}
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
