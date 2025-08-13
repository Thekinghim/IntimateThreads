import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

// Initialize Stripe with public key
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

if (!STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe public key: VITE_STRIPE_PUBLIC_KEY');
}
if (STRIPE_PUBLIC_KEY.startsWith('sk_')) {
  throw new Error('Do not use secret key on client side. Use publishable key (starts with pk_)');
}
if (!STRIPE_PUBLIC_KEY.startsWith('pk_')) {
  throw new Error('Invalid Stripe key format. Publishable key must start with pk_');
}
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface StripeCheckoutFormProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

const StripeCheckoutForm = ({ amount, onSuccess, onClose }: StripeCheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create payment intent when component loads
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest('POST', '/api/create-payment-intent', { amount });
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error('Error creating payment intent:', error);
        toast({
          title: "Betalningsfel",
          description: "Kunde inte initiera Stripe-betalning",
          variant: "destructive"
        });
      }
    };

    createPaymentIntent();
  }, [amount, toast]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setProcessing(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        console.error('Payment failed:', error);
        toast({
          title: "Betalning misslyckades",
          description: error.message,
          variant: "destructive"
        });
      } else if (paymentIntent?.status === 'succeeded') {
        toast({
          title: "Betalning lyckades!",
          description: "Din beställning har behandlats"
        });
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Betalningsfel",
        description: "Ett fel uppstod vid betalning",
        variant: "destructive"
      });
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[#064F8C] mb-2">Betala med kort</h3>
        <p className="text-gray-600">Totalt: {amount.toFixed(2)} SEK</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border border-gray-300 rounded-md bg-white">
          <CardElement options={cardElementOptions} />
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={processing}
          >
            Avbryt
          </Button>
          <Button
            type="submit"
            disabled={!stripe || processing || !clientSecret}
            className="flex-1 bg-[#064F8C] hover:bg-[#053D6B]"
          >
            {processing ? "Behandlar..." : `Betala ${amount.toFixed(2)} SEK`}
          </Button>
        </div>
      </form>
    </div>
  );
};

interface StripeCheckoutProps {
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

export default function StripeCheckout({ amount, onSuccess, onClose }: StripeCheckoutProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <Elements stripe={stripePromise}>
          <StripeCheckoutForm amount={amount} onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </div>
    </div>
  );
}