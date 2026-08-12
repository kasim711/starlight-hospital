import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-8">
      <div className="space-y-3">
        <span className="text-teal-600 font-bold text-xs uppercase tracking-wider">LEGAL DISCLOSURE</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-500 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-teal-500" /> Privacy Policy
        </h1>
        <p className="text-slate-500 text-sm">Last updated: August 2026 • Starlight Hospital</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy-500">1. Information We Collect</h2>
          <p>
            Starlight Hospital collects personal information submitted voluntarily through our public website contact and appointment request forms. This information may include:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Full Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>Requested medical service or nature of enquiry</li>
            <li>Preferred date and time for consultations</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-500">2. Why Information Is Collected</h2>
          <p>
            Personal data is collected strictly for administrative and communication purposes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>To process and confirm appointment requests.</li>
            <li>To respond to service enquiries submitted by prospective patients or family members.</li>
            <li>To provide directions or administrative guidance regarding visits to Starlight Hospital.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-500">3. Data Access & Protection</h2>
          <p>
            Your information is accessible only to authorised Starlight Hospital administrative and patient care coordination staff. We implement secure session controls and data encryption to prevent unauthorised access. We do not sell, rent, or trade personal information to third parties.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-navy-500">4. Contacting Us Regarding Your Data</h2>
          <p>
            If you wish to update, review, or request deletion of personal information submitted to Starlight Hospital, please contact us directly:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl text-xs sm:text-sm font-medium space-y-1 text-slate-800">
            <div><strong>Starlight Hospital</strong></div>
            <div>Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, Imowo-Nla Road, Jajo, Ikorodu, Lagos</div>
            <div>Phone: 08053587646 | 07079333090</div>
          </div>
        </section>

      </div>
    </div>
  );
};
