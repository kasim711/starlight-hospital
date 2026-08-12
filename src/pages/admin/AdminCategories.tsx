import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/api';
import { Category } from '../../types';
import { Tag, Plus, Trash2, Edit3, CheckCircle, AlertCircle } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCatName, setNewCatName] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    fetchCategories()
      .then(d => setCategories(d.categories))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: newCatName.trim() })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add category');
      setNewCatName('');
      setFeedback('Category added successfully.');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error adding category');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete category?')) return;
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete category');
      setFeedback('Category deleted.');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error deleting category');
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Content Categories</h1>
          <p className="text-sm text-slate-500 mt-1">Manage health education categories for article classification and filtering.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-center">
        <input
          type="text"
          required
          placeholder="New Category Name (e.g. Preventive Health)"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
        />
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </form>

      {/* Categories List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading categories...</div>
        ) : (
          <div className="divide-y divide-slate-100">
            {categories.map((c) => (
              <div key={c.id} className="p-4 sm:p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold text-xs">
                    <Tag className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-navy-500 text-sm">{c.name}</span>
                    <span className="block text-xs font-mono text-slate-400">/{c.slug}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
