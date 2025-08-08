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
    <>
      {/* Blue discount bar */}
      <div className="bg-blue-600 text-white text-center py-2 text-sm font-medium">
        EVERYTHING 50% OFF ARCHIVE SALE - DISCOUNT APPLIED IN CART
        <span className="float-right mr-4">FREE SHIPPING ON ORDERS OVER $150</span>
      </div>
      
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left Navigation */}
            <div className="flex items-center space-x-8">
              <Link href="/collection">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wide hover:text-gray-600">
                  WOMEN
                </span>
              </Link>
              <Link href="/collection">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wide hover:text-gray-600">
                  MEN
                </span>
              </Link>
              <Link href="/collection">
                <span className="text-sm font-medium text-gray-900 uppercase tracking-wide hover:text-gray-600">
                  ARCHIVE SALE
                </span>
              </Link>
            </div>

            {/* Center Logo */}
            <Link href="/">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">KIT<span className="ml-1">▲</span>ACE</span>
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-900 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              <button className="text-gray-900 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <button className="text-gray-900 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              
              <span className="text-sm font-medium">🇨🇦 CAD ($)</span>
              
              <Link href="/cart">
                <button className="relative text-gray-900 hover:text-gray-600">
                  <ShoppingBag className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
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
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 px-4 rounded transition-colors duration-200 ${
                      location === item.href
                        ? "bg-blue-600 text-white"
                        : "text-gray-900 hover:bg-gray-100"
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
    </>
  );
}