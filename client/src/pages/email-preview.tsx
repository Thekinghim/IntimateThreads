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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg">
        <div className="bg-gray-800 text-white p-4 text-center">
          <h1 className="text-lg font-semibold">📧 Förhandsvisning: Orderbekräftelse E-post</h1>
          <p className="text-sm text-gray-300 mt-1">Så här ser e-posten ut som kunden får</p>
        </div>

        {/* Email Content Start */}
        <div className="max-w-2xl mx-auto bg-white">
          {/* Header */}
          <div className="bg-teal-500 text-white text-center py-8">
            <h1 className="text-2xl font-bold tracking-widest">scandiscent</h1>
          </div>

          {/* Success Message */}
          <div className="px-8 py-12 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-gray-500 text-sm mb-2">Order {orderNumber}</h2>
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Tack {customerName}!</h1>
            </div>

            {/* Map Placeholder */}
            <div className="mb-8">
              <div className="w-full h-48 rounded-lg flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-green-100 via-blue-50 to-cyan-100">
                <div className="text-center z-10">
                  <div className="w-8 h-8 bg-red-500 rounded-full mx-auto mb-2"></div>
                  <p className="text-sm font-semibold text-gray-700">Leveransadress</p>
                  <p className="text-xs text-gray-600 whitespace-pre-line">{testOrderData.shippingAddress}</p>
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
                  📍 Maps
                </div>
              </div>
            </div>

            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Din Scandiscent order är bekräftad!</h3>
              <p className="text-gray-600 mb-6">Du kommer få ett email när din order är redo.</p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Vill du göra en ny beställning?</h4>
                <p className="text-gray-600">
                  Du kan påbörja en ny order genom att besöka vår hemsida: 
                  <a href="#" className="text-teal-600 underline ml-1">scandiscent.com</a>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-8 pb-8">
            <div className="flex flex-wrap gap-8">
              {/* Items List */}
              <div className="flex-1 min-w-0">
                {testOrderData.products.map((product, index) => (
                  <div key={index} className="flex items-center p-4 mb-3 border border-gray-200 rounded-lg bg-white">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-purple-300 rounded-lg mr-4 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-gray-900 font-semibold">{product.name}</h4>
                        <span className="text-gray-500 text-sm">{product.quantity}</span>
                      </div>
                      <p className="text-gray-500 text-sm">Antal: {product.quantity}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-gray-900 font-semibold">{product.price.toLocaleString('sv-SE')} kr</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="flex-1 min-w-0">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-gray-900 font-semibold mb-4">Ordersammanfattning</h3>
                  
                  <div className="mb-6">
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 text-sm">Delsumma</span>
                      <span className="text-gray-900 text-sm">{parseFloat(testOrderData.totalAmountKr).toLocaleString('sv-SE')} kr</span>
                    </div>
                    <div className="flex justify-between mb-3">
                      <span className="text-gray-500 text-sm">Frakt</span>
                      <span className="text-green-600 text-sm font-semibold">Gratis</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-semibold">Total</span>
                        <span className="text-gray-900 font-semibold text-lg">
                          <span className="text-gray-500 text-xs mr-1">SEK</span>
                          {parseFloat(testOrderData.totalAmountKr).toLocaleString('sv-SE')} kr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="border-t pt-6">
                    <div className="flex flex-wrap gap-6">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 font-semibold mb-2">Kontaktinformation</h4>
                        <div className="text-gray-500 text-sm">
                          <p className="mb-1">{testOrderData.customerName}</p>
                          <p>{testOrderData.customerEmail}</p>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-gray-900 font-semibold mb-2">Betalningsmetod</h4>
                        <div className="text-gray-500 text-sm">
                          <p className="capitalize">{testOrderData.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 text-center text-gray-500 text-sm">
                  <p className="mb-1">Behöver du hjälp med din order?</p>
                  <a href="mailto:scandiscentswe@gmail.com" className="text-teal-600 underline">Kontakta oss</a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-12 text-center">
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Följ oss på sociala medier</h3>
              <div className="flex justify-center gap-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="w-8 h-8 bg-pink-500 rounded-full"></div>
                <div className="w-8 h-8 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-gray-500 text-xs space-y-1">
              <p>www.scandiscent.com</p>
              <p>Stockholm, Sverige</p>
              <p>Org nr: 556-XXX-XXXX</p>
              <p className="pt-2">© 2025 Scandiscent. Alla rättigheter förbehållna.</p>
            </div>
          </div>
        </div>
        {/* Email Content End */}

        <div className="bg-gray-800 text-white p-4 text-center">
          <p className="text-sm text-gray-300">
            ⬆️ Så här ser orderbekräftelse-e-posten ut som skickas till kunden
          </p>
        </div>
      </div>
    </div>
  );
}