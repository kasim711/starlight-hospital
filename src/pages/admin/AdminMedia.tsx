import React, { useEffect, useState } from 'react';
import { Image, Plus, Trash2, CheckCircle, ExternalLink } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    const token = localStorage.getItem('starlight_token');
    fetch('/api/media', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(d => setMediaList(d.media || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          url: url.trim(),
          alt_text: altText.trim() || 'Starlight Hospital Media Asset',
          original_name: 'Approved Image',
          filename: 'image-' + Date.now()
        })
      });
      if (!res.ok) throw new Error('Failed to add media asset');
      setUrl('');
      setAltText('');
      setFeedback('Media asset registered in library.');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error adding media');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete media asset?')) return;
    try {
      const token = localStorage.getItem('starlight_token');
      const res = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to delete media asset');
      setFeedback('Media asset deleted.');
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error deleting media');
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1">Manage approved imagery and image alt text for health articles and website pages.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Register New Asset Form */}
      <form onSubmit={handleAddMedia} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <h3 className="font-bold text-navy-500 text-sm uppercase tracking-wider">Add Approved Image Asset</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            required
            placeholder="Image Asset URL (e.g. https://images.unsplash.com/...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            required
            placeholder="Required Image Alt Text (e.g. Doctor consulting with patient)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="px-4 py-3 rounded-xl border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" /> Register Media Asset
        </button>
      </form>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center p-8 text-slate-500">Loading media library...</div>
        ) : mediaList.length === 0 ? (
          <div className="col-span-3 bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
            <Image className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="font-bold text-navy-500 text-base">Media Library Empty</h4>
            <p className="text-xs text-slate-500">Add image URLs above to manage approved site assets.</p>
          </div>
        ) : (
          mediaList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card p-4 space-y-3">
              <div className="h-40 rounded-xl overflow-hidden relative border border-slate-100">
                <img src={item.url} alt={item.alt_text} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-navy-500 text-xs block truncate">{item.original_name}</span>
                <p className="text-slate-500 text-[11px] italic line-clamp-1">Alt: "{item.alt_text}"</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-teal-600 font-bold hover:underline flex items-center gap-1">
                  <ExternalLink className="w-3.5 h-3.5" /> View Original
                </a>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 font-bold hover:underline flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
