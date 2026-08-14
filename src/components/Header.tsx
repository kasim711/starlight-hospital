import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { fetchServices } from '../services/api';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [settings, setSettings] = useState<{ [key: string]: string }>({
    hospital_name: 'Starlight Hospital',
    motto: 'DEO MEDICE',
    phone_primary: '08053587646',
  });
  const location = window.location;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    fetch('/api/settings')
      .then(res => res.json())
      .then(d => { if (d.settings) setSettings(prev => ({ ...prev, ...d.settings })); })
      .catch(() => {});

    fetchServices()
      .then(d => { if (d.services) setServicesList(d.services); })
      .catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => { setIsMobileMenuOpen(false); setIsServicesOpen(false); };
  const phoneLink = `tel:${settings.phone_primary.replace(/\s+/g, '')}`;
  const pathname = window.location.pathname;

  const isActive = (path: string, exact = true) => 
    exact ? pathname === path : pathname.startsWith(path);

  return (
    <header className={`w-full sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'nav-shadow' : 'border-b border-slate-100'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-3">
            <img src="/starlight-logo.png" alt="Starlight Hospital" className="w-10 h-10 object-contain flex-shrink-0" />
            <div className="hidden sm:block">
              <span className="text-lg font-semibold text-navy-500 block leading-tight">{settings.hospital_name}</span>
              <span className="text-[10px] font-medium text-gold-600 tracking-widest uppercase">{settings.motto}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {[
              { to: '/', label: 'Home', exact: true },
              { to: '/about', label: 'About', exact: true },
            ].map(link => (
              <Link key={link.to} to={link.to} className={`text-sm transition-colors ${isActive(link.to, link.exact) ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-navy-500 font-medium'}`}>
                {link.label}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative" onMouseEnter={() => setIsServicesOpen(true)} onMouseLeave={() => setIsServicesOpen(false)}>
              <Link to="/services" className={`text-sm flex items-center gap-1 transition-colors ${isActive('/services', false) ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-navy-500 font-medium'}`}>
                Services <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </Link>
              {isServicesOpen && (
                <div className="absolute top-full left-0 pt-2">
                  <div className="w-64 bg-white rounded-lg shadow-lg border border-slate-100 py-1.5">
                    {servicesList.map((s) => (
                      <Link key={s.service_id} to={`/services/${s.service_id}`} onClick={closeMenus}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-500 transition-colors">
                        {s.title}
                      </Link>
                    ))}
                    <div className="border-t border-slate-50 mt-1 pt-1.5 px-4">
                      <Link to="/services" onClick={closeMenus} className="text-xs font-medium text-teal-600 hover:text-navy-500 flex items-center gap-1">
                        All Services <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {[
              { to: '/health-information', label: 'Health Information', exact: false },
              { to: '/contact', label: 'Contact', exact: true },
            ].map(link => (
              <Link key={link.to} to={link.to} className={`text-sm transition-colors ${isActive(link.to, link.exact) ? 'text-teal-600 font-semibold' : 'text-slate-600 hover:text-navy-500 font-medium'}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={phoneLink} className="text-sm font-medium text-navy-500 hover:text-teal-600 transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" /> Call Now
            </a>
            <Link to="/appointment" className="btn-teal text-xs px-5 py-2.5">
              Request Appointment
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50"
            aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 pb-6 pt-3">
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About' },
            { to: '/services', label: 'Services' },
            { to: '/health-information', label: 'Health Information' },
            { to: '/contact', label: 'Contact' },
          ].map(item => (
            <Link key={item.to} to={item.to} onClick={closeMenus}
              className="block py-2.5 text-base text-slate-700 font-medium">
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 space-y-2.5 mt-2">
            <Link to="/appointment" onClick={closeMenus} className="block w-full btn-teal text-center text-sm">
              Request Appointment
            </Link>
            <a href={phoneLink} className="block w-full btn-outline text-center text-sm">
              <Phone className="w-4 h-4" /> Call 08053587646
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
