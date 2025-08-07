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
    <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-stone-200/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-stone-700 to-stone-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-poppins font-bold text-xl text-stone-800 group-hover:text-stone-600 transition-colors leading-none">Nordic</h1>
                <span className="text-xs text-stone-500 font-light italic tracking-wide">Collection</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-all duration-300 px-6 py-3 rounded-xl text-sm ${
                  location === item.href
                    ? "text-white bg-gradient-to-r from-stone-700 to-stone-800 shadow-lg"
                    : "text-stone-600 hover:text-stone-800 hover:bg-stone-100/80 hover:shadow-md"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="lg" className="relative group hover:bg-stone-100/80 transition-all duration-300">
                <ShoppingBag className="h-6 w-6 text-stone-600 group-hover:text-stone-800 transition-colors" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-lg animate-pulse">
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
