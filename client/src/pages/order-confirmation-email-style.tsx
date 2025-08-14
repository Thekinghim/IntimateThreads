import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  customerName?: string;
  customerEmail: string;
  totalAmountKr: string;
  paymentMethod: string;
  status: string;
  shippingAddress: string;
  createdAt: string;
  items?: OrderItem[];
}

export default function OrderConfirmationEmailStyle() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();

  const { data: order, isLoading, error } = useQuery<Order>({
    queryKey: ['/api/orders', id],
    enabled: !!id,
  });

  // Scroll to top when component loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order inte hittad</h1>
          <button 
            onClick={() => setLocation('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Tillbaka till startsidan
          </button>
        </div>
      </div>
    );
  }

  const getOrderNumber = () => {
    return `SCND${order.id.substring(0, 6).toUpperCase()}`;
  };

  const getCustomerName = () => {
    return order.customerName || order.customerEmail.split('@')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto bg-white">
        {/* Header */}
        <div className="bg-teal-500 text-white text-center py-8">
          <h1 className="text-2xl font-bold tracking-wide">scandiscent</h1>
        </div>

        {/* Success Message */}
        <div className="px-8 py-12 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-sm text-gray-600 mb-2">Order {getOrderNumber()}</h2>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Tack {getCustomerName()}!</h1>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-teal-100"></div>
              <div className="relative z-10 text-center">
                <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm font-medium text-gray-700">Leveransadress</p>
                <p className="text-xs text-gray-600 whitespace-pre-line">{order.shippingAddress}</p>
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                📍 Google
              </div>
            </div>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Din Scandiscent order är bekräftad!</h3>
            <p className="text-gray-600 mb-6">Du kommer få ett email när din order är redo.</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-4">Vill du göra en ny beställning?</h4>
              <p className="text-gray-600 mb-4">
                Du kan påbörja en ny order genom att{' '}
                <button 
                  onClick={() => setLocation('/womens')}
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  klicka här
                </button>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Items List */}
            <div>
              {order.items && order.items.length > 0 ? (
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-rose-300 rounded"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                          <span className="text-gray-600 ml-2">{item.quantity}</span>
                        </div>
                        <p className="text-sm text-gray-500">Antal: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{item.price.toLocaleString('sv-SE')} kr</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Continue scrolling indicator */}
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-gray-800 text-white text-sm rounded-full">
                      <span>Scrolla för fler produkter</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Inga produkter hittades för denna order</p>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Ordersammanfattning</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delsumma</span>
                    <span className="text-gray-900">{parseFloat(order.totalAmountKr).toLocaleString('sv-SE')} kr</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Frakt</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900 text-lg">
                        <span className="text-sm text-gray-500 mr-1">SEK</span>
                        {parseFloat(order.totalAmountKr).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Kontaktinformation</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.customerName}</p>
                        <p>{order.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Betalningsmetod</h4>
                      <div className="text-sm text-gray-600">
                        <p className="capitalize">{order.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>Behöver du hjälp med din order?</p>
                <button 
                  onClick={() => setLocation('/contact')} 
                  className="text-teal-600 hover:text-teal-700 underline"
                >
                  Kontakta oss
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-12 text-center">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Följ oss på sociala medier</h3>
            <div className="flex justify-center space-x-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
              <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>www.scandiscent.com</p>
            <p>Stockholm, Sverige</p>
            <p>Org nr: 556-XXX-XXXX</p>
            <p className="pt-2">© 2025 Scandiscent. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </div>
    </div>
  );
}