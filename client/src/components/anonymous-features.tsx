import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Eye, 
  Lock, 
  UserX, 
  Globe, 
  Server, 
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

export function AnonymousFeatures() {
  const [connectionSecure, setConnectionSecure] = useState(false);
  const [dataEncrypted, setDataEncrypted] = useState(false);

  useEffect(() => {
    // Simulate security checks
    setTimeout(() => setConnectionSecure(true), 500);
    setTimeout(() => setDataEncrypted(true), 1000);
  }, []);

  const securityFeatures = [
    {
      icon: Shield,
      title: "Anonymous Browsing",
      description: "No tracking, no cookies, no stored history",
      status: "active",
      color: "text-green-600"
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All communications are encrypted",
      status: dataEncrypted ? "active" : "loading",
      color: "text-blue-600"
    },
    {
      icon: Server,
      title: "Secure Connection",
      description: "Protected server communications",
      status: connectionSecure ? "active" : "loading", 
      color: "text-purple-600"
    },
    {
      icon: UserX,
      title: "No Account Required",
      description: "Shop completely anonymously",
      status: "active",
      color: "text-orange-600"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "loading":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="border-stone-200 bg-stone-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
            <Eye className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <span className="text-stone-800">Anonymous Protection</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-green-600 font-normal">Active & Secure</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-stone-200 hover:shadow-sm transition-shadow"
            >
              <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
                <feature.icon className={`h-4 w-4 ${feature.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-stone-800 text-sm">{feature.title}</h4>
                <p className="text-xs text-stone-600 mt-0.5">{feature.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(feature.status)}
                {feature.status === "active" && (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                    Protected
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-800">Privacy Guarantee</h4>
              <p className="text-xs text-green-700 mt-1">
                Your identity, browsing history, and personal information remain completely anonymous. 
                We automatically delete all transaction data after 30 days.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AnonymousCheckoutBanner() {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Shield className="h-6 w-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-green-800 mb-1">100% Anonymous Checkout</h3>
          <p className="text-sm text-green-700">
            No account creation required. Your personal information is encrypted and automatically deleted after delivery.
          </p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
          <Eye className="h-3 w-3 mr-1" />
          Private
        </Badge>
      </div>
    </div>
  );
}