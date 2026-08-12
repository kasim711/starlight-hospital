import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Calendar, MapPin, ChevronRight, Stethoscope, HeartPulse, Baby, Activity, 
  BookOpenCheck, Microscope, ShieldCheck, CheckCircle2, ArrowRight, Clock, FileText 
} from 'lucide-react';
import { servicesData } from '../data/services';
import { fetchArticles } from '../services/api';
import { Article } from '../types';

export const HomePage: React.FC = () => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    fetchArticles(undefined, undefined)
      .then(data => {
        if (data && Array.isArray(data.articles)) {
          setRecentArticles(data.articles.slice(0, 3));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingArticles(false));
  }, []);

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
    <div className="space-y-16 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative hero-gradient text-white overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-gold-500 text-xs font-semibold tracking-wider uppercase backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-gold-500" />
                STARLIGHT HOSPITAL • DEO MEDICE
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Quality Healthcare for You and Your Family
              </h1>
              
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
                Starlight Hospital provides accessible healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities. Our services include medical consultation, women’s health, paediatrics, surgery, health education and counselling, and laboratory/diagnostic services.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-base hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/25"
                >
                  <Calendar className="w-5 h-5" />
                  REQUEST AN APPOINTMENT
                </Link>

                <a
                  href="tel:08053587646"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-base hover:bg-white/20 border border-white/30 backdrop-blur-sm transition-all"
                >
                  <Phone className="w-5 h-5 text-gold-500" />
                  CALL 08053587646
                </a>
              </div>

              {/* Utility Location Line */}
              <div className="pt-4 flex items-center gap-4 text-xs md:text-sm text-slate-300 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-medium">
                  <Phone className="w-4 h-4 text-teal-400" />
                  <span>08053587646</span>
                  <span>|</span>
                  <span>07079333090</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span>Jajo, Ikorodu, Lagos</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000"
                  alt="Starlight Hospital Healthcare Team in Jajo Ikorodu"
                  className="w-full h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent p-6 flex flex-col justify-end">
                  <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-100 text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-navy-500 text-gold-500 flex items-center justify-center font-bold">
                        DM
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-500 text-base">Starlight Hospital</h4>
                        <p className="text-xs text-slate-600">Jajo, Ikorodu, Lagos • DEO MEDICE</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICE SNAPSHOT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-500">
            Healthcare Services Designed Around Your Needs
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Explore our core medical service offerings dedicated to quality outpatient assessment, maternal health, paediatric care, surgery, health education, and diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">
                  {React.cloneElement(getServiceIcon(service.iconName), {
                    className: "w-7 h-7 text-teal-600 group-hover:text-white transition-colors"
                  })}
                </div>
                <h3 className="text-xl font-bold text-navy-500 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to={`/services/${service.id}`}
                  className="inline-flex items-center gap-1.5 font-bold text-sm text-teal-600 hover:text-navy-500 transition-colors"
                >
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. WHY STARLIGHT HOSPITAL */}
      <section className="bg-navy-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-gold-500 font-bold text-xs uppercase tracking-widest">WHY STARLIGHT HOSPITAL</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                A Hospital You Can Reach When You Need Healthcare
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Starlight Hospital is committed to clear, patient-centered care and accessible medical consultations for families across Jajo, Ikorodu and surrounding areas.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  'Convenient local access in Jajo, Ikorodu.',
                  'A broad range of core hospital services under one roof.',
                  'Care that recognises the needs of individuals, parents, children, and families.',
                  'Health education and counselling alongside clinical services.',
                  'Clear contact channels for enquiries and appointment requests.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-sm md:text-base font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-white space-y-6">
                <div className="w-12 h-12 rounded-xl bg-gold-500 text-navy-900 flex items-center justify-center font-bold text-xl">
                  DM
                </div>
                <h3 className="text-2xl font-bold text-white">DEO MEDICE Motto</h3>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Starlight Hospital’s motto, <span className="font-semibold text-gold-500">DEO MEDICE</span>, reflects the hospital’s identity and commitment to patient care across all life stages.
                </p>
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors"
                  >
                    Learn About Our Approach
                  </Link>
                  <a
                    href="tel:08053587646"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-gold-500" /> Call 08053587646
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-card grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">ABOUT STARLIGHT HOSPITAL</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
              Dedicated Community Healthcare in Jajo, Ikorodu
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Starlight Hospital serves patients and families with a practical range of healthcare services, from general medical consultation to women’s health, paediatrics, surgery, diagnostics, and health education. Our goal is to make access to healthcare straightforward, respectful, and patient-focused.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-500 text-white font-bold text-sm hover:bg-navy-600 transition-colors shadow-md"
            >
              LEARN ABOUT STARLIGHT HOSPITAL
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. HEALTH INFORMATION PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">HEALTH EDUCATION & UPDATES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
              Health Information for You and Your Family
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Explore practical health education articles and updates published by Starlight Hospital. Information on this website is for general education and should not replace medical assessment when professional care is needed.
            </p>
          </div>
          <Link
            to="/health-information"
            className="inline-flex items-center gap-1.5 text-teal-600 font-bold text-sm hover:text-navy-500 transition-colors flex-shrink-0"
          >
            VIEW HEALTH INFORMATION <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingArticles ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="animate-pulse bg-slate-200 h-64 rounded-2xl"></div>
            ))}
          </div>
        ) : recentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((art) => (
              <article key={art.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={art.featured_image}
                      alt={art.image_alt || art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-navy-500/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {art.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-500" /> {art.reading_time} min read</span>
                      <span>•</span>
                      <span>{art.author}</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy-500 line-clamp-2 hover:text-teal-600 transition-colors">
                      <Link to={`/health-information/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>
                </div>
                <div className="p-5 pt-0 border-t border-slate-50 mt-4">
                  <Link
                    to={`/health-information/${art.slug}`}
                    className="inline-flex items-center gap-1 text-teal-600 text-xs font-bold hover:text-navy-500 transition-colors"
                  >
                    Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-slate-100 p-8 rounded-2xl text-center text-slate-600">
            No health education articles published yet.
          </div>
        )}
      </section>

      {/* 6. LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">HOSPITAL LOCATION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500">
                Visit Starlight Hospital
              </h2>
              <div className="flex items-start gap-3 text-slate-700">
                <MapPin className="w-6 h-6 text-teal-500 flex-shrink-0 mt-1" />
                <p className="text-base leading-relaxed font-medium">
                  Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <a
                href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-sm"
              >
                <MapPin className="w-4 h-4" /> GET DIRECTIONS
              </a>
              <a
                href="tel:08053587646"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-navy-500 text-navy-500 font-bold text-sm hover:bg-navy-50 transition-colors"
              >
                <Phone className="w-4 h-4 text-teal-500" /> CALL THE HOSPITAL
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-100 min-h-[320px] relative">
            <iframe
              title="Starlight Hospital Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
              className="w-full h-full min-h-[350px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </section>

      {/* 7. FINAL CTA BAND */}
      <section className="bg-navy-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
            Need to Speak With the Hospital?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Contact Starlight Hospital for appointment requests, service enquiries, or directions to our facility.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="tel:08053587646"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 text-navy-900 font-bold text-sm hover:bg-gold-600 transition-colors shadow-lg"
            >
              <Phone className="w-4 h-4" /> CALL 08053587646
            </a>
            <a
              href="tel:07079333090"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 border border-white/30 transition-colors"
            >
              <Phone className="w-4 h-4 text-teal-400" /> CALL 07079333090
            </a>
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-lg"
            >
              <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
