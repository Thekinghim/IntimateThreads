import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import type { News } from "@shared/schema";

interface NewsItem extends News {}

export default function NewsBanner() {
  const [dismissedItems, setDismissedItems] = useState<Set<string>>(new Set());

  const { data: newsItems = [] } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  useEffect(() => {
    // Load dismissed items from localStorage
    const dismissed = localStorage.getItem('dismissedNews');
    if (dismissed) {
      setDismissedItems(new Set(JSON.parse(dismissed)));
    }
  }, []);

  const dismissItem = (id: string) => {
    const newDismissed = new Set([...dismissedItems, id]);
    setDismissedItems(newDismissed);
    localStorage.setItem('dismissedNews', JSON.stringify(Array.from(newDismissed)));
  };

  const visibleItems = newsItems.filter(item => 
    item.isActive && !dismissedItems.has(item.id)
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="w-screen bg-gradient-to-r from-[#F5F1E8] to-white border-b border-[#E8E4D6] relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="w-full py-3 relative">
        <div className="flex items-center justify-center">
          <div className="flex-1 text-center max-w-4xl mx-auto px-12">
            {visibleItems.map((item, index) => (
              <div key={item.id} className="relative">
                <div className="flex items-center justify-center group">
                  <div className="flex-1 text-center">
                    <div 
                      className="text-sm sm:text-base font-medium leading-relaxed"
                      style={{ color: item.color }}
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
                {index < visibleItems.length - 1 && (
                  <hr className="my-2 border-[#064F8C]/20 absolute left-0 right-0 w-screen ml-[-50vw] mr-[-50vw]" />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Stäng-knappar - absolut positionerade längst ut till höger */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 space-y-2">
          {visibleItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className="opacity-70 hover:opacity-100 p-1 h-6 w-6 block"
              onClick={() => dismissItem(item.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}