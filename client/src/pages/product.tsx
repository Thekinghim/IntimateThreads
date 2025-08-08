import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, MapPin, Calendar, Package } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  const { data: product, isLoading } = useQuery<ProductWithSeller>({
    queryKey: ['/api/products', id],
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
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
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-gray-900">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Left side - Product Images */}
          <div className="space-y-4">
            {/* Thumbnails - responsive */}
            <div className="flex space-x-2 mb-4 overflow-x-auto sm:overflow-visible">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-20 sm:w-20 sm:h-24 bg-gray-100 flex-shrink-0">
                  <img
                    src={product.imageUrl || `https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=200&q=80&random=${i}`}
                    alt={`${product.title} view ${i}`}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>
              ))}
            </div>

            {/* Main product image */}
            <div className="aspect-square sm:aspect-[4/5] bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=800"}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-6 mt-6 lg:mt-0">
            <div className="flex items-start justify-between">
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900 uppercase tracking-wider pr-4">{product.title}</h1>
              <button className="p-2 text-gray-400 hover:text-gray-600 flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <p className="text-sm text-gray-600 capitalize">{product.material}</p>

            {/* Price */}
            <div className="flex flex-col sm:flex-row sm:items-baseline space-y-1 sm:space-y-0 sm:space-x-3">
              <span className="text-lg line-through text-gray-400">
                ${(parseFloat(product.priceKr) * 2 / 10).toFixed(2)}
              </span>
              <span className="text-2xl sm:text-3xl font-medium text-gray-900">
                ${(parseFloat(product.priceKr) / 10).toFixed(2)}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              4 interest-free payments of ${(parseFloat(product.priceKr) / 40).toFixed(2)} CAD with <strong>Klarna</strong> or <strong>afterpay</strong>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="h-4 w-4 text-blue-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">129 reviews</span>
            </div>

            {/* Color */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color: {product.color}</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedColor('black');
                    console.log('Selected black color');
                  }}
                  className={`w-8 h-8 bg-black rounded-full border-2 ${
                    selectedColor === 'black' 
                      ? 'border-gray-900 ring-2 ring-gray-400' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                ></button>
                <button 
                  onClick={() => {
                    setSelectedColor('gray');
                    console.log('Selected gray color');
                  }}
                  className={`w-8 h-8 bg-gray-300 rounded-full border-2 ${
                    selectedColor === 'gray' 
                      ? 'border-gray-600 ring-2 ring-gray-400' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                ></button>
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size:</h3>
                <button className="text-sm text-gray-500 underline flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (size !== 'XL') {
                        setSelectedSize(size);
                        console.log(`Selected size: ${size}`);
                      }
                    }}
                    className={`py-3 px-2 border text-sm font-medium text-center ${
                      size === selectedSize
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : size === 'XL' 
                        ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'border-gray-300 bg-white text-gray-900 hover:border-gray-400'
                    }`}
                    disabled={size === 'XL'}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Archive Sale Notice */}
            <div className="bg-blue-50 p-3 rounded">
              <p className="text-sm text-blue-800">
                • 50% Off Archive Sales. Discount applied in cart.
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      console.log('Decrease quantity');
                    }
                  }}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border border-gray-300 min-w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => {
                    if (quantity < 10) {
                      setQuantity(quantity + 1);
                      console.log('Increase quantity');
                    }
                  }}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={!product.isAvailable || !selectedSize}
                className="w-full bg-blue-600 text-white py-3 text-base font-medium uppercase tracking-wide hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {!selectedSize ? "SELECT SIZE" : product.isAvailable ? "ADD TO CART" : "OUT OF STOCK"}
              </button>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <button className="w-full flex justify-between items-center py-3 text-left">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wide">🔽 DESCRIPTION</span>
                <span className="text-gray-400">-</span>
              </button>
              <div className="pb-4 text-sm text-gray-600 leading-relaxed">
                <p>{product.description}</p>
                <br />
                <p>Material: {product.material}</p>
                <p>Seller: {product.seller.alias}, {product.seller.location}</p>
                <p>Age: {product.seller.age} years</p>
                {product.wearDays && <p>Days worn: {product.wearDays}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
