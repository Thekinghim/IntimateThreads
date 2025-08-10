import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCartStore } from "@/lib/cart";
import { nowPayments, type PaymentResponse } from "@/lib/nowpayments";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Lock, Bitcoin, CreditCard, Globe, Copy, QrCode, Shield, Eye, ArrowLeft } from "lucide-react";
import PrivacyBanner from "@/components/privacy-banner";
import { AnonymousCheckoutBanner } from "@/components/anonymous-features";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Namn krävs"),
  customerEmail: z.string().email("Ogiltig e-postadress"),
  shippingAddress: z.string().min(10, "Fullständig adress krävs"),
  paymentMethod: z.enum(["crypto", "revolut", "gumroad"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState("btc");
  const [paymentCreated, setPaymentCreated] = useState<PaymentResponse | null>(null);
  const [showAnonymousMode, setShowAnonymousMode] = useState(true);

  const totalPrice = getTotalPrice();

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      shippingAddress: "",
      paymentMethod: "crypto",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  // Get crypto estimate
  const { data: estimate, isLoading: isEstimateLoading } = useQuery<{ estimated_amount: number }>({
    queryKey: ['/api/nowpayments/estimate', totalPrice, 'sek', selectedCrypto],
    enabled: paymentMethod === "crypto" && totalPrice > 0,
  });

  // Get available currencies
  const { data: currencies } = useQuery({
    queryKey: ['/api/nowpayments/currencies'],
    enabled: paymentMethod === "crypto",
  });

  const popularCryptos = [
    { code: 'btc', name: 'Bitcoin', icon: Bitcoin, color: 'text-orange-500' },
    { code: 'eth', name: 'Ethereum', icon: Globe, color: 'text-blue-500' },
    { code: 'usdt', name: 'USDT', icon: CreditCard, color: 'text-green-500' },
  ];

  const createOrderMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/orders', data);
      return response.json();
    },
  });

  const createPaymentMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/nowpayments/payment', data);
      return response.json();
    },
  });

  const onSubmit = async (data: CheckoutForm) => {
    if (items.length === 0) {
      toast({
        title: "Tom varukorg",
        description: "Du måste lägga till produkter i varukorgen först.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create orders for each item (simplified - in real app might want to batch)  
      const orders = [];
      for (const item of items) {
        const itemTotal = item.priceKr * item.quantity;
        const commission = itemTotal * 0.45; // 45% commission
        const orderData = {
          productId: item.id,
          sellerId: item.sellerId || "8a97dd0f-644d-4769-9f2c-03d858c96463", // fallback seller ID
          customerName: data.customerName,
          customerEmail: data.customerEmail,
          shippingAddress: data.shippingAddress,
          totalAmountKr: itemTotal.toString(),
          commissionKr: commission.toString(),
          paymentMethod: data.paymentMethod,
          paymentStatus: "pending",
          status: "pending",
          ...(data.paymentMethod === "crypto" && {
            cryptoCurrency: selectedCrypto.toUpperCase(),
            cryptoAmount: (estimate as any)?.estimated_amount?.toString() || "0",
          }),
        };

        const order = await createOrderMutation.mutateAsync(orderData);
        orders.push(order);
      }

      if (data.paymentMethod === "crypto") {
        // Create NOWPayments payment
        const paymentData = {
          price_amount: totalPrice,
          pay_currency: selectedCrypto,
          order_id: orders[0].id, // Use first order ID as reference
          order_description: `Diskreta Kollektion - ${items.length} artiklar`,
        };

        const payment = await createPaymentMutation.mutateAsync(paymentData);
        setPaymentCreated(payment);
        
        toast({
          title: "Betalning skapad",
          description: "Slutför betalningen för att bekräfta din beställning.",
        });
      } else {
        // Handle other payment methods
        toast({
          title: "Beställning mottagen",
          description: "Vi kommer kontakta dig med betalningsinstruktioner.",
        });
        clearCart();
        setLocation("/");
      }
    } catch (error) {
      toast({
        title: "Fel uppstod",
        description: "Kunde inte slutföra beställningen. Försök igen.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Kopierat",
      description: "Adress kopierad till urklipp",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-soft-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="font-poppins font-medium text-2xl text-charcoal mb-4">Varukorg är tom</h1>
            <p className="text-gray-600 mb-8">Du måste lägga till produkter innan du kan gå till kassan</p>
            <Button 
              onClick={() => setLocation("/collection")}
              className="bg-charcoal text-white hover:bg-gray-800"
            >
              Tillbaka till kollektionen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8] py-12">
      <PrivacyBanner />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-cormorant font-bold text-5xl text-[#064F8C] mb-4">Slutför ditt köp</h1>
          <p className="text-[#4A5568] text-lg font-dm-sans">Fyll i leveransuppgifter och välj betalningsmetod</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div>
            <Card className="bg-white shadow-xl border-none">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center font-lora text-2xl text-[#064F8C]">
                  <Lock className="h-6 w-6 mr-3 text-[#064F8C]" />
                  Leveransinformation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-lora font-medium text-[#064F8C]">Name (or Anonymous Alias)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Anonymous User, A.N., etc." 
                              {...field} 
                              className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-[#064F8C] placeholder-gray-500 rounded-xl h-12 px-4 font-dm-sans"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="customerEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-lora font-medium text-[#064F8C]">E-postadress</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="din.email@exempel.se" 
                              {...field} 
                              className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-[#064F8C] placeholder-gray-500 rounded-xl h-12 px-4 font-dm-sans"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="shippingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-lora font-medium text-[#064F8C]">Leveransadress</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Fullständig adress med postnummer och ort" 
                              {...field} 
                              className="bg-white border-gray-300 focus:border-[#064F8C] focus:ring-[#064F8C] text-[#064F8C] placeholder-gray-500 rounded-xl h-12 px-4 font-dm-sans"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xl font-lora font-semibold text-[#064F8C]">Välj betalningsmetod</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-4 mt-4"
                            >
                              <div className="relative">
                                <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
                                <Label 
                                  htmlFor="crypto" 
                                  className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all shadow-sm ${
                                    paymentMethod === "crypto" 
                                      ? 'border-[#064F8C] bg-[#064F8C]/5 shadow-lg' 
                                      : 'border-gray-300 hover:border-[#064F8C]/50 bg-white'
                                  }`}
                                >
                                  <Bitcoin className="h-8 w-8 mr-4 text-orange-500" />
                                  <div>
                                    <div className="font-lora font-semibold text-xl text-[#064F8C]">Kryptovaluta</div>
                                    <div className="text-base text-[#4A5568] font-dm-sans mt-1">Bitcoin, Ethereum, USDT - Snabbt och säkert</div>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className="relative">
                                <RadioGroupItem value="revolut" id="revolut" className="sr-only" />
                                <Label 
                                  htmlFor="revolut" 
                                  className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all shadow-sm ${
                                    paymentMethod === "revolut" 
                                      ? 'border-[#064F8C] bg-[#064F8C]/5 shadow-lg' 
                                      : 'border-gray-300 hover:border-[#064F8C]/50 bg-white'
                                  }`}
                                >
                                  <CreditCard className="h-8 w-8 mr-4 text-[#064F8C]" />
                                  <div>
                                    <div className="font-lora font-semibold text-xl text-[#064F8C]">Revolut</div>
                                    <div className="text-base text-[#4A5568] font-dm-sans mt-1">Mobil betalning med Revolut-appen</div>
                                  </div>
                                </Label>
                              </div>
                              
                              <div className="relative">
                                <RadioGroupItem value="gumroad" id="gumroad" className="sr-only" />
                                <Label 
                                  htmlFor="gumroad" 
                                  className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all shadow-sm ${
                                    paymentMethod === "gumroad" 
                                      ? 'border-[#064F8C] bg-[#064F8C]/5 shadow-lg' 
                                      : 'border-gray-300 hover:border-[#064F8C]/50 bg-white'
                                  }`}
                                >
                                  <Globe className="h-8 w-8 mr-4 text-green-500" />
                                  <div>
                                    <div className="font-lora font-semibold text-xl text-[#064F8C]">Gumroad</div>
                                    <div className="text-base text-[#4A5568] font-dm-sans mt-1">Säker betalning med kort eller PayPal</div>
                                  </div>
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Show crypto selection immediately when crypto is selected */}
                    {paymentMethod === "crypto" && !paymentCreated && (
                      <div className="bg-white/60 rounded-2xl p-6 space-y-6 border border-[#064F8C]/10">
                        <Label className="text-lg font-lora font-semibold text-[#064F8C] block">Välj kryptovaluta:</Label>
                        <div className="grid grid-cols-3 gap-4">
                          {popularCryptos.map((crypto) => {
                            const IconComponent = crypto.icon;
                            return (
                              <button
                                key={crypto.code}
                                type="button"
                                onClick={() => setSelectedCrypto(crypto.code)}
                                className={`flex flex-col items-center p-4 border-2 rounded-2xl transition-all shadow-sm ${
                                  selectedCrypto === crypto.code
                                    ? 'border-[#064F8C] bg-[#064F8C]/5 shadow-lg'
                                    : 'border-gray-300 hover:border-[#064F8C]/50 bg-white'
                                }`}
                              >
                                <IconComponent className={`h-8 w-8 mb-2 ${crypto.color}`} />
                                <span className="text-base font-dm-sans font-medium text-[#064F8C]">{crypto.code.toUpperCase()}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {selectedCrypto && estimate && (
                          <div className="bg-white rounded-2xl p-4 border border-[#064F8C]/20 shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-base text-[#4A5568] font-dm-sans">Du kommer att betala:</span>
                              <span className="font-bold text-lg text-[#064F8C] font-dm-sans">
                                {estimate.estimated_amount || 0} {selectedCrypto.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {!paymentCreated && (
                      <Button 
                        type="submit" 
                        className="gold-button w-full text-lg py-6 rounded-3xl shadow-lg font-medium mt-8"
                        disabled={createOrderMutation.isPending || (paymentMethod === "crypto" && !selectedCrypto)}
                      >
                        {createOrderMutation.isPending ? "Skapar beställning..." : 
                         paymentMethod === "crypto" && selectedCrypto ? `Slutför betalning med ${selectedCrypto.toUpperCase()}` :
                         paymentMethod === "crypto" ? "Välj kryptovaluta först" :
                         "Slutför beställning"}
                      </Button>
                    )}
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div>
            {/* Order Summary */}
            <Card className="mb-8 bg-white shadow-xl border-none">
              <CardHeader className="pb-6">
                <CardTitle className="font-cormorant font-bold text-3xl text-[#064F8C]">Ordersammanfattning</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-base">
                      <span className="text-[#4A5568] font-dm-sans">
                        {item.sellerAlias} - {item.title} × {item.quantity}
                      </span>
                      <span className="font-bold text-[#064F8C] font-dm-sans">
                        {(item.priceKr * item.quantity).toLocaleString('sv-SE')} kr
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#064F8C]/20 pt-6">
                  <div className="flex justify-between font-cormorant font-bold text-2xl">
                    <span className="text-[#064F8C]">Totalt:</span>
                    <span className="text-[#064F8C]">{totalPrice.toLocaleString('sv-SE')} kr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Crypto Payment Details */}
            {paymentMethod === "crypto" && paymentCreated && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Bitcoin className="h-5 w-5 mr-2 text-orange-500" />
                      Kryptovaluta Betalning
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setPaymentCreated(null);
                        setSelectedCrypto('btc');
                      }}
                      className="text-sm"
                    >
                      Byt krypto
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {paymentCreated && (
                    /* Payment Created - Show Payment Details */
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h3 className="font-medium text-green-800 mb-2 flex items-center">
                          ✓ Betalning skapad!
                        </h3>
                        <p className="text-sm text-green-700">
                          Skicka exakt <span className="font-bold text-lg">{paymentCreated.pay_amount} {paymentCreated.pay_currency.toUpperCase()}</span> till adressen nedan
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <Label className="text-sm font-medium mb-2 block">Betalningsadress:</Label>
                        <div className="flex items-center space-x-2">
                          <code className="flex-1 bg-white p-3 rounded border text-sm break-all">
                            {paymentCreated.pay_address}
                          </code>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(paymentCreated.pay_address)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 inline-block">
                          <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`${paymentCreated.pay_currency}:${paymentCreated.pay_address}?amount=${paymentCreated.pay_amount}`)}`}
                            alt="Payment QR Code"
                            className="h-32 w-32"
                          />
                        </div>
                        <p className="text-xs text-gray-600 mt-2">
                          Skanna med din wallet-app för att betala
                        </p>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Viktigt att komma ihåg:</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Skicka exakt {paymentCreated.pay_amount} {paymentCreated.pay_currency.toUpperCase()}</li>
                          <li>• Betalningen gäller i 15 minuter</li>
                          <li>• Du kommer få bekräftelse via email</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-3">
                        <Button 
                          onClick={() => {
                            clearCart();
                            setLocation(`/order-tracking?orderId=${paymentCreated.order_id}`);
                          }}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-poppins font-medium text-lg py-6"
                        >
                          ✓ Jag har slutfört betalningen
                        </Button>
                        <Button 
                          onClick={() => {
                            setLocation('/');
                          }}
                          variant="outline"
                          className="w-full font-poppins"
                        >
                          Avbryt och gå tillbaka
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Other Payment Methods */}
            {paymentMethod !== "crypto" && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {paymentMethod === "revolut" ? "Revolut Betalning" : "Gumroad Betalning"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    {paymentMethod === "revolut" 
                      ? "Du kommer få instruktioner för Revolut-betalning via email efter att du slutfört beställningen."
                      : "Du kommer omdirigeras till Gumroad för säker betalning."
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
