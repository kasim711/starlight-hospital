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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Services Overview
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              {getServiceIcon(service.iconName)}
            </div>
            <span className="text-gold-500 font-bold text-xs uppercase tracking-widest">
              STARLIGHT HOSPITAL SERVICE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
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
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
              <h2 className="text-2xl font-bold text-navy-500 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-teal-500" /> About This Service
              </h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* What to Expect */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
              <h2 className="text-2xl font-bold text-navy-500">What to Expect</h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                {service.whatToExpect}
              </p>
            </div>

            {/* Who This Service May Be For */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-4">
              <h2 className="text-2xl font-bold text-navy-500">Who This Service May Be For</h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed">
                {service.whoItIsFor}
              </p>
            </div>

            {/* Before Your Visit */}
            <div className="bg-teal-50/70 rounded-3xl p-8 border border-teal-200 space-y-4">
              <h2 className="text-2xl font-bold text-navy-500">Before Your Visit</h2>
              <ul className="space-y-3">
                {service.beforeYourVisit.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-800 text-base">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
                <h2 className="text-2xl font-bold text-navy-500 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-teal-500" /> Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                      <h4 className="font-bold text-navy-500 text-base">{faq.question}</h4>
                      <p className="text-slate-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 bg-navy-500 text-white rounded-3xl p-8 border border-navy-600 shadow-xl space-y-6">
              <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">Need an Appointment?</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Request an appointment for {service.title} at Starlight Hospital in Jajo, Ikorodu.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/appointment"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-md"
                >
                  <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
                </Link>

                <a
                  href="tel:08053587646"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" /> CALL 08053587646
                </a>

                <a
                  href="tel:07079333090"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-white/20 text-slate-300 font-bold text-sm hover:bg-white/5 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-500" /> CALL 07079333090
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
