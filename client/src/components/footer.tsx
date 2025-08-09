import { Link } from "wouter";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F5F1E8] text-[#2D3748] py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 gradient-rose rounded-3xl flex items-center justify-center shadow-luxury">
                <span className="text-deep-charcoal font-bold text-2xl font-poppins">S</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-poppins font-bold text-3xl text-[#2D3748]">Scandiscent</h4>
              </div>
            </div>
            <p className="text-[#4A5568] mb-10 max-w-lg text-xl leading-relaxed font-light">
              Exklusiva, personliga plagg från nordiska kvinnor. Vi värnar om diskretion, kvalitet och integritet i varje transaktion.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-soft-taupe hover:text-dusty-rose hover:shadow-rose transition-all duration-500 group hover:scale-110">
                <Instagram className="h-8 w-8 group-hover:scale-125 transition-all duration-300" />
              </a>
              <a href="#" className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-soft-taupe hover:text-dusty-rose hover:shadow-rose transition-all duration-500 group hover:scale-110">
                <Twitter className="h-8 w-8 group-hover:scale-125 transition-all duration-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-poppins font-semibold text-2xl mb-8 text-[#2D3748]">Information</h5>
            <ul className="space-y-6 text-[#4A5568]">
              <li><Link href="/how-it-works" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Om oss</Link></li>
              <li><Link href="/how-it-works" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Så funkar det</Link></li>
              <li><a href="#" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Vanliga frågor</a></li>
              <li><a href="#" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-poppins font-semibold text-2xl mb-8 text-[#2D3748]">Villkor</h5>
            <ul className="space-y-6 text-[#4A5568]">
              <li><Link href="/privacy-policy" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Integritetspolicy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Användarvillkor</Link></li>
              <li><a href="#" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Returpolicy</a></li>
              <li><a href="#" className="hover:text-dusty-rose hover:translate-x-2 transition-all duration-400 flex items-center text-lg font-light">Säkerhet</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#4A5568]/20 mt-20 pt-12">
          <div className="flex justify-between items-center">
            <p className="text-[#4A5568] text-lg font-light">© 2024 Scandiscent. Alla rättigheter förbehålls. | 18+ endast</p>
            <Link 
              href="/admin/login" 
              className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-soft-taupe hover:text-dusty-rose hover:shadow-rose transition-all duration-500 hover:scale-125 group"
              title="Admin Access"
            >
              <div className="w-5 h-5 bg-soft-taupe group-hover:bg-dusty-rose rounded-full transition-all duration-500 shadow-luxury"></div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
