import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Calendar, MapPin, ChevronRight, Stethoscope, HeartPulse, Baby, Activity, 
  BookOpenCheck, Microscope, ShieldCheck, CheckCircle2, ArrowRight, Clock, Heart, 
  UserCheck, Ear, Compass, Lightbulb, Users
} from 'lucide-react';
import { servicesData } from '../data/services';
import { fetchArticles } from '../services/api';
import { Article } from '../types';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const HomePage: React.FC = () => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const heroRef = useScrollReveal();
  const trustRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const anchorRef = useScrollReveal();
  const careRef = useScrollReveal();
  const whyRef = useScrollReveal();
  const articlesRef = useScrollReveal();
  const ctaBannerRef = useScrollReveal();
  const locationRef = useScrollReveal();

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
      case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
      case 'Baby': return <Baby className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'BookOpenCheck': return <BookOpenCheck className="w-6 h-6" />;
      case 'Microscope': return <Microscope className="w-6 h-6" />;
      default: return <Stethoscope className="w-6 h-6" />;
    }
  };

  return (
    <div className="font-sans">
      
      {/* ============================================================
          SECTION 1: HERO — Large image + concise text + CTA
          ============================================================ */}
      <section ref={heroRef} className="relative overflow-hidden">
        {/* Full background image */}
        <div className="absolute inset-0">
          <HealthcareImage
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1800"
            alt="Starlight Hospital Jajo Ikorodu Lagos"
            aspectRatio="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/95 via-navy-900/85 to-navy-900/60"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-950/80 border border-amber-400/50 text-amber-300 text-xs font-extrabold tracking-wider uppercase shadow-md backdrop-blur-md">
              <img src="/starlight-logo.png" alt="Starlight Hospital" className="w-5 h-5 object-contain bg-white rounded-full p-0.5 shadow-sm" />
              <span className="text-amber-300 font-extrabold">STARLIGHT HOSPITAL • DEO MEDICE</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Quality Healthcare for Your Family
            </h1>
            
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-xl">
              Accessible medical consultation, women's health, paediatrics, surgery, diagnostics, and health education in Jajo, Ikorodu.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/appointment" className="btn-teal shadow-lg hover:shadow-teal-500/30 uppercase tracking-wider text-xs">
                <Calendar className="w-4 h-4" /> Request an Appointment
              </Link>
              <a href="tel:08053587646" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 backdrop-blur-md text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4 text-amber-400" /> Call 08053587646
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: TRUST STRIP — Compact icon highlights
          ============================================================ */}
      <section ref={trustRef} className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {[
              { icon: <MapPin className="w-5 h-5 text-teal-600" />, label: 'Local Healthcare Access' },
              { icon: <Heart className="w-5 h-5 text-teal-600" />, label: 'Family-Focused Care' },
              { icon: <UserCheck className="w-5 h-5 text-teal-600" />, label: 'Patient-Centered' },
              { icon: <ShieldCheck className="w-5 h-5 text-teal-600" />, label: 'Quality Diagnostics' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0 border border-teal-100">
                  {item.icon}
                </div>
                <span className="text-sm font-bold text-navy-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: SERVICES — Visual cards with images
          ============================================================ */}
      <section ref={servicesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="badge-teal">OUR SERVICES</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy-500 tracking-tight">
              Healthcare Services
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Core clinical services for individuals and families in Jajo, Ikorodu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="reveal-stagger-item healthcare-card overflow-hidden group hover-lift block"
              >
                <div className="relative h-44 overflow-hidden">
                  <HealthcareImage
                    src={service.image}
                    alt={service.title}
                    aspectRatio="h-full w-full"
                  />
                  <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md flex items-center justify-center text-teal-600 shadow-sm border border-white/80">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent"></div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-extrabold text-navy-500 group-hover:text-teal-600 transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                  <span className="inline-flex items-center gap-1 text-teal-600 text-xs font-bold uppercase tracking-wider pt-1">
                    Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: ABOUT STARLIGHT — Image LEFT + Text RIGHT
          ============================================================ */}
      <section ref={storyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Large Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <HealthcareImage
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200"
                  alt="Healthcare consultation at Starlight Hospital"
                  aspectRatio="h-[420px] lg:h-[480px]"
                  containerClassName="rounded-3xl"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-3 lg:right-6 bg-white rounded-2xl p-4 shadow-lg border border-slate-200/80 flex items-center gap-3">
                <img src="/starlight-logo.png" alt="Starlight" className="w-10 h-10 object-contain" />
                <div>
                  <p className="font-extrabold text-navy-500 text-sm">Starlight Hospital</p>
                  <p className="text-xs text-teal-600 font-semibold">DEO MEDICE</p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="space-y-5 lg:pl-4">
              <span className="badge-teal">ABOUT STARLIGHT</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Community Healthcare in Jajo, Ikorodu
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Starlight Hospital provides clinical, diagnostic, and health education services for individuals and families across different stages of life.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  'General outpatient and medical consultation',
                  'Women\'s health and obstetrics care',
                  'Paediatric and child health services',
                  'Health education and counselling'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-teal-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Link to="/about" className="btn-primary text-xs uppercase tracking-wider">
                  About Starlight Hospital <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: VISUAL ANCHOR 1 — Full-width image banner
          ============================================================ */}
      <section ref={anchorRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HealthcareImage
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1800"
            alt="Healthcare professionals at Starlight Hospital"
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

      {/* ============================================================
          SECTION 6: CARE APPROACH — Visual timeline
          ============================================================ */}
      <section ref={careRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="badge-navy">PATIENT EXPERIENCE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
              Our Approach to Care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { num: '01', title: 'Listen', desc: 'We hear your concerns and medical history attentively.', icon: <Ear className="w-5 h-5 text-teal-600" /> },
              { num: '02', title: 'Assess', desc: 'Thorough clinical evaluation and diagnostic review.', icon: <Compass className="w-5 h-5 text-teal-600" /> },
              { num: '03', title: 'Explain', desc: 'Clear explanations of results and recommended steps.', icon: <Lightbulb className="w-5 h-5 text-teal-600" /> },
              { num: '04', title: 'Support', desc: 'Ongoing care and follow-up guidance for recovery.', icon: <Users className="w-5 h-5 text-teal-600" /> }
            ].map((step, idx) => (
              <div key={idx} className="reveal-stagger-item relative p-6 text-center group">
                {/* Connector line */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-teal-200"></div>
                )}
                <div className="relative z-10 space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white border-2 border-teal-200 flex items-center justify-center mx-auto shadow-sm group-hover:border-teal-500 group-hover:bg-teal-50 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-xs font-extrabold text-teal-500 tracking-wider">STEP {step.num}</span>
                  <h3 className="text-lg font-bold text-navy-500">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 7: WHY STARLIGHT — Text LEFT + Image RIGHT
          ============================================================ */}
      <section ref={whyRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text Content */}
            <div className="space-y-5 order-2 lg:order-1">
              <span className="badge-gold">WHY STARLIGHT HOSPITAL</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Healthcare You Can Reach When You Need It
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Patient-centered care and accessible medical consultations for families across Jajo, Ikorodu and surrounding communities.
              </p>
              <div className="space-y-3 pt-1">
                {[
                  'Convenient local access in Jajo, Ikorodu',
                  'Core hospital services under one roof',
                  'Care for individuals, parents, children, and families',
                  'Health education alongside clinical services',
                  'Clear contact channels for enquiries'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-teal-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3">
                <Link to="/about" className="btn-teal text-xs uppercase tracking-wider">
                  Learn About Our Approach <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Large Image */}
            <div className="order-1 lg:order-2">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <HealthcareImage
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
                  alt="Patient care at Starlight Hospital"
                  aspectRatio="h-[380px] lg:h-[460px]"
                  containerClassName="rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 8: HEALTH INFORMATION — Image-led articles
          ============================================================ */}
      <section ref={articlesRef} className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <span className="badge-navy">HEALTH INFORMATION</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 tracking-tight">
                Health Education Hub
              </h2>
              <p className="text-slate-600 text-sm max-w-lg">
                Practical health information for you and your family.
              </p>
            </div>
            <Link to="/health-information" className="inline-flex items-center gap-1.5 text-teal-600 font-bold text-xs uppercase tracking-wider hover:text-navy-500 transition-colors flex-shrink-0">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <div key={n} className="animate-pulse bg-slate-200 h-72 rounded-2xl"></div>
              ))}
            </div>
          ) : recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Featured article — large */}
              <article className="lg:col-span-7 healthcare-card overflow-hidden group hover-lift">
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <HealthcareImage
                    src={recentArticles[0].featured_image}
                    alt={recentArticles[0].image_alt || recentArticles[0].title}
                    aspectRatio="h-full w-full"
                  />
                  <span className="absolute top-3 left-3 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="text-teal-600 uppercase font-bold">{recentArticles[0].category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recentArticles[0].reading_time} min</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-navy-500 group-hover:text-teal-600 transition-colors line-clamp-2">
                    <Link to={`/health-information/${recentArticles[0].slug}`}>{recentArticles[0].title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{recentArticles[0].excerpt}</p>
                  <Link to={`/health-information/${recentArticles[0].slug}`} className="inline-flex items-center gap-1.5 text-teal-600 text-xs font-bold uppercase tracking-wider hover:text-navy-500 transition-colors pt-1">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>

              {/* Secondary articles — smaller stack */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {recentArticles.slice(1).map((art) => (
                  <article key={art.id} className="healthcare-card overflow-hidden flex flex-row group hover-lift">
                    <div className="relative w-36 sm:w-44 flex-shrink-0 overflow-hidden">
                      <HealthcareImage
                        src={art.featured_image}
                        alt={art.image_alt || art.title}
                        aspectRatio="h-full w-full"
                      />
                    </div>
                    <div className="p-4 flex flex-col justify-center space-y-2 min-w-0">
                      <span className="text-xs text-teal-600 font-bold uppercase tracking-wider">{art.category}</span>
                      <h4 className="text-sm font-bold text-navy-500 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        <Link to={`/health-information/${art.slug}`}>{art.title}</Link>
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3 text-teal-500" /> {art.reading_time} min
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-2xl text-center text-slate-500 border border-slate-200/80">
              No health education articles published yet.
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          SECTION 9: VISUAL ANCHOR 2 — Full-width appointment CTA
          ============================================================ */}
      <section ref={ctaBannerRef} className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HealthcareImage
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1800"
            alt="Healthcare environment"
            aspectRatio="h-full w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/90 via-teal-800/85 to-navy-900/80"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Need to Speak With the Hospital?
              </h2>
              <p className="text-teal-100 text-base max-w-lg">
                Contact Starlight Hospital for appointments, service enquiries, or directions to our facility.
              </p>
            </div>
            <div className="flex flex-wrap items-center lg:justify-end gap-3">
              <a href="tel:08053587646" className="btn-gold text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4" /> Call 08053587646
              </a>
              <a href="tel:07079333090" className="btn-secondary bg-white/10 text-white hover:bg-white/20 border-white/30 text-xs uppercase tracking-wider">
                <Phone className="w-4 h-4 text-teal-300" /> Call 07079333090
              </a>
              <Link to="/appointment" className="btn-teal text-xs uppercase tracking-wider">
                <Calendar className="w-4 h-4" /> Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 10: LOCATION — Map + contact
          ============================================================ */}
      <section ref={locationRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200/80 shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 p-8 sm:p-10 space-y-5 flex flex-col justify-between bg-white">
              <div className="space-y-4">
                <span className="badge-gold">VISIT US</span>
                <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">
                  Starlight Hospital
                </h2>
                <div className="flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed font-semibold">
                    Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-teal-600" />
                  <a href="tel:08053587646" className="text-navy-500 font-bold hover:text-teal-600 transition-colors">08053587646</a>
                  <span className="text-slate-300">|</span>
                  <a href="tel:07079333090" className="text-navy-500 font-bold hover:text-teal-600 transition-colors">07079333090</a>
                </div>
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <a href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos" target="_blank" rel="noopener noreferrer" className="w-full btn-teal text-xs uppercase tracking-wider">
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
                <a href="tel:08053587646" className="w-full btn-secondary text-xs uppercase tracking-wider">
                  <Phone className="w-4 h-4 text-teal-600" /> Call Hospital
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 bg-slate-100 min-h-[340px]">
              <iframe
                title="Starlight Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
                className="w-full h-full min-h-[340px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
