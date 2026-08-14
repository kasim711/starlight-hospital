import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Calendar, ArrowRight, MapPin, Clock,
  Stethoscope, HeartPulse, Baby, Activity, BookOpenCheck, Microscope,
  CheckCircle2
} from 'lucide-react';
import { servicesData } from '../data/services';
import { fetchArticles } from '../services/api';
import { Article } from '../types';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

const getIcon = (name: string) => {
  const cls = "w-5 h-5 text-teal-600";
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
  const whyRef = useScrollReveal();
  const aboutRef = useScrollReveal();
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
    <div>

      {/* ═══ 1. HERO ═══ */}
      <section ref={heroRef} className="bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-5 max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Starlight Hospital</p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-navy-500 leading-[1.2]">
                Quality Healthcare for You and Your Family
              </h1>
              <p className="text-slate-500 text-base leading-relaxed">
                Accessible healthcare services for individuals and families in Jajo, Ikorodu and surrounding communities.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link to="/appointment" className="btn-teal"><Calendar className="w-4 h-4" /> Request an Appointment</Link>
                <a href="tel:08053587646" className="btn-outline"><Phone className="w-4 h-4" /> Call 08053587646</a>
              </div>
              <p className="text-xs text-slate-400 pt-1">
                <a href="tel:07079333090" className="hover:text-teal-600 transition-colors">07079333090</a> · Jajo, Ikorodu, Lagos
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=1200"
                alt="Healthcare consultation"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 2. OUR SERVICES ═══ */}
      <section ref={servicesRef} className="bg-slate-50/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Our Services</p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500">What We Do</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((service) => (
              <Link key={service.id} to={`/services/${service.id}`}
                className="reveal-stagger-item group bg-white rounded-xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-md transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center mb-4">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="text-base font-semibold text-navy-500 mb-1.5 group-hover:text-teal-600 transition-colors">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{service.shortDesc}</p>
                <span className="text-xs font-medium text-teal-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                  View service <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. WHY STARLIGHT ═══ */}
      <section ref={whyRef} className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">Why Starlight Hospital</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-navy-500 leading-relaxed">
            A hospital designed to make access to healthcare straightforward, respectful and practical for individuals and families in Jajo and Ikorodu.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            {[
              { title: 'Convenient Local Access', desc: 'Healthcare available in your community without travelling far.' },
              { title: 'Core Services, One Hospital', desc: 'A broad offering of clinical, diagnostic and health education services.' },
              { title: 'Patient & Family Focused', desc: 'Care designed around patients, parents, children and families.' },
            ].map((item, i) => (
              <div key={i} className="reveal-stagger-item space-y-2">
                <CheckCircle2 className="w-5 h-5 text-teal-500 mx-auto" />
                <h3 className="text-sm font-semibold text-navy-500">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 4. ABOUT PREVIEW ═══ */}
      <section ref={aboutRef} className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="rounded-2xl overflow-hidden">
              <HealthcareImage
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200"
                alt="Starlight Hospital"
                aspectRatio="aspect-[4/3]"
              />
            </div>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">About Starlight</p>
              <h2 className="text-2xl sm:text-3xl font-semibold text-navy-500 leading-snug">
                Community Healthcare in Jajo, Ikorodu
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Starlight Hospital provides accessible, patient-centered healthcare services for individuals and families. Our approach combines clinical care with health education, guided by our motto — <span className="font-semibold text-navy-500">DEO MEDICE</span>.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-navy-500 transition-colors pt-1">
                About Starlight Hospital <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 5. HEALTH INFORMATION ═══ */}
      <section ref={articlesRef} className="bg-slate-50/50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Health Information</p>
              <h2 className="text-2xl font-semibold text-navy-500">Health Information for You and Your Family</h2>
              <p className="text-sm text-slate-500 mt-1">Practical health education, hospital updates and general information published by Starlight Hospital.</p>
            </div>
            <Link to="/health-information" className="text-sm font-medium text-teal-600 hover:text-navy-500 transition-colors flex items-center gap-1 flex-shrink-0">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loadingArticles ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[1,2,3].map(n => <div key={n} className="animate-pulse bg-slate-100 h-48 rounded-xl"></div>)}
            </div>
          ) : recentArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {recentArticles.map((art, idx) => (
                <Link key={art.id} to={`/health-information/${art.slug}`}
                  className="group bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all duration-300 overflow-hidden">
                  {idx === 0 && art.featured_image && (
                    <div className="h-44 overflow-hidden">
                      <HealthcareImage src={art.featured_image} alt={art.title} aspectRatio="h-full w-full" />
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium text-teal-600 uppercase">{art.category}</span>
                      {art.reading_time && <><span>·</span><span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{art.reading_time} min</span></>}
                    </div>
                    <h3 className="text-sm font-semibold text-navy-500 group-hover:text-teal-600 transition-colors line-clamp-2">{art.title}</h3>
                    {art.excerpt && <p className="text-xs text-slate-500 line-clamp-2">{art.excerpt}</p>}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">No articles published yet.</p>
          )}
        </div>
      </section>

      {/* ═══ 6. LOCATION + CONTACT ═══ */}
      <section ref={locationRef} className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-slate-100">
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center gap-5 bg-white">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-600">Visit Us</p>
              <h2 className="text-xl font-semibold text-navy-500">Starlight Hospital</h2>
              <div className="space-y-3 text-sm text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <div className="flex gap-2 font-medium text-navy-500">
                    <a href="tel:08053587646" className="hover:text-teal-600 transition-colors">08053587646</a>
                    <span className="text-slate-300">/</span>
                    <a href="tel:07079333090" className="hover:text-teal-600 transition-colors">07079333090</a>
                  </div>
                </div>
              </div>
              <a href="https://maps.google.com/?q=Starlight+Hospital+Jajo+Ikorodu+Lagos" target="_blank" rel="noopener noreferrer"
                className="btn-outline text-xs w-full sm:w-auto"><MapPin className="w-3.5 h-3.5" /> Get Directions</a>
            </div>
            <div className="lg:col-span-7 min-h-[300px]">
              <iframe title="Starlight Hospital Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15850.550186985023!2d3.5135!3d6.6212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b935d21df266f%3A0x8e833446059d99bf!2sIkorodu%2C%20Lagos!5e0!3m2!1sen!2sng!4v1690000000000!5m2!1sen!2sng"
                className="w-full h-full min-h-[300px] border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 7. FINAL CTA ═══ */}
      <section ref={ctaRef} className="bg-navy-500 py-14 lg:py-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-white">Need to Speak with the Hospital?</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For appointments, service enquiries or directions, contact Starlight Hospital.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a href="tel:08053587646" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-navy-500 text-sm font-medium hover:bg-slate-50 transition-colors">
              <Phone className="w-4 h-4" /> Call 08053587646
            </a>
            <a href="tel:07079333090" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors">
              <Phone className="w-4 h-4" /> Call 07079333090
            </a>
            <Link to="/appointment" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 transition-colors">
              <Calendar className="w-4 h-4" /> Request an Appointment
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
