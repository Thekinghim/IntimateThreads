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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function Product() {
  const { id } = useParams();
  const { addItem } = useCartStore();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string>("1");
  const [workoutOption, setWorkoutOption] = useState<boolean>(false);
  const [insertionOption, setInsertionOption] = useState<boolean>(false);



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

  // Calculate total price based on selections
  const calculateTotalPrice = () => {
    if (!product) return 0;
    let total = parseFloat(product.priceKr);
    
    // Days pricing
    if (selectedDays === "2") total += 100;
    else if (selectedDays === "3") total += 200;
    else if (selectedDays === "4") total += 300;
    else if (selectedDays === "week") total += 1000;
    
    // Extra options
    if (workoutOption) total += 150;
    if (insertionOption) total += 200;
    
    return total;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Create customization description
    let customDescription = "";
    if (product.title?.toLowerCase().includes('trosor')) {
      const dayTexts = {
        "1": "1 dag",
        "2": "2 dagar", 
        "3": "3 dagar",
        "4": "4 dagar",
        "week": "1 vecka"
      };
      customDescription = dayTexts[selectedDays as keyof typeof dayTexts];
      
      if (workoutOption) customDescription += ", Träning";
      if (insertionOption) customDescription += ", Uppstoppad";
    }
    
    addItem({
      id: product.id,
      title: customDescription ? `${product.title} (${customDescription})` : product.title,
      sellerId: product.sellerId,
      sellerAlias: product.seller.alias,
      priceKr: calculateTotalPrice(),
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



            {/* Price */}
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                <span className="text-2xl sm:text-3xl font-medium text-gray-900">
                  {calculateTotalPrice().toLocaleString('sv-SE')} kr
                </span>
                {calculateTotalPrice() > parseFloat(product.priceKr) && (
                  <span className="text-sm text-gray-500">
                    Baspris: {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr
                  </span>
                )}
              </div>
            </div>

            {/* Customization Options - Only for used panties */}
            {product.title?.toLowerCase().includes('trosor') && (
              <div className="space-y-6 p-4 bg-gray-50 rounded-lg">
                {/* Days Selection */}
                <div className="space-y-3">
                  <Label className="font-dm-sans text-[#4A5568] font-medium">Använda dagar</Label>
                  <RadioGroup 
                    value={selectedDays} 
                    onValueChange={setSelectedDays}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="day1" />
                      <Label htmlFor="day1" className="text-sm cursor-pointer">1 dag</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="day2" />
                      <Label htmlFor="day2" className="text-sm cursor-pointer">2 dagar (+100kr)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="day3" />
                      <Label htmlFor="day3" className="text-sm cursor-pointer">3 dagar (+200kr)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="day4" />
                      <Label htmlFor="day4" className="text-sm cursor-pointer">4 dagar (+300kr)</Label>
                    </div>
                    <div className="flex items-center space-x-2 col-span-2">
                      <RadioGroupItem value="week" id="week" />
                      <Label htmlFor="week" className="text-sm cursor-pointer">1 vecka (+1000kr)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Extra Options */}
                <div className="space-y-3">
                  <Label className="font-dm-sans text-[#4A5568] font-medium">Extra</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="workout" 
                        checked={workoutOption}
                        onCheckedChange={setWorkoutOption}
                      />
                      <Label htmlFor="workout" className="text-sm cursor-pointer">
                        Träning (+150kr)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="insertion" 
                        checked={insertionOption}
                        onCheckedChange={setInsertionOption}
                      />
                      <Label htmlFor="insertion" className="text-sm cursor-pointer">
                        Uppstoppad (+200kr)
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}

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




          </div>
        </div>
      </div>
    </div>
  );
}
