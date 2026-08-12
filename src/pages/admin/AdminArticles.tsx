import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAdminArticles, deleteArticleApi, fetchCategories } from '../../services/api';
import { Article, Category } from '../../types';
import { 
  FileText, Plus, Search, Edit3, Trash2, CheckCircle, Clock, Eye, AlertCircle 
} from 'lucide-react';

export const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    fetchAdminArticles(selectedStatus || undefined, selectedCategory || undefined, searchQuery || undefined)
      .then(data => setArticles(data.articles))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories().then(d => setCategories(d.categories)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedStatus, selectedCategory, searchQuery]);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteArticleApi(id);
      setFeedback('Article deleted successfully');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete article');
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Health Information / Article CMS</h1>
          <p className="text-sm text-slate-500 mt-1">Publish, edit, draft, and manage health education articles for Starlight Hospital.</p>
        </div>

        <Link
          to="/admin/articles/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 text-white font-bold text-sm hover:bg-teal-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Article
        </Link>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading articles database...</div>
        ) : articles.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <FileText className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-navy-500">No articles match your criteria</h3>
            <p className="text-xs text-slate-500">Create a new post or clear filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                  <th className="p-4 pl-6">Title & Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Publish Status</th>
                  <th className="p-4">Medical Review</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((art) => (
                  <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="p-4 pl-6 space-y-1">
                      <div className="font-bold text-navy-500 text-sm">{art.title}</div>
                      <div className="text-[11px] text-teal-600 font-semibold">{art.category}</div>
                    </td>

                    <td className="p-4 font-medium text-slate-600">
                      {art.author}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        art.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {art.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        art.medical_review_status === 'Reviewed'
                          ? 'bg-teal-100 text-teal-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {art.medical_review_status}
                      </span>
                    </td>

                    <td className="p-4 text-slate-500">
                      {art.published_at ? new Date(art.published_at).toLocaleDateString('en-US') : 'Draft'}
                    </td>

                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {art.status === 'published' && (
                          <Link
                            to={`/health-information/${art.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-navy-500 hover:bg-slate-100"
                            title="Preview on live site"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        )}
                        <Link
                          to={`/admin/articles/${art.id}/edit`}
                          className="p-1.5 rounded-lg text-teal-600 hover:bg-teal-50"
                          title="Edit article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(art.id, art.title)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                          title="Delete article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
