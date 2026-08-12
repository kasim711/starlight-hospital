import React from 'react';
import { Shield, Phone, MapPin, CheckCircle, Info } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-navy-500">Site Settings & Hospital Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Verified hospital details and system parameters.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-card space-y-6 text-sm text-slate-700">
        <h2 className="text-lg font-bold text-navy-500 border-b border-slate-100 pb-3">Verified Hospital Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Hospital Name</span>
            <div className="font-bold text-navy-500 text-base">Starlight Hospital</div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Hospital Motto</span>
            <div className="font-bold text-gold-600 text-base">DEO MEDICE</div>
          </div>

          <div className="space-y-1 md:col-span-2">
            <span className="text-xs font-bold text-slate-500 uppercase">Official Address</span>
            <div className="font-medium text-slate-800">
              Block A Plot 6 & 19, Jajo Phase 2, Crystal Estate, along Imowo-Nla Road, Jajo, Ikorodu, Lagos.
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Primary Phone</span>
            <div className="font-bold text-teal-600">08053587646</div>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase">Secondary Phone</span>
            <div className="font-bold text-teal-600">07079333090</div>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start gap-3 mt-6">
          <Info className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-navy-500 block">Specification Rule</span>
            <p className="text-slate-600 leading-relaxed">
              Hospital location and contact information match the official specification. No unverified claims or operating hours are displayed without hospital confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
