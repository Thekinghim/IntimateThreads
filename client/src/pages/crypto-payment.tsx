import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { nowPayments } from '@/lib/nowpayments';
import { useToast } from '@/hooks/use-toast';

export default function CryptoPayment() {
  const [match, params] = useRoute('/crypto-payment/:paymentId');
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [payment, setPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!match || !params?.paymentId) {
      setLocation('/');
      return;
    }

    const fetchPayment = async () => {
      try {
        const paymentData = await nowPayments.getPaymentStatus(params.paymentId);
        setPayment(paymentData);
      } catch (error) {
        console.error('Failed to fetch payment:', error);
        toast({
          title: "Fel",
          description: "Kunde inte hämta betalningsinformation",
          variant: "destructive"
        });
        setLocation('/');
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
    
    // Poll for payment status updates every 10 seconds
    const interval = setInterval(fetchPayment, 10000);
    
    return () => clearInterval(interval);
  }, [match, params?.paymentId, setLocation, toast]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Kopierat",
        description: "Betalningsadress kopierad till urklipp"
      });
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'waiting':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'confirming':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'confirmed':
      case 'finished':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#064F8C] mx-auto mb-4"></div>
          <p className="text-gray-600">Laddar betalningsinformation...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#064F8C] mb-4">Betalning hittades inte</h1>
          <Button onClick={() => setLocation('/')}>Tillbaka till startsidan</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#064F8C] font-cormorant mb-2">
            Kryptovaluta-betalning
          </h1>
          <p className="text-gray-600">
            Slutför din betalning genom att skicka {payment.pay_currency?.toUpperCase()} till adressen nedan
          </p>
        </div>

        {/* Payment Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(payment.payment_status)}
              <span>Betalningsstatus</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-lg">{nowPayments.getPaymentStatusText(payment.payment_status)}</span>
              <Badge 
                variant="outline" 
                className={nowPayments.getStatusColor(payment.payment_status)}
              >
                {payment.payment_status}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Betalningsdetaljer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Belopp att betala</label>
                <p className="text-lg font-semibold text-[#064F8C]">
                  {payment.pay_amount} {payment.pay_currency?.toUpperCase()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Ursprungsbelopp</label>
                <p className="text-lg font-semibold text-gray-900">
                  {payment.price_amount} SEK
                </p>
              </div>
            </div>

            {/* Payment Address */}
            <div>
              <label className="text-sm font-medium text-gray-600">Betalningsadress</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 bg-gray-100 p-3 rounded-md text-sm break-all">
                  {payment.pay_address}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(payment.pay_address)}
                  className="flex-shrink-0"
                >
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* QR Code would go here if available */}
            {payment.qr_code && (
              <div className="text-center">
                <label className="text-sm font-medium text-gray-600">QR-kod</label>
                <div className="mt-2">
                  <img 
                    src={payment.qr_code} 
                    alt="QR Code för betalning" 
                    className="mx-auto max-w-xs border rounded-lg"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Instruktioner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-[#064F8C] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">1</span>
              <p>Kopiera betalningsadressen ovan eller skanna QR-koden</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#064F8C] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">2</span>
              <p>Skicka exakt <strong>{payment.pay_amount} {payment.pay_currency?.toUpperCase()}</strong> till adressen</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#064F8C] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">3</span>
              <p>Vänta på bekräftelse (vanligtvis 10-30 minuter)</p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="border-yellow-200 bg-yellow-50 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">Viktigt att komma ihåg</h3>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Skicka endast {payment.pay_currency?.toUpperCase()} till denna adress</li>
                  <li>• Skicka exakt det angivna beloppet</li>
                  <li>• Betalningen förfaller efter 2 timmar</li>
                  <li>• Denna sida uppdateras automatiskt när betalning tas emot</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button 
            variant="outline" 
            onClick={() => setLocation('/track-order')}
          >
            Spåra beställning
          </Button>
          <Button 
            onClick={() => setLocation('/')}
            className="bg-[#064F8C] hover:bg-[#053D6B]"
          >
            Tillbaka till startsidan
          </Button>
        </div>
      </div>
    </div>
  );
}