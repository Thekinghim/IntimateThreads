import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { getProductImageUrl } from "@/assets/images";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart, debugClearStorage } = useCartStore();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const discountedTotal = totalPrice - promoDiscount;

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const response = await fetch(`/api/promo-codes/${promoCode.trim()}`);
      const data = await response.json();

      if (response.ok) {
        setAppliedPromo(data.code);
        setPromoDiscount(parseFloat(data.discountKr));
        setPromoCode('');
      } else {
        // Show error message briefly
        alert(data.message || 'Ogiltig rabattkod');
      }
    } catch (error) {
      console.error('Promo code validation error:', error);
      alert('Fel vid validering av rabattkod');
    }
  };

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
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
            {/* Main Cart Content */}
            <div className="lg:col-span-2 p-4 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Varukorg</h1>
                <span className="text-lg font-medium text-gray-600">{itemCount} {itemCount === 1 ? 'produkt' : 'produkter'}</span>
              </div>

              {/* Column Headers - Hidden on mobile */}
              <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-gray-200 mb-4">
                <div className="col-span-3 text-sm font-medium text-gray-500 uppercase tracking-wide">PRODUKTDETALJER</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">KVANTITET</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">PRIS</div>
                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide text-center">TOTALT</div>
              </div>

              {/* Cart Items */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-start sm:items-center py-4 border-b border-gray-100">
                    {/* Mobile Layout */}
                    <div className="sm:hidden">
                      <div className="flex items-start space-x-4 mb-4">
                        <img
                          src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 mb-1 text-sm leading-tight">
                            {item.sellerAlias}
                          </h3>
                          <h4 className="font-medium text-gray-800 mb-1 text-sm leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-500 mb-1">Storlek: {item.size}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:text-red-700"
                          >
                            Ta bort
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-2 min-w-[2.5rem] text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {item.priceKr.toLocaleString('sv-SE')} kr styck
                          </div>
                          <div className="font-bold text-gray-800">
                            {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:contents">
                      {/* Product Details */}
                      <div className="col-span-3 flex items-start space-x-4">
                        <img
                          src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=300&h=300&fit=crop&crop=center"}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-800 mb-1 text-base leading-tight">
                            {item.sellerAlias} - {item.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-1">Storlek: {item.size}</p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-sm text-red-500 hover:text-red-700"
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
                        <span className="font-medium text-gray-800">
                          {item.priceKr.toLocaleString('sv-SE')} kr
                        </span>
                      </div>

                      {/* Total */}
                      <div className="text-center">
                        <span className="font-bold text-gray-800">
                          {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link href="/womens">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
                    ← Fortsätt handla
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Ordersammanfattning</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">ARTIKLAR {itemCount}</span>
                  <span className="font-medium">{totalPrice.toLocaleString('sv-SE')} kr</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="mb-2">
                    <span className="text-gray-600 text-sm">RABATTKOD</span>
                  </div>
                  {appliedPromo ? (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-700 text-sm font-medium">{appliedPromo} tillämpat</span>
                        <span className="text-green-700 font-bold">-{promoDiscount} kr</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ange din kod (t.ex. WELCOME10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      />
                      <Button 
                        onClick={applyPromoCode}
                        disabled={!promoCode.trim()}
                        className="bg-red-400 hover:bg-red-500 disabled:bg-gray-300 text-white px-4 py-2 text-sm"
                      >
                        ANVÄND
                      </Button>
                    </div>
                  )}
                </div>

                {appliedPromo && (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rabatt ({appliedPromo})</span>
                      <span className="text-green-600 font-medium">-{promoDiscount.toLocaleString('sv-SE')} kr</span>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTALKOSTNAD</span>
                    <span>{discountedTotal.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded text-lg font-medium mt-6">
                    GÅ TILL KASSAN
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
