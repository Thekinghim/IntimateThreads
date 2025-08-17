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
      {/* Initial Privacy Banner */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full shadow-2xl border-none bg-[#F5F1E8]">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#064F8C]/10 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#064F8C]" />
                </div>
                <h3 className="font-cormorant font-bold text-2xl text-[#064F8C] mb-2">
                  Your Privacy is Our Priority
                </h3>
                <p className="font-dm-sans text-[#4A5568] text-sm leading-relaxed">
                  We understand the importance of discretion. Your identity and browsing activity remain completely anonymous.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {privacyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <feature.icon className="h-3 w-3 text-[#064F8C]" />
                    </div>
                    <span className="font-dm-sans text-[#4A5568]">{feature.text}</span>
                    <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-[#064F8C] hover:bg-[#053d6b] text-white font-dm-sans"
                >
                  Continue Anonymously
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setIsVisible(false)}
                  className="text-[#064F8C] hover:text-[#053d6b]"
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