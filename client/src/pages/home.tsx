import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  CreditCard,
  Truck,
  Gift,
  KeyRound,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type ProductWithSeller } from "@shared/schema";
import heroImage from "@assets/Clara-Gallery-2_1754772829712.webp";
import { useTranslations } from "@/hooks/useLanguage";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ["/api/products"],
  });
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const featuredProducts = products || [];

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Initialize scroll state when products load
    if (scrollRef.current && featuredProducts.length > 0) {
      handleScroll();
    }
  }, [featuredProducts]);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section with Background Image */}
      <section
        className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center 95%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D3748]/80 via-[#2D3748]/60 via-[#2D3748]/70 to-[#2D3748]/80"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-8 tracking-tight">
              <span
                className="block gold-text-static italic tracking-wider text-7xl sm:text-8xl md:text-9xl lg:text-[10rem]
font-extrabold drop-shadow-lg"
              >ScandiScent</span>
            </h1>
            <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/womens">
                <Button
                  size="lg"
                  className="gold-button font-medium px-12 py-6 text-xl rounded-3xl shadow-lg"
                >
                  {t.exploreCollection}
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  className="gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-medium px-12 py-6 text-xl rounded-3xl shadow-lg"
                >
                  Så Fungerar Det
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Hero Extension Fade */}
      <div className="h-30 bg-gradient-to-b from-[#2D3748]/80 via-[#2D3748]/50 via-[#2D3748]/25 via-[#2D3748]/10 to-[#F5F1E8]"></div>
      {/* Featured Collection */}
      <section className="py-12 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-20">
            <h3 className="font-bold text-5xl text-[#064F8C] mb-8">
              Utvald Kollektion
            </h3>
            <p className="text-[#4A5568] text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Handplockade exklusiva plagg från verifierade nordiska kvinnor
            </p>
          </div>

          {/* Horizontal Scrolling Product List */}
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="sm"
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 ${
                !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 ${
                !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={scrollRight}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onScroll={handleScroll}
            >
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex-none w-80 space-y-4">
                      <Skeleton className="h-64 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))
                : featuredProducts.map((product) => (
                    <div key={product.id} className="flex-none w-80">
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/collection">
              <Button
                size="lg"
                className="gold-button font-medium px-12 py-6 text-xl rounded-3xl shadow-lg"
              >
                Se alla trosor
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Luxury How it Works */}
      <section className="py-16 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
          <div className="text-center mb-16">
            <h3 className="font-bold text-5xl text-[#064F8C] mb-8">
              Så Funkar Det
            </h3>
            <p className="text-[#4A5568] text-2xl max-w-3xl mx-auto font-light leading-relaxed">
              Enkel och diskret process från beställning till leverans
            </p>
          </div>

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
            <Link href="/collection">
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
              <Button className="bg-white text-[#064F8C] hover:bg-white/90 px-6 py-3 rounded-lg font-dm-sans font-medium whitespace-nowrap text-sm">
                Gå med nu
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
