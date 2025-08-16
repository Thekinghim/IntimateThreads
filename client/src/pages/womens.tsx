import { useQuery } from "@tanstack/react-query";
import KitAceProductCard from "@/components/kit-ace-product-card";
import Newsletter from "@/components/newsletter";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useState } from "react";
import { PenTool } from "lucide-react";
import { type ProductWithSeller } from "@shared/schema";
import womensHeroImage from '@assets/cj4_1755033026450.jpg';
import SEOHead from "@/components/seo-head";


export default function Womens() {
  const [selectedModel, setSelectedModel] = useState("all");

  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Filter for women's products only
  const womensProducts = products?.filter(product => 
    product.category?.toLowerCase() === 'women' || 
    product.category?.toLowerCase() === 'womens' ||
    !product.category // Default to women's if no category
  ) || [];

  // Get unique models from products
  const availableModels = Array.from(new Set(womensProducts.map(product => product.seller.alias)));

  const filteredProducts = womensProducts.filter((product) => {
    const matchesModel = selectedModel === "all" || product.seller.alias === selectedModel;
    return matchesModel && product.isAvailable;
  });

  // No sorting needed anymore, just use filtered products

  const womensStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Använda Trosor - Scandiscent",
    "url": "https://scandiscent.replit.app/womens",
    "description": "Köp exklusiva använda trosor från verifierade nordiska kvinnor. Handplockade intimplagg med handskrivna kort från modellerna.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": filteredProducts.length,
      "itemListElement": filteredProducts.slice(0, 5).map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.title,
        "description": product.description,
        "offers": {
          "@type": "Offer",
          "price": product.priceKr,
          "priceCurrency": "SEK",
          "availability": product.isAvailable ? "InStock" : "OutOfStock"
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <SEOHead
        title="Använda Trosor från Nordiska Kvinnor | Scandiscent - Diskret Handel"
        description="Köp exklusiva använda trosor från verifierade nordiska kvinnor på Scandiscent. Handplockade intimplagg med handskrivna kort, diskret leverans och säkra betalningar."
        keywords="använda trosor köpa, svenska tjejer trosor, nordiska kvinnor intimplagg, begagnade trosor, diskret handel, handskrivna kort, säker leverans"
        canonicalUrl="https://scandiscent.replit.app/womens"
        structuredData={womensStructuredData}
      />
      {/* Hero Section */}
      <div 
        className="relative text-white py-20 sm:py-24 md:py-32 lg:py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${womensHeroImage}')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-cormorant font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 drop-shadow-lg gold-text">
            Använda Trosor
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-dm-sans text-white/95 max-w-3xl mx-auto drop-shadow-md mb-6 sm:mb-8 px-4">
            Exklusiva använda underkläder från verifierade nordiska kvinnor. Diskret och säkert med fullständig anonymitet.
          </p>
          
          {/* Handwritten Card Feature */}
          <div className="gold-button flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg px-4 sm:px-6 py-3 sm:py-4 max-w-sm sm:max-w-md mx-auto rounded-2xl sm:rounded-3xl shadow-lg font-medium">
            <PenTool className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="text-center">+ Ett handskrivet kort från din modell</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


        {/* Filters and Results Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-6 sm:mb-8">
          {/* Model Filter */}
          <div className="w-full sm:w-auto">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full sm:w-48 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm font-dm-sans">
                <SelectValue placeholder="Välj modell" />
              </SelectTrigger>
              <SelectContent className="font-dm-sans">
                <SelectItem value="all">Alla modeller</SelectItem>
                {availableModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <div>
            <p className="text-[#064F8C]/70 font-dm-sans">
              {isLoading ? "Laddar..." : `${filteredProducts.length} använda trosor`}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-80 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-[#064F8C]/70 text-lg font-dm-sans">Inga produkter från vald modell.</p>
              <Button 
                onClick={() => {
                  setSelectedModel("all");
                }}
                className="mt-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] hover:from-[#B8941F] hover:to-[#E6C200] text-white font-dm-sans font-medium"
              >
                Visa alla modeller
              </Button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <KitAceProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>

      <Newsletter />
    </div>
  );
}