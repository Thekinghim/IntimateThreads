import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, CreditCard, Truck, Gift, KeyRound, Shield, Package } from "lucide-react";

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-soft-white">
      {/* Hero Section */}
      <section className="warm-beige py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-poppins font-medium text-4xl text-charcoal mb-6">Så funkar det</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enkel, diskret och säker process från beställning till leverans. Vi värnar om din integritet i varje steg.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <Card className="text-center relative overflow-hidden">
              <CardContent className="p-8">
                <div className="bg-warm-beige rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-powder-pink" />
                </div>
                <div className="absolute top-4 right-4 bg-charcoal text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="font-poppins font-medium text-xl text-charcoal mb-4">Utforska & Välj</h3>
                <p className="text-gray-600 text-sm">
                  Bläddra genom vår exklusiva kollektion av plagg från verifierade nordiska kvinnor. Varje produkt har detaljerad beskrivning och är kvalitetskontrollerad.
                </p>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center relative overflow-hidden">
              <CardContent className="p-8">
                <div className="bg-warm-beige rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-powder-pink" />
                </div>
                <div className="absolute top-4 right-4 bg-charcoal text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="font-poppins font-medium text-xl text-charcoal mb-4">Diskret Betalning</h3>
                <p className="text-gray-600 text-sm">
                  Betala säkert med kryptovaluta (BTC, ETH, USDT), Revolut eller Gumroad. Alla betalningar är krypterade och helt anonyma.
                </p>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center relative overflow-hidden">
              <CardContent className="p-8">
                <div className="bg-warm-beige rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-powder-pink" />
                </div>
                <div className="absolute top-4 right-4 bg-charcoal text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="font-poppins font-medium text-xl text-charcoal mb-4">Förpackning</h3>
                <p className="text-gray-600 text-sm">
                  Plagget förpackas diskret av säljaren i neutral, ren förpackning utan logotyper eller avslöjande märkningar.
                </p>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center relative overflow-hidden">
              <CardContent className="p-8">
                <div className="bg-warm-beige rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Truck className="h-8 w-8 text-powder-pink" />
                </div>
                <div className="absolute top-4 right-4 bg-charcoal text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <h3 className="font-poppins font-medium text-xl text-charcoal mb-4">Säker Leverans</h3>
                <p className="text-gray-600 text-sm">
                  Paketet skickas med spårbar post inom 3-5 arbetsdagar. Du får spårningsinformation via email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="warm-beige py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-medium text-3xl text-charcoal text-center mb-12">
            Vad gör oss olika?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-powder-pink rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <KeyRound className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">
                      Fullständig Anonymitet
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Varken du eller säljaren behöver avslöja riktiga namn. Vi använder alias och skyddar alla personuppgifter enligt GDPR.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-powder-pink rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">
                      Säkra Betalningar
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Kryptovaluta-betalningar via NOWPayments.io ger maximal anonymitet. Inga transaktionshistorier sparas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-powder-pink rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">
                      Kvalitetskontroll
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Alla säljare är verifierade och alla produkter kvalitetskontrolleras för att säkerställa bästa möjliga upplevelse.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-powder-pink rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <Gift className="h-6 w-6 text-charcoal" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">
                      Diskret Leverans
                    </h3>
                    <p className="text-gray-600 text-sm">
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
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-medium text-3xl text-charcoal text-center mb-12">
            Accepterade Betalningsmetoder
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">Kryptovaluta</h3>
                <p className="text-gray-600 text-sm mb-4">Bitcoin, Ethereum, USDT och 300+ andra kryptovalutor</p>
                <div className="text-xs text-gray-500">
                  ✓ Maximal anonymitet<br/>
                  ✓ Inga transaktionshistorik<br/>
                  ✓ Direkta betalningar
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">Revolut</h3>
                <p className="text-gray-600 text-sm mb-4">Snabba och säkra banköverföringar</p>
                <div className="text-xs text-gray-500">
                  ✓ Snabba transaktioner<br/>
                  ✓ Europeisk standard<br/>
                  ✓ Säker hantering
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-2">Gumroad</h3>
                <p className="text-gray-600 text-sm mb-4">Säkra betalningar via etablerad plattform</p>
                <div className="text-xs text-gray-500">
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
      <section className="warm-beige py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-poppins font-medium text-3xl text-charcoal text-center mb-12">
            Vanliga Frågor
          </h2>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-3">
                  Är det verkligen anonymt?
                </h3>
                <p className="text-gray-600 text-sm">
                  Ja, vi använder alias för alla parter och kryptovaluta-betalningar lämnar inga digitala fotspår. 
                  Leveransadresser hanteras diskret och all kommunikation sker via vår plattform.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-3">
                  Hur vet jag att produkterna är äkta?
                </h3>
                <p className="text-gray-600 text-sm">
                  Alla säljare genomgår en verifieringsprocess och alla produkter kontrolleras innan listning. 
                  Vi har nolltolerans mot falska annonser.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-poppins font-medium text-lg text-charcoal mb-3">
                  Vad händer om jag inte är nöjd?
                </h3>
                <p className="text-gray-600 text-sm">
                  Vi erbjuder diskret kundservice och arbetar för att lösa eventuella problem. 
                  På grund av produkternas natur kan vi inte erbjuda returer, men vi tar alla klagomål på allvar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-poppins font-medium text-3xl text-charcoal mb-6">
            Redo att börja?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Utforska vår exklusiva kollektion och upplev diskret shopping på en ny nivå.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collection">
              <Button size="lg" className="bg-charcoal text-white hover:bg-gray-800 font-poppins font-medium px-8 py-4">
                Utforska Kollektion
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-poppins font-medium px-8 py-4">
                Tillbaka till startsidan
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
