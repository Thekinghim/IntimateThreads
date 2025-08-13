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
import PayPalButton from "@/components/PayPalButton";
import StripeCheckout from "@/components/StripeCheckout";
import { nowPayments } from "@/lib/nowpayments";

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
  const [showCryptoModal, setShowCryptoModal] = useState(false);
  const [showStripeModal, setShowStripeModal] = useState(false);
  
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

  const handleCryptoPayment = async () => {
    // Show crypto selection modal or redirect to crypto page
    setShowCryptoModal(true);
  };

  const createCryptoPayment = async (currency: string) => {
    try {
      // Create payment with NOWPayments
      const paymentData = {
        price_amount: finalTotal,
        pay_currency: currency.toLowerCase(),
        order_id: `order_${Date.now()}`,
        order_description: `Scandiscent Purchase - ${items.length} items`
      };

      const payment = await nowPayments.createPayment(paymentData);
      
      // Redirect to crypto payment page with payment details
      setLocation(`/crypto-payment/${payment.payment_id}`);
    } catch (error) {
      console.error('Crypto payment error:', error);
      toast({ 
        title: "Betalningsfel", 
        description: "Kunde inte initiera kryptovaluta-betalning", 
        variant: "destructive" 
      });
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
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Side - Form */}
          <div className="bg-white p-6 lg:p-12 shadow-sm">
            {/* Header */}
            <div className="flex justify-center mb-8 pb-4 border-b border-gray-100">
              <h1 className="text-3xl font-bold text-[#064F8C] font-cormorant">SCANDISCENT</h1>
            </div>

            {/* Express Checkout */}
            <div className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <p className="text-lg font-medium mb-4 text-[#064F8C] font-lora">Snabb utcheckning</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div 
                  id="paypal-button-container" 
                  className="w-full bg-[#0070ba] hover:bg-[#005ea6] rounded-lg flex items-center justify-center h-12 cursor-pointer transition-all duration-200 relative border border-[#005ea6] shadow-sm"
                >
                  <PayPalButton 
                    amount={finalTotal.toString()} 
                    currency="SEK" 
                    intent="CAPTURE" 
                  />
                </div>
                
                <Button
                  onClick={() => setShowStripeModal(true)}
                  className="w-full bg-[#635BFF] hover:bg-[#4F46E5] text-white h-12 rounded-lg font-semibold transition-all duration-200 border border-[#4F46E5] shadow-sm flex items-center justify-center gap-2"
                  data-testid="button-stripe-payment"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 4h22v2H1V4zm0 4h22v12H1V8zm2 2v8h18v-8H3zm2 2h4v2H5v-2zm6 0h6v1h-6v-1z"/>
                  </svg>
                  Kort
                </Button>
                
                <Button
                  onClick={handleCryptoPayment}
                  className="w-full bg-gradient-to-r from-[#F7931A] to-[#FFB84D] hover:from-[#D9821A] hover:to-[#E6A73C] text-white h-12 rounded-lg font-semibold transition-all duration-200 border border-[#D9821A] shadow-sm flex items-center justify-center gap-2"
                  data-testid="button-crypto-payment"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.176-.943 1.937-1.788 2.319.653.394 1.088 1.013.95 1.837-.2 1.196-1.063 1.683-2.263 1.683H9.5l-.5 2h-1.5l.5-2H6.5l.5-2h1.461c.537 0 .98-.443.98-.98 0-.537-.443-.98-.98-.98H7l.5-2h1.5l.5-2h1.5l-.5 2h2.961c1.2 0 2.063.487 2.263 1.683.138.824-.297 1.443-.95 1.837.845-.382 1.608-1.143 1.788-2.319z"/>
                  </svg>
                  Kryptovaluta
                </Button>
              </div>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm font-medium">ELLER</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>

            {/* Crypto Currency Selection Modal */}
            {showCryptoModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <h3 className="text-lg font-semibold text-[#064F8C] mb-4">Välj kryptovaluta</h3>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button
                      onClick={() => { setShowCryptoModal(false); createCryptoPayment('btc'); }}
                      className="h-12 bg-[#F7931A] hover:bg-[#D9821A] text-white flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">₿</span>
                      Bitcoin
                    </Button>
                    <Button
                      onClick={() => { setShowCryptoModal(false); createCryptoPayment('eth'); }}
                      className="h-12 bg-[#627EEA] hover:bg-[#4E6BDB] text-white flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">Ξ</span>
                      Ethereum
                    </Button>
                    <Button
                      onClick={() => { setShowCryptoModal(false); createCryptoPayment('usdt'); }}
                      className="h-12 bg-[#26A17B] hover:bg-[#209B6C] text-white flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">₮</span>
                      USDT
                    </Button>
                    <Button
                      onClick={() => { setShowCryptoModal(false); createCryptoPayment('ltc'); }}
                      className="h-12 bg-[#BFBBBB] hover:bg-[#A8A4A4] text-white flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">Ł</span>
                      Litecoin
                    </Button>
                  </div>
                  <Button
                    onClick={() => setShowCryptoModal(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Avbryt
                  </Button>
                </div>
              </div>
            )}

            {/* Stripe Checkout Modal */}
            {showStripeModal && (
              <StripeCheckout
                amount={finalTotal}
                onSuccess={() => {
                  setShowStripeModal(false);
                  clearCart();
                  setLocation('/order-confirmation/stripe-success');
                }}
                onClose={() => setShowStripeModal(false)}
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-medium mb-4 text-[#064F8C] font-lora">Kontaktinformation</h2>
                <div className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="E-post eller mobilnummer"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="email-updates"
                      checked={formData.emailUpdates}
                      onCheckedChange={(checked) => handleInputChange('emailUpdates', checked as boolean)}
                    />
                    <Label htmlFor="email-updates" className="text-sm text-gray-600">
                      Skicka mig nyheter och erbjudanden via e-post
                    </Label>
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-medium mb-4 text-[#064F8C] font-lora">Leveranssätt</h2>
                <RadioGroup value={formData.deliveryMethod} onValueChange={(value) => handleInputChange('deliveryMethod', value)}>
                  <div className="flex items-center space-x-2 p-4 border border-gray-300 rounded-lg bg-white shadow-sm">
                    <RadioGroupItem value="ship" id="ship" className="text-[#064F8C]" />
                    <Label htmlFor="ship" className="flex-1 text-gray-900 font-medium">Skicka</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Shipping Address */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-medium mb-4 text-[#064F8C] font-lora">Leveransadress</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input
                    placeholder="Förnamn"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                  <Input
                    placeholder="Efternamn"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    placeholder="Företag (valfritt)"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                  <Input
                    placeholder="Adress"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                  <Input
                    placeholder="Lägenhet, svit, etc. (valfritt)"
                    value={formData.apartment}
                    onChange={(e) => handleInputChange('apartment', e.target.value)}
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                  <Input
                    placeholder="Stad"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    required
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12">
                        <SelectValue placeholder="Land/region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SE">Sverige</SelectItem>
                        <SelectItem value="NO">Norge</SelectItem>
                        <SelectItem value="DK">Danmark</SelectItem>
                        <SelectItem value="FI">Finland</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12">
                        <SelectValue placeholder="Län" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stockholm">Stockholm</SelectItem>
                        <SelectItem value="gothenburg">Göteborg</SelectItem>
                        <SelectItem value="malmo">Malmö</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Postnummer"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      required
                      className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                    />
                  </div>
                  <Input
                    placeholder="Telefon (valfritt)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] h-12"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full bg-[#064F8C] hover:bg-[#053D6B] text-white py-4 px-8 rounded-md text-base font-medium"
                  data-testid="button-continue-to-shipping"
                >
                  Fortsätt till frakt
                </Button>
                <div className="flex items-center justify-between mt-4">
                  <Link href="/cart" className="text-[#064F8C] hover:underline text-sm">
                    ← Tillbaka till kundvagn
                  </Link>
                  <div className="text-xs text-gray-400">
                    Powered by Scandiscent
                  </div>
                </div>
              </div>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-8 border-t text-xs text-gray-500 space-x-4">
              <Link href="/terms-of-service" className="hover:underline">Återbetalningspolicy</Link>
              <Link href="/privacy-policy" className="hover:underline">Integritetspolicy</Link>
              <Link href="/terms-of-service" className="hover:underline">Användarvillkor</Link>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="bg-[#F8F6F3] p-6 lg:p-12 overflow-y-auto">
            <div className="sticky top-8">
              {/* Product List */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={item.imageUrl?.startsWith('http') ? item.imageUrl : `/api/assets/${item.imageUrl}`}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded border"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/api/assets/generated_images/Red_lace_panties_product_da6c36cf.png';
                        }}
                      />
                      <span className="absolute -top-2 -right-2 bg-[#064F8C] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm text-gray-900">{item.sellerAlias}</h3>
                      <p className="text-sm text-gray-600">{item.title}</p>
                      <p className="text-xs text-gray-500">Storlek: {item.size}</p>
                    </div>
                    <p className="font-medium text-gray-900">{item.priceKr.toFixed(2)} SEK</p>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Presentkort eller rabattkod"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 h-10 bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-gray-900"
                  />
                  <Button 
                    onClick={applyPromoCode} 
                    className="px-6 h-10 bg-[#064F8C] text-white hover:bg-[#053D6B] border border-[#064F8C] font-medium"
                  >
                    Tillämpa
                  </Button>
                </div>
                {appliedPromo && (
                  <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                    <div className="text-sm text-green-700 font-medium">
                      ✓ Rabattkod "{appliedPromo.code}" tillämpad (-{appliedPromo.discountKr} SEK)
                    </div>
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 text-sm border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{totalPrice.toFixed(2)} SEK</span>
                </div>
                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{appliedPromo.discountKr} SEK</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Frakt</span>
                  <span className="text-gray-600">Beräknas i nästa steg</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Totalt</span>
                  <span className="text-gray-900">SEK {finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Complete Order Button */}
              <div className="mt-6">
                <Button 
                  type="submit"
                  className="w-full bg-[#064F8C] hover:bg-[#053D6B] text-white py-4 px-6 rounded-md text-lg font-medium"
                  data-testid="button-complete-order"
                >
                  Slutför beställning
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Genom att klicka "Slutför beställning" godkänner du våra 
                  <Link href="/terms-of-service" className="underline"> villkor</Link> och 
                  <Link href="/privacy-policy" className="underline"> integritetspolicy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}