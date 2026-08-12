import React, { useEffect, useState } from 'react';
import { Stethoscope, Save, CheckCircle, Edit3 } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    fetch('/api/services')
      .then(res => res.json())
      .then(d => {
        setServices(d.services || []);
        if (d.services && d.services.length > 0 && !selectedService) {
          setSelectedService(d.services[0]);
        } else if (selectedService) {
          const updated = d.services.find((s: any) => s.id === selectedService.id);
          if (updated) setSelectedService(updated);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;
    try {
      setSaving(true);
      const token = localStorage.getItem('starlight_token');
      const res = await fetch(`/api/services/${selectedService.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(selectedService)
      });
      if (!res.ok) throw new Error('Failed to update service');
      setFeedback(`Service "${selectedService.title}" updated successfully.`);
      loadData();
      setTimeout(() => setFeedback(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Error updating service');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Services CMS</h1>
          <p className="text-sm text-slate-500 mt-1">Manage core hospital service descriptions, hero headings, expectations, and FAQs.</p>
        </div>
      </div>

      {feedback && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" /> {feedback}
        </div>
      )}

      {/* Services Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedService(s)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
              selectedService?.id === s.id
                ? 'bg-navy-500 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Service Edit Form */}
      {selectedService && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">Service Title</label>
              <input
                type="text"
                value={selectedService.title || ''}
                onChange={(e) => setSelectedService({ ...selectedService, title: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">Hero Heading</label>
              <input
                type="text"
                value={selectedService.hero_heading || ''}
                onChange={(e) => setSelectedService({ ...selectedService, hero_heading: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">Short Description (Snapshot Card)</label>
              <input
                type="text"
                value={selectedService.short_desc || ''}
                onChange={(e) => setSelectedService({ ...selectedService, short_desc: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">Full Description</label>
              <textarea
                rows={3}
                value={selectedService.description || ''}
                onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              ></textarea>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">What to Expect</label>
              <textarea
                rows={3}
                value={selectedService.what_to_expect || ''}
                onChange={(e) => setSelectedService({ ...selectedService, what_to_expect: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              ></textarea>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold text-navy-500 uppercase">Who This Service Is For</label>
              <textarea
                rows={2}
                value={selectedService.who_it_is_for || ''}
                onChange={(e) => setSelectedService({ ...selectedService, who_it_is_for: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm"
              ></textarea>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-teal-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-teal-600 transition-colors shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Update Service Content'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
