import React, { useEffect, useState } from 'react';
import { FileText, Save, CheckCircle } from 'lucide-react';

export const AdminPages: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('home');
  const [pageData, setPageData] = useState<any>(null);
  const [jsonString, setJsonString] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('starlight_token');
    fetch('/api/pages', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(d => setPages(d.pages || []))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/pages/${selectedSlug}`)
      .then(res => res.json())
      .then(d => {
        setPageData(d.page);
        setJsonString(JSON.stringify(d.page.content, null, 2));
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedSlug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const parsedContent = JSON.parse(jsonString);
      const token = localStorage.getItem('starlight_token');
      const res = await fetch(`/api/pages/${selectedSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          title: pageData.title,
          content: parsedContent,
          meta_title: pageData.meta_title,
          meta_description: pageData.meta_description
        })
      });
      if (!res.ok) throw new Error('Failed to update page content');
      setFeedback(`Editable content for "${pageData.title}" updated.`);
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'JSON Syntax Error or Update Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Dynamic Pages CMS</h1>
          <p className="text-sm text-slate-500 mt-1">Manage website section headlines, hero copy, and editable page content dynamically.</p>
        </div>

        <select
          value={selectedSlug}
          onChange={(e) => setSelectedSlug(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-navy-500 bg-white"
        >
          <option value="home">Home Page Copy</option>
          <option value="about">About Page Copy</option>
        </select>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading page content...</div>
      ) : (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase">Page Title</label>
            <input
              type="text"
              value={pageData?.title || ''}
              onChange={(e) => setPageData({ ...pageData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-navy-500 uppercase">
              Editable Section Copy (JSON Format)
            </label>
            <textarea
              rows={14}
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-xs text-slate-800 leading-relaxed"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Update Page Content'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
