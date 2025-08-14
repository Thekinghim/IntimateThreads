import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Users, Award, Clock, Lock } from "lucide-react";
import { useTranslations } from "@/hooks/useLanguage";
import heartUnderwearImage from "@assets/generated_images/Heart_pattern_string_underwear_625c1ba1.png";

export default function About() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#064F8C]/10 to-[#F5F1E8] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gold-text-static">Om Scandiscent</h1>
          <p className="text-xl md:text-2xl text-[#064F8C] leading-relaxed max-w-3xl mx-auto">
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

              {/* Security & Contact Cards */}
              <div className="space-y-6">
                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Säkerhet & Integritet</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] mt-1">SSL</Badge>
                        <div>
                          <div className="font-medium text-[#064F8C] text-sm">256-bit SSL-kryptering</div>
                          <div className="text-xs text-gray-600">All data skyddas med bankstandard kryptering</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] mt-1">GDPR</Badge>
                        <div>
                          <div className="font-medium text-[#064F8C] text-sm">GDPR-kompatibel</div>
                          <div className="text-xs text-gray-600">Full efterlevnad av EU:s dataskyddsförordning</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Kontakta Oss</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-[#064F8C] text-sm">Kundsupport</div>
                        <div className="text-xs text-gray-600">Tillgänglig 24/7 via vårt säkra meddelandesystem</div>
                      </div>
                      <div>
                        <div className="font-medium text-[#064F8C] text-sm">Svarstid</div>
                        <div className="text-xs text-gray-600">Inom 2 timmar, oftast mycket snabbare</div>
                      </div>
                      <div className="pt-2">
                        <div className="flex items-center gap-2 text-[#064F8C]">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs">Grundat 2023 • Över 1,000 nöjda kunder</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="bg-white/60 p-4 rounded-2xl">
              <img 
                src={heartUnderwearImage} 
                alt="Exklusiva hjärt-trosor" 
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-8 bg-gradient-to-r from-[#064F8C] to-[#111B3E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-6 border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-cormorant font-bold text-2xl text-white mb-2">
                Gå med i vår trosklubb för att få de senaste nyheterna
              </h3>
              <p className="font-dm-sans text-white/80 text-sm">
                Bli först att veta om nya modeller och exklusiva erbjudanden
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <input
                type="email"
                placeholder="Din e-postadress..."
                className="px-4 py-3 rounded-lg border-none bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none font-dm-sans text-sm w-64"
              />
              <Button className="gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-medium px-6 py-3 rounded-lg whitespace-nowrap text-sm shadow-lg">
                Gå med nu
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}