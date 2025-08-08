import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface KitAceProductCardProps {
  product: ProductWithSeller;
}

function calculatePriceWithWearDays(basePrice: string, wearDays: number): number {
  const base = parseFloat(basePrice);
  const daysPricing = {
    0: 0,    // Ny
    1: 500,  // 1 dag
    2: 1000, // 2 dagar
    3: 1500, // 3 dagar
  };
  
  if (wearDays <= 3) {
    return base + (daysPricing[wearDays as keyof typeof daysPricing] || 0);
  } else if (wearDays >= 4 && wearDays <= 7) {
    return base + 2000; // 4-7 dagar
  } else if (wearDays >= 8) {
    return base + 3000; // 8+ dagar
  }
  
  return base;
}

export default function KitAceProductCard({ product }: KitAceProductCardProps) {
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const wearDays = product.wearDays || 0;
  const finalPrice = calculatePriceWithWearDays(product.priceKr, wearDays);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      sellerId: product.sellerId,
      sellerAlias: product.seller.alias,
      priceKr: finalPrice,
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
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {wearDays > 0 && (
                  <span className="text-xs text-gray-500 line-through">
                    {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                  </span>
                )}
                <p className="text-sm font-medium text-gray-900">
                  {finalPrice.toLocaleString('sv-SE')} kr
                </p>
              </div>
              {wearDays > 0 && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                  {wearDays} dag{wearDays !== 1 ? 'ar' : ''} använd
                </span>
              )}
            </div>
            {wearDays > 0 && (
              <p className="text-xs text-green-600">
                +{(finalPrice - parseFloat(product.priceKr)).toLocaleString('sv-SE')} kr för extra dagar
              </p>
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