import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope, ArrowRight, Calendar, Phone } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-8 h-8 text-teal-500" />;
      case 'HeartPulse': return <HeartPulse className="w-8 h-8 text-teal-500" />;
      case 'Baby': return <Baby className="w-8 h-8 text-teal-500" />;
      case 'Activity': return <Activity className="w-8 h-8 text-teal-500" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-8 h-8 text-teal-500" />;
      case 'Microscope': return <Microscope className="w-8 h-8 text-teal-500" />;
      default: return <Stethoscope className="w-8 h-8 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold-500 font-bold text-xs tracking-wider uppercase border border-white/20">
            STARLIGHT HOSPITAL SERVICES
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
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
              className="bg-white rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md">
                    {getServiceIcon(service.iconName)}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-navy-500 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 mt-4 border-t border-slate-100">
                <Link
                  to={`/services/${service.id}`}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 group-hover:bg-teal-500 group-hover:text-white font-bold text-sm text-teal-600 transition-all"
                >
                  <span>View Service</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Need Guidance on Which Service to Choose?
          </h2>
          <p className="text-slate-300 text-base max-w-2xl mx-auto">
            Contact Starlight Hospital directly by phone or request an outpatient consultation to discuss your health concern.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
            </Link>
            <a
              href="tel:08053587646"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-500" /> CALL 08053587646
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
