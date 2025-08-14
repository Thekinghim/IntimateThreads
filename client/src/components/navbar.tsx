import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Menu, Globe } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { useState } from "react";
import { useLanguage, useTranslations, getLanguageName, type Language } from "@/hooks/useLanguage";
import Logo from "@/components/logo";

export default function Navbar() {
  const [location] = useLocation();
  const { items } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const t = useTranslations();
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/collection", label: "Collection" },
    { href: "/track-order", label: "Track Order" },
    { href: "/how-it-works", label: "How It Works" },
  ];

  return (
    <nav className="bg-gradient-to-r from-[#FEFBEA] to-white shadow-sm border-b border-[#111B3E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pl-[10px] pr-[10px]">
        <div className="flex justify-between items-center h-14 sm:h-16 min-w-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Logo size="sm" className="text-[#064F8C]" />
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8 flex-shrink-0">
            <Link href="/womens">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors text-sm lg:text-base font-light tracking-wide whitespace-nowrap">
                Använda Trosor
              </span>
            </Link>
            <Link href="/models">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors text-sm lg:text-base font-light tracking-wide whitespace-nowrap">
                Våra modeller
              </span>
            </Link>

            <Link href="/track-order">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors text-sm lg:text-base font-light tracking-wide whitespace-nowrap">
                {t.trackOrder}
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            {/* Language Selector - Always visible */}
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-16 sm:w-20 h-8 sm:h-9 text-xs sm:text-sm bg-white text-[#064F8C] border-2 border-[#064F8C] flex rounded-lg hover:bg-[#064F8C]/5 transition-all duration-200 shadow-sm px-1 sm:px-2">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Globe className="h-3 w-3 flex-shrink-0" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="border border-[#064F8C]/20 shadow-lg rounded-lg">
                <SelectItem value="sv" className="hover:bg-[#064F8C]/10 hover:text-[#064F8C] focus:bg-[#064F8C]/10 focus:text-[#064F8C]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇸🇪</span>
                    <span>Sve</span>
                  </div>
                </SelectItem>
                <SelectItem value="no" className="hover:bg-[#064F8C]/10 hover:text-[#064F8C] focus:bg-[#064F8C]/10 focus:text-[#064F8C]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇳🇴</span>
                    <span>Nor</span>
                  </div>
                </SelectItem>
                <SelectItem value="da" className="hover:bg-[#064F8C]/10 hover:text-[#064F8C] focus:bg-[#064F8C]/10 focus:text-[#064F8C]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇩🇰</span>
                    <span>Dan</span>
                  </div>
                </SelectItem>
                <SelectItem value="en" className="hover:bg-[#064F8C]/10 hover:text-[#064F8C] focus:bg-[#064F8C]/10 focus:text-[#064F8C]">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇬🇧</span>
                    <span>Eng</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
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
              <Link href="/womens" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded font-light tracking-wide">
                  Använda Trosor
                </span>
              </Link>
              <Link href="/models" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded font-light tracking-wide">
                  Våra modeller
                </span>
              </Link>

              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded font-light tracking-wide">
                  {t.trackOrder}
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}