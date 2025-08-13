import { useState, useEffect } from 'react';
import { CheckCircle, Printer, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/cart';
import { getProductImageUrl } from '@/assets/images';

interface CartItem {
  id: string;
  title: string;
  priceKr: number;
  imageUrl: string;
  size: string;
  quantity: number;
  wearDays?: number;
  sellerAlias: string;
}

export default function OrderConfirmation() {
  const { items: cartItems, clearCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Generate order number
    const orderNum = 'HMT' + Math.random().toString().substr(2, 6);
    setOrderNumber(orderNum);

    // Save order items immediately before clearing cart
    if (cartItems.length > 0) {
      setOrderItems([...cartItems]);
      const total = cartItems.reduce((sum: number, item: CartItem) => sum + (item.priceKr * item.quantity), 0);
      setOrderTotal(total);
    }

    // Clear cart after saving order data
    setTimeout(() => {
      clearCart();
    }, 5000);
  }, [cartItems, clearCart]);

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleKeepShopping = () => {
    window.location.href = '/womens';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {/* Success Icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Din beställning är på väg!
                </h1>
                <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                  Välkommen till Scandiscent-familjen! Vårt mål är att bygga en förtroendefull relation som sträcker sig långt över vad du vill. Vi skickar en orderbekräftelse så fort din beställning har skickats.
                </p>
              </div>

              {/* Order Number */}
              <div className="text-center mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Beställning {orderNumber}</h2>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button
                  onClick={handleKeepShopping}
                  className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Fortsätt handla
                </button>
                <button
                  onClick={handlePrintReceipt}
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-md transition-colors"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Skriv ut kvitto
                </button>
              </div>

              {/* Shipping Address */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Leveransadress</h3>
                <div className="text-gray-600">
                  <p className="font-medium">Scandiscent Kund</p>
                  <p>Sverige</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Ordersammanfattning</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {orderItems.length > 0 ? (
                  orderItems.map((item: CartItem) => (
                    <div key={item.id} className="flex items-start space-x-4">
                      <div className="relative">
                        <img 
                          src={getProductImageUrl(item.imageUrl) || "https://images.unsplash.com/photo-1566479179817-c0df35d84ff3?w=64&h=64&fit=crop&crop=center"} 
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-900 leading-tight">{item.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.size}</p>
                        {item.wearDays && (
                          <p className="text-sm text-gray-500">{item.wearDays} dagar</p>
                        )}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {(item.priceKr * item.quantity).toFixed(2)} kr
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-500 text-sm">Ingen orderinformation tillgänglig</p>
                  </div>
                )}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{orderTotal.toFixed(2)} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frakt</span>
                  <span className="text-gray-900">0,00 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Moms</span>
                  <span className="text-gray-900">0,00 kr</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-base font-medium">
                    <span className="text-gray-900">Totalt</span>
                    <span className="text-gray-900">{orderTotal.toFixed(2)} kr</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Betald</span>
                  <div className="flex items-center">
                    <span className="text-green-600 text-sm font-medium mr-2">✓</span>
                    <span className="text-green-600 font-medium">{orderTotal.toFixed(2)} kr</span>
                  </div>
                </div>
              </div>

              {/* Subtle thank you note */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-green-900">Tack för din beställning</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Du kommer få en orderbekräftelse via e-post inom kort. Leverans sker normalt inom 2-5 arbetsdagar.
                    </p>
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