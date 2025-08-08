export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-cream via-dusty-rose/10 to-sage-mist/20 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-deep-charcoal mb-4">Terms of Service</h1>
          <p className="text-lg text-deep-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-white/40 space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">1. Agreement to Terms</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                By accessing and using Nordic Collection ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">2. Age Requirement</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                You must be at least 18 years old to use this service. By using Nordic Collection, you represent and warrant that you are 18 years of age or older.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">3. Privacy and Discretion</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                We are committed to maintaining your privacy and discretion. All orders are processed anonymously with no requirement for account creation. We use secure, anonymous payment methods including cryptocurrency to protect your identity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">4. Product Information</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                All products listed are pre-owned intimate garments from Nordic women. Each item is carefully described including condition, size, and authenticity. We strive for accuracy in all product descriptions but cannot guarantee perfect condition due to the nature of pre-owned items.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">5. Payment and Pricing</h2>
              <div className="text-deep-charcoal/80 leading-relaxed space-y-2">
                <p>• Payments are processed through secure cryptocurrency gateways</p>
                <p>• All prices are listed in Swedish Kronor (SEK)</p>
                <p>• Payment must be completed within 15 minutes of order creation</p>
                <p>• Failed payments will result in automatic order cancellation</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">6. Shipping and Delivery</h2>
              <div className="text-deep-charcoal/80 leading-relaxed space-y-2">
                <p>• Discreet packaging is used for all shipments</p>
                <p>• Shipping is available within Nordic countries and EU</p>
                <p>• Delivery times: 2-5 business days within Sweden, 5-10 days EU</p>
                <p>• Tracking information is provided for all orders</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">7. Returns and Refunds</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Due to the intimate nature of our products, all sales are final. Returns and refunds are not accepted for hygiene and health reasons. Please review all product details carefully before purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">8. Prohibited Uses</h2>
              <div className="text-deep-charcoal/80 leading-relaxed space-y-2">
                <p>You may not use our service:</p>
                <p>• For any unlawful purpose or to solicit others to unlawful acts</p>
                <p>• To violate any international, federal, provincial, or state regulations or laws</p>
                <p>• To transmit, or procure the sending of, any advertising or promotional material</p>
                <p>• To impersonate or attempt to impersonate the company, employees, or other users</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">9. Intellectual Property</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                The service and its original content, features, and functionality are and will remain the exclusive property of Nordic Collection. The service is protected by copyright, trademark, and other laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">10. Limitation of Liability</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Nordic Collection shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">11. Governing Law</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of Sweden, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">12. Contact Information</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our secure contact form on the website.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}