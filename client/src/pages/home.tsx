import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, CreditCard, Truck, Gift, KeyRound, Shield } from "lucide-react";
import { type ProductWithSeller } from "@shared/schema";
import heroImage from "@assets/generated_images/Elegant_woman_bikini_portrait_b799382b.png";
import { useTranslations } from "@/hooks/useLanguage";

export default function Home() {
  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
  });
  const t = useTranslations();

  const featuredProducts = products?.slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section with Background Image */}
      <section 
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/90 via-[#F5F1E8]/70 via-[#F5F1E8]/80 to-[#F5F1E8]/90"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#2D3748] leading-none mb-8 tracking-tight">
              <span className="block gold-text italic tracking-wider text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold drop-shadow-lg">Scandiscent</span>
            </h1>
            <p className="text-2xl md:text-3xl text-[#2D3748] max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/collection">
                <Button size="lg" className="gold-button font-medium px-12 py-6 text-xl rounded-3xl shadow-lg">
                  {t.exploreCollection}
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="border-2 border-[#B45309] text-[#B45309] hover:bg-[#B45309] hover:text-white font-medium px-12 py-6 text-xl rounded-3xl shadow-lg">
                  Så Fungerar Det
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Extension Fade */}
      <div className="h-60 bg-gradient-to-b from-[#F5F1E8]/90 via-[#F5F1E8]/60 via-[#F5F1E8]/35 via-[#F5F1E8]/15 to-[#F5F1E8]"></div>
      
      {/* Featured Collection */}
      <section className="py-24 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-20">
            <h3 className="font-bold text-5xl text-[#2D3748] mb-8">Utvald Kollektion</h3>
            <p className="text-[#4A5568] text-2xl max-w-3xl mx-auto font-light leading-relaxed">Handplockade exklusiva plagg från verifierade nordiska kvinnor</p>
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

          <div className="text-center mt-12">
            <Link href="/collection">
              <Button variant="outline" size="lg" className="gold-button-outline font-medium px-10 py-5 text-xl rounded-3xl transition-all duration-500 hover:scale-105">
                Se Hela Kollektionen
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Luxury How it Works */}
      <section className="py-16 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <h3 className="font-bold text-5xl text-[#2D3748] mb-8">Så Funkar Det</h3>
            <p className="text-[#4A5568] text-2xl max-w-3xl mx-auto font-light leading-relaxed">Enkel och diskret process från beställning till leverans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">1. Välj</h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">Bläddra igenom vår exklusiva kollektion och välj det plagg som tilltalar dig mest.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <CreditCard className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">2. Betala</h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">Diskret betalning via kryptovaluta, Revolut eller andra säkra betalningsmetoder.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Truck className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">3. Diskret Frakt</h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">Plagget skickas diskret i neutral förpackning utan avslöjande märkningar.</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 bg-[#2D3748] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Gift className="h-12 w-12 text-white" />
              </div>
              <h4 className="font-bold text-2xl text-[#2D3748] mb-6">4. Få Hem</h4>
              <p className="text-[#4A5568] text-lg font-light leading-relaxed">Motta ditt paket hemma med fullständig anonymitet och diskretion.</p>
            </div>
          </div>
        </div>
      </section>
      {/* Final Luxury Call to Action */}
      <section className="py-20 relative overflow-hidden bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center">
            <h3 className="font-bold text-5xl text-[#2D3748] mb-8">Upptäck Diskret Elegans</h3>
            <p className="text-[#4A5568] text-2xl max-w-4xl mx-auto font-light leading-relaxed mb-12">
              Varje plagg berättar sin egen historia med fullständig anonymitet och tidlös elegans
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#2D3748] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <KeyRound className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-[#2D3748] mb-4">Fullständig Anonymitet</h4>
                <p className="text-[#4A5568] text-lg font-light leading-relaxed">All kommunikation och leverans sker diskret utan avslöjande information</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#2D3748] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-[#2D3748] mb-4">Diskret Förpackning</h4>
                <p className="text-[#4A5568] text-lg font-light leading-relaxed">Neutral förpackning utan logotyper eller avslöjande märkningar</p>
              </div>
              
              <div className="flex flex-col items-center group">
                <div className="w-20 h-20 bg-[#2D3748] rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h4 className="font-bold text-2xl text-[#2D3748] mb-4">Säker Betalning</h4>
                <p className="text-[#4A5568] text-lg font-light leading-relaxed">Krypterade betalningar som garanterar din integritet</p>
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
