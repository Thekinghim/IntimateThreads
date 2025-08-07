import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Calendar, Package } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<ProductWithSeller>({
    queryKey: ['/api/products', id],
  });

  const handleAddToCart = () => {
    if (!product) return;
    
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
      title: "Tillagd i varukorg",
      description: `${product.title} från ${product.seller.alias} har lagts till i din varukorg.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-soft-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-charcoal mb-4">Produkten kunde inte hittas</h1>
            <Link href="/collection">
              <Button className="bg-charcoal text-white">Tillbaka till kollektionen</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link href="/collection">
          <Button variant="ghost" className="mb-6 text-charcoal hover:text-powder-pink">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka till kollektionen
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=600"}
              alt={product.title}
              className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-lg"
            />
            {!product.isAvailable && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex items-center justify-center">
                <Badge variant="destructive" className="text-lg px-4 py-2">Slutsåld</Badge>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Seller Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-poppins font-semibold text-3xl text-charcoal">{product.seller.alias}</h1>
                  <div className="flex items-center text-gray-600 mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{product.seller.location}, {product.seller.age} år</span>
                  </div>
                </div>
                {product.isAvailable ? (
                  <Badge className="bg-green-100 text-green-800">Tillgänglig</Badge>
                ) : (
                  <Badge variant="destructive">Slutsåld</Badge>
                )}
              </div>
              
              {product.seller.bio && (
                <p className="text-gray-600 text-sm">{product.seller.bio}</p>
              )}
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-poppins font-medium text-xl text-charcoal mb-4">{product.title}</h2>
              <p className="text-gray-600 mb-6">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Package className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Storlek: {product.size}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">Material: {product.material}</span>
                </div>
              </div>

              {product.wearDays && (
                <div className="mb-6">
                  <span className="text-sm text-gray-600">Antal bärdagar: {product.wearDays}</span>
                </div>
              )}
            </div>

            {/* Price and Purchase */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <span className="font-poppins font-bold text-3xl text-charcoal">
                  {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                </span>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                size="lg"
                className="w-full bg-charcoal text-white hover:bg-gray-800 font-poppins font-medium text-lg py-6"
              >
                {product.isAvailable ? "Lägg i varukorg" : "Slutsåld"}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Diskret leverans inom 3-5 arbetsdagar
              </p>
            </div>

            {/* Discretion Notice */}
            <div className="bg-warm-beige rounded-2xl p-6">
              <h3 className="font-poppins font-medium text-lg text-charcoal mb-3">Diskretion & Säkerhet</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Neutral förpackning utan logotyper</li>
                <li>• Anonyma avsändare- och mottagaruppgifter</li>
                <li>• Säker krypterad betalning</li>
                <li>• Fullständig integritet garanterad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
