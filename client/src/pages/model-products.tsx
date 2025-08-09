import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Star, Eye } from "lucide-react";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { type ProductWithSeller } from "@shared/schema";

export default function ModelProductsPage() {
  const { modelName } = useParams<{ modelName: string }>();
  
  // Mapping from model display names to seller aliases in database
  const modelToSellerMap: Record<string, string> = {
    "astrid-nordstrom": "Astrid",
    "emma-lindqvist": "Emma", 
    "sara-andersson": "Emma", // Using Emma as fallback since we only have 3 sellers
    "nina-karlsson": "Linnea",
    "maja-eriksson": "Linnea"
  };

  const sellerAlias = modelToSellerMap[modelName || ""];
  
  const { data: allProducts, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
  });

  // Filter products by seller alias
  const modelProducts = allProducts?.filter(product => 
    product.seller.alias === sellerAlias
  ) || [];

  // Get model display info
  const getModelDisplayInfo = (modelKey: string) => {
    const modelInfo: Record<string, { name: string; displayName: string }> = {
      "astrid-nordstrom": { name: "ASTRID NORDSTRÖM", displayName: "Astrid" },
      "emma-lindqvist": { name: "EMMA LINDQVIST", displayName: "Emma" },
      "sara-andersson": { name: "SARA ANDERSSON", displayName: "Sara" },
      "nina-karlsson": { name: "NINA KARLSSON", displayName: "Nina" },
      "maja-eriksson": { name: "MAJA ERIKSSON", displayName: "Maja" }
    };
    return modelInfo[modelKey] || { name: "OKÄND MODELL", displayName: "Okänd" };
  };

  const modelInfo = getModelDisplayInfo(modelName || "");

  if (!sellerAlias) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2D3748] mb-4">Modell hittades inte</h1>
          <Link href="/models">
            <Button className="gold-button">Tillbaka till Modeller</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/models">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tillbaka till Modeller
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 gradient-midnight-cyan rounded-full flex items-center justify-center">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#2D3748] mb-2">
                {modelInfo.displayName}s Kollektion
              </h1>
              <p className="text-[#4A5568] text-lg">
                Utforska {modelInfo.displayName}s exklusiva urval av intima plagg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : modelProducts.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2D3748] mb-4">
                {modelProducts.length} Exklusiva Plagg
              </h2>
              <p className="text-[#4A5568] text-lg max-w-2xl mx-auto">
                Handplockade av {modelInfo.displayName} själv - varje plagg berättar sin egen historia
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {modelProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#2D3748] mb-4">
              Inga produkter tillgängliga än
            </h2>
            <p className="text-[#4A5568] text-lg mb-8 max-w-md mx-auto">
              {modelInfo.displayName} arbetar på att lägga till nya spännande plagg. 
              Kom tillbaka snart för att se hennes kollektion!
            </p>
            <Link href="/models">
              <Button className="gold-button">
                Utforska Andra Modeller
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Back to Models */}
      <div className="bg-white border-t border-[#E2E8F0] py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold text-[#2D3748] mb-4">
            Upptäck Fler Modeller
          </h3>
          <p className="text-[#4A5568] mb-6">
            Utforska våra andra fantastiska modeller och deras unika kollektioner
          </p>
          <Link href="/models">
            <Button size="lg" className="gradient-midnight-cyan text-white font-medium px-8 py-4 text-lg rounded-3xl shadow-lg">
              Se Alla Modeller
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}