import { Button } from '@/components/ui/button';

export default function Newsletter() {
  return (
    <section className="py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#064F8C]/10 backdrop-blur-lg rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 border border-[#064F8C]/20 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center lg:text-left flex-1">
            <h3 className="font-cormorant font-bold text-lg sm:text-xl md:text-2xl text-[#064F8C] mb-2">
              Gå med i vår trosklubb för att få de senaste nyheterna
            </h3>
            <p className="font-dm-sans text-[#4A5568] text-xs sm:text-sm md:text-base">
              Bli först att veta om nya modeller och exklusiva erbjudanden
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-fit">
            <input
              type="email"
              placeholder="Din e-postadress..."
              className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-[#064F8C]/20 bg-white backdrop-blur-sm text-[#2D3748] placeholder-[#4A5568] focus:ring-2 focus:ring-[#064F8C]/50 focus:outline-none font-dm-sans text-xs sm:text-sm w-full sm:w-64"
            />
            <Button className="gold-button font-medium px-4 sm:px-6 py-2 sm:py-3 rounded-lg whitespace-nowrap text-xs sm:text-sm shadow-lg w-full sm:w-auto">
              Gå med nu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}