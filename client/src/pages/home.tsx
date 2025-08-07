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
    <div className="min-h-screen">
      {/* Hero Section - Updated for casual/classy feel */}
      <section className="bg-gradient-to-br from-stone-50 via-stone-100 to-sage-green/20 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-poppins font-light text-5xl md:text-7xl text-stone-800 mb-8 leading-tight">
              Authentic Nordic<br />
              <span className="font-medium bg-gradient-to-r from-stone-700 to-stone-600 bg-clip-text text-transparent">Collection</span>
            </h2>
            <p className="text-xl text-stone-600 mb-14 max-w-3xl mx-auto font-light leading-relaxed">
              Discover exclusive, pre-loved intimate apparel from Nordic women. Each piece tells its own story with complete discretion and timeless elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/collection">
                <Button size="lg" className="bg-stone-800 text-white hover:bg-stone-900 font-poppins font-medium px-10 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Explore Collection
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="border-2 border-stone-600 text-stone-700 hover:bg-stone-600 hover:text-white font-poppins font-medium px-10 py-4 rounded-lg transition-all duration-300">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="font-poppins font-medium text-4xl text-stone-800 mb-6">Featured Collection</h3>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto leading-relaxed">Handpicked selection of exclusive pieces from verified Nordic women</p>
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
              <Button variant="outline" size="lg" className="border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white font-poppins font-medium px-8 py-3 rounded-full">
                Se hela kollektionen
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="warm-beige py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="font-poppins font-medium text-3xl text-charcoal mb-4">Så funkar det</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Enkel och diskret process från beställning till leverans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-charcoal mb-4">1. Välj</h4>
              <p className="text-gray-600">Bläddra igenom vår exklusiva kollektion och välj det plagg som tilltalar dig mest.</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <CreditCard className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-charcoal mb-4">2. Betala</h4>
              <p className="text-gray-600">Diskret betalning via kryptovaluta, Revolut eller andra säkra betalningsmetoder.</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Truck className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-charcoal mb-4">3. Diskret frakt</h4>
              <p className="text-gray-600">Plagget skickas diskret i neutral förpackning utan avslöjande märkningar.</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Gift className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-xl text-charcoal mb-4">4. Få hem</h4>
              <p className="text-gray-600">Motta ditt paket hemma med fullständig anonymitet och diskretion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Discretion */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <KeyRound className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-lg text-charcoal mb-2">Fullständig anonymitet</h4>
              <p className="text-gray-600 text-sm">All kommunikation och leverans sker diskret utan avslöjande information</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <Gift className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-lg text-charcoal mb-2">Diskret förpackning</h4>
              <p className="text-gray-600 text-sm">Neutral förpackning utan logotyper eller avslöjande märkningar</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                <Shield className="h-8 w-8 text-powder-pink" />
              </div>
              <h4 className="font-poppins font-medium text-lg text-charcoal mb-2">Säker betalning</h4>
              <p className="text-gray-600 text-sm">Krypterade betalningar som garanterar din integritet</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
