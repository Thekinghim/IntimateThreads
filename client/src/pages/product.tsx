import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedWearDays, setSelectedWearDays] = useState<number>(0);
  
  const sizeChart = {
    'XS': { bust: '78-82', waist: '60-64', hips: '86-90' },
    'S': { bust: '82-86', waist: '64-68', hips: '90-94' },
    'M': { bust: '86-90', waist: '68-72', hips: '94-98' },
    'L': { bust: '90-94', waist: '72-76', hips: '98-102' },
    'XL': { bust: '94-98', waist: '76-80', hips: '102-106' },
    'XXL': { bust: '98-102', waist: '80-84', hips: '106-110' }
  };

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

  // Calculate final price with wear days
  const calculateFinalPrice = (basePrice: string, wearDays: number): number => {
    const base = parseFloat(basePrice);
    if (wearDays === 0) return base;
    if (wearDays === 1) return base + 500;
    if (wearDays === 2) return base + 1000;
    if (wearDays === 3) return base + 1500;
    if (wearDays >= 4 && wearDays <= 7) return base + 2000;
    if (wearDays >= 8) return base + 3000;
    return base;
  };

  const wearDays = selectedWearDays;
  const finalPrice = product ? calculateFinalPrice(product.priceKr, wearDays) : 0;

  const handleAddToCart = () => {
    if (!product) return;
    
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
                  <div className="text-xs text-gray-500 text-center mt-1">
                    {i === 0 ? 'Fram' : 'Bak'}
                  </div>
                </div>
              ))}
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

            {/* Price with wear days */}
            <div className="space-y-2">
              <div className="flex flex-col space-y-1">
                {wearDays > 0 && (
                  <span className="text-lg line-through text-gray-400">
                    {parseFloat(product.priceKr).toLocaleString('sv-SE')} kr (grundpris)
                  </span>
                )}
                <span className="text-2xl sm:text-3xl font-medium text-gray-900">
                  {finalPrice.toLocaleString('sv-SE')} kr
                </span>
                {wearDays > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {wearDays} dag{wearDays !== 1 ? 'ar' : ''} använd
                    </span>
                    <span className="text-sm text-green-600">
                      +{(finalPrice - parseFloat(product.priceKr)).toLocaleString('sv-SE')} kr extra
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              Diskret förpackning och anonym leverans ingår alltid
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
                  onClick={() => setSelectedColor('black')}
                  className={`w-8 h-8 bg-black rounded-full border-2 transition-all ${
                    selectedColor === 'black' 
                      ? 'border-gray-900 ring-2 ring-gray-400' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                ></button>
                <button 
                  onClick={() => setSelectedColor('gray')}
                  className={`w-8 h-8 bg-gray-300 rounded-full border-2 transition-all ${
                    selectedColor === 'gray' 
                      ? 'border-gray-600 ring-2 ring-gray-400' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                ></button>
              </div>
            </div>

            {/* Wear Days Selector */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Antal dagar använd:</h3>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((days) => (
                  <button
                    key={days}
                    onClick={() => setSelectedWearDays(days)}
                    className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                      selectedWearDays === days
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {days === 0 ? 'Ny' : `${days} dag${days > 1 ? 'ar' : ''}`}
                  </button>
                ))}
              </div>
              
              {/* Price explanation */}
              <div className="text-xs text-gray-500 mb-4">
                {wearDays === 0 && "Grundpris - helt ny produkt"}
                {wearDays === 1 && "Grundpris + 500 kr"}
                {wearDays === 2 && "Grundpris + 1,000 kr"}
                {wearDays === 3 && "Grundpris + 1,500 kr"}
                {wearDays >= 4 && wearDays <= 7 && "Grundpris + 2,000 kr"}
                {wearDays >= 8 && "Grundpris + 3,000 kr"}
              </div>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size:</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-sm text-gray-500 underline flex items-center hover:text-gray-700">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Size Guide
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Size Guide (cm)</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-900 border-b pb-2">
                        <div>Size</div>
                        <div>Bust</div>
                        <div>Waist</div>
                        <div>Hips</div>
                      </div>
                      {Object.entries(sizeChart).map(([size, measurements]) => (
                        <div key={size} className="grid grid-cols-4 gap-2 text-sm text-gray-600">
                          <div className="font-medium">{size}</div>
                          <div>{measurements.bust}</div>
                          <div>{measurements.waist}</div>
                          <div>{measurements.hips}</div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      if (size !== 'XL') {
                        setSelectedSize(size);
                      }
                    }}
                    className={`py-3 px-2 border text-sm font-medium text-center transition-all ${
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
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-all"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-2 border border-gray-300 min-w-12 text-center">{quantity}</span>
                <button 
                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 transition-all"
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

            {/* Social Proof & Trust Signals */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800">Verifierad säljare</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">(4.9/5)</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>ID-verifierad</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Premium säljare</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span>100+ nöjda kunder</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>98% återköpsgrad</span>
                </div>
              </div>
            </div>

            {/* Why Buy From Us */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 text-purple-600 mr-2" />
                Varför välja Scandiscent?
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start space-x-2">
                  <Shield className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">100% diskret leverans</span>
                    <p className="text-gray-600">Neutrala paket utan synlig avsändare</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Snabb leverans</span>
                    <p className="text-gray-600">1-3 arbetsdagar inom Sverige</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Kvalitetsgaranti</span>
                    <p className="text-gray-600">Alla produkter är kvalitetskontrollerade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Över 10 000 nöjda kunder</span>
                    <p className="text-gray-600">Skandinaviens mest betrodda plattform</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-gray-50 p-6 rounded-xl mb-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                Vad säger våra kunder
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Verified Purchase</span>
                  </div>
                  <p className="text-sm text-gray-700 italic">"Fantastisk kvalitet och otroligt diskret leverans. Precis som beskrevet!"</p>
                  <p className="text-xs text-gray-500 mt-1">- Anna K., Stockholm</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex space-x-1">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Verified Purchase</span>
                  </div>
                  <p className="text-sm text-gray-700 italic">"Snabb leverans och produkten var exakt som jag förväntade mig. Kommer definitivt köpa igen!"</p>
                  <p className="text-xs text-gray-500 mt-1">- Maria L., Göteborg</p>
                </div>
              </div>
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
