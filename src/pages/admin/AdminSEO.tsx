import React from 'react';
import { Search, ExternalLink, ShieldCheck } from 'lucide-react';

export const AdminSEO: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">SEO & Metadata Controls</h1>
          <p className="text-sm text-slate-500 mt-1">Review local search optimization, structured data, dynamic XML sitemaps, and robots.txt rules.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6 text-sm text-slate-700">
        <h2 className="text-lg font-bold text-navy-500 border-b border-slate-100 pb-3">Active Search Engine Configurations</h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-navy-500 block">Homepage SEO Title</span>
            <div className="font-mono text-xs text-teal-700">Starlight Hospital | Healthcare Services in Jajo, Ikorodu, Lagos</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-navy-500 block">Homepage Meta Description</span>
            <p className="text-xs text-slate-600">Starlight Hospital in Jajo, Ikorodu, Lagos provides general medical consultation, obstetrics & gynaecology, paediatrics, surgery, health education and counselling, and laboratory/diagnostic services.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-navy-500 block">Structured Data (JSON-LD)</span>
            <p className="text-xs text-slate-600">Local Healthcare Business schema (MedicalClinic) active on public HTML head.</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy-500 text-white font-bold text-xs hover:bg-navy-600"
          >
            <ExternalLink className="w-3.5 h-3.5 text-gold-500" /> View Dynamic XML Sitemap
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-600" /> View robots.txt Rules
          </a>
        </div>
      </div>
    </div>
  );
};
