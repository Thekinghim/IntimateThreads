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
    <nav className="glass sticky top-0 z-50 shadow-luxury border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-charcoal rounded-2xl flex items-center justify-center shadow-luxury group-hover:scale-105 transition-all duration-300">
                <span className="text-nordic-cream font-bold text-xl font-poppins">N</span>
              </div>
              <div className="flex flex-col">
                <h1 className="font-poppins font-bold text-2xl text-deep-charcoal group-hover:text-dusty-rose transition-colors leading-none">Nordic</h1>
                <span className="text-sm text-soft-taupe font-light italic tracking-widest">Collection</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-medium transition-all duration-500 px-8 py-4 rounded-2xl text-sm font-poppins ${
                  location === item.href
                    ? "text-nordic-cream gradient-charcoal shadow-luxury transform scale-105"
                    : "text-deep-charcoal hover:text-dusty-rose hover:bg-dusty-rose/20 hover:shadow-rose hover:scale-102"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-6">
            <Link href="/cart">
              <Button variant="ghost" size="lg" className="relative group hover:bg-dusty-rose/20 transition-all duration-500 rounded-2xl p-3 hover:shadow-rose hover:scale-110">
                <ShoppingBag className="h-7 w-7 text-deep-charcoal group-hover:text-dusty-rose transition-all duration-300" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-7 w-7 flex items-center justify-center gradient-rose text-deep-charcoal font-bold shadow-luxury animate-bounce">
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
