import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { getProductImageUrl, getBackImageUrl } from "@/assets/images";

interface KitAceProductCardProps {
  product: ProductWithSeller;
}

export default function KitAceProductCard({ product }: KitAceProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const salePrice = 300; // All underwear now has sale price of 300kr
  const originalPrice = 500; // All underwear original price is 500kr
  
  const frontImageUrl = getProductImageUrl(product.imageUrl || "");
  const backImageUrl = getBackImageUrl(product.imageUrl || "");
  const currentImageUrl = isHovered && backImageUrl ? backImageUrl : frontImageUrl;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      sellerId: product.sellerId,
      sellerAlias: product.seller.alias,
      priceKr: salePrice,
      imageUrl: product.imageUrl || "",
      size: product.size,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.title} from ${product.seller.alias}`,
    });
  };

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div 
          className="aspect-square w-full overflow-hidden bg-gray-100 group-hover:opacity-75 transition-opacity"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={currentImageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400"}
            alt={product.title}
            className="h-full w-full object-cover object-center transition-all duration-300 ease-in-out"
          />
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-light text-[#111B3E] uppercase tracking-wide">
            {product.title}
          </h3>
          
          {/* Model link */}
          <span 
            className="text-sm text-[#064F8C] hover:text-[#111B3E] transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/model/${product.seller.alias.toLowerCase()}`;
            }}
          >
            Modell - {product.seller.alias}
          </span>

          {/* Price display with sale price */}
          <div className="flex flex-col">
            <span className="text-xs text-[#064F8C]/70 line-through">
              {originalPrice} kr
            </span>
            <p className="text-sm font-medium text-[#111B3E]">
              {salePrice} kr
            </p>
          </div>
        </div>
      </Link>
      
      <div className="mt-3">
        <Button 
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          variant="outline"
          size="sm"
          className="w-full text-xs font-medium uppercase tracking-wide border-[#111B3E] text-[#111B3E] bg-white hover:bg-[#111B3E] hover:text-white transition-all duration-200"
        >
          {product.isAvailable ? "Lägg till" : "Slutsåld"}
        </Button>
      </div>
    </div>
  );
}