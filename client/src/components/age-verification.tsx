import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function AgeVerification() {
  const [showVerification, setShowVerification] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const isVerified = localStorage.getItem('age-verified');
    if (!isVerified) {
      setShowVerification(true);
    }
  }, []);

  const handleVerifyAge = (isOfAge: boolean) => {
    if (isOfAge) {
      localStorage.setItem('age-verified', 'true');
      localStorage.setItem('age-verified-date', new Date().toISOString());
      setShowVerification(false);
    } else {
      // Redirect away or show message
      window.location.href = 'https://www.google.com';
    }
  };

  if (!showVerification) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Åldersverifiering krävs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-medium">Endast för vuxna</span>
            </div>
            
            <p className="text-gray-700 leading-relaxed">
              Denna webbplats innehåller vuxeninnehåll och är avsedd för personer som är 18 år eller äldre.
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              Genom att gå in på denna webbplats bekräftar du att du är minst 18 år gammal och godkänner våra användarvillkor och sekretesspolicy.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => handleVerifyAge(true)}
              className="w-full bg-[#064F8C] hover:bg-[#053D6B] text-white py-3"
            >
              Jag är 18 år eller äldre - Gå in på sidan
            </Button>
            
            <Button 
              onClick={() => handleVerifyAge(false)}
              variant="outline"
              className="w-full py-3 border-red-200 text-red-600 hover:bg-red-50"
            >
              Jag är under 18 år - Lämna
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>Denna verifiering krävs enligt lag.</p>
            <p>Vi respekterar din integritet och diskretion.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}