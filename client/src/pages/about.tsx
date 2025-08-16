import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/newsletter";
import { Shield, Heart, Users, Award, Clock, Lock } from "lucide-react";
import { useTranslations } from "@/hooks/useLanguage";
import heartUnderwearImage from "@assets/generated_images/Heart_pattern_string_underwear_625c1ba1.png";
import SEOHead from "@/components/seo-head";

export default function About() {
  const t = useTranslations();

  const aboutStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Om Scandiscent",
    "url": "https://scandiscent.replit.app/about",
    "description": "Lär dig mer om Scandiscent - Sveriges ledande plattform för diskret handel med använda intimplagg från verifierade nordiska kvinnor.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Scandiscent",
      "foundingDate": "2023",
      "description": "Sveriges ledande plattform för diskret handel med använda intimplagg från verifierade nordiska kvinnor",
      "areaServed": "Nordic countries",
      "knowsAbout": ["Diskret handel", "Använda intimplagg", "Verifierade säljare"]
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <SEOHead
        title="Om Scandiscent - Sveriges ledande plattform för diskret handel | Om oss"
        description="Lär dig mer om Scandiscent - Sveriges ledande plattform för diskret handel med använda intimplagg från verifierade nordiska kvinnor. Grundat 2023 med 10,000+ nöjda kunder."
        keywords="om scandiscent, företagsinformation, diskret handel, nordiska kvinnor, säker plattform, verifierade säljare, kundnöjdhet"
        canonicalUrl="https://scandiscent.replit.app/about"
        structuredData={aboutStructuredData}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#064F8C]/10 to-[#F5F1E8] py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 gold-text-static">Om Scandiscent</h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#064F8C] leading-relaxed max-w-3xl mx-auto">
            Vi är Sveriges ledande plattform för diskret handel med använda intimplagg från verifierade nordiska kvinnor.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">


          {/* Our Story */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">Vår Historia</h2>
              <div className="space-y-4 text-gray-700 mb-8">
                <p>
                  Scandiscent grundades 2023 med en vision att skapa en säker, diskret och respektfull marknadsplats 
                  för intimplagg. Vi förstod att det fanns ett behov av en professionell plattform som prioriterar 
                  både köparens och säljarens integritet.
                </p>
                <p>
                  Sedan starten har vi byggt upp en community av över 10,000 nöjda kunder och verifierade 
                  säljare från hela Norden. Vår plattform kombinerar modern teknik med diskret hantering 
                  för en trygg upplevelse för alla parter.
                </p>
                <p>
                  Idag är vi stolta över att vara den mest betrodda plattformen i sin kategori, 
                  med 98% kundnöjdhet och branschens strängaste verifieringsprocess.
                </p>
              </div>


            </div>
            
            <div className="bg-white/60 p-4 rounded-2xl h-fit">
              <img 
                src={heartUnderwearImage} 
                alt="Exklusiva hjärt-trosor" 
                className="w-full h-full rounded-xl object-cover max-h-80"
              />
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}