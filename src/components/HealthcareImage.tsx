import React, { useState } from 'react';

interface HealthcareImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  fallbackSrc?: string;
  zoomOnHover?: boolean;
  containerClassName?: string;
}

export const HealthcareImage: React.FC<HealthcareImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-video',
  fallbackSrc = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000',
  zoomOnHover = true,
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectRatio} ${containerClassName}`}>
      {/* Loading Skeleton */}
      {!loaded && !error && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Starlight Healthcare</span>
        </div>
      )}

      {/* Image Element */}
      <img
        src={error ? fallbackSrc : src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        } ${zoomOnHover ? 'group-hover:scale-105' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};
