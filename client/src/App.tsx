import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Collection from "@/pages/collection";
import Product from "@/pages/product";
import Cart from "@/pages/cart";
import Checkout from "@/pages/checkout";
import HowItWorks from "@/pages/how-it-works";
import TrackOrder from "@/pages/track-order";
import Admin from "@/pages/shopify-admin";
import AdminLogin from "@/pages/adminLogin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/collection" component={Collection} />
      <Route path="/product/:id" component={Product} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/track-order" component={TrackOrder} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-soft-white text-charcoal">
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
