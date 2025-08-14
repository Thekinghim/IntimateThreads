// Performance optimization utilities

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

// Throttle function for performance optimization
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy loading with Intersection Observer
export function createLazyLoader(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1,
    ...options,
  });
}

// Resource preloader
export function preloadResource(href: string, as: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload ${href}`));
    document.head.appendChild(link);
  });
}

// Preload critical images
export function preloadImages(imageUrls: string[]): Promise<void[]> {
  return Promise.all(
    imageUrls.map(url => preloadResource(url, 'image'))
  );
}

// Memory usage monitoring
export function getMemoryUsage(): any | null {
  if ('memory' in performance) {
    return (performance as any).memory;
  }
  return null;
}

// Performance marking utilities
export function markPerformance(name: string): void {
  if ('mark' in performance) {
    performance.mark(name);
  }
}

export function measurePerformance(name: string, startMark: string, endMark: string): void {
  if ('measure' in performance) {
    performance.measure(name, startMark, endMark);
  }
}

// FPS monitoring
export function measureFPS(callback: (fps: number) => void): () => void {
  let frames = 0;
  let lastTime = performance.now();
  let animationId: number;

  function tick(time: number) {
    frames++;
    const elapsed = time - lastTime;
    
    if (elapsed >= 1000) {
      const fps = Math.round((frames * 1000) / elapsed);
      callback(fps);
      frames = 0;
      lastTime = time;
    }
    
    animationId = requestAnimationFrame(tick);
  }

  animationId = requestAnimationFrame(tick);
  
  return () => cancelAnimationFrame(animationId);
}

// Critical resource loading
export const criticalResources = {
  fonts: [
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Lora:wght@300;400;500;600;700&display=swap'
  ],
  heroImages: [
    '/attached_assets/Clara-Gallery-2_1754772829712.webp',
    '/attached_assets/cj4_1755033026450.jpg'
  ]
};

// Preload critical resources on app start
export function preloadCriticalResources(): Promise<void[]> {
  const fontPromises = criticalResources.fonts.map(url => 
    preloadResource(url, 'style')
  );
  
  const imagePromises = criticalResources.heroImages.map(url => 
    preloadResource(url, 'image')
  );
  
  return Promise.all([...fontPromises, ...imagePromises]);
}