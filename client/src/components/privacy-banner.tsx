import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, CheckCircle, X } from "lucide-react";

export default function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenBanner, setHasSeenBanner] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('privacyBannerSeen');
    if (!seen) {
      setIsVisible(true);
    } else {
      setHasSeenBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('privacyBannerSeen', 'true');
    setIsVisible(false);
    setHasSeenBanner(true);
  };

  const privacyFeatures = [
    { icon: Shield, text: "End-to-end encrypted transactions", color: "text-green-600" },
    { icon: Eye, text: "No tracking or analytics", color: "text-blue-600" },
    { icon: Lock, text: "Anonymous browsing guaranteed", color: "text-purple-600" },
  ];

  if (!isVisible && !hasSeenBanner) return null;

  return (
    <>
      {/* Privacy Indicator (always visible after accepting) */}
      {hasSeenBanner && (
        <div className="fixed top-4 right-4 z-50">
          <Badge 
            variant="outline" 
            className="bg-green-50 text-green-700 border-green-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            title="Your privacy is protected"
          >
            <Shield className="h-3 w-3 mr-1" />
            Anonymous Mode Active
          </Badge>
        </div>
      )}

      {/* Initial Privacy Banner */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-2xl border-stone-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-stone-100 to-stone-200 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-stone-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  Your Privacy is Our Priority
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  We understand the importance of discretion. Your identity and browsing activity remain completely anonymous.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {privacyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-stone-50 flex items-center justify-center">
                      <feature.icon className={`h-3 w-3 ${feature.color}`} />
                    </div>
                    <span className="text-stone-700">{feature.text}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-stone-800 hover:bg-stone-900 text-white"
                >
                  Continue Anonymously
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsVisible(false)}
                  className="text-stone-600 hover:text-stone-800"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}