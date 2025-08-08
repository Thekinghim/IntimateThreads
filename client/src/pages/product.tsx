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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/collection" className="text-gray-500 hover:text-gray-700">Collection</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Product Images */}
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square w-full">
                <img
                  src={product.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=800"}
                  alt={product.title}
                  className="w-full h-full object-cover bg-gray-100"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-gray-100 flex-shrink-0">
                    <img
                      src={product.imageUrl || `https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=200&q=80&random=${i}`}
                      alt={`${product.title} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-2xl font-light text-gray-900 uppercase tracking-wide">{product.title}</h1>
                <div className="mt-2 flex items-center">
                  <p className="text-sm text-gray-600">{product.seller.alias}</p>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-gray-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">129 reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-light text-gray-900">
                  {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                </span>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Färg: {product.color}</h3>
                <div className="flex space-x-3">
                  <div className={`w-8 h-8 rounded-full border-2 border-gray-400 bg-${product.color.toLowerCase()}-500`}></div>
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Size:</h3>
                  <button className="text-sm text-gray-500 underline">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['XXS', 'XS', 'S', 'M'].map((size) => (
                    <button
                      key={size}
                      className={`py-2 px-3 border text-sm font-medium ${
                        size === product.size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Wear Days Info */}
              {product.wearDays && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    • Bärdagar: {product.wearDays} dagar
                  </p>
                </div>
              )}

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.isAvailable}
                  className="w-full bg-gray-900 text-white hover:bg-gray-800 py-4 text-base font-medium uppercase tracking-wide"
                >
                  {product.isAvailable ? "Lägg i varukorg" : "Slutsåld"}
                </Button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Diskret leverans • 3-5 arbetsdagar
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="border-t pt-6">
                <button className="w-full flex justify-between items-center py-4 text-left">
                  <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">Description</span>
                  <span className="text-gray-400">+</span>
                </button>
                <div className="pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>• Material: {product.material}</p>
                    <p>• Säljare: {product.seller.alias}, {product.seller.location}</p>
                    <p>• Ålder: {product.seller.age} år</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
