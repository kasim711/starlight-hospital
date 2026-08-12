import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createArticleApi, updateArticleApi, fetchAdminArticles, fetchCategories } from '../../services/api';
import { Category } from '../../types';
import { 
  Save, ArrowLeft, Eye, CheckCircle, AlertCircle, FileText, Sparkles 
} from 'lucide-react';

export const AdminArticleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'General Health',
    featured_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    image_alt: '',
    author: 'Starlight Medical Team',
    status: 'Published' as 'Draft' | 'Published' | 'Archived' | 'Pending Review',
    medical_review_status: 'Reviewed' as 'Not Required' | 'Needs Review' | 'Reviewed',
    reading_time: 4,
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchCategories().then(d => setCategories(d.categories)).catch(err => console.error(err));

    if (isEditMode) {
      setLoading(true);
      fetchAdminArticles()
        .then(data => {
          const found = data.articles.find(a => a.id === parseInt(id));
          if (found) {
            setFormData({
              title: found.title,
              slug: found.slug,
              excerpt: found.excerpt,
              content: found.content,
              category: found.category,
              featured_image: found.featured_image,
              image_alt: found.image_alt,
              author: found.author,
              status: (found.status as any) || 'Published',
              medical_review_status: found.medical_review_status,
              reading_time: found.reading_time || 4,
            });
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      if (isEditMode) {
        await updateArticleApi(parseInt(id!), formData);
      } else {
        await createArticleApi(formData);
      }
      navigate('/admin/articles');
    } catch (err: any) {
      setError(err.message || 'Failed to save article.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-slate-500 font-medium">Loading article details...</div>;
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-16">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <Link to="/admin/articles" className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-navy-500 mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Articles List
          </Link>
          <h1 className="text-2xl font-extrabold text-navy-500">
            {isEditMode ? 'Edit Health Article' : 'Create New Health Article'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-teal-600" />
            {showPreview ? 'Hide Preview' : 'Front-end Preview'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Front-End Live Preview Modal */}
      {showPreview && (
        <div className="bg-white p-8 rounded-3xl border-2 border-teal-500 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-4 h-4" /> Front-end Live Preview Mode
            </span>
            <button onClick={() => setShowPreview(false)} className="text-xs text-slate-500 font-bold hover:text-red-500">Close Preview</button>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center gap-2">
              <span className="bg-teal-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">{formData.category}</span>
              {formData.medical_review_status === 'Reviewed' && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Medically Reviewed
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold text-navy-500">{formData.title || 'Untitled Article'}</h2>
            <div className="text-xs text-slate-500 font-medium">By {formData.author} • {formData.reading_time} min read</div>
            <img src={formData.featured_image} alt={formData.image_alt || 'Preview'} className="w-full h-64 object-cover rounded-2xl" />
            <div className="bg-slate-100 p-4 rounded-xl italic text-slate-700 text-sm">{formData.excerpt}</div>
            <div className="prose-article text-sm" dangerouslySetInnerHTML={{ __html: formData.content || '<p>Article body content will render here...</p>' }} />
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Post Title */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Post Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Practical Health Tips for Parents of Young Children"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold text-navy-500"
            />
          </div>

          {/* URL Slug */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              URL Slug (Editable)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="Auto-generated from title if left blank"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-mono text-slate-700"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-semibold bg-white"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Excerpt */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short 20-40 word summary shown on article listing cards..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
            ></textarea>
          </div>

          {/* Article Body */}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Article Body Content (HTML supported) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="<h2>Heading</h2><p>Write your article content using HTML formatting...</p>"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-mono leading-relaxed"
            ></textarea>
          </div>

          {/* Featured Image URL */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Featured Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.featured_image}
              onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Image Alt Text */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Image Alt Text <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.image_alt}
              onChange={(e) => setFormData({ ...formData, image_alt: e.target.value })}
              placeholder="Descriptive text for accessibility"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Reading Time */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Estimated Reading Time (minutes)
            </label>
            <input
              type="number"
              min="1"
              max="60"
              value={formData.reading_time}
              onChange={(e) => setFormData({ ...formData, reading_time: parseInt(e.target.value) || 4 })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
            />
          </div>

          {/* Publish Status */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Publish Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-semibold bg-white"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Medical Review Status */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase tracking-wider">
              Medical Review Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.medical_review_status}
              onChange={(e) => setFormData({ ...formData, medical_review_status: e.target.value as any })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs font-semibold bg-white"
            >
              <option value="Not Required">Not Required</option>
              <option value="Needs Review">Needs Review</option>
              <option value="Reviewed">Reviewed (Shows Medically Reviewed Badge)</option>
            </select>
          </div>

        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-4">
          <Link
            to="/admin/articles"
            className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-md disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving Article...' : isEditMode ? 'Update Article' : 'Publish Article'}
          </button>
        </div>

      </form>
    </div>
  );
};
