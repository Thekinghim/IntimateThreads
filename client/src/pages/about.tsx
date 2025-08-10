import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Om Scandiscent</h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
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
              <div className="space-y-4 text-gray-700">
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
            
            <div className="bg-white/60 p-4 rounded-2xl">
              <img 
                src={heartUnderwearImage} 
                alt="Exklusiva hjärt-trosor" 
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <Card className="bg-white/60 border-[#064F8C]/20 text-center p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-[#064F8C] mb-2">10,000+</div>
                <div className="text-gray-600">Nöjda Kunder</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 border-[#064F8C]/20 text-center p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-[#064F8C] mb-2">98%</div>
                <div className="text-gray-600">Kundnöjdhet</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 border-[#064F8C]/20 text-center p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-[#064F8C] mb-2">500+</div>
                <div className="text-gray-600">Verifierade Säljare</div>
              </CardContent>
            </Card>
            <Card className="bg-white/60 border-[#064F8C]/20 text-center p-6">
              <CardContent className="p-0">
                <div className="text-3xl font-bold text-[#064F8C] mb-2">24/7</div>
                <div className="text-gray-600">Kundsupport</div>
              </CardContent>
            </Card>
          </div>

          {/* How We Work */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Så Fungerar Vi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-[#064F8C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Verifiering</h3>
                  <p className="text-gray-600">
                    Alla säljare genomgår en noggrann verifieringsprocess med ID-kontroll 
                    och kvalitetsbedömning för att garantera äkthet och säkerhet.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-[#064F8C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Diskret Hantering</h3>
                  <p className="text-gray-600">
                    All kommunikation och leverans sker helt diskret. Vi respekterar 
                    både köparens och säljarens integritet genom anonyma transaktioner.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="w-8 h-8 text-[#064F8C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Kvalitetsgaranti</h3>
                  <p className="text-gray-600">
                    Varje produkt inspekteras för kvalitet och äkthet. Vi erbjuder 
                    full återbetalningsgaranti om produkten inte motsvarar beskrivningen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Vårt Team</h2>
            <Card className="bg-white/60 border-[#064F8C]/20 p-8">
              <CardContent className="p-0 text-center">
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                  Vårt team består av erfarna e-handelsproffs, säkerhetsexperter och kundservicespecialister 
                  som arbetar dygnet runt för att säkerställa den bästa möjliga upplevelsen för våra användare. 
                  Vi är passionerade om att skapa en trygg och respektfull miljö för alla.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact & Trust */}
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-white/60 border-[#064F8C]/20 p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">Säkerhet & Integritet</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] mt-1">SSL</Badge>
                    <div>
                      <div className="font-medium">256-bit SSL-kryptering</div>
                      <div className="text-sm text-gray-600">All data skyddas med bankstandard kryptering</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] mt-1">GDPR</Badge>
                    <div>
                      <div className="font-medium">GDPR-kompatibel</div>
                      <div className="text-sm text-gray-600">Full efterlevnad av EU:s dataskyddsförordning</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] mt-1">24/7</Badge>
                    <div>
                      <div className="font-medium">Kontinuerlig övervakning</div>
                      <div className="text-sm text-gray-600">Vår säkerhet övervakas dygnet runt</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 border-[#064F8C]/20 p-8">
              <CardContent className="p-0">
                <h3 className="text-2xl font-bold mb-6">Kontakta Oss</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium">Kundsupport</div>
                    <div className="text-gray-600">Tillgänglig 24/7 via vårt säkra meddelandesystem</div>
                  </div>
                  <div>
                    <div className="font-medium">Svarstid</div>
                    <div className="text-gray-600">Inom 2 timmar, oftast mycket snabbare</div>
                  </div>
                  <div>
                    <div className="font-medium">Språk</div>
                    <div className="text-gray-600">Svenska, Norska, Danska, Engelska</div>
                  </div>
                  <div className="pt-4">
                    <div className="flex items-center gap-2 text-[#064F8C]">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Grundat 2023 • Över 10,000 nöjda kunder</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}