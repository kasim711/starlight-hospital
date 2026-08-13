import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleBySlug } from '../services/api';
import { Article } from '../types';
import { 
  Clock, Calendar, CheckCircle, ArrowLeft, ArrowRight, Phone, AlertCircle, Shield 
} from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const heroRef = useScrollReveal();
  const contentRef = useScrollReveal();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    fetchArticleBySlug(slug)
      .then(data => {
        setArticle(data.article);
        setRelated(data.related);
      })
      .catch(err => setError(err.message || 'Article not found'))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 font-sans">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded-xl w-1/3"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-3/4"></div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 font-sans">
        <h2 className="text-2xl font-extrabold text-navy-500 tracking-tight">Article Not Found</h2>
        <p className="text-slate-600 font-normal">The requested health education article could not be found.</p>
        <Link
          to="/health-information"
          className="btn-teal text-xs uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Health Information
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Article Header & Breadcrumbs */}
      <section ref={heroRef} className="bg-navy-500 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4 relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/health-information" className="hover:text-white transition-colors">Health Information</Link>
            <span>/</span>
            <span className="text-gold-400 font-bold">{article.category}</span>
          </nav>

          <div className="flex items-center gap-3 pt-2">
            <span className="badge-teal">
              {article.category}
            </span>
            
            {/* Medically Reviewed Badge */}
            {article.medical_review_status === 'Reviewed' && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Medically Reviewed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-3 border-t border-white/15">
            <span className="font-bold text-gold-400">By {article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-teal-400" /> {article.reading_time} min read</span>
            {article.published_at && (
              <>
                <span>•</span>
                <span>{new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </>
            )}
          </div>

        </div>
      </section>

      {/* Main Article Container */}
      <section ref={contentRef} className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-slate-200/80">
          <HealthcareImage
            src={article.featured_image}
            alt={article.image_alt || article.title}
            aspectRatio="h-[420px]"
            containerClassName="rounded-3xl"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="bg-slate-100/90 p-6 rounded-2xl border-l-4 border-teal-500 text-slate-800 font-medium text-base sm:text-lg leading-relaxed shadow-sm">
          {article.excerpt}
        </div>

        {/* Article HTML Content */}
        <div
          className="prose-article bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-card"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Medical Review Disclaimer Box */}
        <div className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-6 flex items-start gap-4 text-slate-700 shadow-sm">
          <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-extrabold text-navy-500 block uppercase tracking-wider">Medical Disclaimer</span>
            <p className="leading-relaxed font-normal">
              The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional. If you have a health concern, contact Starlight Hospital or an appropriate healthcare provider.
            </p>
          </div>
        </div>

        {/* Appointment CTA Box */}
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl border border-navy-600">
          <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white mx-auto flex items-center justify-center font-bold shadow-md">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">Have Questions About Your Health?</h3>
          <p className="text-slate-200 text-sm max-w-xl mx-auto font-normal">
            Schedule a medical consultation at Starlight Hospital in Jajo, Ikorodu to speak directly with a healthcare provider.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
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

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200/80">
            <h3 className="text-2xl font-extrabold text-navy-500 tracking-tight">Related Health Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div key={rel.id} className="healthcare-card p-5 space-y-3 flex flex-col justify-between group hover-lift">
                  <div className="space-y-2">
                    <h4 className="font-extrabold text-navy-500 text-base line-clamp-2 group-hover:text-teal-600 transition-colors">
                      <Link to={`/health-information/${rel.slug}`}>
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-slate-600 text-xs line-clamp-2 font-normal">{rel.excerpt}</p>
                  </div>
                  <Link
                    to={`/health-information/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs uppercase tracking-wider hover:text-navy-500 transition-colors pt-2"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>
    </div>
  );
};
