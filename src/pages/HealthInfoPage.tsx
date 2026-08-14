import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles, fetchCategories } from '../services/api';
import { Article, Category } from '../types';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
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
    <div className="bg-white min-h-screen font-sans pb-16">
      
      {/* Hero Header */}
      <section ref={heroRef} className="py-16 md:py-24 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2">Health Information</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-navy-900 mb-4">
          Health Information for You and Your Family
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Practical health education, hospital updates and general information published by Starlight Hospital.
        </p>
      </section>

      {/* Search & Category Filters */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-healthcare pl-12"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === ''
                  ? 'bg-navy-900 text-white'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              All Topics
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'bg-navy-900 text-white'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Area */}
      <section ref={contentRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="space-y-6">
            <div className="animate-pulse bg-slate-100 h-64 rounded-2xl"></div>
            <div className="animate-pulse bg-slate-100 h-32 rounded-2xl"></div>
            <div className="animate-pulse bg-slate-100 h-32 rounded-2xl"></div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-semibold text-navy-900">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search criteria or topic filter.</p>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Featured Article Card */}
            {featuredArticle && !selectedCategory && !searchQuery && (
              <Link 
                to={`/health-information/${featuredArticle.slug}`}
                className="group block overflow-hidden rounded-2xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative h-64 md:h-auto">
                    <HealthcareImage
                      src={featuredArticle.featured_image}
                      alt={featuredArticle.image_alt || featuredArticle.title}
                      aspectRatio="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center bg-slate-50">
                    <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                      <span className="text-teal-600 font-semibold">{featuredArticle.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredArticle.reading_time} min read</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-navy-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-slate-600 mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <span className="text-teal-600 font-semibold flex items-center gap-2">
                      Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            )}

            {/* Other Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(featuredArticle && !selectedCategory && !searchQuery ? remainingArticles : articles).map((art) => (
                <Link
                  key={art.id}
                  to={`/health-information/${art.slug}`}
                  className="block p-6 rounded-2xl border border-slate-100 bg-white hover:border-teal-100 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                    <span className="text-teal-600 font-semibold">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {art.reading_time} min read</span>
                  </div>
                  <h3 className="text-xl font-semibold text-navy-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-slate-600 line-clamp-2">
                    {art.excerpt}
                  </p>
                </Link>
              ))}
            </div>

          </div>
        )}
      </section>
    </div>
  );
};
