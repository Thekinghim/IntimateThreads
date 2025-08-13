import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Womens from "@/pages/womens";
import Models from "@/pages/models";
import About from "@/pages/about";
import ModelProducts from "@/pages/model-products";
import Product from "@/pages/product";
import EmmaProfile from "@/pages/emma-profile";
import SofiaProfile from "@/pages/sofia-profile";
import LinaProfile from "@/pages/lina-profile";
import AnnaProfile from "@/pages/anna-profile";
import MajaProfile from "@/pages/maja-profile";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import CheckoutForm from "@/pages/checkout-form";
import ShopifyCheckout from "@/pages/shopify-checkout-clean";
import CryptoPayment from "@/pages/crypto-payment";
import OrderConfirmation from "@/pages/order-confirmation";
import HowItWorks from "@/pages/how-it-works";
import TrackOrder from "@/pages/track-order";
import Admin from "@/pages/shopify-admin";
import MobileAdmin from "@/pages/mobile-admin-v2";
import ScanDiscentAdmin from "@/pages/scandiscent-admin";
import AdminLogin from "@/pages/admin-login";

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

  // Always use ScanDiscentAdmin for all devices - it's fully responsive
  const AdminComponent = ScanDiscentAdmin;

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/womens" component={Womens} />
      <Route path="/models" component={Models} />
      <Route path="/about" component={About} />
      <Route path="/profile/emma" component={EmmaProfile} />
      <Route path="/profile/sofia" component={SofiaProfile} />
      <Route path="/profile/lina" component={LinaProfile} />
      <Route path="/profile/anna" component={AnnaProfile} />
      <Route path="/profile/maja" component={MajaProfile} />
      <Route path="/models/:modelName" component={ModelProducts} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/checkout-form" component={ShopifyCheckout} />
      <Route path="/checkout-old" component={CheckoutForm} />
      <Route path="/crypto-payment/:paymentId" component={CryptoPayment} />
      <Route path="/order-confirmation" component={OrderConfirmation} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/track-order" component={TrackOrder} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={AdminComponent} />

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
