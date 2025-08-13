import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, Mail } from "lucide-react";

interface Order {
  id: string;
  customerEmail: string;
  items: Array<{
    productId: string;
    quantity: number;
    size: string;
    price: number;
  }>;
  total: number;
  status: string;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    address: string;
    apartment?: string;
    city: string;
    country: string;
    zipCode: string;
    phone?: string;
  };
  createdAt: string;
}

export default function OrderConfirmation() {
  const [match, params] = useRoute("/order-confirmation/:id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!match || !params?.id) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${params.id}`);
        if (response.ok) {
          const orderData = await response.json();
          setOrder(orderData);
        } else {
          setError("Beställningen kunde inte hittas");
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        setError("Ett fel uppstod vid hämtning av beställning");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [match, params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar beställning...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Beställningen kunde inte hittas"}
          </h1>
          <Link href="/">
            <Button>Tillbaka till startsidan</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tack för din beställning!
          </h1>
          <p className="text-gray-600">
            Beställningsnummer: <span className="font-semibold">{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Beställningsdetaljer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold capitalize">{order.status}</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Total summa</p>
                <p className="font-semibold">{order.total.toFixed(2)} SEK</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-600">Betalningsmetod</p>
                <p className="font-semibold capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Beställningsdatum</p>
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString('sv-SE')}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="w-5 h-5 mr-2" />
                Leveransadress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="font-semibold">{order.shippingAddress.name}</p>
                <p>{order.shippingAddress.address}</p>
                {order.shippingAddress.apartment && (
                  <p>{order.shippingAddress.apartment}</p>
                )}
                <p>
                  {order.shippingAddress.zipCode} {order.shippingAddress.city}
                </p>
                <p>{order.shippingAddress.country}</p>
                {order.shippingAddress.phone && (
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What's Next */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              Vad händer nu?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                  1
                </div>
                <div>
                  <p className="font-semibold">Orderbekräftelse</p>
                  <p className="text-gray-600">
                    Du kommer att få en bekräftelse via e-post till {order.customerEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                  2
                </div>
                <div>
                  <p className="font-semibold">Bearbetning</p>
                  <p className="text-gray-600">
                    Vi bearbetar din beställning inom 1-2 arbetsdagar
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                  3
                </div>
                <div>
                  <p className="font-semibold">Leverans</p>
                  <p className="text-gray-600">
                    Din order skickas och du får spårningsinformation via e-post
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Link href="/track-order">
            <Button variant="outline" className="w-full sm:w-auto">
              Spåra beställning
            </Button>
          </Link>
          <Link href="/womens">
            <Button className="w-full sm:w-auto">
              Fortsätt handla
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}