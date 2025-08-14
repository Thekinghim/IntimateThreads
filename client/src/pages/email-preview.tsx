export default function EmailPreview() {
  // Testdata för att visa hur e-posten ser ut
  const testOrderData = {
    orderId: "6cc44e7c-df2d-459a-a1e7-7fbe298206d9",
    customerName: "Anna Andersson",
    customerEmail: "anna.andersson@email.com",
    totalAmountKr: "499.00",
    paymentMethod: "stripe",
    shippingAddress: "Storgatan 15\n123 45 Stockholm\nSverige",
    products: [
      {
        name: "Burgundy Spets Set - Exklusiv nordisk design",
        quantity: 1,
        price: 499
      }
    ]
  };

  const orderNumber = `SCND${testOrderData.orderId.substring(0, 6).toUpperCase()}`;
  const customerName = testOrderData.customerName || testOrderData.customerEmail.split('@')[0];

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg">
        <div className="bg-[#064F8C] text-white p-4 text-center">
          <h1 className="text-lg font-semibold">📧 Förhandsvisning: Orderbekräftelse E-post</h1>
          <p className="text-sm text-blue-100 mt-1">Så här ser e-posten ut som kunden får</p>
        </div>

        {/* Email Content Start */}
        <div className="max-w-2xl mx-auto bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#111B3E] to-[#064F8C] text-white text-center py-12">
            <h1 className="text-5xl font-bold tracking-widest gold-text-static" style={{ 
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 25%, #B8860B 50%, #DAA520 75%, #FFD700 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>ScandiScent</h1>
          </div>

          {/* Success Message */}
          <div className="px-8 py-12 text-center bg-[#F5F1E8]">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[#064F8C] text-sm mb-2 font-medium">Order {orderNumber}</h2>
              <h1 className="text-3xl font-bold text-[#064F8C] mb-6 font-cormorant">Tack {customerName}!</h1>
            </div>

            {/* Map Placeholder */}
            <div className="mb-8">
              <div className="w-full h-48 rounded-lg flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F5F1E8] via-white to-[#E8E4D6] border-2 border-[#064F8C]/10">
                <div className="text-center z-10">
                  <div className="w-8 h-8 bg-[#064F8C] rounded-full mx-auto mb-2 shadow-md"></div>
                  <p className="text-sm font-semibold text-[#064F8C]">Leveransadress</p>
                  <p className="text-xs text-[#4A5568] whitespace-pre-line">{testOrderData.shippingAddress}</p>
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-[#064F8C] bg-white px-2 py-1 rounded border border-[#064F8C]/20">
                  📍 Maps
                </div>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-bold text-[#064F8C] mb-2 font-cormorant">Din Scandiscent order är bekräftad!</h3>
              <p className="text-[#4A5568] mb-6">Du kommer få ett email när din order är redo.</p>

              <div className="bg-white rounded-lg p-6 mb-6 border border-[#064F8C]/10 shadow-sm">
                <h4 className="font-semibold text-[#064F8C] mb-2">Vill du göra en ny beställning?</h4>
                <p className="text-[#4A5568]">
                  Du kan påbörja en ny order genom att besöka vår hemsida: 
                  <a href="#" className="text-[#064F8C] underline ml-1 font-medium">scandiscent.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-8 pb-8 bg-white pt-8">
            <div className="flex flex-wrap gap-8">
              {/* Items List */}
              <div className="flex-1 min-w-0">
                {testOrderData.products.map((product, index) => (
                  <div key={index} className="flex items-center p-4 mb-3 border-2 border-[#064F8C]/10 rounded-lg bg-[#F5F1E8] shadow-sm">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-300 rounded-lg mr-4 flex-shrink-0 shadow-md flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/50 rounded"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[#064F8C] font-semibold">{product.name}</h4>
                        <span className="text-[#4A5568] text-sm">{product.quantity}</span>
                      </div>
                      <p className="text-[#4A5568] text-sm">Antal: {product.quantity}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-[#064F8C] font-semibold">{product.price.toLocaleString('sv-SE')} kr</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex-1 min-w-0">
                <div className="bg-[#F5F1E8] border-2 border-[#064F8C]/20 rounded-lg p-6 shadow-sm">
                  <h3 className="text-[#064F8C] font-semibold mb-4 font-lora">Ordersammanfattning</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <span className="text-[#4A5568] text-sm">Delsumma</span>
                      <span className="text-[#064F8C] text-sm font-medium">{parseFloat(testOrderData.totalAmountKr).toLocaleString('sv-SE')} kr</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-[#4A5568] text-sm">Frakt</span>
                      <span className="text-green-600 text-sm font-semibold">Gratis</span>
                    </div>
                    <div className="border-t-2 border-[#064F8C]/20 pt-3">
                      <div className="flex justify-between">
                        <span className="text-[#064F8C] font-semibold">Total</span>
                        <span className="text-[#064F8C] font-semibold text-lg">
                          <span className="text-[#4A5568] text-xs mr-1">SEK</span>
                          {parseFloat(testOrderData.totalAmountKr).toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="border-t-2 border-[#064F8C]/20 pt-6 space-y-4">
                    <div>
                      <h4 className="text-[#064F8C] font-semibold mb-2">Kontaktinformation</h4>
                      <div className="text-[#4A5568] text-sm">
                        <p className="mb-1">{testOrderData.customerName}</p>
                        <p>{testOrderData.customerEmail}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[#064F8C] font-semibold mb-2">Betalningsmetod</h4>
                      <div className="text-[#4A5568] text-sm">
                        <p className="capitalize">{testOrderData.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 text-center text-[#4A5568] text-sm">
                  <p className="mb-1">Behöver du hjälp med din order?</p>
                  <a href="mailto:scandiscentswe@gmail.com" className="text-[#064F8C] underline font-medium">Kontakta oss</a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#F5F1E8] px-8 py-12 text-center border-t-4 border-[#064F8C]/10">
            {/* Newsletter Signup */}
            <div className="mb-8 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-[#064F8C] mb-4 font-cormorant">Prenumerera på vårt nyhetsbrev</h3>
              <p className="text-[#4A5568] text-sm mb-4">Få exklusiva erbjudanden och nyheter direkt i din inkorg</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Din e-postadress"
                  className="flex-1 px-4 py-2 border border-[#064F8C]/20 rounded-lg bg-white text-[#064F8C] placeholder-[#4A5568] focus:outline-none focus:ring-2 focus:ring-[#064F8C]/20"
                />
                <button className="px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-[#064F8C] font-medium rounded-lg hover:shadow-md transition-shadow">
                  Prenumerera
                </button>
              </div>
            </div>
            
            <div className="text-[#4A5568] text-xs space-y-1">
              <p className="font-medium">www.scandiscent.se</p>
              <p>Stockholm, Sverige</p>
              <p className="pt-2 text-[#064F8C] font-medium">© 2025 ScandiScent. Alla rättigheter förbehållna.</p>
            </div>
          </div>
        </div>
        {/* Email Content End */}

        <div className="bg-[#064F8C] text-white p-4 text-center">
          <p className="text-sm text-blue-100">
            ⬆️ Så här ser orderbekräftelse-e-posten ut som skickas till kunden
          </p>
        </div>
      </div>
    </div>
  );
}