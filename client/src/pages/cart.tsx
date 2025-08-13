import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { getProductImageUrl } from "@/assets/images";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, debugClearStorage } = useCartStore();

  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="h-20 w-20 text-[#064F8C] mx-auto mb-6" />
            <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Din varukorg är tom</h1>
            <p className="text-[#4A5568] text-lg mb-10 font-dm-sans">Utforska vår kollektion för att hitta något speciellt</p>
            <Link href="/womens">
              <Button className="gold-button font-medium px-8 py-4 text-lg rounded-3xl shadow-lg">
                Utforska kollektion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h1 className="font-cormorant font-bold text-5xl gold-text">Varukorg</h1>
          <Badge variant="secondary" className="gradient-midnight-cyan text-white text-base px-4 py-2">
            {itemCount} {itemCount === 1 ? 'artikel' : 'artiklar'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border-none overflow-hidden">
              <CardContent className="p-0">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 bg-gray-50">
                  <div className="col-span-6 text-sm font-medium text-[#4A5568] uppercase tracking-wide">PRODUKT DETALJER</div>
                  <div className="col-span-2 text-sm font-medium text-[#4A5568] uppercase tracking-wide text-center">KVANTITET</div>
                  <div className="col-span-2 text-sm font-medium text-[#4A5568] uppercase tracking-wide text-center">PRIS</div>
                  <div className="col-span-2 text-sm font-medium text-[#4A5568] uppercase tracking-wide text-center">TOTALT</div>
                </div>

                {/* Cart Items */}
                {items.map((item, index) => (
                  <div key={item.id} className={`grid grid-cols-12 gap-4 p-6 ${index !== items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    {/* Product Details */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <img
                        src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm flex-shrink-0"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-lora font-semibold text-lg text-[#064F8C] mb-1">
                          {item.sellerAlias} - {item.title}
                        </h3>
                        <p className="text-[#4A5568] text-sm font-dm-sans">Storlek: {item.size}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 text-sm font-dm-sans mt-1"
                        >
                          Ta bort
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex items-center justify-center">
                      <div className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium text-sm text-[#064F8C]">{item.quantity}</span>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="font-dm-sans font-medium text-[#064F8C]">
                        {item.priceKr.toLocaleString('sv-SE')} kr
                      </span>
                    </div>

                    {/* Total */}
                    <div className="col-span-2 flex items-center justify-center">
                      <span className="font-dm-sans font-bold text-[#064F8C]">
                        {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  </div>
                ))}

                {/* Continue Shopping */}
                <div className="p-6 border-t border-gray-100">
                  <Link href="/womens">
                    <Button variant="ghost" className="text-[#064F8C] hover:text-[#111B3E] font-dm-sans">
                      ← Fortsätt handla
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white shadow-lg border-none">
              <CardContent className="p-6">
                <h2 className="font-cormorant font-bold text-2xl text-[#064F8C] mb-6">Ordersammanfattning</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#4A5568] font-dm-sans">ARTIKLAR: {itemCount}</span>
                    <span className="text-[#064F8C] font-bold font-dm-sans">{totalPrice.toLocaleString('sv-SE')} kr</span>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#4A5568] font-dm-sans">FRAKT:</span>
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#4A5568] font-dm-sans">Standard leverans - 65 kr</span>
                        <button className="text-[#064F8C] hover:text-[#111B3E]">▼</button>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 pb-4">
                    <div className="text-sm text-[#4A5568] font-dm-sans mb-2">RABATTKOD:</div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ange din kod"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm font-dm-sans focus:outline-none focus:border-[#064F8C]"
                      />
                      <Button 
                        size="sm" 
                        className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 text-sm font-dm-sans"
                      >
                        ANVÄND
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-[#064F8C] font-cormorant">TOTAL KOSTNAD:</span>
                      <span className="text-[#064F8C] font-cormorant">{(totalPrice + 65).toLocaleString('sv-SE')} kr</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-[#6366f1] hover:bg-[#5855eb] text-white py-4 rounded font-medium text-lg mb-4">
                    CHECKOUT
                  </Button>
                </Link>

                <div className="mt-6 text-center space-y-2">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm font-dm-sans"
                  >
                    Töm varukorg
                  </Button>
                  <br />
                  <Button
                    variant="ghost"
                    onClick={debugClearStorage}
                    className="text-orange-500 hover:text-orange-700 hover:bg-orange-50 text-xs font-dm-sans"
                  >
                    Debug: Rensa localStorage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
