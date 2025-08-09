import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBag, Menu, Globe } from "lucide-react";
import { useCartStore } from "@/lib/cart";
import { useState } from "react";
import { useLanguage, useTranslations, getLanguageName, type Language } from "@/hooks/useLanguage";

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
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <span className="sm:text-xl text-[#111B3E] tracking-wide text-center text-[22px] ml-[6px] mr-[6px] font-light bg-[#00000000]">Scandiscent</span>
            </div>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/collection">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors lg:text-base text-[25px] font-semibold">
                {t.all}
              </span>
            </Link>
            <Link href="/womens">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors lg:text-base text-[25px] font-semibold">
                {t.womensUsed}
              </span>
            </Link>
            <Link href="/mens">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors lg:text-base text-[25px] font-semibold">
                {t.mensUsed}
              </span>
            </Link>
            <Link href="/track-order">
              <span className="text-[#064F8C] hover:text-[#111B3E] transition-colors lg:text-base text-[25px] font-semibold">
                {t.trackOrder}
              </span>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
              <SelectTrigger className="w-24 h-8 text-xs border-[#064F8C]/20 hidden sm:flex">
                <div className="flex items-center space-x-1">
                  <Globe className="h-3 w-3" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sv">Svenska</SelectItem>
                <SelectItem value="no">Norsk</SelectItem>
                <SelectItem value="da">Dansk</SelectItem>
                <SelectItem value="en">English</SelectItem>
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
              <Link href="/collection" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  {t.all}
                </span>
              </Link>
              <Link href="/womens" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  {t.womensUsed}
                </span>
              </Link>
              <Link href="/mens" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  {t.mensUsed}
                </span>
              </Link>
              <Link href="/track-order" onClick={() => setMobileMenuOpen(false)}>
                <span className="block py-2 px-4 text-[#064F8C] hover:bg-[#F5F2E8] rounded">
                  {t.trackOrder}
                </span>
              </Link>
              
              {/* Mobile Language Selector */}
              <div className="px-4 py-2">
                <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
                  <SelectTrigger className="w-full">
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>{getLanguageName(language)}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sv">Svenska</SelectItem>
                    <SelectItem value="no">Norsk</SelectItem>
                    <SelectItem value="da">Dansk</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}