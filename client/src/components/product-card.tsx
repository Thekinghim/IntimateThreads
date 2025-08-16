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
      priceKr: 300, // Sale price
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
      return <Badge className="gold-accent text-[#111B3E] font-semibold">Ny</Badge>;
    }
    
    // Don't show any badge for available products - it's redundant
    return null;
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
            loading="lazy"
            decoding="async"
            width="400"
            height="256"
          />

        </div>
        
        <CardContent className="p-6 h-48 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-poppins font-medium text-xl text-[#111B3E]">{product.title}</h4>
            </div>
            {getAvailabilityBadge()}
          </div>
          

          
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-poppins font-semibold text-xl text-[#111B3E]">300 kr</span>
            </div>
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
