import { useEffect, useState } from 'react';

interface UseImagePreloaderOptions {
  images: string[];
  priority?: boolean;
}

export function useImagePreloader({ images, priority = false }: UseImagePreloaderOptions) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    const loadImage = (src: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => reject(src);
        img.src = src;
        
        // Set priority attributes for critical images
        if (priority) {
          img.loading = 'eager';
          img.fetchPriority = 'high';
        }
      });
    };

    const preloadImages = async () => {
      const results = await Promise.allSettled(
        images.map(src => loadImage(src))
      );
      
      const successful = results
        .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
        .map(result => result.value);
      
      setLoadedImages(new Set(successful));
      setIsLoading(false);
    };

    preloadImages();
  }, [images, priority]);

  return { loadedImages, isLoading, isImageLoaded: (src: string) => loadedImages.has(src) };
}