import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { type ProductWithSeller } from "@shared/schema";
import { Search } from "lucide-react";

export default function Collection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterSize, setFilterSize] = useState("all");

  const { data: products, isLoading } = useQuery<ProductWithSeller[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSize = filterSize === "all" || product.size === filterSize;
    
    return matchesSearch && matchesSize && product.isAvailable;
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.priceKr) - parseFloat(b.priceKr);
      case "price-high":
        return parseFloat(b.priceKr) - parseFloat(a.priceKr);
      case "newest":
        return (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-poppins font-medium text-4xl text-charcoal mb-4">Hela Kollektionen</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Utforska vårt kompletta utbud av exklusiva plagg från verifierade nordiska kvinnor
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Sök produkter, säljare..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterSize} onValueChange={setFilterSize}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrera storlek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla storlekar</SelectItem>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sortera" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Nyaste först</SelectItem>
                <SelectItem value="price-low">Pris: låg till hög</SelectItem>
                <SelectItem value="price-high">Pris: hög till låg</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {isLoading ? "Laddar..." : `${sortedProducts.length} produkter hittades`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
              </div>
            ))
          ) : sortedProducts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">Inga produkter hittades med dina filterkriterier.</p>
              <p className="text-gray-500 text-sm mt-2">Prova att justera dina sökkriterier eller rensa filtren.</p>
            </div>
          ) : (
            sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
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
