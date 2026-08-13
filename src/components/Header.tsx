import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, Shield, ChevronDown, Stethoscope, ArrowRight } from 'lucide-react';
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
    phone_secondary: '07079333090',
    address: 'Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.'
  });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

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

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const phoneLink1 = `tel:${settings.phone_primary.replace(/\s+/g, '')}`;
  const phoneLink2 = `tel:${settings.phone_secondary.replace(/\s+/g, '')}`;

  return (
    <header className={`w-full sticky top-0 z-50 font-sans transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80' : 'bg-white border-b border-slate-200'
    }`}>
      
      {/* Top Utility & Emergency Bar */}
      <div className="bg-navy-500 text-white text-xs py-2 px-4 border-b border-navy-600/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start">
            <span className="font-medium text-slate-200 flex items-center gap-1.5 text-[11px] sm:text-xs">
              <MapPin className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
              <span className="truncate max-w-xs sm:max-w-lg">{settings.address}</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-normal hidden md:inline">Contact Hospital:</span>
              <a href={phoneLink1} className="font-bold text-white hover:text-gold-400 transition-colors flex items-center gap-1">
                <Phone className="w-3 h-3 text-gold-500 sm:hidden" /> {settings.phone_primary}
              </a>
              <span className="text-slate-400">|</span>
              <a href={phoneLink2} className="font-bold text-white hover:text-gold-400 transition-colors">
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
            <div className="w-11 h-11 rounded-2xl bg-navy-500 text-white flex items-center justify-center shadow-md group-hover:bg-navy-600 transition-colors border border-navy-600">
              <Shield className="w-6 h-6 text-gold-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-navy-500 tracking-tight">{settings.hospital_name}</span>
              </div>
              <span className="text-[11px] font-extrabold text-gold-600 tracking-widest block uppercase font-mono">
                {settings.motto}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link 
              to="/" 
              className={`relative py-2 transition-colors hover:text-teal-600 ${
                location.pathname === '/' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Home
              {location.pathname === '/' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
              )}
            </Link>

            <Link 
              to="/about" 
              className={`relative py-2 transition-colors hover:text-teal-600 ${
                location.pathname === '/about' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              About Starlight
              {location.pathname === '/about' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
              )}
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative py-2" 
              onMouseEnter={() => setIsServicesOpen(true)} 
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <Link 
                to="/services" 
                className={`flex items-center gap-1.5 transition-colors hover:text-teal-600 ${
                  location.pathname.startsWith('/services') ? 'text-teal-600 font-bold' : ''
                }`}
              >
                Services <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180 text-teal-600' : ''}`} />
              </Link>

              {isServicesOpen && (
                <div className="absolute top-full left-0 w-84 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-3 z-50 font-sans animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                    <span>Clinical Services</span>
                    <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                  </div>
                  <div className="py-1">
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
                  </div>
                  <div className="border-t border-slate-100 mt-1 pt-2.5 px-4">
                    <Link 
                      to="/services" 
                      onClick={closeMenus} 
                      className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-navy-500 transition-colors"
                    >
                      View All Services Catalog <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/health-information" 
              className={`relative py-2 transition-colors hover:text-teal-600 ${
                location.pathname.startsWith('/health-information') ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Health Information
              {location.pathname.startsWith('/health-information') && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
              )}
            </Link>

            <Link 
              to="/contact" 
              className={`relative py-2 transition-colors hover:text-teal-600 ${
                location.pathname === '/contact' ? 'text-teal-600 font-bold' : ''
              }`}
            >
              Contact
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 rounded-full" />
              )}
            </Link>
          </nav>

          {/* Action Call & Appointment Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={phoneLink1}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-navy-500 text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-600" /> {settings.phone_primary}
            </a>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 active:scale-[0.99] transition-all shadow-md hover:shadow-lg"
            >
              Request Appointment
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 pt-3 pb-7 space-y-4 font-sans animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <Link 
            to="/" 
            onClick={closeMenus} 
            className={`block py-2 text-base font-bold ${location.pathname === '/' ? 'text-teal-600' : 'text-slate-800'}`}
          >
            Home
          </Link>
          
          <Link 
            to="/about" 
            onClick={closeMenus} 
            className={`block py-2 text-base font-bold ${location.pathname === '/about' ? 'text-teal-600' : 'text-slate-800'}`}
          >
            About Starlight
          </Link>
          
          <div className="py-2 space-y-2 border-y border-slate-100">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Clinical Services</span>
              <Stethoscope className="w-4 h-4 text-teal-600" />
            </div>
            <Link to="/services" onClick={closeMenus} className="block pl-2 py-1.5 text-xs font-bold text-teal-700">
              View All Services Overview →
            </Link>
            {servicesList.map((service) => (
              <Link 
                key={service.service_id} 
                to={`/services/${service.service_id}`} 
                onClick={closeMenus} 
                className="block pl-2 py-1.5 text-xs font-semibold text-slate-700 hover:text-teal-600"
              >
                {service.title}
              </Link>
            ))}
          </div>

          <Link 
            to="/health-information" 
            onClick={closeMenus} 
            className={`block py-2 text-base font-bold ${location.pathname.startsWith('/health-information') ? 'text-teal-600' : 'text-slate-800'}`}
          >
            Health Information
          </Link>
          
          <Link 
            to="/contact" 
            onClick={closeMenus} 
            className={`block py-2 text-base font-bold ${location.pathname === '/contact' ? 'text-teal-600' : 'text-slate-800'}`}
          >
            Contact
          </Link>
          
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link 
              to="/appointment" 
              onClick={closeMenus} 
              className="w-full text-center py-3.5 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-teal-600 transition-colors"
            >
              Request Appointment
            </Link>
            <a 
              href={phoneLink1} 
              className="w-full text-center py-3 rounded-xl border border-slate-300 font-bold text-xs text-navy-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-teal-600" /> Call {settings.phone_primary}
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
