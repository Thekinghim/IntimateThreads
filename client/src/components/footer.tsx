import { Link } from "wouter";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-poppins font-semibold text-2xl mb-4">Diskreta Kollektion</h4>
            <p className="text-gray-300 mb-6 max-w-md">
              Exklusiva, personliga plagg från nordiska kvinnor. Vi värnar om diskretion, kvalitet och integritet i varje transaktion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-powder-pink transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-powder-pink transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="font-poppins font-medium text-lg mb-4">Information</h5>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/how-it-works" className="hover:text-powder-pink transition-colors duration-200">Om oss</Link></li>
              <li><Link href="/how-it-works" className="hover:text-powder-pink transition-colors duration-200">Så funkar det</Link></li>
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Vanliga frågor</a></li>
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Kontakt</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-poppins font-medium text-lg mb-4">Villkor</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Integritetspolicy</a></li>
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Användarvillkor</a></li>
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Returpolicy</a></li>
              <li><a href="#" className="hover:text-powder-pink transition-colors duration-200">Säkerhet</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">© 2024 Diskreta Kollektion. Alla rättigheter förbehålls. | 18+ endast</p>
        </div>
      </div>
    </footer>
  );
}
