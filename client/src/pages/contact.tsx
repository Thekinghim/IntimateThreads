import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Mail, MessageCircle, Phone, MapPin, Shield, Package } from "lucide-react";
import heroImage from "@assets/IMG_2353_1755189196516.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#E8DDD4]">
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#064F8C]/80 to-[#0A5A9C]/80"></div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 gold-text-static">Kontakt & Vanliga Frågor</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Vi är här för att hjälpa dig. Kontakta oss på det sätt som passar dig bäst, eller hitta svar på vanliga frågor nedan.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Detailed Information */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#064F8C] text-center">Kundsupport</h2>
            <div className="space-y-6">
              <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                <CardContent className="p-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#064F8C]" />
                      <span className="font-medium text-[#064F8C]">scandiscentswe@gmail.com</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#064F8C]" />
                      <span className="font-medium text-[#064F8C]">Svarstid:</span>
                      <span className="text-gray-600">Inom 1-2 dagar</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-medium text-[#064F8C]">Språk:</span>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">SE</Badge>
                          <span className="text-sm">Svenska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">NO</Badge>
                          <span className="text-sm">Norska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">DK</Badge>
                          <span className="text-sm">Danska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">EN</Badge>
                          <span className="text-sm">Engelska</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Track Order Button */}
          <div className="max-w-md mx-auto mt-16 text-center">
            <Card className="bg-white/60 border-[#064F8C]/20 p-8">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#064F8C]">Spåra Din Order</h3>
                <p className="text-gray-600 mb-6">
                  Har du redan gjort en beställning? Spåra din order och få uppdateringar i realtid.
                </p>
                <Link href="/track-order">
                  <Button className="bg-[#064F8C] hover:bg-[#0A5A9C] text-white px-8 py-3 text-lg font-medium transition-colors duration-200">
                    Spåra Order
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Important Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold mb-8 gold-text-static text-center">Viktigt att Läsa Före Du Kontaktar Oss</h2>
            
            <Card className="bg-gradient-to-br from-white/80 to-white/60 border-[#064F8C]/20 mb-8">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-[#064F8C]/5 border border-[#064F8C]/20 rounded-lg p-6">
                    <h3 className="text-xl font-bold text-[#064F8C] mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Leveranstider & Processering
                    </h3>
                    <div className="space-y-3 text-gray-700">
                      <p>
                        Våra modeller är alla amatörer med riktiga liv – de flesta är studenter eller arbetar heltid. 
                        Populära tjejer kan ha 10–20+ beställningar i kö vid varje given tidpunkt.
                      </p>
                      <p>
                        Varje par trosor måste bäras under den fullständiga begärda tiden (1–3 dagar eller upp till en vecka), 
                        och alla beställningar behandlas i ordning efter när de kom in.
                      </p>
                      <div className="bg-white/80 rounded-lg p-4 border border-[#064F8C]/10">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-[#064F8C]">Genomsnittlig leveranstid:</span>
                          <span className="font-bold">2–3 veckor</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span className="font-medium text-[#064F8C]">Populära modeller:</span>
                          <span className="font-bold">3–5 veckor eller längre</span>
                        </div>
                      </div>
                      <p className="text-sm">
                        Om det uppstår oväntade förseningar kommer vi att kontakta dig. Eftersom detta inte är lagervaror, 
                        uppskattar vi verkligen ditt tålamod medan våra modeller uppfyller varje beställning personligt och med omsorg.
                      </p>
                    </div>
                  </div>

                  

                  <div className="bg-[#064F8C]/5 border border-[#064F8C]/20 rounded-lg p-6 text-center">
                    <h3 className="text-xl font-bold text-[#064F8C] mb-4 flex items-center justify-center gap-2">
                      <Mail className="h-5 w-5" />
                      📩 Kontakta Oss
                    </h3>
                    <div className="text-lg font-medium text-[#064F8C] mb-2">
                      scandiscentswe@gmail.com
                    </div>
                    <p className="text-sm text-gray-600">
                      (Vänligen läs informationen ovan före du mailar!)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-b from-white to-[#F5F1E8] py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-cormorant font-bold text-5xl text-[#064F8C] text-center mb-16">
            Vanliga Frågor
          </h2>
          
          <div className="space-y-8">
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                  Är det verkligen anonymt?
                </h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Ja, vi använder alias för alla parter och kryptovaluta-betalningar lämnar inga digitala fotspår. 
                  Leveransadresser hanteras diskret och all kommunikation sker via vår plattform.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                  Hur vet jag att produkterna är äkta?
                </h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Alla säljare genomgår en verifieringsprocess och alla produkter kontrolleras innan listning. 
                  Vi har nolltolerans mot falska annonser.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                  Hur lång tid tar det för trosorna att komma fram?
                </h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Våra modeller är alla amatörer med riktiga liv – de flesta är studenter eller arbetar heltid. 
                  Populära tjejer kan ha 10–20+ beställningar i kö vid varje given tidpunkt.
                </p>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed mt-3">
                  Varje par trosor måste bäras under den fullständiga begärda tiden (1–3 dagar eller upp till en vecka), 
                  och alla beställningar behandlas i ordning efter när de kom in.
                </p>
                <div className="bg-[#064F8C]/5 rounded-lg p-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#064F8C]">Genomsnittlig leveranstid:</span>
                      <span className="font-bold text-[#064F8C]">2–3 veckor</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[#064F8C]">Populära modeller:</span>
                      <span className="font-bold text-[#064F8C]">3–5 veckor eller längre</span>
                    </div>
                  </div>
                </div>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed mt-3">
                  Om det uppstår oväntade förseningar kommer vi att kontakta dig. Eftersom detta inte är lagervaror, 
                  uppskattar vi verkligen ditt tålamod medan våra modeller uppfyller varje beställning personligt och med omsorg.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                  Vad händer om jag inte är nöjd?
                </h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Vi erbjuder diskret kundservice och arbetar för att lösa eventuella problem. 
                  På grund av produkternas natur kan vi inte erbjuda returer, men vi tar alla klagomål på allvar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}