import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { 
  Phone, Calendar
} from 'lucide-react';
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

  return (
    <div className="font-sans bg-white pb-20">
      
      {/* Hero Header */}
      <section ref={heroRef} className="bg-white py-16 lg:py-24 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-6 flex justify-center items-center gap-2">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/services" className="hover:text-teal-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-teal-600">{service.title}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-500 tracking-tight">
            {service.heroHeading || service.title}
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {service.shortDesc}
          </p>
        </div>
      </section>

      {/* Service Content Container */}
      <section ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-16">
        
        {/* Large Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
          <HealthcareImage
            src={service.image}
            alt={service.title}
            aspectRatio="aspect-[16/9]"
            containerClassName="rounded-2xl"
          />
        </div>

        {/* Copy Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-8 space-y-12">
            {/* What the service covers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-navy-500 tracking-tight">
                About This Service
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What to Expect */}
            {service.whatToExpect && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-navy-500 tracking-tight">What to Expect</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.whatToExpect}
                </p>
              </div>
            )}
            
            {/* Who It Is For */}
            {service.whoItIsFor && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-navy-500 tracking-tight">Who This Is For</h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.whoItIsFor}
                </p>
              </div>
            )}

            {/* Preparation Guidance */}
            {service.beforeYourVisit && service.beforeYourVisit.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-navy-500 tracking-tight">Preparation Guidance</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-600 text-base">
                  {service.beforeYourVisit.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-6 pt-8 border-t border-slate-100">
                <h2 className="text-2xl font-semibold text-navy-500 tracking-tight">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-semibold text-navy-500 text-base">{faq.question}</h4>
                      <p className="text-slate-600 text-base leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-4">
            <div className="sticky top-24 space-y-6 p-6 rounded-2xl border border-slate-100 bg-slate-50">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-navy-500 tracking-tight">Book a Consultation</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Request an appointment for {service.title} at Starlight Hospital.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to="/appointment"
                  className="w-full btn-teal text-xs uppercase tracking-widest flex justify-center items-center"
                >
                  <Calendar className="w-4 h-4 mr-2" /> Request Appointment
                </Link>

                <a
                  href="tel:08053587646"
                  className="w-full btn-outline text-xs uppercase tracking-widest flex justify-center items-center"
                >
                  <Phone className="w-4 h-4 mr-2" /> Call Us
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
