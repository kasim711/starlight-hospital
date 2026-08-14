import React from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope, Calendar, Phone, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { HealthcareImage } from '../components/HealthcareImage';

export const ServicesPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const gridRef = useScrollReveal();
  const parallaxRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-4 h-4 text-teal-600" />;
      case 'HeartPulse': return <HeartPulse className="w-4 h-4 text-teal-600" />;
      case 'Baby': return <Baby className="w-4 h-4 text-teal-600" />;
      case 'Activity': return <Activity className="w-4 h-4 text-teal-600" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-4 h-4 text-teal-600" />;
      case 'Microscope': return <Microscope className="w-4 h-4 text-teal-600" />;
      default: return <Stethoscope className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div>
      
      {/* Hero Header with Parallax Background */}
      <section 
        ref={heroRef} 
        className="bg-parallax relative min-h-[38vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Clinical Focus Areas</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Our Healthcare Services
          </h1>
          <p className="text-slate-200 text-base max-w-xl mx-auto leading-relaxed">
            Explore Starlight Hospital’s core services and find the right place to start for your healthcare needs in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* Services Directory Grid — Visually Rich Cards with Thumbnails */}
      <section ref={gridRef} className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Comprehensive Clinical Care</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">Core Services Catalog</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className="reveal-stagger-item group bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="h-44 img-hover-zoom relative overflow-hidden">
                <HealthcareImage
                  src={service.image}
                  alt={service.title}
                  aspectRatio="h-full w-full"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-base font-semibold text-navy-500 group-hover:text-teal-600 transition-colors mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>
                <span className="text-xs font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all pt-1">
                  View service details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Parallax Visual Break */}
      <section
        ref={parallaxRef}
        className="bg-parallax relative min-h-[42vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/65"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 text-center py-14 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">STARLIGHT HOSPITAL • JAJO, IKORODU</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white">
            Dedicated Patient Care & Consultation
          </h2>
          <p className="text-slate-200 text-sm max-w-lg mx-auto">
            Our clinicians provide clear, respectful guidance to help you navigate your health decisions.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="bg-slate-50/70 py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-5 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Need Guidance?</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">
              Contact Starlight Hospital directly to discuss your health concern and get directed to the appropriate care pathway.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/appointment" className="btn-teal text-sm">
              <Calendar className="w-4 h-4" /> Request Appointment
            </Link>
            <a href="tel:08053587646" className="btn-outline text-sm">
              <Phone className="w-4 h-4 text-teal-600" /> Call 08053587646
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
