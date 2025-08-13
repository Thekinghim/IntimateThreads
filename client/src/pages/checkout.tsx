import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus } from "lucide-react";
import { getProductImageUrl } from "@/assets/images";

export default function Checkout() {
  const { items, getTotalPrice, clearCart, removeItem, updateQuantity } = useCartStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  
  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const discount = appliedPromo ? parseFloat(appliedPromo.discountKr) : 0;
  const finalTotal = totalPrice - discount;



  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const response = await fetch(`/api/promo-codes/${promoCode.trim()}`);
      const data = await response.json();

      if (response.ok) {
        setAppliedPromo(data);
        setPromoCode('');
        toast({ title: "Rabattkod tillämpad", description: `${data.discountKr} SEK rabatt tillagd` });
      } else {
        toast({ title: "Ogiltig rabattkod", description: data.message || 'Rabattkoden kunde inte tillämpas', variant: "destructive" });
      }
    } catch (error) {
      console.error('Promo code error:', error);
      toast({ title: "Fel", description: "Kunde inte validera rabattkod", variant: "destructive" });
    }
  };

  const handleCheckout = () => {
    setLocation('/checkout-form');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Din varukorg är tom</h1>
          <Link href="/womens">
            <Button>Fortsätt handla</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
            {/* Shopping Cart Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Kundvagn</h1>
                <span className="text-gray-600">{itemCount} artiklar</span>
              </div>

              {/* Column Headers */}
              <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-gray-200 text-sm font-medium text-gray-500 uppercase tracking-wide">
                <div className="col-span-3">PRODUKTDETALJER</div>
                <div className="text-center">ANTAL</div>
                <div className="text-center">PRIS</div>
                <div className="text-center">TOTALT</div>
              </div>

              {/* Product Items */}
              <div className="space-y-6 mt-6">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center py-4 border-b border-gray-100">
                    {/* Product Details */}
                    <div className="sm:col-span-3 flex items-center space-x-4">
                      <img
                        src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.sellerAlias}</p>
                        <p className="text-xs text-gray-400">Storlek: {item.size}</p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500 hover:text-red-700 mt-1"
                        >
                          Ta bort
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-center">
                      <span className="font-medium">{item.priceKr.toFixed(2)} SEK</span>
                    </div>

                    {/* Total */}
                    <div className="text-center">
                      <span className="font-bold">{(item.priceKr * item.quantity).toFixed(2)} SEK</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8">
                <Link href="/womens">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                    ← Fortsätt handla
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Ordersammanfattning</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">ARTIKLAR {itemCount}</span>
                  <span className="font-medium">{totalPrice.toFixed(2)} SEK</span>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">FRAKT</div>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm">
                    <option>Standardleverans - Gratis</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">RABATTKOD</div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ange din kod"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 text-sm"
                    />
                    <Button 
                      onClick={applyPromoCode}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm"
                    >
                      TILLÄMPA
                    </Button>
                  </div>
                  {appliedPromo && (
                    <div className="text-sm text-green-600 mt-2">
                      Rabattkod "{appliedPromo.code}" tillämpad (-{appliedPromo.discountKr} SEK)
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTALKOSTNAD</span>
                    <span>{finalTotal.toFixed(2)} SEK</span>
                  </div>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium mt-6"
                  data-testid="button-go-to-checkout"
                >
                  GÅ TILL KASSAN
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}