import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Phone } from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const AboutPage: React.FC = () => {
  const heroRef = useScrollReveal();
  const profileRef = useScrollReveal();
  const approachRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  return (
    <div className="font-sans bg-white pb-20">
      {/* 1. HERO HEADER */}
      <section ref={heroRef} className="bg-white py-20 lg:py-32 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">About</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-500 tracking-tight">
            About Starlight Hospital
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Providing accessible, respectful, and patient-focused care for individuals and families in Jajo, Ikorodu.
          </p>
        </div>
      </section>

      {/* 2. PROFILE */}
      <section ref={profileRef} className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden shadow-lg">
            <HealthcareImage
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
              alt="Healthcare team at Starlight Hospital"
              aspectRatio="aspect-[4/3]"
              containerClassName="rounded-2xl"
            />
          </div>
          <div className="lg:col-span-5 space-y-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Who We Are</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 tracking-tight">
              Starlight Hospital
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Starlight Hospital serves the Jajo, Ikorodu community with clinical, diagnostic, counselling, and health education services across different stages of life. We are dedicated to providing a welcoming environment for every patient who walks through our doors.
            </p>
            <p className="text-gold-600 italic font-semibold text-lg">
              Deo Medice
            </p>
            <div>
              <Link to="/contact" className="btn-outline inline-flex items-center text-xs uppercase tracking-widest">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR APPROACH */}
      <section ref={approachRef} className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Our Approach</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 tracking-tight">
              How We Care For You
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {[
              { num: '01', title: 'LISTEN', desc: 'Understand the patient\'s concern and relevant history.' },
              { num: '02', title: 'ASSESS', desc: 'Support appropriate clinical evaluation and diagnostic work-up.' },
              { num: '03', title: 'EXPLAIN', desc: 'Make next steps understandable to patients and caregivers.' },
              { num: '04', title: 'SUPPORT', desc: 'Provide follow-up and health education where applicable.' }
            ].map((step, i) => (
              <div key={i} className="reveal-stagger-item space-y-4">
                <div className="text-4xl font-bold text-teal-500/30 font-serif">
                  {step.num}
                </div>
                <h3 className="text-base font-semibold text-navy-500 tracking-wide uppercase">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SIMPLE CTA */}
      <section ref={ctaRef} className="py-20 lg:py-32 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-navy-500 mb-6 tracking-tight">Ready to Visit Us?</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/appointment" className="btn-teal text-xs uppercase tracking-widest">
            <Calendar className="w-4 h-4 mr-2 inline" /> Request Appointment
          </Link>
          <Link to="/contact" className="btn-outline text-xs uppercase tracking-widest">
            <Phone className="w-4 h-4 mr-2 inline" /> Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};
