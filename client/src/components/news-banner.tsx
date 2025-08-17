import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
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

  // Function to replace model names with links
  const addModelLinks = (content: string) => {
    const modelLinks: { [key: string]: string } = {
      'Emma': '/profile/emma',
      'Sofia': '/profile/sofia', 
      'Lina': '/profile/lina',
      'Anna': '/profile/anna',
      'Maja': '/profile/maja'
    };

    let linkedContent = content;
    
    Object.entries(modelLinks).forEach(([name, url]) => {
      const regex = new RegExp(`(<strong[^>]*>)?(${name})(</strong>)?`, 'gi');
      linkedContent = linkedContent.replace(regex, (match, openTag, modelName, closeTag) => {
        const linkElement = `<a href="${url}" style="text-decoration: underline; font-weight: bold;">${modelName}</a>`;
        return (openTag || '') + linkElement + (closeTag || '');
      });
    });
    
    return linkedContent;
  };

  const visibleItems = newsItems.filter(item => 
    item.isActive && !dismissedItems.has(item.id)
  );

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className="w-screen bg-gradient-to-r from-[#F5F1E8] to-white border-b border-[#E8E4D6] relative -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="w-full py-3 relative pt-[8px] pb-[8px] pl-[0px] pr-[0px]">
        {visibleItems.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center w-full px-4">
              {/* Left spacer to balance the close button */}
              <div className="w-6 h-6 flex-shrink-0"></div>
              
              <div className="flex-1 text-center">
                <div 
                  className="text-sm sm:text-base font-medium leading-relaxed"
                  style={{ color: item.color }}
                  dangerouslySetInnerHTML={{ __html: addModelLinks(item.content) }}
                />
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="opacity-70 hover:opacity-100 p-1 h-6 w-6 flex-shrink-0"
                onClick={() => dismissItem(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {index < visibleItems.length - 1 && (
              <hr className="my-2 border-[#064F8C]/20 w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}