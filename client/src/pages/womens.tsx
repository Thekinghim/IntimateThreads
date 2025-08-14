import { useQuery } from "@tanstack/react-query";
import KitAceProductCard from "@/components/kit-ace-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useState } from "react";
import { type ProductWithSeller } from "@shared/schema";


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

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Hem</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Använda Trosor</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-none mb-8 tracking-tight gold-text-static" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Använda Trosor
          </h1>
        </div>

        {/* Filters Bar */}
        <div className="border-b border-[#064F8C]/20 mb-8 pb-6">
          <div className="flex flex-wrap items-center gap-6">
            {/* Model Filter */}
            <div className="flex gap-4">
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-48 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm font-dm-sans">
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
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-[#064F8C]/70 font-dm-sans">
            {isLoading ? "Laddar..." : `${filteredProducts.length} använda trosor`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
    </div>
  );
}