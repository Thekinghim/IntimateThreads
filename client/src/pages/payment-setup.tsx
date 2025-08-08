import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, CreditCard, Bitcoin, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

export default function PaymentSetup() {
  const [apiKeys, setApiKeys] = useState({
    nowpayments: false,
    revolut: false,
    gumroad: false
  });

  useEffect(() => {
    // Check which payment methods are configured
    checkPaymentStatus();
  }, []);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch('/api/payment-status');
      if (response.ok) {
        const status = await response.json();
        setApiKeys(status);
      }
    } catch (error) {
      console.error('Failed to check payment status');
    }
  };

  const paymentMethods = [
    {
      id: 'nowpayments',
      name: 'NOWPayments (Cryptocurrency)',
      icon: <Bitcoin className="h-5 w-5" />,
      configured: apiKeys.nowpayments,
      instructions: [
        'Sign up at nowpayments.io',
        'Get your API key from the dashboard',
        'Add NOWPAYMENTS_API_KEY to environment variables',
        'Supports Bitcoin, Ethereum, USDT and 100+ cryptocurrencies'
      ],
      benefits: ['Anonymous payments', 'Global reach', 'Low fees', 'No chargebacks'],
      required: true
    },
    {
      id: 'revolut',
      name: 'Revolut Business',
      icon: <CreditCard className="h-5 w-5" />,
      configured: apiKeys.revolut,
      instructions: [
        'Sign up for Revolut Business',
        'Enable Merchant API',
        'Get API credentials',
        'Add REVOLUT_API_KEY to environment variables'
      ],
      benefits: ['Traditional payments', 'Card processing', 'European focus', 'Fast settlements'],
      required: false
    },
    {
      id: 'gumroad',
      name: 'Gumroad',
      icon: <ShoppingBag className="h-5 w-5" />,
      configured: apiKeys.gumroad,
      instructions: [
        'Create Gumroad seller account',
        'Generate API access token',
        'Add GUMROAD_API_KEY to environment variables',
        'Configure webhook endpoints'
      ],
      benefits: ['Simple integration', 'Built-in checkout', 'Digital products', 'Affiliate system'],
      required: false
    }
  ];

  const allConfigured = paymentMethods.every(m => !m.required || m.configured);
  const atLeastOneConfigured = paymentMethods.some(m => m.configured);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment System Setup</h1>
          <p className="text-gray-600">Configure payment methods to start accepting orders</p>
          
          <div className="mt-4 p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {allConfigured ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span className="text-green-700 font-medium">All payment methods configured!</span>
                  </>
                ) : atLeastOneConfigured ? (
                  <>
                    <AlertCircle className="h-6 w-6 text-yellow-500" />
                    <span className="text-yellow-700 font-medium">Partial setup - configure remaining methods</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <span className="text-red-700 font-medium">No payment methods configured!</span>
                  </>
                )}
              </div>
              <Badge className={allConfigured ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                {atLeastOneConfigured ? 'Can Accept Orders' : 'Cannot Accept Orders'}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {paymentMethods.map((method) => (
            <Card key={method.id} className={method.configured ? 'border-green-200' : 'border-gray-200'}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {method.icon}
                    <CardTitle className="text-xl">{method.name}</CardTitle>
                    {method.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                  </div>
                  <Badge className={method.configured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                    {method.configured ? (
                      <><CheckCircle className="h-3 w-3 mr-1" /> Configured</>
                    ) : (
                      <><XCircle className="h-3 w-3 mr-1" /> Not Configured</>
                    )}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {method.benefits.map((benefit) => (
                        <Badge key={benefit} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {!method.configured && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Setup Instructions:</h4>
                      <ol className="space-y-1">
                        {method.instructions.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="font-medium mr-2">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <p className="font-medium">Start with NOWPayments</p>
                  <p className="text-sm text-gray-600">Essential for anonymous cryptocurrency payments - takes 5 minutes to set up</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <p className="font-medium">Add environment variables</p>
                  <p className="text-sm text-gray-600">Click the "Secrets" tab in Replit and add your API keys</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <p className="font-medium">Test with a small transaction</p>
                  <p className="text-sm text-gray-600">Make a test purchase to verify everything works</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg">
              <p className="text-sm text-gray-700 mb-3">
                <strong>Important:</strong> Without at least one payment method configured, customers cannot complete purchases.
              </p>
              <Button className="w-full">
                Open Replit Secrets Tab
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}