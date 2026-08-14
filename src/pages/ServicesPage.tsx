import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope, Calendar, Phone, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ServicesPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-teal-600" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5 text-teal-600" />;
      case 'Baby': return <Baby className="w-5 h-5 text-teal-600" />;
      case 'Activity': return <Activity className="w-5 h-5 text-teal-600" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-5 h-5 text-teal-600" />;
      case 'Microscope': return <Microscope className="w-5 h-5 text-teal-600" />;
      default: return <Stethoscope className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="font-sans bg-white pb-20">
      {/* Hero Header */}
      <section ref={heroRef} className="bg-white py-20 lg:py-32 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Services</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-500 tracking-tight">
            Our Healthcare Services
          </h1>
          <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore Starlight Hospital’s core services and find the right place to start for your healthcare needs in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* Services Directory Grid */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="reveal-stagger-item bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-6">
                {getServiceIcon(service.iconName)}
              </div>

              <div className="flex flex-col flex-grow space-y-3">
                <h3 className="text-base font-semibold text-navy-500 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-1">
                  {service.shortDesc}
                </p>
                <div className="pt-4 mt-auto">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-sm text-teal-600 group-hover:gap-2 transition-all"
                  >
                    View service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="max-w-4xl mx-auto px-4 text-center space-y-8 py-20 lg:py-32 bg-slate-50 rounded-2xl">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-navy-500 tracking-tight">
            Need Guidance?
          </h2>
          <p className="text-slate-600 text-base max-w-xl mx-auto">
            Not sure which service is right for you? Contact Starlight Hospital to discuss your health concern.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/appointment" className="btn-teal text-xs uppercase tracking-widest">
            <Calendar className="w-4 h-4 mr-2 inline" /> Request Appointment
          </Link>
          <a href="tel:08053587646" className="btn-outline text-xs uppercase tracking-widest">
            <Phone className="w-4 h-4 mr-2 inline" /> Call 08053587646
          </a>
        </div>
      </section>
    </div>
  );
};
