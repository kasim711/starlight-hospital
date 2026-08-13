import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope, ArrowRight, Calendar, Phone } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      case 'HeartPulse': return <HeartPulse className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      case 'Baby': return <Baby className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      case 'Activity': return <Activity className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      case 'Microscope': return <Microscope className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
      default: return <Stethoscope className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="badge-gold">
            STARLIGHT HOSPITAL SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Our Healthcare Services
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Explore Starlight Hospital’s core services and find the right place to start for your healthcare need in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="healthcare-card overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 flex items-center justify-center shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-extrabold text-navy-500 group-hover:text-teal-600 transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 border-t border-slate-100">
                <Link
                  to={`/services/${service.id}`}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 group-hover:bg-teal-500 group-hover:text-white font-bold text-xs uppercase tracking-wider text-teal-600 transition-all shadow-sm"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-navy-600">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Need Guidance on Which Service to Choose?
          </h2>
          <p className="text-slate-200 text-base max-w-2xl mx-auto font-normal">
            Contact Starlight Hospital directly by phone or request an outpatient consultation to discuss your health concern.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/appointment"
              className="btn-teal text-xs uppercase tracking-wider"
            >
              <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
            </Link>
            <a
              href="tel:08053587646"
              className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 text-xs uppercase tracking-wider"
            >
              <Phone className="w-4 h-4 text-gold-400" /> CALL 08053587646
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
