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

export default function Womens() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

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

  const filteredProducts = womensProducts.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && product.isAvailable;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return 300 - 300; // All same price now
      case "price-high":
        return 300 - 300; // All same price now
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
            <span className="text-gray-900">Women's Used</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-[#2D3748] uppercase tracking-widest mb-4">WOMEN'S USED</h1>
          <p className="text-[#4A5568] max-w-2xl mx-auto">
            Exklusiva använda damplagg från verifierade nordiska kvinnor
          </p>
        </div>

        {/* Filters Bar */}
        <div className="border-b border-gray-200 mb-8 pb-4">
          <div className="flex flex-wrap items-center gap-6">
            {/* Search */}
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#064F8C]" />
              <Input
                placeholder="Search products, sellers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm placeholder:text-[#064F8C]/60 focus:border-[#064F8C] focus:ring-2 focus:ring-[#064F8C]/20"
              />
            </div>
            
            {/* Sort dropdown */}
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-white text-[#064F8C] border-2 border-[#064F8C] rounded-lg shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? "Loading..." : `${sortedProducts.length} products found`}
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
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your search.</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                }}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <KitAceProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}