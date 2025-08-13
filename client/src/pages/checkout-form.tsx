import { useState } from "react";
import { useCartStore } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutForm() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    country: 'SE',
    state: '',
    zipCode: '',
    phone: '',
    deliveryMethod: 'ship',
    emailUpdates: false
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  
  const totalPrice = getTotalPrice();
  const shipping = 0; // Free shipping
  const discount = appliedPromo ? parseFloat(appliedPromo.discountKr) : 0;
  const finalTotal = totalPrice - discount + shipping;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const applyPromoCode = async () => {
    if (!promoCode.trim()) return;

    try {
      const response = await fetch('/api/promo-codes/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: promoCode })
      });

      if (response.ok) {
        const promo = await response.json();
        setAppliedPromo(promo);
        toast({ title: "Rabattkod tillämpades!" });
      } else {
        toast({ title: "Ogiltig rabattkod", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Fel", description: "Kunde inte validera rabattkod", variant: "destructive" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.zipCode) {
      toast({ title: "Fyll i alla obligatoriska fält", variant: "destructive" });
      return;
    }

    // Create order
    const orderData = {
      customerEmail: formData.email,
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        size: item.size,
        price: item.priceKr
      })),
      total: finalTotal,
      paymentMethod: 'pending',
      status: 'pending',
      shippingAddress: {
        name: `${formData.firstName} ${formData.lastName}`,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        country: formData.country,
        zipCode: formData.zipCode,
        phone: formData.phone
      }
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        setLocation(`/order-confirmation/${order.id}`);
      } else {
        toast({ title: "Beställningsfel", description: "Kunde inte skapa beställning", variant: "destructive" });
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast({ title: "Fel", description: "Ett fel uppstod vid beställning", variant: "destructive" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Side - Form */}
          <div className="bg-white p-6 lg:p-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-900">SCANDISCENT</h1>
              <div className="flex items-center text-sm text-gray-500 space-x-2">
                <span>Cart</span>
                <span>&gt;</span>
                <span>Information</span>
                <span>&gt;</span>
                <span>Shipping</span>
                <span>&gt;</span>
                <span className="text-gray-900">Payment</span>
              </div>
            </div>

            {/* Express Checkout */}
            <div className="mb-8">
              <p className="text-lg font-medium mb-4">Express checkout</p>
              <div className="space-y-3 mb-4">
                <Button 
                  className="w-full bg-[#5A31F4] hover:bg-[#4A28E4] text-white py-3 px-6 rounded-md text-sm font-medium h-12"
                >
                  <span className="flex items-center justify-center">
                    <span className="font-bold text-base">Shop</span>
                    <span className="ml-1 font-normal">Pay</span>
                  </span>
                </Button>
                <Button 
                  className="w-full bg-[#FFC439] hover:bg-[#F0B429] text-black py-3 px-6 rounded-md text-sm font-medium h-12"
                  onClick={handleSubmit}
                >
                  <span className="flex items-center justify-center">
                    <span className="font-bold text-base">Pay</span>
                    <span className="ml-1 font-normal">Pal</span>
                  </span>
                </Button>
                <Button 
                  className="w-full bg-black hover:bg-gray-900 text-white py-3 px-6 rounded-md text-sm font-medium h-12"
                >
                  <span className="flex items-center justify-center">
                    <span className="font-bold text-base">G</span>
                    <span className="ml-1 font-normal">Pay</span>
                  </span>
                </Button>
              </div>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-medium mb-4">Contact information</h2>
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="Email or mobile phone number"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-updates"
                      checked={formData.emailUpdates}
                      onCheckedChange={(checked) => handleInputChange('emailUpdates', checked as boolean)}
                    />
                    <Label htmlFor="email-updates" className="text-sm text-red-600">
                      Email me with news and offers
                    </Label>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div>
                <h2 className="text-lg font-medium mb-4">Delivery method</h2>
                <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleInputChange('deliveryMethod', value)}>
                  <div className="flex items-center space-x-2 p-3 border rounded">
                    <RadioGroupItem value="ship" id="ship" className="text-red-600" />
                    <Label htmlFor="ship" className="flex-1">Ship</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded opacity-50">
                    <RadioGroupItem value="pickup" id="pickup" disabled />
                    <Label htmlFor="pickup" className="flex-1">Pick up</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-lg font-medium mb-4">Shipping address</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                  <Input
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange('apartment', e.target.value)}
                  />
                  <Input
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Country/region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SE">Sweden</SelectItem>
                        <SelectItem value="NO">Norway</SelectItem>
                        <SelectItem value="DK">Denmark</SelectItem>
                        <SelectItem value="FI">Finland</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stockholm">Stockholm</SelectItem>
                        <SelectItem value="gothenburg">Göteborg</SelectItem>
                        <SelectItem value="malmo">Malmö</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                  <Input
                    placeholder="Phone (optional)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-8 rounded-md text-base font-medium">
                  Continue to shipping
                </Button>
                <div className="flex items-center justify-between mt-4">
                  <Link href="/cart" className="text-blue-600 hover:underline text-sm">
                    ← Return to cart
                  </Link>
                  <div className="text-xs text-gray-400">
                    Powered by Scandiscent
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-8 border-t text-xs text-gray-500 space-x-4">
              <Link href="/terms" className="hover:underline">Refund policy</Link>
              <Link href="/privacy" className="hover:underline">Privacy policy</Link>
              <Link href="/terms" className="hover:underline">Terms of service</Link>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-gray-50 p-6 lg:p-12">
            <div className="sticky top-8">
              {/* Product List */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={`/api/assets/${item.imageUrl}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.sellerAlias}</h3>
                      <p className="text-sm text-gray-600">{item.title}</p>
                      <p className="text-xs text-gray-500">Size: {item.size}</p>
                    </div>
                    <p className="font-medium">{item.priceKr.toFixed(2)} SEK</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="border-t pt-4 mb-6">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Gift card or discount code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 h-10 border-gray-300 rounded-md"
                  />
                  <Button 
                    onClick={applyPromoCode} 
                    variant="outline"
                    className="px-4 py-2 h-10 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 text-sm text-green-600">
                    Rabattkod "{appliedPromo.code}" tillämpad (-{appliedPromo.discountKr} SEK)
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{totalPrice.toFixed(2)} SEK</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{appliedPromo.discountKr} SEK</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">Calculated at next step</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>SEK {finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}