import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Shield, 
  Eye, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  UserX,
  Mail,
  MapPin
} from "lucide-react";

const anonymousCheckoutSchema = z.object({
  anonymousEmail: z.string().email("Valid email required for order confirmation"),
  shippingAddress: z.string().min(10, "Complete address required"),
  specialInstructions: z.string().optional(),
});

type AnonymousCheckoutForm = z.infer<typeof anonymousCheckoutSchema>;

interface AnonymousCheckoutProps {
  onSubmit: (data: AnonymousCheckoutForm) => void;
  isLoading?: boolean;
}

export default function AnonymousCheckout({ onSubmit, isLoading = false }: AnonymousCheckoutProps) {
  const [showPrivacyDetails, setShowPrivacyDetails] = useState(false);
  
  const form = useForm<AnonymousCheckoutForm>({
    resolver: zodResolver(anonymousCheckoutSchema),
    defaultValues: {
      anonymousEmail: "",
      shippingAddress: "",
      specialInstructions: "",
    },
  });

  const privacyFeatures = [
    {
      icon: UserX,
      title: "No Account Required",
      description: "Complete your purchase without creating an account"
    },
    {
      icon: Eye,
      title: "Anonymous Browsing",
      description: "We don't track your browsing history or preferences"
    },
    {
      icon: Mail,
      title: "Encrypted Communication",
      description: "All emails are encrypted and automatically deleted after delivery"
    },
    {
      icon: MapPin,
      title: "Discreet Shipping",
      description: "Plain packaging with no identifying marks or branding"
    }
  ];

  const handleSubmit = (data: AnonymousCheckoutForm) => {
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      {/* Privacy Assurance Header */}
      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Shield className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-green-800">Anonymous & Secure Checkout</h3>
              <p className="text-sm text-green-700">Your identity remains completely private</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPrivacyDetails(!showPrivacyDetails)}
              className="text-green-700 hover:text-green-800"
            >
              {showPrivacyDetails ? "Hide" : "Details"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Details */}
      {showPrivacyDetails && (
        <Card className="border-stone-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="h-5 w-5 text-stone-600" />
              Privacy Protection Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {privacyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center mt-1">
                    <feature.icon className="h-4 w-4 text-stone-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-800 text-sm">{feature.title}</h4>
                    <p className="text-xs text-stone-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Checkout Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Shipping Information</CardTitle>
          <p className="text-sm text-stone-600">Only required for delivery - never stored or shared</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="anonymousEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email for Order Updates
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="anonymous@example.com" 
                        {...field}
                        className="bg-stone-50 border-stone-300"
                      />
                    </FormControl>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Email will be encrypted and deleted after 30 days
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shippingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Shipping Address
                    </FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Street Address, City, Postal Code, Country"
                        className="w-full min-h-[80px] px-3 py-2 border border-stone-300 rounded-md bg-stone-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-stone-400"
                        {...field}
                      />
                    </FormControl>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Address encrypted and used only for shipping
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Delivery Instructions (Optional)</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="e.g., Leave at door, Ring doorbell, etc."
                        className="w-full min-h-[60px] px-3 py-2 border border-stone-300 rounded-md bg-stone-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-stone-400"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 text-sm">Privacy Commitment</h4>
                  <p className="text-xs text-amber-700 mt-1">
                    We never store personal information beyond what's necessary for delivery. 
                    All data is automatically purged after successful delivery.
                  </p>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-stone-800 hover:bg-stone-900 text-white py-3"
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
                <Shield className="h-4 w-4 ml-2" />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}