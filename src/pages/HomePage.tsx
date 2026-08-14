import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Calendar, ArrowRight, MapPin, Clock,
  Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope,
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { servicesData } from '../data/services';
import { fetchArticles } from '../services/api';
import { Article } from '../types';
import { HealthcareImage } from '../components/HealthcareImage';
import { SplitImageJoin } from '../components/SplitImageJoin';
import { useScrollReveal } from '../hooks/useScrollReveal';

const getIcon = (name: string) => {
  const cls = "w-4 h-4 text-teal-600";
  switch (name) {
    case 'Stethoscope': return <Stethoscope className={cls} />;
    case 'HeartPulse': return <HeartPulse className={cls} />;
    case 'Baby': return <Baby className={cls} />;
    case 'Activity': return <Activity className={cls} />;
    case 'BookOpenCheck': return <BookOpenCheck className={cls} />;
    case 'Microscope': return <Microscope className={cls} />;
    default: return <Stethoscope className={cls} />;
  }
};

export const HomePage: React.FC = () => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);

  const heroRef = useScrollReveal();
  const servicesRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const parallax1Ref = useScrollReveal();
  const whyRef = useScrollReveal();
  const journeyRef = useScrollReveal();
  const parallax2Ref = useScrollReveal();
  const articlesRef = useScrollReveal();
  const locationRef = useScrollReveal();
  const ctaRef = useScrollReveal();

  useEffect(() => {
    fetchArticles(undefined, undefined)
      .then(data => {
        if (data && Array.isArray(data.articles)) setRecentArticles(data.articles.slice(0, 3));
      })
      .catch(() => {})
      .finally(() => setLoadingArticles(false));
  }, []);

  return (
    <div className="overflow-x-hidden">

      {/* ═══ 1. HERO — FULL BACKGROUND IMAGE BANNER ═══ */}
      <section 
        ref={heroRef} 
        className="bg-parallax relative min-h-[70vh] lg:min-h-[75vh] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1920')` }}
      >
        {/* Subtle Gradient Overlay — Keeps image fully visible while text is high contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/50 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-28 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-navy-950/80 border border-amber-400/50 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              STARLIGHT HOSPITAL • DEO MEDICE
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.18] tracking-tight drop-shadow-md">
              Quality Healthcare for You and Your Family
            </h1>
            
            {/* Subtitle */}
            <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed max-w-xl drop-shadow-md">
              Accessible healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/appointment" className="btn-teal text-sm py-3 px-6 shadow-md font-semibold">
                <Calendar className="w-4 h-4" /> Request an Appointment
              </Link>
              <a href="tel:08053587646" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy-950/80 border border-white/30 text-white font-semibold text-sm hover:bg-navy-900 transition-all backdrop-blur-md shadow-md">
                <Phone className="w-4 h-4 text-amber-400" /> Call 08053587646
              </a>
            </div>

            {/* Contact Line */}
            <div className="flex items-center gap-4 text-xs text-slate-200 pt-2 border-t border-white/25 max-w-lg font-medium">
              <span className="font-semibold text-amber-300">Secondary Line:</span>
              <a href="tel:07079333090" className="text-white hover:text-amber-300 transition-colors font-bold">07079333090</a>
              <span>•</span>
              <span className="text-slate-200">Jajo, Ikorodu, Lagos</span>
            </div>

          </div>

          {/* Quick Feature Highlight Bar */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'General Medical', desc: 'Outpatient consultations' },
              { title: 'Obstetrics & Gynaecology', desc: 'Women\'s health care' },
              { title: 'Paediatrics Care', desc: 'Healthcare for children' },
              { title: 'Laboratory & Diagnostics', desc: 'Clinical lab testing' }
            ].map((feat, i) => (
              <div key={i} className="bg-navy-950/75 backdrop-blur-md p-4 rounded-xl border border-white/25 text-white shadow-lg space-y-1">
                <span className="text-xs font-bold text-amber-300 block tracking-wide">{feat.title}</span>
                <span className="text-xs text-slate-100 block font-medium">{feat.desc}</span>
              </div>
            ))}
          </div>

        </div>
      </section>


      {/* ═══ 2. SERVICES — VISUALLY RICH 6-CARD GRID WITH THUMBNAILS ═══ */}
      <section ref={servicesRef} className="bg-slate-50/70 py-14 md:py-18">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Our Services</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">What We Offer</h2>
            </div>
            <Link to="/services" className="text-sm font-medium text-teal-600 hover:text-navy-500 transition-colors flex items-center gap-1">
              View all services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="reveal-stagger-item group bg-white rounded-xl overflow-hidden border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail Image Header */}
                <div className="h-40 img-hover-zoom overflow-hidden relative">
                  <HealthcareImage
                    src={service.image}
                    alt={service.title}
                    aspectRatio="h-full w-full"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm">
                    {getIcon(service.iconName)}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-navy-500 group-hover:text-teal-600 transition-colors mb-1.5">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all pt-2">
                    View service <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>


      {/* ═══ 3. ABOUT STARLIGHT — SECTION A: SLIDE-LEFT IMAGE | TEXT RIGHT ═══ */}
      <section ref={aboutRef} className="bg-white py-14 md:py-20 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Image LEFT — Slides in from Left on scroll (6 Cols) */}
            <div className="lg:col-span-6 reveal-slide-left rounded-2xl overflow-hidden shadow-md border border-slate-100">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="Starlight Hospital premises and healthcare team"
                aspectRatio="aspect-[4/3]"
              />
            </div>

            {/* Text RIGHT (6 Cols) */}
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">About Starlight Hospital</p>
              
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 leading-snug">
                Community Healthcare in Jajo, Ikorodu
              </h2>

              <p className="text-slate-600 text-base leading-relaxed">
                Starlight Hospital serves individuals and families in Jajo, Ikorodu with clinical, diagnostic, counselling, and health education services. Our care philosophy combines clinical competence with patient respect and community accessibility.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block">Hospital Motto</span>
                <span className="text-lg font-serif italic text-navy-500 font-semibold">DEO MEDICE</span>
                <p className="text-xs text-slate-500">Guiding our commitment to respectful and compassionate patient care.</p>
              </div>

              <div className="pt-2">
                <Link to="/about" className="btn-teal text-xs">
                  About Starlight Hospital <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══ 4. FULL-WIDTH PARALLAX VISUAL BREAK 1 ═══ */}
      <section
        ref={parallax1Ref}
        className="bg-parallax relative min-h-[48vh] md:min-h-[56vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-950/70"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-16 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">STARLIGHT HOSPITAL • DEO MEDICE</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug">
            Healthcare Guided by Purpose
          </h2>
          <p className="text-slate-200 text-base leading-relaxed max-w-xl mx-auto">
            A hospital designed to make access to healthcare straightforward, respectful and practical for individuals and families.
          </p>
          <div className="pt-2">
            <Link to="/appointment" className="btn-teal text-sm">
              <Calendar className="w-4 h-4" /> Request an Appointment
            </Link>
          </div>
        </div>
      </section>


      {/* ═══ 5. WHY STARLIGHT — SECTION B: TEXT LEFT | SLIDE-RIGHT IMAGE ═══ */}
      <section ref={whyRef} className="bg-white py-14 md:py-20 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Text LEFT (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">Why Starlight Hospital</p>
              
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 leading-snug">
                A hospital designed to make access to healthcare straightforward, respectful and practical.
              </h2>

              <div className="space-y-4 pt-1">
                {[
                  {
                    title: 'Convenient Local Access',
                    desc: 'Healthcare services available within your community in Jajo, Ikorodu, saving valuable time during health needs.'
                  },
                  {
                    title: 'Core Services, One Hospital',
                    desc: 'A broad offering of general medical, women’s health, paediatric, surgical, diagnostic, and health education services.'
                  },
                  {
                    title: 'Patient & Family Focused',
                    desc: 'Care and communication designed around patients, parents, children, and families with clear guidance.'
                  }
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-navy-500">{point.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image RIGHT — Slides in from Right on scroll (6 Cols) */}
            <div className="lg:col-span-6 reveal-slide-right rounded-2xl overflow-hidden shadow-md border border-slate-100 order-1 lg:order-2">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
                alt="Doctor consulting with patient at Starlight Hospital"
                aspectRatio="aspect-[4/3]"
              />
            </div>

          </div>
        </div>
      </section>


      {/* ═══ 6. CARE APPROACH — VISUAL JOURNEY + SPLIT IMAGE JOIN ON SCROLL ═══ */}
      <section ref={journeyRef} className="bg-slate-50/70 py-14 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Patient Experience</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">Our Care Journey</h2>
            <p className="text-sm text-slate-500">How we structure patient interaction from first visit to follow-up.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual 4-Step Journey (7 Cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { num: '01', title: 'LISTEN', desc: 'Understand the patient’s concern and relevant medical history attentively.' },
                { num: '02', title: 'ASSESS', desc: 'Support appropriate clinical evaluation and diagnostic work-up.' },
                { num: '03', title: 'EXPLAIN', desc: 'Make next steps understandable to patients and family caregivers.' },
                { num: '04', title: 'SUPPORT', desc: 'Provide follow-up care and health education where applicable.' }
              ].map((step, idx) => (
                <div key={idx} className="reveal-stagger-item bg-white p-5 rounded-xl border border-slate-100 shadow-sm space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-500/40 font-mono">{step.num}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-teal-600 bg-teal-50 px-2 py-0.5 rounded">Step {idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-navy-500">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Split Image Join Effect — Left Half & Right Half Join Together on Scroll (5 Cols) */}
            <div className="lg:col-span-5">
              <SplitImageJoin
                leftSrc="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
                rightSrc="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                leftAlt="Healthcare care listening"
                rightAlt="Healthcare care support"
                aspectRatio="aspect-[4/3]"
              />
            </div>

          </div>

        </div>
      </section>


      {/* ═══ 7. FULL-WIDTH PARALLAX VISUAL BREAK 2 ═══ */}
      <section
        ref={parallax2Ref}
        className="bg-parallax relative min-h-[44vh] md:min-h-[52vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/60"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-14 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-snug">
            Care for Every Member of the Family
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed max-w-lg mx-auto">
            From general consultation to obstetrics, paediatrics, surgery, diagnostics, and health education.
          </p>
          <div className="pt-1">
            <Link to="/services" className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 px-5 py-2.5 rounded-lg hover:bg-white/10 transition-colors">
              Explore All Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>


      {/* ═══ 8. HEALTH INFORMATION — EDITORIAL VISUAL ANCHOR ═══ */}
      <section ref={articlesRef} className="bg-white py-14 md:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-1">Health Information</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">Health Information for You and Your Family</h2>
              <p className="text-sm text-slate-500 mt-0.5">Practical health education, hospital updates, and general guidance published by Starlight Hospital.</p>
            </div>
            <Link to="/health-information" className="text-sm font-medium text-teal-600 hover:text-navy-500 transition-colors flex items-center gap-1 flex-shrink-0">
              View all articles <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loadingArticles ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 bg-slate-100 h-72 rounded-xl animate-pulse"></div>
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-slate-100 h-32 rounded-xl animate-pulse"></div>
                <div className="bg-slate-100 h-32 rounded-xl animate-pulse"></div>
              </div>
            </div>
          ) : recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Featured Article — Large Visual Anchor (7 Cols) */}
              <Link 
                to={`/health-information/${recentArticles[0].slug}`} 
                className="lg:col-span-7 group block bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="h-60 sm:h-72 img-hover-zoom relative overflow-hidden">
                  <HealthcareImage 
                    src={recentArticles[0].featured_image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000'} 
                    alt={recentArticles[0].title} 
                    aspectRatio="h-full w-full" 
                  />
                  <div className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Featured Article
                  </div>
                </div>
                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-medium text-teal-600 uppercase">{recentArticles[0].category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recentArticles[0].reading_time || 5} min read</span>
                  </div>
                  <h3 className="text-lg font-semibold text-navy-500 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {recentArticles[0].title}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {recentArticles[0].excerpt}
                  </p>
                </div>
              </Link>

              {/* Secondary Articles — Lighter List (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                {recentArticles.slice(1).map((art) => (
                  <Link 
                    key={art.id} 
                    to={`/health-information/${art.slug}`} 
                    className="group flex gap-4 items-center border border-slate-100 bg-white rounded-xl p-4 hover:shadow-md transition-all duration-300 flex-1"
                  >
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden img-hover-zoom">
                      <HealthcareImage 
                        src={art.featured_image || 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600'} 
                        alt={art.title} 
                        aspectRatio="h-full w-full" 
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="text-[10px] text-teal-600 font-semibold uppercase tracking-wider">{art.category}</span>
                      <h4 className="text-sm font-semibold text-navy-500 line-clamp-2 group-hover:text-teal-600 transition-colors">
                        {art.title}
                      </h4>
                      <span className="text-xs text-slate-400 flex items-center gap-1 pt-0.5">
                        <Clock className="w-3 h-3" /> {art.reading_time || 4} min read
                      </span>
                    </div>
                  </Link>
                ))}

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <p className="text-xs text-slate-500 mb-2">Looking for specific health topics or guidance?</p>
                  <Link to="/health-information" className="text-xs font-semibold text-teal-600 hover:text-navy-500 inline-flex items-center gap-1">
                    Explore Health Information Hub <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">No articles published yet.</p>
          )}

        </div>
      </section>


      {/* ═══ 9. LOCATION — HOSPITAL PHOTO + CONTACT + GOOGLE MAP ═══ */}
      <section ref={locationRef} className="bg-slate-50/70 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-slate-200/80 bg-white shadow-sm">
            
            {/* Contact & Hospital Info (5 Cols) */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Location & Access</p>
                
                <h2 className="text-xl font-semibold text-navy-500">Starlight Hospital</h2>
                
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                    <div className="flex flex-wrap gap-2 font-medium text-navy-500">
                      <a href="tel:08053587646" className="hover:text-teal-600 transition-colors">08053587646</a>
                      <span className="text-slate-300">/</span>
                      <a href="tel:07079333090" className="hover:text-teal-600 transition-colors">07079333090</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Photo Preview Panel */}
              <div className="h-32 rounded-xl overflow-hidden img-hover-zoom relative border border-slate-100">
                <HealthcareImage
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
                  alt="Starlight Hospital Entrance"
                  aspectRatio="h-full w-full"
                />
                <div className="absolute inset-0 bg-navy-900/30 flex items-end p-3">
                  <span className="text-white text-xs font-medium">Jajo, Ikorodu Facility</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a 
                  href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline text-xs"
                >
                  <MapPin className="w-3.5 h-3.5" /> Get Directions
                </a>
                <a href="tel:08053587646" className="btn-teal text-xs">
                  <Phone className="w-3.5 h-3.5" /> Call Hospital
                </a>
              </div>
            </div>

            {/* Google Map Iframe (7 Cols) */}
            <div className="lg:col-span-7 min-h-[320px] bg-slate-100">
              <iframe 
                title="Starlight Hospital Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
                className="w-full h-full min-h-[320px] border-0" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
              />
            </div>

          </div>

        </div>
      </section>


      {/* ═══ 10. FINAL CTA — FULL-WIDTH HEALTHCARE BACKGROUND PHOTO OVERLAY ═══ */}
      <section 
        ref={ctaRef} 
        className="bg-parallax relative py-16 md:py-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-[2px]"></div>
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">STARLIGHT HOSPITAL</p>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-snug">
            Need to Speak with the Hospital?
          </h2>
          
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            For appointments, service enquiries or directions, contact Starlight Hospital directly.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-3">
            <a 
              href="tel:08053587646" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-navy-500 text-sm font-semibold hover:bg-slate-100 transition-colors shadow-sm"
            >
              <Phone className="w-4 h-4 text-teal-600" /> Call 08053587646
            </a>
            <a 
              href="tel:07079333090" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" /> Call 07079333090
            </a>
            <Link 
              to="/appointment" 
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors shadow-sm"
            >
              <Calendar className="w-4 h-4" /> Request an Appointment
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
