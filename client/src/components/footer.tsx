import { Link } from "wouter";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-stone-900 to-stone-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <div className="flex flex-col">
                <h4 className="font-poppins font-bold text-2xl text-white">Nordic</h4>
                <span className="text-sm text-stone-400 font-light italic tracking-wide">Collection</span>
              </div>
            </div>
            <p className="text-stone-300 mb-8 max-w-md text-lg leading-relaxed">
              Exklusiva, personliga plagg från nordiska kvinnor. Vi värnar om diskretion, kvalitet och integritet i varje transaktion.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="w-12 h-12 bg-stone-800/50 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700/80 transition-all duration-300 group">
                <Instagram className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 bg-stone-800/50 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700/80 transition-all duration-300 group">
                <Twitter className="h-6 w-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-poppins font-semibold text-xl mb-6 text-white">Information</h5>
            <ul className="space-y-4 text-stone-300">
              <li><Link href="/how-it-works" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Om oss</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Så funkar det</Link></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Vanliga frågor</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-poppins font-semibold text-xl mb-6 text-white">Villkor</h5>
            <ul className="space-y-4 text-stone-300">
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Integritetspolicy</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Användarvillkor</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Returpolicy</a></li>
              <li><a href="#" className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center">Säkerhet</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-stone-800 mt-16 pt-10">
          <div className="flex justify-between items-center">
            <p className="text-stone-400 text-base">© 2024 Nordic Collection. Alla rättigheter förbehålls. | 18+ endast</p>
            <Link 
              href="/admin/login" 
              className="w-8 h-8 bg-stone-800/30 rounded-lg flex items-center justify-center text-stone-500 hover:text-stone-300 hover:bg-stone-700/50 transition-all duration-300"
              title="Admin Access"
            >
              •
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
