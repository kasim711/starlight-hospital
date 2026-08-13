import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchCategories } from '../services/api';
import { Article, Category } from '../types';
import { Search, Clock, ArrowRight, BookOpen, AlertCircle } from 'lucide-react';

export const HealthInfoPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchArticles(selectedCategory || undefined, searchQuery || undefined)
      .then(data => {
        if (data && Array.isArray(data.articles)) {
          setArticles(data.articles);
        } else {
          setArticles([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div className="space-y-16 pb-16 font-sans">
      
      {/* Hero Header */}
      <section className="bg-navy-500 text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C49A4A_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="badge-gold">
            HEALTH EDUCATION HUB
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Health Information for You and Your Family
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            Practical health education, hospital updates, and general information published by Starlight Hospital.
          </p>
        </div>
      </section>

      {/* Search & Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search health topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-healthcare pl-11 text-xs"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === ''
                  ? 'bg-navy-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-navy-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(n => (
              <div key={n} className="animate-pulse bg-slate-200 h-72 rounded-2xl"></div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3 shadow-sm">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-extrabold text-navy-500 tracking-tight">No articles found</h3>
            <p className="text-slate-500 text-sm font-normal">Try adjusting your search criteria or topic filter.</p>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Featured Article Card */}
            {featuredArticle && !selectedCategory && !searchQuery && (
              <div className="healthcare-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 group">
                <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                  <img
                    src={featuredArticle.featured_image}
                    alt={featuredArticle.image_alt || featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-teal-500 text-white font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                    Featured Article
                  </span>
                </div>
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                      <span className="text-teal-600 uppercase font-bold">{featuredArticle.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.reading_time} min read</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-500 group-hover:text-teal-600 transition-colors tracking-tight">
                      <Link to={`/health-information/${featuredArticle.slug}`}>{featuredArticle.title}</Link>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                  <div>
                    <Link
                      to={`/health-information/${featuredArticle.slug}`}
                      className="btn-teal text-xs uppercase tracking-wider"
                    >
                      Read Full Article <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredArticle && !selectedCategory && !searchQuery ? remainingArticles : articles).map((art) => (
                <article
                  key={art.id}
                  className="healthcare-card overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={art.featured_image}
                        alt={art.image_alt || art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-navy-500/95 text-white text-xs font-bold px-3 py-1 rounded-md backdrop-blur-md shadow-sm">
                        {art.category}
                      </span>
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-teal-600" /> {art.reading_time} min</span>
                        <span>•</span>
                        <span>{art.author}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-navy-500 group-hover:text-teal-600 transition-colors line-clamp-2 tracking-tight">
                        <Link to={`/health-information/${art.slug}`}>{art.title}</Link>
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed font-normal">
                        {art.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-4 border-t border-slate-100">
                    <Link
                      to={`/health-information/${art.slug}`}
                      className="inline-flex items-center gap-1.5 text-teal-600 font-bold text-xs uppercase tracking-wider hover:text-navy-500 transition-colors"
                    >
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

          </div>
        )}
      </section>

      {/* Educational Disclaimer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/90 border border-slate-200/80 rounded-2xl p-6 flex items-start gap-4 text-slate-700 shadow-sm">
          <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-extrabold text-navy-500 block uppercase tracking-wider">General Educational Notice</span>
            <p className="leading-relaxed font-normal">
              The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional. If you have a health concern, contact Starlight Hospital or an appropriate healthcare provider.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
