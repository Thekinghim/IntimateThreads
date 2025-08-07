import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Package, Truck, CheckCircle, Clock, XCircle, Mail, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";

export default function TrackOrder() {
  const [orderIdInput, setOrderIdInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Query to track order by ID and email
  const { data: order, isLoading, error } = useQuery({
    queryKey: ['/api/track-order', orderIdInput, emailInput],
    enabled: searchAttempted && orderIdInput.length > 0 && emailInput.length > 0,
    retry: false,
    queryFn: async () => {
      const response = await fetch(`/api/track-order?orderId=${encodeURIComponent(orderIdInput)}&email=${encodeURIComponent(emailInput)}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Order not found');
        }
        throw new Error('Failed to fetch order');
      }
      return response.json();
    },
  });

  const handleSearch = () => {
    if (orderIdInput.trim() && emailInput.trim()) {
      setSearchAttempted(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "shipped":
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Payment Pending</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Payment Complete</Badge>;
      case "failed":
        return <Badge variant="destructive">Payment Failed</Badge>;
      case "expired":
        return <Badge className="bg-orange-100 text-orange-800">Payment Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case "pending":
        return "Your order has been received and is being processed.";
      case "confirmed":
        return "Payment confirmed! Your order is being prepared for shipment.";
      case "shipped":
        return "Your order has been shipped and is on its way to you.";
      case "completed":
        return "Your order has been delivered successfully.";
      case "cancelled":
        return "This order has been cancelled.";
      default:
        return "Order status unknown.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Track Your Order</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Enter your order ID and email address to track your package and view order details.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-stone-800">
              <Search className="h-5 w-5" />
              Find Your Order
            </CardTitle>
            <CardDescription>
              Enter the order ID from your confirmation email and the email address used for the order.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Order ID</label>
                <Input
                  placeholder="e.g., order-123456"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="border-stone-200 focus:ring-stone-400"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Email Address</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="border-stone-200 focus:ring-stone-400"
                />
              </div>
            </div>
            <Button 
              onClick={handleSearch}
              disabled={!orderIdInput.trim() || !emailInput.trim() || isLoading}
              className="w-full bg-stone-800 hover:bg-stone-900 text-white"
            >
              {isLoading ? "Searching..." : "Track Order"}
            </Button>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && searchAttempted && (
          <Card className="border-red-200 bg-red-50 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-red-800">
                <XCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">Order Not Found</p>
                  <p className="text-sm text-red-600">
                    Please check your order ID and email address. Make sure they match exactly what was provided in your confirmation email.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Details */}
        {order && (
          <div className="space-y-6">
            {/* Order Status Header */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-stone-800 mb-2">Order #{order.id}</CardTitle>
                    <div className="flex items-center gap-3 mb-3">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                    <p className="text-stone-600">{getStatusDescription(order.status)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-500">Order Date</p>
                    <p className="font-medium text-stone-800">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Order Timeline */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-stone-800">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${order.status === 'pending' ? 'bg-amber-500' : 'bg-green-500'}`} />
                    <div>
                      <p className="font-medium text-stone-800">Order Placed</p>
                      <p className="text-sm text-stone-600">{format(new Date(order.createdAt), 'MMM dd, yyyy - HH:mm')}</p>
                    </div>
                  </div>
                  
                  {order.paymentStatus === 'completed' && (
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${order.status === 'confirmed' || order.status === 'shipped' || order.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <p className="font-medium text-stone-800">Payment Confirmed</p>
                        <p className="text-sm text-stone-600">Payment processed successfully</p>
                      </div>
                    </div>
                  )}
                  
                  {(order.status === 'shipped' || order.status === 'completed') && (
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${order.status === 'shipped' || order.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <p className="font-medium text-stone-800">Order Shipped</p>
                        <p className="text-sm text-stone-600">Package sent to delivery address</p>
                      </div>
                    </div>
                  )}
                  
                  {order.status === 'completed' && (
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-stone-800">Order Delivered</p>
                        <p className="text-sm text-stone-600">Package delivered successfully</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Product Details */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-stone-800">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                {order.product && (
                  <div className="flex gap-4">
                    <img 
                      src={order.product.imageUrl} 
                      alt={order.product.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-stone-800 mb-1">{order.product.title}</h3>
                      <p className="text-sm text-stone-600 mb-2">{order.product.description}</p>
                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        <span>Size: {order.product.size}</span>
                        <span>Color: {order.product.color}</span>
                        <span>Material: {order.product.material}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-stone-800">{order.totalAmountKr} kr</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shipping & Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <MapPin className="h-5 w-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.customerName && (
                      <p className="font-medium text-stone-800">{order.customerName}</p>
                    )}
                    <p className="text-stone-600 whitespace-pre-line">{order.shippingAddress}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-stone-800">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-stone-600">Method:</span>
                      <span className="text-stone-800 capitalize">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-600">Status:</span>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </div>
                    {order.cryptoCurrency && (
                      <div className="flex justify-between">
                        <span className="text-stone-600">Crypto:</span>
                        <span className="text-stone-800">{order.cryptoAmount} {order.cryptoCurrency}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-semibold text-stone-800">
                      <span>Total:</span>
                      <span>{order.totalAmountKr} kr</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Support */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-stone-600">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="font-medium text-stone-800">Need Help?</p>
                    <p className="text-sm">
                      If you have questions about your order, please contact our support team with your order ID.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}