import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { Phone, Calendar, ArrowRight } from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = servicesData.find((s) => s.id === serviceId);

  const heroRef = useScrollReveal();
  const contentRef = useScrollReveal();

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  // Get other services for related links
  const otherServices = servicesData.filter(s => s.id !== serviceId).slice(0, 3);

  return (
    <div>

      {/* Hero — Parallax background with service image */}
      <section
        ref={heroRef}
        className="bg-parallax relative min-h-[40vh] md:min-h-[50vh] flex items-end"
        style={{ backgroundImage: `url('${service.image}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/40 to-navy-900/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 pb-12 pt-20 w-full">
          <div className="text-sm text-slate-300 mb-4 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white leading-snug max-w-2xl">
            {service.heroHeading || service.title}
          </h1>
          <p className="text-slate-200 text-base mt-3 max-w-xl">{service.shortDesc}</p>
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Main Content */}
          <div className="md:col-span-8 space-y-10">
            {/* About the service */}
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-navy-500">About This Service</h2>
              <p className="text-slate-600 text-base leading-relaxed">{service.description}</p>
            </div>

            {/* What to Expect */}
            {service.whatToExpect && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-navy-500">What to Expect</h3>
                <p className="text-slate-600 text-base leading-relaxed">{service.whatToExpect}</p>
              </div>
            )}

            {/* Who It Is For */}
            {service.whoItIsFor && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-navy-500">Who This Is For</h3>
                <p className="text-slate-600 text-base leading-relaxed">{service.whoItIsFor}</p>
              </div>
            )}

            {/* Preparation Guidance */}
            {service.beforeYourVisit && service.beforeYourVisit.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-navy-500">Preparation Guidance</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-base">
                  {service.beforeYourVisit.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-5 pt-6 border-t border-slate-100">
                <h2 className="text-xl font-semibold text-navy-500">Frequently Asked Questions</h2>
                <div className="space-y-5">
                  {service.faqs.map((faq, i) => (
                    <div key={i} className="space-y-1.5">
                      <h4 className="font-semibold text-navy-500 text-sm">{faq.question}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4">
            <div className="sticky top-24 space-y-5 p-6 rounded-xl border border-slate-100 bg-slate-50/80">
              <h3 className="text-lg font-semibold text-navy-500">Book a Consultation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Request an appointment for {service.title} at Starlight Hospital.
              </p>
              <div className="space-y-2.5">
                <Link to="/appointment" className="w-full btn-teal text-sm flex justify-center">
                  <Calendar className="w-4 h-4" /> Request Appointment
                </Link>
                <a href="tel:08053587646" className="w-full btn-outline text-sm flex justify-center">
                  <Phone className="w-4 h-4" /> Call 08053587646
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Related Services */}
        {otherServices.length > 0 && (
          <div className="mt-16 pt-10 border-t border-slate-100">
            <h2 className="text-xl font-semibold text-navy-500 mb-6">Other Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherServices.map(s => (
                <Link key={s.id} to={`/services/${s.id}`} className="group p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all">
                  <h3 className="text-sm font-semibold text-navy-500 group-hover:text-teal-600 transition-colors mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{s.shortDesc}</p>
                  <span className="text-xs font-medium text-teal-600 flex items-center gap-1 mt-2 group-hover:gap-2 transition-all">
                    View service <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
