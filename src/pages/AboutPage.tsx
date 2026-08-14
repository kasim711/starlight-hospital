import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const profileRef = useScrollReveal();
  const parallaxRef = useScrollReveal();
  const approachRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div>
      {/* 1. HERO */}
      <section ref={heroRef} className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">About</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-navy-500">
            About Starlight Hospital
          </h1>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            Providing accessible, respectful and patient-focused care for individuals and families in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* 2. PROFILE — Image + content */}
      <section ref={profileRef} className="bg-slate-50/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 img-reveal rounded-2xl overflow-hidden">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="Healthcare team at Starlight Hospital"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Who We Are</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 leading-snug">
                Starlight Hospital
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Starlight Hospital serves the Jajo, Ikorodu community with clinical, diagnostic, counselling and health education services across different stages of life.
              </p>
              <p className="text-gold-600 italic font-semibold text-lg">
                DEO MEDICE
              </p>
              <Link to="/contact" className="btn-outline text-xs">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PARALLAX VISUAL BREAK */}
      <section
        ref={parallaxRef}
        className="bg-parallax relative min-h-[45vh] md:min-h-[55vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/55"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Our Commitment</p>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-snug">
            Healthcare Guided by Purpose
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed">
            Accessible, respectful and patient-focused care for your family.
          </p>
        </div>
      </section>

      {/* 4. OUR APPROACH */}
      <section ref={approachRef} className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Our Approach</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">How We Care For You</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '01', title: 'Listen', desc: 'Understand the patient\'s concern and relevant history.' },
              { num: '02', title: 'Assess', desc: 'Support appropriate clinical evaluation and diagnostic work-up.' },
              { num: '03', title: 'Explain', desc: 'Make next steps understandable to patients and caregivers.' },
              { num: '04', title: 'Support', desc: 'Provide follow-up and health education where applicable.' }
            ].map((step, i) => (
              <div key={i} className="reveal-stagger-item space-y-3">
                <span className="text-3xl font-semibold text-teal-500/30">{step.num}</span>
                <h3 className="text-base font-semibold text-navy-500">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section ref={ctaRef} className="bg-slate-50/50 py-14 lg:py-16">
        <div className="max-w-2xl mx-auto px-5 text-center space-y-5">
          <h2 className="text-2xl font-semibold text-navy-500">Ready to Visit Us?</h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/appointment" className="btn-teal text-sm">
              <Calendar className="w-4 h-4" /> Request Appointment
            </Link>
            <Link to="/contact" className="btn-outline text-sm">
              <Phone className="w-4 h-4" /> Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
