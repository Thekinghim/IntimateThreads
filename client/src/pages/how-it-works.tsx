import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Truck, Gift, KeyRound, Shield, Package } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#064F8C] to-[#111B3E] py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cormorant font-bold text-6xl text-white mb-6">Så funkar det</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-dm-sans">
            Enkel, diskret och säker process från beställning till leverans. Vi värnar om din integritet i varje steg.
          </p>
        </div>
      </section>

      {/* Luxury How it Works */}
      <section className="py-16 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">
                1. Välj
              </h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">
                Bläddra igenom vår exklusiva kollektion med fullständig anonymitet och välj det plagg som tilltalar dig mest.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <CreditCard className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">
                2. Säker Betalning
              </h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">
                Diskret och säker betalning via kryptovaluta, Revolut eller andra krypterade betalningsmetoder.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">
                3. Diskret Frakt
              </h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">
                Plagget skickas diskret i neutral förpackning utan avslöjande
                märkningar.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Gift className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">
                4. Diskret Leverans
              </h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">
                Motta ditt paket hemma i neutral förpackning utan avslöjande märkningar eller logotyper.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Luxury Call to Action */}
      <section className="py-14 relative overflow-hidden bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center">
            <Link href="/womens">
              <Button
                size="lg"
                className="gold-button font-medium px-16 py-8 text-2xl rounded-3xl shadow-lg"
              >
                Börja Utforska Nu
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="font-cormorant font-bold text-5xl text-[#064F8C] mb-6">Så går det till</h2>
            <p className="text-xl text-[#4A5568] max-w-3xl mx-auto font-dm-sans">
              Fyra enkla steg från val till leverans
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-4 right-4 gold-gradient text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                  1
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Utforska & Välj</h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Bläddra genom vår exklusiva kollektion av plagg från verifierade nordiska kvinnor. Varje produkt har detaljerad beskrivning och är kvalitetskontrollerad.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-4 right-4 gold-gradient text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                  2
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Diskret Betalning</h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Betala säkert med kryptovaluta (BTC, ETH, USDT), Revolut eller Gumroad. Alla betalningar är krypterade och helt anonyma.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Package className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-4 right-4 gold-gradient text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                  3
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Förpackning</h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Plagget förpackas diskret av säljaren i neutral, ren förpackning utan logotyper eller avslöjande märkningar.
                </p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center relative overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Truck className="h-10 w-10 text-white" />
                </div>
                <div className="absolute top-4 right-4 gold-gradient text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-lg">
                  4
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Säker Leverans</h3>
                <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                  Paketet skickas med spårbar post inom 3-5 arbetsdagar. Du får spårningsinformation via email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="bg-gradient-to-b from-white to-[#F5F1E8] py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-cormorant font-bold text-5xl text-[#064F8C] text-center mb-16">
            Vad gör oss olika?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <KeyRound className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                      Fullständig Anonymitet
                    </h3>
                    <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                      Varken du eller säljaren behöver avslöja riktiga namn. Vi använder alias och skyddar alla personuppgifter enligt GDPR.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                      Säkra Betalningar
                    </h3>
                    <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                      Kryptovaluta-betalningar via NOWPayments.io ger maximal anonymitet. Inga transaktionshistorier sparas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                      Kvalitetskontroll
                    </h3>
                    <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                      Alla säljare är verifierade och alla produkter kvalitetskontrolleras för att säkerställa bästa möjliga upplevelse.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">
                      Diskret Leverans
                    </h3>
                    <p className="text-[#4A5568] text-base font-dm-sans leading-relaxed">
                      Neutral förpackning, anonyma avsändare och mottagaruppsättningar som skyddar din integritet helt.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <h2 className="font-cormorant font-bold text-5xl text-[#064F8C] text-center mb-16">
            Accepterade Betalningsmetoder
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Kryptovaluta</h3>
                <p className="text-[#4A5568] text-base font-dm-sans mb-6 leading-relaxed">Bitcoin, Ethereum, USDT och 300+ andra kryptovalutor</p>
                <div className="text-sm text-[#4A5568] font-dm-sans">
                  ✓ Maximal anonymitet<br/>
                  ✓ Inga transaktionshistorik<br/>
                  ✓ Direkta betalningar
                </div>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Revolut</h3>
                <p className="text-[#4A5568] text-base font-dm-sans mb-6 leading-relaxed">Snabba och säkra banköverföringar</p>
                <div className="text-sm text-[#4A5568] font-dm-sans">
                  ✓ Snabba transaktioner<br/>
                  ✓ Europeisk standard<br/>
                  ✓ Säker hantering
                </div>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-none">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CreditCard className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Gumroad</h3>
                <p className="text-[#4A5568] text-base font-dm-sans mb-6 leading-relaxed">Säkra betalningar via etablerad plattform</p>
                <div className="text-sm text-[#4A5568] font-dm-sans">
                  ✓ Köparskydd<br/>
                  ✓ Internationellt<br/>
                  ✓ Många betalningsalternativ
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

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-[#064F8C] to-[#111B3E] py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="font-cormorant font-bold text-5xl text-white mb-8">
            Redo att börja?
          </h2>
          <p className="text-white/90 text-xl mb-12 font-dm-sans max-w-3xl mx-auto leading-relaxed">
            Utforska vår exklusiva kollektion och upplev diskret shopping på en ny nivå.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/womens">
              <Button size="lg" className="gold-button font-medium px-12 py-6 text-xl rounded-3xl shadow-lg">
                Utforska Kollektion
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-[#064F8C] font-dm-sans font-medium px-12 py-6 text-xl rounded-3xl">
                Tillbaka till startsidan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
