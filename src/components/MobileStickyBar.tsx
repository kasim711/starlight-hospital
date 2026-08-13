import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 p-3 sm:hidden shadow-card-hover pb-safe">
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        <a
          href="tel:08053587646"
          className="flex items-center justify-center gap-2 bg-navy-500 text-white font-extrabold text-xs py-3 px-3 rounded-xl shadow-sm active:bg-navy-600 transition-colors uppercase tracking-wider"
        >
          <Phone className="w-4 h-4 text-gold-500" />
          <span>CALL NOW</span>
        </a>
        <Link
          to="/appointment"
          className="flex items-center justify-center gap-2 bg-teal-500 text-white font-extrabold text-xs py-3 px-3 rounded-xl shadow-sm active:bg-teal-600 transition-colors uppercase tracking-wider"
        >
          <Calendar className="w-4 h-4" />
          <span>APPOINTMENT</span>
        </Link>
      </div>
    </div>
  );
};
