import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Collection from "@/pages/collection";
import Womens from "@/pages/womens";
import Mens from "@/pages/mens";
import Models from "@/pages/models";
import Product from "@/pages/product";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import HowItWorks from "@/pages/how-it-works";
import TrackOrder from "@/pages/track-order";
import Admin from "@/pages/shopify-admin";
import MobileAdmin from "@/pages/mobile-admin-v2";
import AdminLogin from "@/pages/admin-login";
import PaymentSetup from "@/pages/payment-setup";
import TermsOfService from "@/pages/terms-of-service";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";
import AgeVerification from "@/components/age-verification";

function Router() {
  const [location] = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check if mobile device - always use v2 for mobile
  const isMobile = window.innerWidth < 768;
  const AdminComponent = isMobile ? MobileAdmin : Admin;

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collection" component={Collection} />
      <Route path="/womens" component={Womens} />
      <Route path="/mens" component={Mens} />
      <Route path="/models" component={Models} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/track-order" component={TrackOrder} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminComponent} />
      <Route path="/payment-setup" component={PaymentSetup} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen gradient-nordic text-deep-charcoal">
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
          <AgeVerification />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
