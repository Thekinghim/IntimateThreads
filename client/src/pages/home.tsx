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
import newsletterBg from "@assets/Screenshot 2025-08-16 at 18.45.53_1755362786676.png";
import { useTranslations } from "@/hooks/useLanguage";
import { useState, useRef, useEffect } from "react";
import Newsletter from "@/components/newsletter";
import SEOHead from "@/components/seo-head";

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

  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Scandiscent",
    "url": "https://scandiscent.replit.app",
    "description": "Exklusiva använda trosor från verifierade nordiska kvinnor med diskret handel och säker leverans",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://scandiscent.replit.app/womens?search={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Scandiscent",
      "logo": "https://scandiscent.replit.app/attached_assets/sverige_1754848613465.png"
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <SEOHead
        title="Scandiscent - Exklusiva använda trosor från nordiska kvinnor | Hem"
        description="Scandiscent erbjuder exklusiva använda trosor från verifierade nordiska kvinnor. Diskret handel med säker leverans, handskrivna kort och kryptovaluta-betalningar. 1000+ sålda trosor."
        keywords="scandiscent, använda trosor, intimplagg, diskret handel, nordiska kvinnor, svenska tjejer, handskrivna kort, säker leverans, kryptovaluta bitcoin"
        canonicalUrl="https://scandiscent.replit.app"
        structuredData={homeStructuredData}
      />
      {/* Hero Section with Background Image */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat gpu-accelerated"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center 95%",
          height: "100vh",
          minHeight: "100vh",
          maxHeight: "100vh",
        }}
      >
        {/* Preload critical hero image */}
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D3748]/80 via-[#2D3748]/60 via-[#2D3748]/70 to-[#2D3748]/80"></div>
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-none mb-6 sm:mb-8 tracking-tight">
              <span
                className="block gold-text-static italic tracking-wider text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem]
font-extrabold drop-shadow-lg"
              >ScandiScent</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto font-light leading-relaxed mb-8 sm:mb-12 drop-shadow-md px-4">
              {t.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-center">
              <Link href="/womens">
                <Button
                  size="lg"
                  className="gold-button font-medium px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl rounded-2xl sm:rounded-3xl shadow-lg w-full sm:w-auto min-w-[200px]"
                >
                  Använda trosor
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button
                  size="lg"
                  className="gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-medium px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-lg sm:text-xl rounded-2xl sm:rounded-3xl shadow-lg w-full sm:w-auto min-w-[200px]"
                >
                  Så Fungerar Det
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Collection */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#064F8C] mb-3 sm:mb-4 md:mb-6 lg:mb-8">Bläddra bland trosorna</h3>
            <p className="text-[#4A5568] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed px-4">
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
              className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide px-6 sm:px-12 py-4"
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

          <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
            <Link href="/womens">
              <Button
                size="lg"
                className="gold-button font-medium px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl rounded-2xl sm:rounded-3xl shadow-lg"
              >
                Se alla trosor
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Luxury How it Works */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl text-[#064F8C] mb-4 sm:mb-6 md:mb-8">
              Så Funkar Det
            </h3>
            <p className="text-[#4A5568] text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-light leading-relaxed px-4">
              Enkel och diskret process från beställning till leverans
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl md:text-2xl text-[#2D3748] mb-3 sm:mb-4 md:mb-6">
                1. Välj
              </h4>
              <p className="text-[#4A5568] text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
                Bläddra igenom vår exklusiva kollektion med fullständig anonymitet och välj det plagg som tilltalar dig mest.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl md:text-2xl text-[#2D3748] mb-3 sm:mb-4 md:mb-6">
                2. Säker Betalning
              </h4>
              <p className="text-[#4A5568] text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
                Diskret och säker betalning via kryptovaluta, Revolut eller andra krypterade betalningsmetoder.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl md:text-2xl text-[#2D3748] mb-3 sm:mb-4 md:mb-6">
                3. Diskret Frakt
              </h4>
              <p className="text-[#4A5568] text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
                Plagget skickas diskret i neutral förpackning utan avslöjande
                märkningar.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
                <Gift className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
              </div>
              <h4 className="font-bold text-lg sm:text-xl md:text-2xl text-[#2D3748] mb-3 sm:mb-4 md:mb-6">
                4. Diskret Leverans
              </h4>
              <p className="text-[#4A5568] text-sm sm:text-base md:text-lg font-light leading-relaxed px-2">
                Motta ditt paket hemma i neutral förpackning utan avslöjande märkningar eller logotyper.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Final Luxury Call to Action */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative">
          <div className="text-center">
            <Link href="/womens">
              <Button
                size="lg"
                className="gold-button font-medium px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 text-lg sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl shadow-lg"
              >
                Börja Utforska Nu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Statistics and Testimonials Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-[#F5F1E8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Statistic */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#064F8C] mb-3 sm:mb-4 font-cormorant">
              1,000+
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#2D3748] mb-3 sm:mb-4 font-dm-sans">
              Använda Trosor Sålda
            </p>
            <div className="w-16 sm:w-24 md:w-32 lg:w-40 h-1 bg-[#F5D061] mx-auto"></div>
          </div>

          {/* Customer Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#E2DDD4]/30 hover:shadow-xl transition-all duration-300">
              <div className="text-[#F5D061] text-3xl sm:text-4xl mb-3 sm:mb-4">"</div>
              <p className="text-[#4A5568] mb-4 sm:mb-6 leading-relaxed font-dm-sans text-sm sm:text-base">
                Jag älskar er sajt och har varit kund länge. Över 2000 beställningar senare kan jag säga att det är ett underbart sätt att känna sig kopplad till en modell. Briljant koncept!
              </p>
              <p className="font-bold text-[#064F8C] text-right font-lora">J M</p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#E2DDD4]/30 hover:shadow-xl transition-all duration-300">
              <div className="text-[#F5D061] text-3xl sm:text-4xl mb-3 sm:mb-4">"</div>
              <p className="text-[#4A5568] mb-4 sm:mb-6 leading-relaxed font-dm-sans text-sm sm:text-base">
                Fantastisk sajt! Handlar minst en gång i månaden. Era modeller, kundservice och alternativ är bättre än andra sajter. Fortsätter vara lojal kund!
              </p>
              <p className="font-bold text-[#064F8C] text-right font-lora">A B</p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-[#E2DDD4]/30 hover:shadow-xl transition-all duration-300">
              <div className="text-[#F5D061] text-3xl sm:text-4xl mb-3 sm:mb-4">"</div>
              <p className="text-[#4A5568] mb-4 sm:mb-6 leading-relaxed font-dm-sans text-sm sm:text-base">
                Var tveksam först men ni levererar alltid! Kundservice bättre än de flesta "vanliga" företag. Fantastisk och unik service!
              </p>
              <p className="font-bold text-[#064F8C] text-right font-lora">T P</p>
            </div>
          </div>


        </div>
      </section>
      
      <Newsletter />
    </div>
  );
}
