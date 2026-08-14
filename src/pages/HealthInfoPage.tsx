import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchCategories } from '../services/api';
import { Article, Category } from '../types';
import { Search, Clock, ArrowRight } from 'lucide-react';
import { HealthcareImage } from '../components/HealthcareImage';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const HealthInfoPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const heroRef = useScrollReveal();
  const contentRef = useScrollReveal();

  useEffect(() => {
    fetchCategories()
      .then(data => {
        if (data && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(() => {});
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
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const remainingArticles = articles.length > 1 ? articles.slice(1) : [];

  return (
    <div>
      
      {/* Hero Header with Parallax Background */}
      <section 
        ref={heroRef} 
        className="bg-parallax relative min-h-[38vh] flex items-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1920')` }}
      >
        <div className="absolute inset-0 bg-navy-900/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 text-center py-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-400">Health Education Hub</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white">
            Health Information for You and Your Family
          </h1>
          <p className="text-slate-200 text-base max-w-xl mx-auto leading-relaxed">
            Practical health education, hospital updates and general information published by Starlight Hospital.
          </p>
        </div>
      </section>

      {/* Search & Category Filters */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-healthcare pl-11 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === ''
                  ? 'bg-navy-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-navy-500 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Container */}
      <section ref={contentRef} className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="space-y-6">
            <div className="bg-slate-100 h-72 rounded-xl animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-100 h-40 rounded-xl animate-pulse"></div>
              <div className="bg-slate-100 h-40 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Article Anchor */}
            {featuredArticle && (
              <Link
                to={`/health-information/${featuredArticle.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="lg:col-span-7 h-64 sm:h-80 img-hover-zoom relative overflow-hidden">
                  <HealthcareImage
                    src={featuredArticle.featured_image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000'}
                    alt={featuredArticle.title}
                    aspectRatio="h-full w-full"
                  />
                  <div className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded">
                    Featured Guide
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="font-medium text-teal-600 uppercase">{featuredArticle.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featuredArticle.reading_time || 5} min read</span>
                  </div>

                  <h2 className="text-xl font-semibold text-navy-500 group-hover:text-teal-600 transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 group-hover:gap-2 transition-all">
                      Read full article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Secondary Articles Grid */}
            {remainingArticles.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-navy-500 mb-6 border-b border-slate-100 pb-3">
                  More Health Guides & Updates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {remainingArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/health-information/${article.slug}`}
                      className="group bg-white rounded-xl border border-slate-100 p-5 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="font-medium text-teal-600 uppercase">{article.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.reading_time || 4} min</span>
                        </div>
                        <h4 className="text-sm font-semibold text-navy-500 group-hover:text-teal-600 transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">Published by Starlight</span>
                        <span className="text-xs font-medium text-teal-600 group-hover:gap-1 inline-flex items-center gap-0.5 transition-all">
                          Read <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

    </div>
  );
};
