import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Circle, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnnaProfile() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/models">
              <Button variant="outline" size="sm" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Tillbaka till Modeller</span>
                <span className="sm:hidden">Tillbaka</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-[#064F8C] to-[#111B3E] flex items-center justify-center">
        <div className="text-center text-white px-4">
          <div className="text-4xl sm:text-6xl md:text-8xl mb-2 sm:mb-4">🌹</div>
          <h1 className="font-cormorant font-bold text-3xl sm:text-4xl md:text-5xl">Anna</h1>
          <p className="font-dm-sans text-base sm:text-lg md:text-xl mt-1 sm:mt-2 opacity-90">35 år • Uppsala</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        {/* Model Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
            </div>
            <div className="font-dm-sans text-xs sm:text-sm text-[#4A5568] mb-1 sm:mb-2">Ursprung</div>
            <div className="font-cormorant font-bold text-sm sm:text-base md:text-lg text-[#064F8C]">Sverige</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Ruler className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
            </div>
            <div className="font-dm-sans text-xs sm:text-sm text-[#4A5568] mb-1 sm:mb-2">Längd</div>
            <div className="font-cormorant font-bold text-sm sm:text-base md:text-lg text-[#064F8C]">175 cm</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Weight className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-white" />
            </div>
            <div className="font-dm-sans text-xs sm:text-sm text-[#4A5568] mb-1 sm:mb-2">Vikt</div>
            <div className="font-cormorant font-bold text-sm sm:text-base md:text-lg text-[#064F8C]">65 kg</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
              <div className="relative">
                <Circle className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white fill-white" />
                <Circle className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white fill-white absolute top-0 left-2 sm:left-3 md:left-4" />
              </div>
            </div>
            <div className="font-dm-sans text-xs sm:text-sm text-[#4A5568] mb-1 sm:mb-2">BH-storlek</div>
            <div className="font-cormorant font-bold text-sm sm:text-base md:text-lg text-[#064F8C]">85D</div>
          </div>
          <div className="text-center group">
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 shadow-lg group-hover:scale-110 transition-all duration-500">
              <div className="relative">
                <Minus className="h-6 w-1 sm:h-8 sm:w-1 md:h-10 md:w-2 text-white rotate-12" />
                <Minus className="h-6 w-1 sm:h-8 sm:w-1 md:h-10 md:w-2 text-white -rotate-12 absolute top-0 left-1 sm:left-1 md:left-2" />
              </div>
            </div>
            <div className="font-dm-sans text-xs sm:text-sm text-[#4A5568] mb-1 sm:mb-2">Trosstorlek</div>
            <div className="font-cormorant font-bold text-sm sm:text-base md:text-lg text-[#064F8C]">L</div>
          </div>
        </div>

        {/* Collection Link */}
        <div className="text-center mb-6 sm:mb-8">
          <Link href="/womens">
            <Button
              size="lg"
              className="gold-button font-medium px-6 sm:px-12 md:px-16 py-3 sm:py-6 md:py-8 text-base sm:text-xl md:text-2xl rounded-2xl sm:rounded-3xl shadow-lg w-full sm:w-auto"
            >
              Se Annas Använda Trosor
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <Card className="bg-white shadow-lg border-none p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h1 className="font-cormorant font-bold text-2xl sm:text-3xl md:text-4xl text-[#064F8C] mb-4 sm:mb-6">Om Anna</h1>
          <h2 className="font-lora font-semibold text-lg sm:text-xl md:text-2xl text-[#064F8C] mb-3 sm:mb-4">Aktiv sedan 1 år</h2>
          <p className="font-dm-sans text-[#4A5568] text-sm sm:text-base md:text-lg leading-relaxed">
            Anna är en mogen kvinna med mycket erfarenhet och förståelse. Hon älskar djupa 
            samtal och sinnliga upplevelser. Från Uppsala kommer denna visa kvinna som har 
            varit aktiv på plattformen i ett år. Anna är känd för sin mogna approach och 
            förmåga att skapa djupa, meningsfulla kopplingar. Hon älskar tantrasex, sinnlighet 
            och djupa samtal med sina kunder.
          </p>
        </Card>

        {/* Secrets Section */}
        <Card className="bg-white shadow-lg border-none p-4 sm:p-6 md:p-8">
          <h1 className="font-cormorant font-bold text-2xl sm:text-3xl md:text-4xl text-[#064F8C] mb-6 sm:mb-8">Annas Secrets</h1>
          
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="font-lora font-semibold text-lg sm:text-xl md:text-2xl text-[#064F8C] mb-2 sm:mb-3">Tantramästare</h2>
              <p className="font-dm-sans text-[#4A5568] text-sm sm:text-base leading-relaxed">
                Annas djupa kunskap inom tantra genomsyrar hennes hela sätt att leva. Hennes 
                kläder bär denna spirituella energi och ger köparen en känsla av hennes visdom.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-lg sm:text-xl md:text-2xl text-[#064F8C] mb-2 sm:mb-3">Meditationsritualer</h2>
              <p className="font-dm-sans text-[#4A5568] text-sm sm:text-base leading-relaxed">
                Varje morgon börjar Anna med en timmes meditation och energiarbete. Detta ger 
                hennes kropp och kläder en speciell aura som hennes kunder känner igen.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-lg sm:text-xl md:text-2xl text-[#064F8C] mb-2 sm:mb-3">Mogen Elegans</h2>
              <p className="font-dm-sans text-[#4A5568] text-sm sm:text-base leading-relaxed">
                Med sin mogna ålder kommer en naturlig elegans och självsäkerhet. Anna vet 
                vad hon vill och denna kraft genomsyrar allt hon gör och bär.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}