import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticleBySlug } from '../services/api';
import { Article } from '../types';
import { 
  Clock, Calendar, CheckCircle, ArrowLeft, ArrowRight, Phone, AlertCircle, Shield 
} from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [related, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="h-12 bg-slate-200 rounded w-3/4"></div>
          <div className="h-96 bg-slate-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy-500">Article Not Found</h2>
        <p className="text-slate-600">The requested health education article could not be found.</p>
        <Link
          to="/health-information"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Health Information
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      {/* Article Header & Breadcrumbs */}
      <section className="bg-navy-500 text-white py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link to="/health-information" className="hover:text-white transition-colors">Health Information</Link>
            <span>/</span>
            <span className="text-gold-500">{article.category}</span>
          </nav>

          <div className="flex items-center gap-3 pt-2">
            <span className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              {article.category}
            </span>
            
            {/* Medically Reviewed Badge (ONLY shown when medical_review_status is Reviewed) */}
            {article.medical_review_status === 'Reviewed' && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold px-3 py-1 rounded-md flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Medically Reviewed
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 pt-2 border-t border-white/10">
            <span className="font-semibold text-gold-500">By {article.author}</span>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <img
            src={article.featured_image}
            alt={article.image_alt || article.title}
            className="w-full max-h-[460px] object-cover"
          />
        </div>

        {/* Excerpt Lead */}
        <div className="bg-slate-100 p-6 rounded-2xl border-l-4 border-teal-500 text-slate-800 font-medium text-base sm:text-lg leading-relaxed">
          {article.excerpt}
        </div>

        {/* Article HTML Content */}
        <div
          className="prose-article bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-card"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Medical Review Disclaimer Box */}
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6 flex items-start gap-4 text-slate-700">
          <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-navy-500 block">Medical Disclaimer</span>
            <p className="leading-relaxed">
              The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional. If you have a health concern, contact Starlight Hospital or an appropriate healthcare provider.
            </p>
          </div>
        </div>

        {/* Appointment CTA Box */}
        <div className="bg-navy-500 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-teal-500 text-white mx-auto flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Have Questions About Your Health?</h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Schedule a medical consultation at Starlight Hospital in Jajo, Ikorodu to speak directly with a healthcare provider.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-md"
            >
              <Calendar className="w-4 h-4" /> REQUEST AN APPOINTMENT
            </Link>
            <a
              href="tel:08053587646"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white font-bold text-sm hover:bg-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-500" /> CALL 08053587646
            </a>
          </div>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-navy-500">Related Health Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((rel) => (
                <div key={rel.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-card transition-all p-4 space-y-3">
                  <h4 className="font-bold text-navy-500 text-base line-clamp-2">
                    <Link to={`/health-information/${rel.slug}`} className="hover:text-teal-600 transition-colors">
                      {rel.title}
                    </Link>
                  </h4>
                  <p className="text-slate-600 text-xs line-clamp-2">{rel.excerpt}</p>
                  <Link
                    to={`/health-information/${rel.slug}`}
                    className="inline-flex items-center gap-1 text-teal-600 font-bold text-xs"
                  >
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
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
