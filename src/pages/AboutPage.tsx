import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, Calendar, CheckCircle2, UserCheck, Heart, User, Sparkles, 
  HelpCircle, ArrowRight 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gold-500 font-bold text-xs tracking-wider uppercase border border-white/20">
            DEO MEDICE • STARLIGHT HOSPITAL
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
            About Starlight Hospital
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Local healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.
          </p>
        </div>
      </section>

      {/* Hospital Story & Profile */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">OUR PROFILE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
                Hospital Story & Background
              </h2>
            </div>
            
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
              Starlight Hospital is a healthcare facility serving the Jajo, Ikorodu community with a range of clinical, diagnostic, counselling, and health education services. Our service offering is built around common healthcare needs across different stages of life — from general medical consultations and child health to women’s health, surgery, diagnostics, and health education.
            </p>

            <div className="bg-gold-50 border-l-4 border-gold-500 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-gold-700 font-bold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> MOTTO BRANDING
              </div>
              <p className="text-slate-800 text-sm md:text-base italic leading-relaxed">
                Starlight Hospital’s motto, <strong className="text-navy-500">DEO MEDICE</strong>, reflects the hospital’s identity and appears consistently across our care facility, communications, and service approach.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                alt="Starlight Hospital consultation room in Jajo Ikorodu"
                className="w-full h-[360px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent p-6 flex items-end">
                <div className="text-white space-y-1">
                  <h4 className="font-bold text-lg">Starlight Hospital</h4>
                  <p className="text-xs text-slate-300">Jajo, Ikorodu, Lagos</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What We Do */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">CORE SERVICES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
            What We Do
          </h2>
          <p className="text-slate-600 text-base">
            Our comprehensive outpatient and clinical care structure supports individuals and families across key healthcare areas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'General Outpatient / Medical Consultation', desc: 'Consultations, assessment of common health concerns, and guidance on appropriate next steps.' },
            { title: 'Obstetrics & Gynaecology', desc: 'Women’s health and pregnancy-related consultation and care.' },
            { title: 'Paediatric Services', desc: 'Children and young patients requiring healthcare assessment, treatment, and follow-up.' },
            { title: 'Surgical Services', desc: 'Patients who may require surgical assessment, planning, treatment, or follow-up.' },
            { title: 'Health Education & Counseling', desc: 'Practical health information, preventive guidance, and counselling support.' },
            { title: 'Laboratory & Diagnostic Services', desc: 'Laboratory and diagnostic support that assists clinical assessment.' }
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-card space-y-3">
              <div className="w-10 h-10 rounded-lg bg-navy-500 text-gold-500 flex items-center justify-center font-bold text-sm">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-navy-500">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Care Approach */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">PATIENT-FIRST METHODOLOGY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
              Our Care Approach
            </h2>
            <p className="text-slate-600 text-base">
              At Starlight Hospital, we maintain a clear 4-step consultation and care framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '1. Listen First', desc: 'Understand the patient’s concern and relevant medical history thoroughly.', icon: <HelpCircle className="w-6 h-6 text-teal-500" /> },
              { title: '2. Assess', desc: 'Support appropriate clinical evaluation and diagnostic work-up.', icon: <ShieldCheck className="w-6 h-6 text-teal-500" /> },
              { title: '3. Explain', desc: 'Communicate next steps in language patients and caregivers can easily understand.', icon: <UserCheck className="w-6 h-6 text-teal-500" /> },
              { title: '4. Support', desc: 'Provide follow-up care and health education guidance where applicable.', icon: <Heart className="w-6 h-6 text-teal-500" /> }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-500">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-gold-500 font-bold text-xs uppercase tracking-wider">COMMUNITY FOCUS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Who We Serve
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              Individuals, parents, children, women, families, and community members seeking accessible, trustworthy healthcare services in and around Jajo and Ikorodu, Lagos.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/appointment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
            </Link>
            <a
              href="tel:08053587646"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-500" /> CALL 08053587646
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
