import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart";

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="font-poppins font-medium text-2xl text-charcoal mb-4">Din varukorg är tom</h1>
            <p className="text-gray-600 mb-8">Utforska vår kollektion för att hitta något speciellt</p>
            <Link href="/collection">
              <Button className="bg-charcoal text-white hover:bg-gray-800 font-poppins font-medium">
                Utforska kollektion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-poppins font-medium text-3xl text-charcoal">Varukorg</h1>
          <Badge variant="secondary" className="text-sm">
            {itemCount} {itemCount === 1 ? 'artikel' : 'artiklar'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center space-x-4 p-6">
                    <img
                      src={item.imageUrl || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=150"}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-medium text-lg text-charcoal truncate">
                        {item.sellerAlias} - {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">Storlek: {item.size}</p>
                      <p className="font-poppins font-semibold text-charcoal mt-1">
                        {item.priceKr.toLocaleString('sv-SE')} kr
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="font-poppins font-medium text-xl text-charcoal mb-6">Ordersammanfattning</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate max-w-[60%]">
                        {item.sellerAlias} × {item.quantity}
                      </span>
                      <span className="text-charcoal font-medium">
                        {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-poppins font-bold text-lg">
                    <span className="text-charcoal">Totalt:</span>
                    <span className="text-charcoal">{totalPrice.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button className="w-full bg-deep-charcoal text-nordic-cream hover:bg-charcoal font-poppins font-medium text-lg py-6 transition-all duration-200">
                      Gå till kassan
                    </Button>
                  </Link>
                  
                  <Link href="/collection">
                    <Button variant="outline" className="w-full font-poppins font-medium border-deep-charcoal text-deep-charcoal hover:bg-deep-charcoal hover:text-nordic-cream transition-all duration-200">
                      Fortsätt handla
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 text-center">
                  <Button
                    variant="ghost"
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm"
                  >
                    Töm varukorg
                  </Button>
                </div>

                {/* Security notice */}
                <div className="mt-6 p-4 bg-warm-beige rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
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
