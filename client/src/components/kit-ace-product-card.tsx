import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface KitAceProductCardProps {
  product: ProductWithSeller;
}

export default function KitAceProductCard({ product }: KitAceProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();

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
    
    toast({
      title: "Added to cart",
      description: `${product.title} from ${product.seller.alias}`,
    });
  };

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square w-full overflow-hidden bg-gray-100 group-hover:opacity-75 transition-opacity">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=400"}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        <div className="mt-4 space-y-2">
          <h3 className="text-sm font-light text-gray-900 uppercase tracking-wide">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600">{product.seller.alias}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">
              {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
            </p>
            {product.wearDays && (
              <span className="text-xs text-gray-500">
                {product.wearDays} days worn
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="mt-3">
        <Button 
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          variant="outline"
          size="sm"
          className="w-full text-xs font-medium uppercase tracking-wide border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
        >
          {product.isAvailable ? "Quick Add" : "Sold Out"}
        </Button>
      </div>
    </div>
  );
}