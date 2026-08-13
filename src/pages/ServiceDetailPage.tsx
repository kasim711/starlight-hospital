import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { servicesData } from '../data/services';
import { 
  Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope, 
  CheckCircle2, HelpCircle, Phone, Calendar, ArrowLeft, ShieldCheck 
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = servicesData.find((s) => s.id === serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-7 h-7 text-teal-600" />;
      case 'HeartPulse': return <HeartPulse className="w-7 h-7 text-teal-600" />;
      case 'Baby': return <Baby className="w-7 h-7 text-teal-600" />;
      case 'Activity': return <Activity className="w-7 h-7 text-teal-600" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-7 h-7 text-teal-600" />;
      case 'Microscope': return <Microscope className="w-7 h-7 text-teal-600" />;
      default: return <Stethoscope className="w-7 h-7 text-teal-600" />;
    }
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 relative z-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white transition-colors mb-2 uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services Catalog
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-sm">
              {getServiceIcon(service.iconName)}
            </div>
            <span className="badge-gold">
              STARLIGHT HOSPITAL SERVICE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {service.heroHeading}
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl font-normal leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Service Content Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Copy Area */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Service Overview */}
            <div className="healthcare-card p-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-500 flex items-center gap-2.5 tracking-tight">
                <ShieldCheck className="w-6 h-6 text-teal-600" /> About This Service
              </h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed font-normal">
                {service.description}
              </p>
            </div>

            {/* What to Expect */}
            <div className="healthcare-card p-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">What to Expect</h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed font-normal">
                {service.whatToExpect}
              </p>
            </div>

            {/* Who This Service May Be For */}
            <div className="healthcare-card p-8 space-y-4">
              <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">Who This Service May Be For</h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed font-normal">
                {service.whoItIsFor}
              </p>
            </div>

            {/* Before Your Visit */}
            <div className="bg-teal-50/70 rounded-3xl p-8 border border-teal-200/80 space-y-4 shadow-sm">
              <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">Before Your Visit</h2>
              <ul className="space-y-3">
                {service.beforeYourVisit.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-800 text-base font-medium">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="healthcare-card p-8 space-y-6">
                <h2 className="text-2xl font-extrabold text-navy-500 flex items-center gap-2.5 tracking-tight">
                  <HelpCircle className="w-6 h-6 text-teal-600" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                      <h4 className="font-extrabold text-navy-500 text-base">{faq.question}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed font-normal">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-navy-500 text-white rounded-3xl p-8 border border-navy-600 shadow-xl space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-bold shadow-md">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-white tracking-tight">Need an Appointment?</h3>
                <p className="text-slate-200 text-sm leading-relaxed font-normal">
                  Request an appointment for {service.title} at Starlight Hospital in Jajo, Ikorodu.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/appointment"
                  className="w-full btn-teal text-xs uppercase tracking-wider"
                >
                  <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
                </Link>

                <a
                  href="tel:08053587646"
                  className="w-full btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-gold-400" /> CALL 08053587646
                </a>

                <a
                  href="tel:07079333090"
                  className="w-full btn-secondary bg-transparent text-slate-300 hover:text-white hover:bg-white/10 border-white/20 text-xs uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4 text-gold-400" /> CALL 07079333090
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
