import { useQuery } from "@tanstack/react-query";
import KitAceProductCard from "@/components/kit-ace-product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "wouter";
import { useState } from "react";
import { type ProductWithSeller } from "@shared/schema";
import { Search } from "lucide-react";

export default function Collection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterSize, setFilterSize] = useState("all");
  const [filterMaterial, setFilterMaterial] = useState("all");
  const [filterColor, setFilterColor] = useState("all");
  const [filterWearDays, setFilterWearDays] = useState("all");

  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSize = filterSize === "all" || product.size === filterSize;
    const matchesMaterial = filterMaterial === "all" || product.material === filterMaterial;
    const matchesColor = filterColor === "all" || product.color === filterColor;
    
    let matchesWearDays = true;
    if (filterWearDays !== "all") {
      const wearDays = product.wearDays || 0;
      switch (filterWearDays) {
        case "new": matchesWearDays = wearDays === 0; break;
        case "1": matchesWearDays = wearDays === 1; break;
        case "2": matchesWearDays = wearDays === 2; break;
        case "3": matchesWearDays = wearDays === 3; break;
        case "4-7": matchesWearDays = wearDays >= 4 && wearDays <= 7; break;
        case "8+": matchesWearDays = wearDays >= 8; break;
      }
    }
    
    return matchesSearch && matchesSize && matchesMaterial && matchesColor && matchesWearDays && product.isAvailable;
  }) || [];

  // Helper function for calculating final price with wear days
  const calculateFinalPrice = (basePrice: string, wearDays: number): number => {
    const base = parseFloat(basePrice);
    if (wearDays === 0) return base;
    if (wearDays === 1) return base + 500;
    if (wearDays === 2) return base + 1000;
    if (wearDays === 3) return base + 1500;
    if (wearDays >= 4 && wearDays <= 7) return base + 2000;
    if (wearDays >= 8) return base + 3000;
    return base;
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return calculateFinalPrice(a.priceKr, a.wearDays || 0) - calculateFinalPrice(b.priceKr, b.wearDays || 0);
      case "price-high":
        return calculateFinalPrice(b.priceKr, b.wearDays || 0) - calculateFinalPrice(a.priceKr, a.wearDays || 0);
      case "newest":
        return (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">Collection</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-[#2D3748] uppercase tracking-widest mb-4">NORDIC COLLECTION</h1>
          <p className="text-[#4A5568] max-w-2xl mx-auto">
            Exklusiva plagg från verifierade nordiska kvinnor
          </p>
        </div>

        {/* Filters Bar */}
        <div className="border-b border-gray-200 mb-8 pb-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-gray-500"
              />
            </div>
            
            {/* Filter dropdowns */}
            <div className="flex gap-4">
              <Select value={filterSize} onValueChange={setFilterSize}>
                <SelectTrigger className="w-32 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sizes</SelectItem>
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterMaterial} onValueChange={setFilterMaterial}>
                <SelectTrigger className="w-32 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                  <SelectItem value="Lace">Lace</SelectItem>
                  <SelectItem value="Silk">Silk</SelectItem>
                  <SelectItem value="Satin">Satin</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterColor} onValueChange={setFilterColor}>
                <SelectTrigger className="w-32 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colors</SelectItem>
                  <SelectItem value="Black">Black</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Pink">Pink</SelectItem>
                  <SelectItem value="Red">Red</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterWearDays} onValueChange={setFilterWearDays}>
                <SelectTrigger className="w-40 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Antal dagar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla dagar</SelectItem>
                  <SelectItem value="new">Ny (0 dagar)</SelectItem>
                  <SelectItem value="1">1 dag (+500kr)</SelectItem>
                  <SelectItem value="2">2 dagar (+1000kr)</SelectItem>
                  <SelectItem value="3">3 dagar (+1500kr)</SelectItem>
                  <SelectItem value="4-7">4-7 dagar (+2000kr)</SelectItem>
                  <SelectItem value="8+">8+ dagar (+3000kr)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low</SelectItem>
                  <SelectItem value="price-high">Price: High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-sm text-gray-600">
            {isLoading ? "Loading..." : `${sortedProducts.length} products found`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <KitAceProductCard key={product.id} product={product} />
            ))
          )}
        </div>

        {/* Load more button could go here for pagination */}
        {!isLoading && sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">
              Visar alla tillgängliga produkter
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
