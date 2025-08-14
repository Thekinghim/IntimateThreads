import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Mail, MessageCircle, Phone, MapPin, Shield, Package, ShoppingCart, Truck, CreditCard, HelpCircle, Users } from "lucide-react";
import heroImage from "@assets/IMG_2353_1755189196516.jpg";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
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
          {/* Contact Information and Track Order Side by Side */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold mb-6 text-[#064F8C]">Kundsupport</h2>
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
                          <span className="text-sm text-[#064F8C]">Svenska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">NO</Badge>
                          <span className="text-sm text-[#064F8C]">Norska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">DK</Badge>
                          <span className="text-sm text-[#064F8C]">Danska</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">EN</Badge>
                          <span className="text-sm text-[#064F8C]">Engelska</span>
                        </div>
                      </div>
                    </div>

                    {/* Support Categories */}
                    <div className="border-t pt-4 mt-6">
                      <h3 className="font-medium text-[#064F8C] mb-3 text-sm">Vi hjälper dig med:</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Beställningar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Leveranser</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Betalningar</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <HelpCircle className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Allmänna frågor</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Säkerhet</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-[#064F8C]" />
                          <span className="text-sm text-gray-600">Privata frågor</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Track Order */}
              <Card className="bg-white/60 border-[#064F8C]/20 p-8">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Package className="w-8 h-8 text-[#064F8C]" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#064F8C] text-center">Spåra Din Order</h3>
                  <p className="text-gray-600 mb-6 text-center">
                    Har du redan gjort en beställning? Spåra din order och få uppdateringar i realtid.
                  </p>
                  <div className="text-center">
                    <Link href="/track-order">
                      <Button className="bg-[#064F8C] hover:bg-[#0A5A9C] text-white px-8 py-3 text-lg font-medium transition-colors duration-200">
                        Spåra Order
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          

        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F5F1E8] py-20">
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