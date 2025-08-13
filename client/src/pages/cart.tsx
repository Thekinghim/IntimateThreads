import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";

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
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden bg-white shadow-lg border-none">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 p-4 sm:p-8">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=150"}
                      alt={item.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl shadow-md flex-shrink-0"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-lora font-semibold text-xl text-[#064F8C] truncate">
                        {item.sellerAlias} - {item.title}
                      </h3>
                      <p className="text-[#4A5568] text-base font-dm-sans mt-1">Storlek: {item.size}</p>
                      <p className="font-dm-sans font-bold text-[#064F8C] text-lg mt-2">
                        {item.priceKr.toLocaleString('sv-SE')} kr
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4 rounded-2xl px-2 sm:px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4E971] shadow-lg">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border-2 border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-white transition-all duration-200 shadow-md disabled:opacity-50"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="w-6 sm:w-8 text-center font-bold text-base sm:text-lg text-[#064F8C] drop-shadow-sm">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white border-2 border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-white transition-all duration-200 shadow-md"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 h-12 w-12 rounded-full"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 bg-white shadow-xl border-none">
              <CardContent className="p-8">
                <h2 className="font-cormorant font-bold gold-text mb-8 text-[25px]">Ordersammanfattning</h2>
                
                <div className="space-y-6 mb-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-base">
                      <span className="text-[#4A5568] truncate max-w-[60%] font-dm-sans">
                        {item.sellerAlias} × {item.quantity}
                      </span>
                      <span className="text-[#064F8C] font-bold font-dm-sans">
                        {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#064F8C]/20 pt-6 mb-8">
                  <div className="flex justify-between font-cormorant font-bold text-2xl">
                    <span className="gold-text">Totalt:</span>
                    <span className="gold-text">{totalPrice.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <div className="space-y-6 text-[#ffffff]">
                  <Link href="/checkout">
                    <Button className="gold-button w-full text-lg py-6 rounded-3xl shadow-lg font-medium">
                      Gå till kassan
                    </Button>
                  </Link>
                  
                  <Link href="/womens">
                    <Button className="w-full gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-medium py-6 rounded-3xl shadow-lg">
                      Fortsätt handla
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 text-center space-y-2">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 text-base font-dm-sans"
                  >
                    Töm varukorg
                  </Button>
                  <br />
                  <Button
                    variant="ghost"
                    onClick={debugClearStorage}
                    className="text-orange-500 hover:text-orange-700 hover:bg-orange-50 text-sm font-dm-sans"
                  >
                    Debug: Rensa localStorage
                  </Button>
                </div>

                {/* Security notice */}
                <div className="mt-8 p-6 bg-white/60 rounded-2xl border border-[#064F8C]/10">
                  <p className="text-sm text-[#4A5568] text-center font-dm-sans">
                    🔒 Säker betalning med kryptovaluta eller andra diskreta metoder
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
