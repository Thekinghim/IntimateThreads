import React, { useEffect, useState } from 'react';
import { CheckCircle, Printer, ShoppingBag, Package, Truck, Heart, Star, Gift, Crown, Sparkles, ArrowRight } from 'lucide-react';
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

export default function OrderConfirmationV2() {
  const { items: cartItems, clearCart } = useCartStore();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const deliverySteps = [
    { icon: CheckCircle, text: "Beställning mottagen", completed: true, color: "text-green-600" },
    { icon: Package, text: "Förbereder din beställning", completed: false, color: "text-blue-600" },
    { icon: Truck, text: "På väg till dig", completed: false, color: "text-purple-600" },
    { icon: Gift, text: "Levererad", completed: false, color: "text-pink-600" }
  ];

  useEffect(() => {
    // Generate order number
    const orderNum = 'HMT' + Math.random().toString().substr(2, 6);
    setOrderNumber(orderNum);

    // Calculate total from cart items
    const total = cartItems.reduce((sum: number, item: CartItem) => sum + (item.priceKr * item.quantity), 0);
    setOrderTotal(total);

    // Show confetti animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Animate delivery progress
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < 1) {
          deliverySteps[prev + 1].completed = true;
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 2500);

    // Clear cart after successful order
    setTimeout(() => {
      clearCart();
    }, 5000);

    return () => clearInterval(timer);
  }, [cartItems, clearCart]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute animate-pulse ${
                i % 4 === 0 ? 'text-pink-400' : 
                i % 4 === 1 ? 'text-purple-400' : 
                i % 4 === 2 ? 'text-blue-400' : 'text-green-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-6 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <Crown className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SCANDISCENT
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg animate-bounce">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tack för din beställning! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            Din beställning har tagits emot och behandlas nu
          </p>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl max-w-md mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Sparkles className="w-6 h-6 text-purple-600" />
              <span className="text-lg font-semibold text-gray-700">Ordernummer</span>
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {orderNumber}
            </div>
          </div>
        </div>

        {/* Delivery Progress */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            🚚 Leveransstatus
          </h2>
          
          <div className="relative">
            <div className="flex justify-between items-center">
              {deliverySteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = index <= currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center relative z-10">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-1000 ${
                      isCompleted 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg transform scale-110' 
                        : 'bg-gray-200'
                    }`}>
                      <Icon className={`w-8 h-8 ${isCompleted ? 'text-white' : 'text-gray-400'}`} />
                    </div>
                    <p className={`mt-3 text-sm font-medium text-center max-w-24 ${
                      isCompleted ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {step.text}
                    </p>
                  </div>
                );
              })}
            </div>
            
            {/* Progress Line */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 -z-10">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${(currentStep / (deliverySteps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-3 text-purple-600" />
                Ordersammanfattning
              </h2>

              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item: CartItem) => (
                    <div key={item.id} className="flex items-start space-x-4 p-4 bg-white/50 rounded-xl border border-white/30">
                      <div className="relative group">
                        <img
                          src={getProductImageUrl(item.imageUrl)}
                          alt={item.title}
                          className="w-20 h-20 object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-1">Storlek: {item.size}</p>
                        <p className="text-sm text-gray-600 mb-1">Säljare: {item.sellerAlias}</p>
                        {item.wearDays && (
                          <p className="text-sm text-purple-600 font-medium">
                            ✨ {item.wearDays} dagars bärning
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-900">
                          {(item.priceKr * item.quantity).toFixed(2)} SEK
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Ingen orderinformation tillgänglig</p>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Totalt:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {orderTotal.toFixed(2)} SEK
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Snabbåtgärder</h3>
              <div className="space-y-3">
                <button 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                  onClick={() => window.print()}
                >
                  <Printer className="w-5 h-5" />
                  <span>Skriv ut kvitto</span>
                </button>
                
                <button 
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                  onClick={() => window.location.href = '/womens'}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Fortsätt handla</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Special Offers */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-center mb-4">
                <Star className="w-6 h-6 mr-2" />
                <h3 className="text-lg font-bold">Exklusivt erbjudande</h3>
              </div>
              <p className="text-purple-100 mb-4">
                Som tack för din beställning får du 15% rabatt på nästa köp!
              </p>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3 border border-white/30">
                <p className="text-center font-mono text-lg font-bold">TACK15</p>
              </div>
            </div>

            {/* Customer Love */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl">
              <div className="flex items-center mb-4">
                <Heart className="w-6 h-6 mr-2 text-red-500" />
                <h3 className="text-lg font-bold text-gray-900">Vi älskar våra kunder</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Berätta för dina vänner om Scandiscent och få en belöning när de handlar!
              </p>
              <div className="text-center">
                <button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                  Dela & Tjäna
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-2">
            Har du frågor? Kontakta oss på{' '}
            <a href="mailto:support@scandiscent.com" className="text-purple-600 hover:text-purple-700 font-medium">
              support@scandiscent.com
            </a>
          </p>
          <p className="text-sm text-gray-500">
            Tack för att du valde Scandiscent - där diskret elegans möter nordisk kvalitet ✨
          </p>
        </div>
      </div>
    </div>
  );
}