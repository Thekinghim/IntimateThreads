import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import { ArrowLeft, MapPin, Calendar, Package, Shield, Star, Users, Clock, CheckCircle, Award, Heart } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { type ProductWithSeller } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { getProductImageUrl, getBackImageUrl } from "@/assets/images";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string>("");



  const { data: product, isLoading } = useQuery<ProductWithSeller>({
    queryKey: ['/api/products', id],
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
  });
  
  // Create image gallery with front and back views
  const frontImage = getProductImageUrl(product?.imageUrl || "");
  const backImagePath = product?.imageUrl ? getBackImageUrl(product.imageUrl) : "";
  
  const imageGallery = [
    frontImage || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=800"
  ];
  
  // Add back image if it exists and is different from front
  if (backImagePath && backImagePath !== frontImage) {
    imageGallery.push(backImagePath);
  }



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
      <div className="min-h-screen bg-[#F5F1E8] py-8">
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
      <div className="min-h-screen bg-[#F5F1E8] py-8">
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
    <div className="min-h-screen bg-[#F5F1E8]">
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
            {/* Main product image - adjusted for better PC responsiveness */}
            <div className="aspect-square lg:aspect-[3/4] max-w-full lg:max-w-[500px] xl:max-w-[550px] mx-auto bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={selectedImage || frontImage || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=800"}
                alt={product.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Thumbnails slideshow - responsive */}
            <div className="flex space-x-2 overflow-x-auto sm:overflow-visible">
              {imageGallery.map((img, i) => (
                <div 
                  key={i} 
                  className={`w-16 h-20 sm:w-20 sm:h-24 bg-gray-100 flex-shrink-0 cursor-pointer border-2 transition-all ${
                    selectedImage === img ? 'border-gold-500' : 'border-transparent hover:border-gold-300'
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i === 0 ? 'framsida' : 'baksida'}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                </div>
              ))}
            </div>
          </div>

          {/* Right side - Product Info */}
          <div className="space-y-6 mt-6 lg:mt-0">
            <div className="flex items-start">
              <h1 className="text-2xl sm:text-3xl font-light text-gray-900 uppercase tracking-wider">{product.title}</h1>
            </div>

            <p className="text-sm text-gray-600 capitalize">{product.material}</p>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-2xl sm:text-3xl font-medium text-gray-900">
                  {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                </span>
              </div>
            </div>







            {/* Add to Cart */}
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
                className="w-full bg-blue-600 text-white py-3 text-base font-medium uppercase tracking-wide hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                {product.isAvailable ? "LÄGG TILL I VARUKORG" : "SLUTSÅLD"}
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
