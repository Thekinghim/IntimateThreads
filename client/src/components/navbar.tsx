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
    <nav className="bg-[#FEFBEA] shadow-sm border-b border-[#E8E4D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-[10px] pr-[10px]">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gold-accent rounded-full flex items-center justify-center shadow-md">
                <span className="text-[#111B3E] font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg sm:text-xl text-[#111B3E] tracking-wide">Scandiscent</span>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/collection">
              <span className="hover:text-[#111B3E] transition-colors lg:text-base font-extrabold text-[25px] text-[#000000]">
                Collection
              </span>
            </Link>
            <Link href="/track-order">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors font-medium text-sm lg:text-base">
                Track Order
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs gold-accent text-[#111B3E] font-semibold">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E4D6] bg-[#FEFBEA]">
            <div className="flex flex-col space-y-2">
              <Link href="/collection" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  Collection
                </span>
              </Link>
              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  Track Order
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}