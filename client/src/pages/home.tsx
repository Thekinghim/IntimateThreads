import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, CreditCard, Truck, Gift, KeyRound, Shield } from "lucide-react";
import { type ProductWithSeller } from "@shared/schema";

export default function Home() {
  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
  });

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-[#FEFBEA]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/hero2_1754681382469.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-8 tracking-tight">
              <span className="block gold-text italic tracking-wider text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold drop-shadow-lg">Scandiscent</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
              Exklusiva, personliga plagg från nordiska kvinnor. Diskret, säkert och helt anonymt.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/collection">
                <Button size="lg" className="gold-button font-medium px-12 py-6 text-xl rounded-3xl shadow-lg">
                  Utforska Kollektion
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-11 border-3 border-white hover:bg-white hover:text-[#111B3E] font-medium px-12 py-6 text-xl rounded-3xl shadow-lg transition-all duration-500 hover:scale-105 text-white bg-transparent">
                  Så Fungerar Det
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Collection */}
      <section className="py-32 bg-gradient-to-br from-[#F5F2E8] to-[#E8E4D6] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-24">
            <h3 className="font-bold text-5xl text-[#111B3E] mb-8">Utvald Kollektion</h3>
            <p className="text-[#064F8C] text-2xl max-w-3xl mx-auto font-light leading-relaxed">Handplockade exklusiva plagg från verifierade nordiska kvinnor</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          <div className="text-center mt-16">
            <Link href="/collection">
              <Button variant="outline" size="lg" className="border-2 border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-[#FEFBEA] font-medium px-10 py-5 text-xl rounded-3xl transition-all duration-500 hover:scale-105">
                Se Hela Kollektionen
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Luxury How it Works */}
      <section className="py-32 bg-[#FEFBEA] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F5F2E8]/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-24">
            <h3 className="font-bold text-5xl text-[#111B3E] mb-8">Så Funkar Det</h3>
            <p className="text-[#064F8C] text-2xl max-w-3xl mx-auto font-light leading-relaxed">Enkel och diskret process från beställning till leverans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 gold-circle rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Search className="h-12 w-12 text-[#111B3E]" />
              </div>
              <h4 className="font-bold text-2xl text-[#111B3E] mb-6">1. Välj</h4>
              <p className="text-[#064F8C] text-lg font-light leading-relaxed">Bläddra igenom vår exklusiva kollektion och välj det plagg som tilltalar dig mest.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gold-circle rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <CreditCard className="h-12 w-12 text-[#111B3E]" />
              </div>
              <h4 className="font-bold text-2xl text-[#111B3E] mb-6">2. Betala</h4>
              <p className="text-[#064F8C] text-lg font-light leading-relaxed">Diskret betalning via kryptovaluta, Revolut eller andra säkra betalningsmetoder.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gold-circle rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Truck className="h-12 w-12 text-[#111B3E]" />
              </div>
              <h4 className="font-bold text-2xl text-[#111B3E] mb-6">3. Diskret Frakt</h4>
              <p className="text-[#064F8C] text-lg font-light leading-relaxed">Plagget skickas diskret i neutral förpackning utan avslöjande märkningar.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 gold-circle rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Gift className="h-12 w-12 text-[#111B3E]" />
              </div>
              <h4 className="font-bold text-2xl text-[#111B3E] mb-6">4. Få Hem</h4>
              <p className="text-[#064F8C] text-lg font-light leading-relaxed">Motta ditt paket hemma med fullständig anonymitet och diskretion.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final Luxury Call to Action */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-[#F5F2E8] via-[#E8E4D6] to-[#FEFBEA]">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#F5F2E8]/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center">
            <h3 className="font-bold text-5xl text-[#111B3E] mb-8">Upptäck Diskret Elegans</h3>
            <p className="text-[#064F8C] text-2xl max-w-4xl mx-auto font-light leading-relaxed mb-16">
              Varje plagg berättar sin egen historia med fullständig anonymitet och tidlös elegans
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 gold-circle rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <KeyRound className="h-10 w-10 text-[#111B3E]" />
                </div>
                <h4 className="font-bold text-2xl text-[#111B3E] mb-4">Fullständig Anonymitet</h4>
                <p className="text-[#064F8C] text-lg font-light leading-relaxed">All kommunikation och leverans sker diskret utan avslöjande information</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 gold-circle rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Gift className="h-10 w-10 text-[#111B3E]" />
                </div>
                <h4 className="font-bold text-2xl text-[#111B3E] mb-4">Diskret Förpackning</h4>
                <p className="text-[#064F8C] text-lg font-light leading-relaxed">Neutral förpackning utan logotyper eller avslöjande märkningar</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 gold-circle rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Shield className="h-10 w-10 text-[#111B3E]" />
                </div>
                <h4 className="font-bold text-2xl text-[#111B3E] mb-4">Säker Betalning</h4>
                <p className="text-[#064F8C] text-lg font-light leading-relaxed">Krypterade betalningar som garanterar din integritet</p>
              </div>
            </div>
            
            <Link href="/collection">
              <Button size="lg" className="gold-button font-medium px-16 py-8 text-2xl rounded-3xl shadow-lg">
                Börja Utforska Nu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
