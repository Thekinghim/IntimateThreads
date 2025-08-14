import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function LazyImage({ 
  src, 
  alt, 
  className = '',
  width,
  height,
  fallback = "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400",
  onLoad,
  onError
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' } // Start loading when image is 50px away from viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ minHeight: height || 'auto' }}
    >
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#F5F1E8] to-[#E5E0D8] animate-pulse"
          style={{ height: height || '100%' }}
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? fallback : src}
          alt={alt}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          decoding="async"
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}