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

export default function OrderConfirmation() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const [showPromoCode, setShowPromoCode] = useState(false);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getOrderNumber = () => {
    return order.id.substring(0, 8).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-700 text-white py-4">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-lg font-medium text-center">Scandiscent</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Order Confirmation Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orderbekräftelse</h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Hej {order.customerName || 'kund'},</p>
            <p className="text-gray-600 mb-2">Tack för ditt köp. Detta email bekräftar din order.</p>
            <p className="text-gray-600 mb-4">
              Vi ska nu göra din order redo, vänligen dubbelkolla detaljerna nedan och låt oss veta om något behöver ändras.
            </p>
            <p className="text-gray-600 mb-6">Du kan följa statusen på din order nedan:</p>
            
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
              VISA ORDER STATUS
            </button>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-gray-600 mb-1">
              Vänligen tveka inte att kontakta oss om du har frågor alls.
            </p>
            <p className="text-sm text-gray-600 mb-1">Tack,</p>
            <p className="text-sm text-gray-600">Scandiscent Team</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Order Number */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Order Nr. #{getOrderNumber()}</h3>
              <p className="text-sm text-gray-600">{formatDate(order.createdAt)}</p>
            </div>

            {/* Customer & Shipping */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Kund</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{order.customerName}</p>
                  <p>{order.customerEmail}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Leveransadress</h4>
                <div className="text-sm text-gray-600">
                  <p className="whitespace-pre-line">{order.shippingAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t pt-8">
            <h3 className="font-semibold text-gray-900 mb-4">Produktbeskrivning</h3>
            
            {order.items && order.items.length > 0 ? (
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-md" />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-rose-300 rounded"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Antal: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{item.price.toLocaleString('sv-SE')} kr</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-4">
                <p className="text-gray-600">Orderdetaljer laddas...</p>
              </div>
            )}

            {/* Order Summary */}
            <div className="border-t pt-6 mt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delsumma</span>
                  <span className="text-gray-900">{parseFloat(order.totalAmountKr).toLocaleString('sv-SE')} kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Standardfrakt</span>
                  <span className="text-gray-900">49 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Moms</span>
                  <span className="text-gray-900">{Math.round(parseFloat(order.totalAmountKr) * 0.25).toLocaleString('sv-SE')} kr</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">{(parseFloat(order.totalAmountKr) + 49).toLocaleString('sv-SE')} kr</span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Betalningsinformation</h4>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  {order.paymentMethod === 'stripe' ? 'VISA' : order.paymentMethod.toUpperCase()}
                </div>
                <span className="text-sm text-gray-600">
                  {parseFloat(order.totalAmountKr).toLocaleString('sv-SE')} kr
                </span>
              </div>
            </div>

            {/* Order Notes */}
            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-2">Orderanteckningar</h4>
              <p className="text-sm text-gray-600">Tack så mycket för din order, tack! :)</p>
            </div>
          </div>
        </div>

        {/* Promo Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">10% rabatt på ditt nästa köp!</h3>
          <p className="text-gray-600 mb-6">
            Som tack för att du handlar hos oss ger vi dig en rabattkod för att använda på ditt nästa köp. 
            Använd den för dig själv eller skicka den till en vän!
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 max-w-sm mx-auto">
            <div className="text-xl font-bold text-gray-900 tracking-widest">TAKE10OFF</div>
          </div>
          
          <button 
            onClick={() => setLocation('/womens')}
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium"
          >
            HANDLA NU
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <button onClick={() => setLocation('/womens')} className="hover:text-gray-900">HANDLA NU</button>
            <button onClick={() => setLocation('/about')} className="hover:text-gray-900">OM OSS</button>
            <button onClick={() => setLocation('/contact')} className="hover:text-gray-900">KONTAKT</button>
          </div>
          
          <div className="flex justify-center space-x-4">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>www.scandiscent.com</p>
            <p>Scandinavia, Nordic Region</p>
            <p>Copyright © 2025</p>
            <p className="font-semibold">Scandiscent</p>
          </div>
        </div>
      </div>
    </div>
  );
}