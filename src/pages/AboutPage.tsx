import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, ShieldCheck, UserCheck, Heart, Calendar, Phone, ArrowRight, 
  Sparkles, MapPin, CheckCircle2
} from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const bannerRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const approachRef = useScrollReveal();
  const serveRef = useScrollReveal();

  return (
    <div className="font-sans">

      {/* 1. HERO HEADER */}
      <section ref={heroRef} className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-400 text-xs font-extrabold tracking-wider uppercase backdrop-blur-md">
            <img src="/starlight-logo.png" alt="Starlight Logo" className="w-5 h-5 object-contain bg-white rounded-full p-0.5" />
            DEO MEDICE • STARLIGHT HOSPITAL
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About Starlight Hospital
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto">
            Healthcare services for individuals and families in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* 2. HOSPITAL STORY — Image LEFT + Text RIGHT */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Large Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200"
                alt="Healthcare consultation at Starlight Hospital"
                aspectRatio="h-[400px] lg:h-[440px]"
                containerClassName="rounded-3xl"
              />
            </div>

            {/* Text Content */}
            <div className="space-y-5">
              <span className="badge-teal">OUR PROFILE</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Starlight Hospital
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Starlight Hospital serves the Jajo, Ikorodu community with clinical, diagnostic, counselling, and health education services across different stages of life.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                From general medical consultations to women's health, paediatrics, surgery, and diagnostics.
              </p>

              {/* DEO MEDICE motto box */}
              <div className="bg-gold-50/80 border-l-4 border-gold-500 p-4 rounded-r-xl">
                <div className="flex items-center gap-2 text-gold-700 font-bold text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-gold-600" /> DEO MEDICE
                </div>
                <p className="text-slate-700 text-sm leading-relaxed pt-1">
                  Our motto reflects the hospital's identity and commitment to patient care.
                </p>
              </div>

              <Link to="/contact" className="btn-primary text-xs uppercase tracking-wider">
                Contact Starlight Hospital <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VISUAL ANCHOR — Full-width dark banner with background image */}
      <section ref={bannerRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HealthcareImage
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1800"
            alt="Healthcare team"
            aspectRatio="h-full w-full"
          />
          <div className="absolute inset-0 bg-navy-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
          <div className="max-w-2xl mx-auto space-y-5">
            <span className="badge-gold">DEO MEDICE</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Healthcare Guided by Purpose
            </h2>
            <p className="text-slate-200 text-base sm:text-lg">
              Accessible, respectful, and patient-focused care for your family.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link to="/appointment" className="btn-teal text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" /> Request Appointment
              </Link>
              <a href="tel:08053587646" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4 text-gold-400" /> Call 08053587646
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLINICAL SERVICES — Compact cards */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="badge-navy">CORE SERVICES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
              What We Do
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'General Outpatient Consultation', desc: 'Medical assessment and guidance for everyday health concerns.' },
              { title: 'Obstetrics & Gynaecology', desc: 'Women\'s health, pregnancy, and gynaecological care.' },
              { title: 'Paediatric Services', desc: 'Healthcare for children and young patients.' },
              { title: 'Surgical Services', desc: 'Surgical assessment, planning, and follow-up care.' },
              { title: 'Health Education & Counseling', desc: 'Practical health information and counselling support.' },
              { title: 'Laboratory & Diagnostics', desc: 'Laboratory testing to support clinical assessment.' }
            ].map((item, i) => (
              <div key={i} className="reveal-stagger-item healthcare-card p-5 flex items-start gap-4 hover-lift">
                <div className="w-10 h-10 rounded-xl bg-navy-500 text-gold-400 flex items-center justify-center font-bold text-xs font-mono flex-shrink-0 shadow-sm">
                  0{i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-500 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CARE APPROACH — Text LEFT + Image RIGHT */}
      <section ref={approachRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <span className="badge-teal">PATIENT-FIRST APPROACH</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Our Care Approach
              </h2>

              <div className="space-y-5">
                {[
                  { icon: <HelpCircle className="w-5 h-5 text-teal-600" />, title: 'Listen First', desc: 'Understand the patient\'s concern and medical history.' },
                  { icon: <ShieldCheck className="w-5 h-5 text-teal-600" />, title: 'Assess', desc: 'Clinical evaluation and diagnostic work-up.' },
                  { icon: <UserCheck className="w-5 h-5 text-teal-600" />, title: 'Explain', desc: 'Clear communication of findings and next steps.' },
                  { icon: <Heart className="w-5 h-5 text-teal-600" />, title: 'Support', desc: 'Follow-up care and health education guidance.' }
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 border border-teal-100">
                      {step.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-navy-500">{step.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Large Image */}
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
                alt="Doctor with patient at Starlight Hospital"
                aspectRatio="h-[400px] lg:h-[440px]"
                containerClassName="rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO WE SERVE — Visual CTA */}
      <section ref={serveRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-navy-600">
            <div className="lg:col-span-8 space-y-3">
              <span className="badge-gold">COMMUNITY FOCUS</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Who We Serve
              </h2>
              <p className="text-slate-200 text-base leading-relaxed">
                Individuals, parents, children, and families seeking accessible healthcare in Jajo, Ikorodu, Lagos.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link to="/appointment" className="btn-teal text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" /> Request Appointment
              </Link>
              <a href="tel:08053587646" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4 text-gold-400" /> Call 08053587646
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
