import { useState, useEffect } from 'react';
import PayPalButton from '@/components/PayPalButton';
import { useCartStore } from '@/lib/cart';

export default function ShopifyCheckout() {
  const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'paypal' | 'crypto'>('stripe');
  const [deliveryMethod, setDeliveryMethod] = useState<'ship' | 'pickup'>('ship');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    country: 'Sweden',
    emailOffers: false,
    saveInfo: false,
    useBillingAddress: true
  });

  const { items: cartItems, getTotalPrice, getTotalItems } = useCartStore();
  const cartTotal = getTotalPrice();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="border-b border-gray-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-xl font-medium text-gray-900 text-center lg:text-left">SCANDISCENT</h1>
        </div>
      </header>

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left Column - Checkout Form */}
        <div className="px-4 py-8 lg:py-12">
          {/* Express Checkout Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Express checkout</h2>
            
            {/* Express Payment Methods */}
            <div className="space-y-3">
              {cartTotal > 0 ? (
                <PayPalButton
                  amount={cartTotal.toString()}
                  currency="SEK"
                  intent="capture"
                />
              ) : (
                <div className="w-full h-14 bg-gray-300 rounded-md flex items-center justify-center opacity-60">
                  <div className="text-gray-600 font-semibold text-lg">PayPal (Tom kundvagn)</div>
                </div>
              )}
              

            </div>



            {/* OR Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm font-medium text-gray-500">OR</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Contact</h2>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Email or mobile phone number"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  data-testid="input-email"
                />
              </div>
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="emailOffers" 
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.emailOffers}
                  onChange={(e) => handleInputChange('emailOffers', e.target.checked)}
                  data-testid="checkbox-email-offers"
                />
                <label htmlFor="emailOffers" className="text-sm text-gray-600 leading-relaxed">
                  Email me with news and offers
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Delivery</h2>
            
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Choose a delivery method</p>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button 
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    deliveryMethod === 'ship' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setDeliveryMethod('ship')}
                >
                  Ship
                </button>
                <button 
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                    deliveryMethod === 'pickup' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setDeliveryMethod('pickup')}
                >
                  Pick up
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                <select 
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                  data-testid="select-country"
                >
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Finland">Finland</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    data-testid="input-last-name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  data-testid="input-address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  data-testid="input-apartment"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    data-testid="input-postal-code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    data-testid="input-city"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="saveInfo" 
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={formData.saveInfo}
                  onChange={(e) => handleInputChange('saveInfo', e.target.checked)}
                  data-testid="checkbox-save-info"
                />
                <label htmlFor="saveInfo" className="text-sm text-gray-600 leading-relaxed">
                  Save this information for next time
                </label>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-3">Shipping method</h3>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-sm text-gray-600">
                  Enter your shipping address to view available shipping methods.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Payment</h2>
            <p className="text-sm text-gray-600 mb-6">All transactions are secure and encrypted.</p>
            
            <div className="space-y-2">
              {/* Credit Card Option */}
              <div className={`border-2 rounded-lg transition-all ${
                selectedPayment === 'stripe' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div 
                  className="p-4 cursor-pointer flex items-center justify-between"
                  onClick={() => setSelectedPayment('stripe')}
                  data-testid="payment-option-stripe"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      checked={selectedPayment === 'stripe'}
                      onChange={() => setSelectedPayment('stripe')}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      data-testid="radio-stripe"
                    />
                    <span className="font-medium text-gray-900">Credit card</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/visa.sxIq5Dot.svg" alt="Visa" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/mastercard.1c4_lyMp.svg" alt="Mastercard" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/amex.Csr7hRoy.svg" alt="Amex" className="h-6" />
                    <img src="https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1/assets/discover.C7UbFpNb.svg" alt="Discover" className="h-6" />
                    <span className="text-xs text-gray-500 ml-1">+2</span>
                  </div>
                </div>
                {selectedPayment === 'stripe' && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4">
                      {cartTotal > 0 ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Kortnummer</label>
                            <input
                              type="text"
                              placeholder="1234 1234 1234 1234"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Utgångsdatum (MM/ÅÅ)</label>
                              <input
                                type="text"
                                placeholder="MM/ÅÅ"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Säkerhetskod</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Namn på kort</label>
                            <input
                              type="text"
                              placeholder="Namn på kort"
                              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                          </div>
                          
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch('/api/create-payment-intent', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ 
                                    amount: cartTotal,
                                    items: cartItems 
                                  })
                                });
                                const { url } = await response.json();
                                
                                // Redirect to Stripe Checkout
                                window.location.href = url;
                              } catch (error) {
                                console.error('Payment error:', error);
                                alert('Betalning misslyckades. Försök igen.');
                              }
                            }}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium"
                          >
                            Betala {cartTotal.toFixed(2)} SEK med kort
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">Din kundvagn är tom. Lägg till produkter för att betala.</p>
                          <button 
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => window.location.href = '/womens'}
                          >
                            Fortsätt handla
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* PayPal Option */}
              <div className={`border-2 rounded-lg transition-all ${
                selectedPayment === 'paypal' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div 
                  className="p-4 cursor-pointer flex items-center space-x-3"
                  onClick={() => setSelectedPayment('paypal')}
                  data-testid="payment-option-paypal"
                >
                  <input
                    type="radio"
                    checked={selectedPayment === 'paypal'}
                    onChange={() => setSelectedPayment('paypal')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    data-testid="radio-paypal"
                  />
                  <span className="font-bold text-[#0070ba] text-lg">PayPal</span>
                </div>
                {selectedPayment === 'paypal' && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4">
                      <div className="text-center py-6">
                        <p className="text-sm text-gray-600 mb-4">
                          After clicking "Complete order", you'll be redirected to PayPal to finish your purchase.
                        </p>
                        {cartTotal > 0 ? (
                          <PayPalButton
                            amount={cartTotal.toString()}
                            currency="SEK"
                            intent="capture"
                          />
                        ) : (
                          <div className="w-full h-14 bg-gray-300 rounded-md flex items-center justify-center opacity-60">
                            <div className="text-gray-600 font-semibold text-lg">PayPal (Tom kundvagn)</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Crypto Payment Option */}
              <div className={`border-2 rounded-lg transition-all ${
                selectedPayment === 'crypto' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <div 
                  className="p-4 cursor-pointer flex items-center space-x-3"
                  onClick={() => setSelectedPayment('crypto')}
                  data-testid="payment-option-crypto"
                >
                  <input
                    type="radio"
                    checked={selectedPayment === 'crypto'}
                    onChange={() => setSelectedPayment('crypto')}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    data-testid="radio-crypto"
                  />
                  <span className="font-bold text-orange-600 text-lg">Bitcoin & Crypto</span>
                  <div className="flex items-center space-x-2 ml-auto">
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">BTC</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">ETH</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">USDT</span>
                  </div>
                </div>
                {selectedPayment === 'crypto' && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="pt-4">
                      {cartTotal > 0 ? (
                        <div className="space-y-4">
                          <div className="bg-orange-50 border border-orange-200 rounded-md p-4">
                            <h4 className="font-medium text-orange-900 mb-2">Betala med Kryptovaluta</h4>
                            <p className="text-sm text-orange-800 mb-3">
                              Säker och anonym betalning med Bitcoin, Ethereum eller USDT
                            </p>
                            <p className="text-sm font-medium text-orange-900">
                              Total: {cartTotal.toFixed(2)} SEK
                            </p>
                          </div>
                          
                          <button
                            onClick={async () => {
                              try {
                                const response = await fetch('/api/create-crypto-payment', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ 
                                    amount: cartTotal,
                                    currency: 'SEK',
                                    order_description: `Scandiscent Order - ${cartItems.length} items`
                                  })
                                });
                                const data = await response.json();
                                
                                if (data.payment_url) {
                                  window.location.href = data.payment_url;
                                } else {
                                  alert('Krypto-betalning kunde inte initieras. Försök igen.');
                                }
                              } catch (error) {
                                console.error('Crypto payment error:', error);
                                alert('Krypto-betalning misslyckades. Försök igen.');
                              }
                            }}
                            className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-medium"
                          >
                            Betala {cartTotal.toFixed(2)} SEK med Crypto
                          </button>
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-500">Din kundvagn är tom. Lägg till produkter för att betala.</p>
                          <button 
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={() => window.location.href = '/womens'}
                          >
                            Fortsätt handla
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 mt-6">
              <input 
                type="checkbox" 
                id="billingAddress" 
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={formData.useBillingAddress}
                onChange={(e) => handleInputChange('useBillingAddress', e.target.checked)}
                data-testid="checkbox-billing-address"
              />
              <label htmlFor="billingAddress" className="text-sm text-gray-600 leading-relaxed">
                Use shipping address as billing address
              </label>
            </div>

            <button 
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              data-testid="button-complete-order"
              onClick={async () => {
                if (cartTotal === 0) {
                  alert('Din kundvagn är tom. Lägg till produkter först.');
                  return;
                }

                try {
                  if (selectedPayment === 'stripe') {
                    const response = await fetch('/api/create-payment-intent', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                        amount: cartTotal,
                        items: cartItems 
                      })
                    });
                    const { url } = await response.json();
                    window.location.href = url;
                  } else if (selectedPayment === 'crypto') {
                    const response = await fetch('/api/create-crypto-payment', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                        amount: cartTotal,
                        currency: 'SEK',
                        order_description: `Scandiscent Order - ${cartItems.length} items`
                      })
                    });
                    const data = await response.json();
                    
                    if (data.payment_url) {
                      window.location.href = data.payment_url;
                    } else {
                      alert('Krypto-betalning kunde inte initieras. Försök igen.');
                    }
                  } else if (selectedPayment === 'paypal') {
                    alert('För PayPal: Klicka på PayPal-knappen i express checkout sektionen ovan.');
                  }
                } catch (error) {
                  console.error('Payment error:', error);
                  alert('Betalning misslyckades. Försök igen.');
                }
              }}
            >
              Slutför beställning - {cartTotal.toFixed(2)} SEK
            </button>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-gray-50 lg:bg-white border-t lg:border-t-0 lg:border-l border-gray-200 px-4 py-8 lg:py-12">
          <div className="max-w-md mx-auto lg:max-w-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
              <button className="text-sm text-blue-600 hover:text-blue-500">Show order summary</button>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.size} • {item.sellerAlias}</p>
                      {item.wearDays && (
                        <p className="text-sm text-gray-500">{item.wearDays} dagars användning</p>
                      )}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      kr{(item.priceKr * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg border mx-auto mb-4"></div>
                  <p className="text-gray-500 text-sm">Din kundvagn är tom</p>
                  <button 
                    className="mt-2 text-blue-600 hover:text-blue-500 text-sm"
                    onClick={() => window.location.href = '/womens'}
                  >
                    Fortsätt handla
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
                <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-md transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">kr{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-500">Calculated at next step</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">kr{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Including VAT</p>
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-2">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free return within 30 days
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure payment guaranteed
              </p>
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Discreet packaging
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}