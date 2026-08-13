import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, Phone, Calendar, CheckCircle2, UserCheck, Heart, Sparkles, 
  HelpCircle, ArrowRight, MapPin, Award, Activity, Users
} from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const profileRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const approachRef = useScrollReveal();
  const serveRef = useScrollReveal();

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Hero Header */}
      <section ref={heroRef} className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-400 text-xs font-extrabold tracking-wider uppercase backdrop-blur-md shadow-sm">
            <img src="/starlight-logo.png" alt="Starlight Logo" className="w-5 h-5 object-contain bg-white rounded-full p-0.5" />
            DEO MEDICE • STARLIGHT HOSPITAL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About Starlight Hospital
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Local healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.
          </p>
        </div>
      </section>

      {/* Hospital Story & Profile */}
      <section ref={profileRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="badge-teal">OUR PROFILE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Hospital Story & Background
              </h2>
            </div>
            
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              Starlight Hospital is a healthcare facility serving the Jajo, Ikorodu community with a range of clinical, diagnostic, counselling, and health education services. Our service offering is built around common healthcare needs across different stages of life — from general medical consultations and child health to women’s health, surgery, diagnostics, and health education.
            </p>

            <div className="bg-gold-50/80 border-l-4 border-gold-500 p-5 rounded-r-2xl space-y-2 shadow-sm">
              <div className="flex items-center gap-2 text-gold-700 font-bold text-xs uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-gold-600" /> MOTTO BRANDING
              </div>
              <p className="text-slate-800 text-sm md:text-base italic leading-relaxed">
                Starlight Hospital’s motto, <strong className="text-navy-500 font-bold">DEO MEDICE</strong>, reflects the hospital’s identity and appears consistently across our care facility, communications, and service approach.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 group">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                alt="Starlight Hospital consultation room in Jajo Ikorodu"
                aspectRatio="h-[380px]"
                containerClassName="rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent p-6 flex items-end">
                <div className="text-white space-y-1">
                  <h4 className="font-extrabold text-lg">Starlight Hospital Facility</h4>
                  <p className="text-xs text-slate-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" /> Jajo, Ikorodu, Lagos
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What We Do */}
      <section ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="badge-navy">CORE CLINICAL SERVICES</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
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
            <div key={i} className="reveal-stagger-item healthcare-card p-6 space-y-3 hover-lift">
              <div className="w-10 h-10 rounded-xl bg-navy-500 text-gold-400 flex items-center justify-center font-bold text-xs font-mono shadow-sm">
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-navy-500">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Care Approach */}
      <section ref={approachRef} className="bg-slate-100/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="badge-teal">PATIENT-FIRST METHODOLOGY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
              Our Care Approach
            </h2>
            <p className="text-slate-600 text-base">
              At Starlight Hospital, we maintain a clear 4-step consultation and care framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: '1. Listen First', desc: 'Understand the patient’s concern and relevant medical history thoroughly.', icon: <HelpCircle className="w-6 h-6 text-teal-600" /> },
              { title: '2. Assess', desc: 'Support appropriate clinical evaluation and diagnostic work-up.', icon: <ShieldCheck className="w-6 h-6 text-teal-600" /> },
              { title: '3. Explain', desc: 'Communicate next steps in language patients and caregivers can easily understand.', icon: <UserCheck className="w-6 h-6 text-teal-600" /> },
              { title: '4. Support', desc: 'Provide follow-up care and health education guidance where applicable.', icon: <Heart className="w-6 h-6 text-teal-600" /> }
            ].map((step, idx) => (
              <div key={idx} className="reveal-stagger-item bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover-lift">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-500">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section ref={serveRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-navy-600">
          <div className="lg:col-span-8 space-y-4">
            <span className="badge-gold">COMMUNITY FOCUS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Who We Serve
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Individuals, parents, children, women, families, and community members seeking accessible, trustworthy healthcare services in and around Jajo and Ikorodu, Lagos.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
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
