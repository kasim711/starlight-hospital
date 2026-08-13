import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8 font-sans">
      <div className="space-y-3">
        <span className="badge-teal">WEBSITE TERMS</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-500 flex items-center gap-3 tracking-tight">
          <FileText className="w-8 h-8 text-teal-600" /> Terms of Use & Medical Disclaimer
        </h1>
        <p className="text-slate-500 text-xs font-semibold">Starlight Hospital • DEO MEDICE</p>
      </div>

      <div className="healthcare-card p-8 sm:p-10 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
        
        {/* Prominent Medical Disclaimer Box */}
        <div className="bg-gold-50/80 border-l-4 border-gold-500 p-6 rounded-r-2xl space-y-2 shadow-sm">
          <div className="flex items-center gap-2 text-gold-800 font-bold text-sm uppercase tracking-wider">
            <AlertCircle className="w-5 h-5 text-gold-600" />
            Mandatory Medical Disclaimer
          </div>
          <p className="text-slate-800 text-sm sm:text-base leading-relaxed italic">
            “The health information published on this website is provided for general educational purposes and is not a substitute for an examination, diagnosis, or personalised medical advice from a qualified healthcare professional. If you have a health concern, contact Starlight Hospital or an appropriate healthcare provider.”
          </p>
        </div>

        <section className="space-y-3 pt-4">
          <h2 className="text-xl font-extrabold text-navy-500 tracking-tight">1. Website Use</h2>
          <p>
            By accessing and browsing the Starlight Hospital website, you agree to comply with these terms. Content provided on this website is intended for informational and educational purposes only.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-xl font-extrabold text-navy-500 tracking-tight">2. Appointment Requests</h2>
          <p>
            Submitting an appointment request via the website form does not constitute a confirmed appointment booking. Appointments are subject to hospital availability and must be confirmed directly by Starlight Hospital representatives via telephone or in person.
          </p>
        </section>

        <section className="space-y-3 pt-6 border-t border-slate-100">
          <h2 className="text-xl font-extrabold text-navy-500 tracking-tight">3. Emergency Situations</h2>
          <p>
            This website and its online forms are not monitored for emergency medical triage. If you or a family member are experiencing a medical emergency, please proceed immediately to the nearest emergency healthcare facility or contact emergency phone numbers directly.
          </p>
        </section>

      </div>
    </div>
  );
};
