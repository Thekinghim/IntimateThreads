import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useState } from "react";
import { getProductImageUrl, getBackImageUrl } from "@/assets/images";

interface ProductCardProps {
  product: ProductWithSeller;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isHovered, setIsHovered] = useState(false);
  
  // Get front and back images
  const frontImage = getProductImageUrl(product.imageUrl || "");
  const backImage = getBackImageUrl(product.imageUrl || "");

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      sellerId: product.sellerId,
      sellerAlias: product.seller.alias,
      priceKr: parseFloat(product.priceKr),
      imageUrl: product.imageUrl || "",
      size: product.size,
    });
  };

  const getAvailabilityBadge = () => {
    if (!product.isAvailable) {
      return <Badge variant="destructive">Slutsåld</Badge>;
    }
    
    // Simple logic for demo - could be based on creation date, stock, etc.
    const isNew = product.createdAt && new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000;
    if (isNew) {
      return <Badge className="bg-powder-pink text-charcoal">Ny</Badge>;
    }
    
    return <Badge variant="secondary">Tillgänglig</Badge>;
  };

  return (
    <Link href={`/product/${product.id}`}>
      <Card 
        className="bg-gradient-to-br from-[#FEFBEA] to-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-[#111B3E]/10 hover:border-[#064F8C]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img
            src={
              isHovered && backImage 
                ? backImage 
                : frontImage || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400"
            }
            alt={product.title}
            className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-300"
          />
          {backImage && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {isHovered ? 'Baksida' : 'Hover för baksida'}
            </div>
          )}
        </div>
        
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-poppins font-medium text-xl text-[#111B3E]">{product.seller.alias}</h4>
              <p className="text-[#064F8C] text-sm">{product.seller.location}, {product.seller.age} år</p>
            </div>
            {getAvailabilityBadge()}
          </div>
          
          <p className="text-[#064F8C]/80 mb-4 text-sm">{product.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="font-poppins font-semibold text-2xl text-[#111B3E]">
              {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
            </span>
            <Button 
              onClick={handleAddToCart}
              disabled={!product.isAvailable}
              className="gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-poppins font-medium text-sm"
            >
              {product.isAvailable ? "Lägg i varukorg" : "Slutsåld"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
