export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-nordic-cream via-dusty-rose/10 to-sage-mist/20 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-deep-charcoal mb-4">Privacy Policy</h1>
          <p className="text-lg text-deep-charcoal/70">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-white/40 space-y-8">
            
            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">1. Information We Collect</h2>
              <div className="text-deep-charcoal/80 leading-relaxed space-y-4">
                <p><strong>Personal Information:</strong> We collect minimal personal information necessary for order fulfillment:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Email address (for order confirmation and tracking)</li>
                  <li>Shipping address (for delivery purposes only)</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
                
                <p><strong>Automatically Collected Information:</strong></p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Browser type and version</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited and time spent on site</li>
                  <li>Device information (for responsive design)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">2. How We Use Your Information</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>We use the collected information for:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Processing and fulfilling your orders</li>
                  <li>Sending order confirmations and tracking information</li>
                  <li>Improving our website and user experience</li>
                  <li>Complying with legal obligations</li>
                  <li>Preventing fraud and ensuring security</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">3. Anonymous Shopping</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Nordic Collection is designed for maximum privacy and discretion. We do not require account creation, and all purchases can be made anonymously using cryptocurrency payments. Your browsing history is not linked to your identity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">4. Data Sharing</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Trusted third parties who assist in operating our website and conducting business (payment processors, shipping companies)</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">5. Payment Security</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                All payment processing is handled by secure third-party providers (NOWPayments for cryptocurrency). We do not store your payment information on our servers. Cryptocurrency payments provide additional anonymity and security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">6. Data Retention</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>We retain your information for the minimum time necessary:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Order information: 2 years (for customer service and legal compliance)</li>
                  <li>Email addresses: Until you request removal</li>
                  <li>Anonymous analytics: 1 year</li>
                  <li>Payment data: Not stored (handled by payment processors)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">7. Your Rights (GDPR)</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>Under GDPR, you have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Delete your data ("right to be forgotten")</li>
                  <li>Restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">8. Cookies</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>We use minimal cookies for:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Shopping cart functionality</li>
                  <li>Security and fraud prevention</li>
                  <li>Basic analytics (anonymized)</li>
                </ul>
                <p className="mt-3">You can disable cookies in your browser settings, though this may affect site functionality.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">9. Security Measures</h2>
              <div className="text-deep-charcoal/80 leading-relaxed">
                <p>We implement appropriate security measures including:</p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure hosting infrastructure</li>
                  <li>Regular security audits</li>
                  <li>Access controls and authentication</li>
                  <li>Data anonymization where possible</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">10. International Transfers</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Your data may be transferred to and processed in countries outside the EU. We ensure appropriate safeguards are in place through standard contractual clauses and adequacy decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">11. Children's Privacy</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                Our service is intended for adults only (18+). We do not knowingly collect personal information from anyone under 18. If we discover that a child under 18 has provided us with personal information, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">12. Changes to This Policy</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-deep-charcoal mb-4">13. Contact Us</h2>
              <p className="text-deep-charcoal/80 leading-relaxed">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us through our secure contact form. We will respond within 30 days.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}