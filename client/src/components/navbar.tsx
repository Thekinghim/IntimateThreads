import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const { items } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Collection" },
    { href: "/track-order", label: "Track Order" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center group">
            <h1 className="font-poppins font-bold text-2xl text-stone-800 group-hover:text-stone-600 transition-colors">Nordic</h1>
            <span className="ml-2 text-sm text-stone-500 font-light italic">Collection</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  location === item.href
                    ? "text-stone-800 bg-stone-100"
                    : "text-stone-600 hover:text-stone-800 hover:bg-stone-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-powder-pink text-charcoal">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-4 rounded transition-colors duration-200 ${
                    location === item.href
                      ? "bg-powder-pink text-charcoal"
                      : "text-charcoal hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
