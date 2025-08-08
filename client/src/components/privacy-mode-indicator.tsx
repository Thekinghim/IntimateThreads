import { useState, useEffect } from "react";
import { Shield, X } from "lucide-react";

export default function PrivacyModeIndicator() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if user has dismissed it before
    const dismissed = localStorage.getItem('privacy-indicator-dismissed');
    if (dismissed) {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('privacy-indicator-dismissed', 'true');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isMinimized ? (
        // Minimized state - just a small icon
        <button
          onClick={toggleMinimize}
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-full p-2 hover:bg-white transition-all duration-200 border border-gray-200"
        >
          <Shield className="h-4 w-4 text-gray-600" />
        </button>
      ) : (
        // Expanded state - clean and minimal
        <div className="bg-white/95 backdrop-blur-sm shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 border border-gray-200 max-w-xs">
          <Shield className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs text-gray-600 font-medium">Anonymous Mode</p>
            <p className="text-xs text-gray-500">Your privacy is protected</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={toggleMinimize}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Minimize"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Close"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}