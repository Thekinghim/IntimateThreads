import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, CheckCircle, Info } from "lucide-react";

export default function PrivacyModeIndicator() {
  const [showDetails, setShowDetails] = useState(false);

  const privacyFeatures = [
    "No cookies or tracking",
    "Encrypted data transmission", 
    "Anonymous browsing history",
    "Secure payment processing",
    "Auto-delete personal info after 30 days"
  ];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex flex-col items-end gap-2">
        {/* Privacy Details Card */}
        {showDetails && (
          <Card className="w-80 border-green-200 bg-green-50/95 backdrop-blur-sm shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-600" />
                <h4 className="font-medium text-green-800">Privacy Protection Active</h4>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                {privacyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <Lock className="h-3 w-3" />
                  Your anonymity is guaranteed
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Privacy Indicator Badge */}
        <Badge
          variant="outline"
          className="bg-green-50 text-green-700 border-green-200 shadow-sm hover:shadow-md transition-all cursor-pointer px-3 py-2"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <Eye className="h-3 w-3" />
            <span className="text-xs font-medium">Anonymous Mode</span>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-green-700 hover:text-green-800">
              <Info className="h-3 w-3" />
            </Button>
          </div>
        </Badge>
      </div>
    </div>
  );
}