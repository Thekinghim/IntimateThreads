import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Mail, MessageCircle, Phone, MapPin, Shield } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F0E8] to-[#E8DDD4]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#064F8C] to-[#0A5A9C] text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 gold-text-static">Kontakt</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Vi är här för att hjälpa dig. Kontakta oss på det sätt som passar dig bäst.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-white/60 border-[#064F8C]/20 p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Säkert Meddelande</h3>
                <p className="text-gray-600 mb-4">
                  Kontakta oss via vårt säkra meddelandesystem för diskreta förfrågningar.
                </p>
                <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                  Rekommenderat
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-white/60 border-[#064F8C]/20 p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="text-xl font-bold mb-3">E-post</h3>
                <p className="text-gray-600 mb-4">
                  Skicka dina frågor till oss via e-post för snabba svar.
                </p>
                <div className="text-[#064F8C] font-medium">
                  scandiscentswe@gmail.com
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/60 border-[#064F8C]/20 p-8 text-center">
              <CardContent className="p-0">
                <div className="w-16 h-16 bg-[#064F8C]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Support Tider</h3>
                <p className="text-gray-600 mb-4">
                  Vi är tillgängliga dygnet runt för att hjälpa dig.
                </p>
                <div className="text-[#064F8C] font-medium">
                  24/7 Support
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 gold-text-static">Kundsupport</h2>
              <div className="space-y-6">
                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Svarstider</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-[#064F8C]">Akuta Frågor</div>
                        <div className="text-gray-600">Inom 30 minuter</div>
                      </div>
                      <div>
                        <div className="font-medium text-[#064F8C]">Allmänna Frågor</div>
                        <div className="text-gray-600">Inom 2 timmar</div>
                      </div>
                      <div>
                        <div className="font-medium text-[#064F8C]">Teknisk Support</div>
                        <div className="text-gray-600">Inom 1 timme</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Språk Vi Talar</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">SE</Badge>
                        <span>Svenska</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">NO</Badge>
                        <span>Norska</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">DK</Badge>
                        <span>Danska</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">EN</Badge>
                        <span>Engelska</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 gold-text-static">Säkerhet & Integritet</h2>
              <div className="space-y-6">
                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Diskret Kommunikation</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#064F8C] mt-1" />
                        <div>
                          <div className="font-medium text-[#064F8C]">End-to-End Kryptering</div>
                          <div className="text-gray-600 text-sm">All kommunikation är krypterad</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#064F8C] mt-1" />
                        <div>
                          <div className="font-medium text-[#064F8C]">Anonyma Konversationer</div>
                          <div className="text-gray-600 text-sm">Ingen personlig information krävs</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-[#064F8C] mt-1" />
                        <div>
                          <div className="font-medium text-[#064F8C]">Säker Datahantering</div>
                          <div className="text-gray-600 text-sm">GDPR-kompatibel databehandling</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/60 border-[#064F8C]/20 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-xl font-bold mb-4">Vanliga Frågor</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="font-medium text-[#064F8C]">Beställningsfrågor</div>
                        <div className="text-gray-600 text-sm">Status, leverans, ändringar</div>
                      </div>
                      <div>
                        <div className="font-medium text-[#064F8C]">Produktinformation</div>
                        <div className="text-gray-600 text-sm">Storlekar, material, kvalitet</div>
                      </div>
                      <div>
                        <div className="font-medium text-[#064F8C]">Betalningsfrågor</div>
                        <div className="text-gray-600 text-sm">Metoder, säkerhet, återbetalning</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>


        </div>
      </section>
    </div>
  );
}