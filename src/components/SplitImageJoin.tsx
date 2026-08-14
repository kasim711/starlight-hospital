import React from 'react';
import { HealthcareImage } from './HealthcareImage';

interface SplitImageJoinProps {
  leftSrc: string;
  rightSrc: string;
  leftAlt?: string;
  rightAlt?: string;
  aspectRatio?: string;
  className?: string;
}

export const SplitImageJoin: React.FC<SplitImageJoinProps> = ({
  leftSrc,
  rightSrc,
  leftAlt = 'Starlight Healthcare Left',
  rightAlt = 'Starlight Healthcare Right',
  aspectRatio = 'aspect-[4/3]',
  className = '',
}) => {
  return (
    <div className={`split-join-container shadow-md border border-slate-100 bg-slate-100 ${className}`}>
      {/* Left Half — Slides in from Left */}
      <div className="split-join-left relative overflow-hidden h-full">
        <HealthcareImage
          src={leftSrc}
          alt={leftAlt}
          aspectRatio={aspectRatio}
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10"></div>
      </div>

      {/* Right Half — Slides in from Right */}
      <div className="split-join-right relative overflow-hidden h-full">
        <HealthcareImage
          src={rightSrc}
          alt={rightAlt}
          aspectRatio={aspectRatio}
          containerClassName="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
      </div>
    </div>
  );
};
