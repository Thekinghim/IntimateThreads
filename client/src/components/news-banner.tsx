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

  const dismissAll = () => {
    const allIds = newsItems.map(item => item.id);
    const newDismissed = new Set([...dismissedItems, ...allIds]);
    setDismissedItems(newDismissed);
    localStorage.setItem('dismissedNews', JSON.stringify(Array.from(newDismissed)));
  };

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
    <div className="bg-gradient-to-r from-[#F5F1E8] to-white border-b border-[#E8E4D6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            {visibleItems.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between group"
              >
                <div className="flex-1">
                  <div 
                    className="text-sm sm:text-base font-medium leading-relaxed"
                    style={{ color: item.color }}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-4 opacity-70 hover:opacity-100 p-1 h-6 w-6"
                  onClick={() => dismissItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          {visibleItems.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              className="ml-4 text-xs border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-white"
              onClick={dismissAll}
            >
              Stäng alla
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}