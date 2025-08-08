import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
        case "1-3": matchesWearDays = wearDays >= 1 && wearDays <= 3; break;
        case "4-7": matchesWearDays = wearDays >= 4 && wearDays <= 7; break;
        case "8+": matchesWearDays = wearDays >= 8; break;
      }
    }
    
    return matchesSearch && matchesSize && matchesMaterial && matchesColor && matchesWearDays && product.isAvailable;
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-2">
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
                <SelectValue placeholder="Storlek" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla storlekar</SelectItem>
                <SelectItem value="XS">XS</SelectItem>
                <SelectItem value="S">S</SelectItem>
                <SelectItem value="M">M</SelectItem>
                <SelectItem value="L">L</SelectItem>
                <SelectItem value="XL">XL</SelectItem>
                <SelectItem value="XXL">XXL</SelectItem>
                <SelectItem value="One Size">One Size</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterMaterial} onValueChange={setFilterMaterial}>
              <SelectTrigger>
                <SelectValue placeholder="Material" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla material</SelectItem>
                <SelectItem value="Cotton">Bomull</SelectItem>
                <SelectItem value="Lace">Spets</SelectItem>
                <SelectItem value="Silk">Siden</SelectItem>
                <SelectItem value="Satin">Satin</SelectItem>
                <SelectItem value="Modal">Modal</SelectItem>
                <SelectItem value="Bamboo">Bambu</SelectItem>
                <SelectItem value="Polyester">Polyester</SelectItem>
                <SelectItem value="Mesh">Mesh</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterColor} onValueChange={setFilterColor}>
              <SelectTrigger>
                <SelectValue placeholder="Färg" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla färger</SelectItem>
                <SelectItem value="Black">Svart</SelectItem>
                <SelectItem value="White">Vit</SelectItem>
                <SelectItem value="Red">Röd</SelectItem>
                <SelectItem value="Pink">Rosa</SelectItem>
                <SelectItem value="Blue">Blå</SelectItem>
                <SelectItem value="Purple">Lila</SelectItem>
                <SelectItem value="Green">Grön</SelectItem>
                <SelectItem value="Yellow">Gul</SelectItem>
                <SelectItem value="Beige">Beige</SelectItem>
                <SelectItem value="Gray">Grå</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterWearDays} onValueChange={setFilterWearDays}>
              <SelectTrigger>
                <SelectValue placeholder="Bärdagar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla bärdagar</SelectItem>
                <SelectItem value="new">Oanvänd (0 dagar)</SelectItem>
                <SelectItem value="1-3">1-3 dagar</SelectItem>
                <SelectItem value="4-7">4-7 dagar</SelectItem>
                <SelectItem value="8+">8+ dagar</SelectItem>
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

          {/* Clear Filters Button */}
          {(searchTerm || filterSize !== "all" || filterMaterial !== "all" || filterColor !== "all" || filterWearDays !== "all") && (
            <div className="mt-4 pt-4 border-t">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setFilterSize("all");
                  setFilterMaterial("all");
                  setFilterColor("all");
                  setFilterWearDays("all");
                  setSortBy("newest");
                }}
                className="text-sm"
              >
                Rensa alla filter
              </Button>
            </div>
          )}
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
