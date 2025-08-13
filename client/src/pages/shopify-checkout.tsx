import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PayPalButton from '@/components/PayPalButton';
import StripeCheckout from '@/components/StripeCheckout';
import { Apple, Smartphone } from 'lucide-react';

export default function ShopifyCheckout() {
  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'paypal'>('stripe');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    country: 'SE',
    emailOffers: false,
    saveInfo: false,
    useBillingAddress: true
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-[#2C5530]">SCANDISCENT</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-lg">
        {/* Express Checkout */}
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Express checkout</h2>
          
          {/* Express Payment Buttons */}
          <div className="space-y-3 mb-4">
            <div className="w-full h-12 bg-[#0070ba] rounded flex items-center justify-center text-white cursor-pointer hover:bg-[#005ea6] transition-colors">
              <span className="font-bold text-lg">PayPal</span>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full h-12 bg-black text-white border-black hover:bg-gray-800"
            >
              <Apple className="w-5 h-5 mr-2" />
              <span className="font-medium">Pay</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-12 bg-[#5f6368] text-white border-[#5f6368] hover:bg-[#4a4d52]"
            >
              <span className="font-medium">G Pay</span>
            </Button>
          </div>

          <Button 
            variant="outline" 
            className="w-full text-sm text-gray-600 border-gray-300 mb-4"
          >
            Show more options
          </Button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500 font-medium">OR</span>
            </div>
          </div>
        </div>

        {/* Main Checkout Form */}
        <div className="bg-white rounded-lg border">
          {/* Contact */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12"
                  data-testid="input-email"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="emailOffers" 
                  className="rounded"
                  checked={formData.emailOffers}
                  onChange={(e) => handleInputChange('emailOffers', e.target.checked)}
                  data-testid="checkbox-email-offers"
                />
                <label htmlFor="emailOffers" className="text-sm text-gray-600">
                  Email me with news and offers
                </label>
              </div>
            </div>
          </div>

          {/* Delivery */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold mb-4">Delivery</h2>
            
            {/* Delivery Method Toggle */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Choose a delivery method</div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button className="flex-1 py-2 px-4 bg-white rounded shadow-sm text-sm font-medium">
                  Ship
                </button>
                <button className="flex-1 py-2 px-4 text-sm text-gray-500">
                  Pick up
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {/* Country */}
              <div>
                <Label htmlFor="country" className="text-sm font-medium">Country/Region</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                  <SelectTrigger className="h-12 mt-1" data-testid="select-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SE">Sweden</SelectItem>
                    <SelectItem value="NO">Norway</SelectItem>
                    <SelectItem value="DK">Denmark</SelectItem>
                    <SelectItem value="FI">Finland</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium">First name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="h-12 mt-1"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium">Last name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="h-12 mt-1"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="h-12 mt-1"
                  data-testid="input-address"
                />
              </div>

              {/* Apartment */}
              <div>
                <Label htmlFor="apartment" className="text-sm font-medium">Apartment, suite, etc. (optional)</Label>
                <Input
                  id="apartment"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="h-12 mt-1"
                  data-testid="input-apartment"
                />
              </div>

              {/* Postal Code and City */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium">Postal code</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="h-12 mt-1"
                    data-testid="input-postal-code"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="h-12 mt-1"
                    data-testid="input-city"
                  />
                </div>
              </div>

              {/* Save Information Checkbox */}
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="saveInfo" 
                  className="rounded"
                  checked={formData.saveInfo}
                  onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                  data-testid="checkbox-save-info"
                />
                <label htmlFor="saveInfo" className="text-sm text-gray-600">
                  Save this information for next time
                </label>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Shipping method</h3>
              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded border">
                Enter your shipping address to view available shipping methods.
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
            
            {/* Payment Method Selection */}
            <div className="space-y-1 mb-4">
              {/* Credit Card Option */}
              <div 
                className={`border rounded-lg transition-colors ${
                  selectedPayment === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectedPayment('stripe')}
                  data-testid="payment-option-stripe"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={selectedPayment === 'stripe'}
                      onChange={() => setSelectedPayment('stripe')}
                      className="text-blue-600"
                      data-testid="radio-stripe"
                    />
                    <span className="font-medium">Credit card</span>
                  </div>
                  <div className="flex gap-1">
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/visa.sxIq5Dot.svg" alt="Visa" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/mastercard.1c4_lyMp.svg" alt="Mastercard" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/amex.Csr7hRoy.svg" alt="Amex" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/discover.C7UbFpNb.svg" alt="Discover" className="h-6" />
                    <span className="text-xs text-gray-500 ml-1">+2</span>
                  </div>
                </div>
                {selectedPayment === 'stripe' && (
                  <div className="border-t p-4 bg-gray-50">
                    <StripeCheckout
                      amount={500}
                      onSuccess={() => console.log('Stripe payment successful')}
                    />
                  </div>
                )}
              </div>

              {/* PayPal Option */}
              <div 
                className={`border rounded-lg transition-colors ${
                  selectedPayment === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer flex items-center gap-3"
                  onClick={() => setSelectedPayment('paypal')}
                  data-testid="payment-option-paypal"
                >
                  <input
                    type="radio"
                    checked={selectedPayment === 'paypal'}
                    onChange={() => setSelectedPayment('paypal')}
                    className="text-blue-600"
                    data-testid="radio-paypal"
                  />
                  <span className="font-bold text-[#0070ba] text-lg">PayPal</span>
                </div>
                {selectedPayment === 'paypal' && (
                  <div className="border-t p-4 bg-gray-50">
                    <PayPalButton
                      amount="500"
                      currency="SEK"
                      onSuccess={(details: any) => console.log('PayPal payment successful:', details)}
                      onError={(error: any) => console.error('PayPal payment error:', error)}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address Checkbox */}
            <div className="flex items-center space-x-2 mb-6">
              <input 
                type="checkbox" 
                id="billingAddress" 
                className="rounded" 
                checked={formData.useBillingAddress}
                onChange={(e) => handleInputChange('useBillingAddress', e.target.checked)}
                data-testid="checkbox-billing-address"
              />
              <label htmlFor="billingAddress" className="text-sm text-gray-600">
                Use shipping address as billing address
              </label>
            </div>

            {/* Complete Order Button */}
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-medium"
              size="lg"
              data-testid="button-complete-order"
            >
              Complete order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}