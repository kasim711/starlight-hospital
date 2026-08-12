import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Calendar } from 'lucide-react';

export const MobileStickyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 sm:hidden shadow-2xl">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="tel:08053587646"
          className="flex items-center justify-center gap-1.5 bg-navy-500 text-white font-bold text-xs py-3 px-2 rounded-lg shadow-sm active:bg-navy-600 transition-colors"
        >
          <Phone className="w-4 h-4 text-gold-500" />
          <span>CALL NOW</span>
        </a>
        <Link
          to="/appointment"
          className="flex items-center justify-center gap-1.5 bg-teal-500 text-white font-bold text-xs py-3 px-2 rounded-lg shadow-sm active:bg-teal-600 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>REQUEST APPOINTMENT</span>
        </Link>
      </div>
    </div>
  );
};
