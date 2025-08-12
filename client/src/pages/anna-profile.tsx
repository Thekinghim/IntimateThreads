import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Circle, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AnnaProfile() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <Link href="/models">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tillbaka till Modeller
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-96 bg-gradient-to-r from-[#064F8C] to-[#111B3E] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-8xl mb-4">🌹</div>
          <h1 className="font-cormorant font-bold text-5xl">Anna</h1>
          <p className="font-dm-sans text-xl mt-2 opacity-90">35 år • Uppsala</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Model Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <MapPin className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Ursprung</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">Sverige</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Ruler className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Längd</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">175 cm</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Weight className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Vikt</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">65 kg</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <div className="relative">
                <Circle className="h-8 w-8 text-white fill-white" />
                <Circle className="h-8 w-8 text-white fill-white absolute top-0 left-4" />
              </div>
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">BH-storlek</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">85D</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <div className="relative">
                <Minus className="h-12 w-2 text-white rotate-12" />
                <Minus className="h-12 w-2 text-white -rotate-12 absolute top-0 left-2" />
              </div>
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Trosstorlek</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">L</div>
          </div>
        </div>

        {/* Collection Link */}
        <div className="text-center mb-8">
          <Link href="/womens">
            <Button
              size="lg"
              className="gold-button font-medium px-16 py-8 text-2xl rounded-3xl shadow-lg"
            >
              Se Annas Använda Trosor
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <Card className="bg-white shadow-lg border-none p-8 mb-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Om Anna</h1>
          <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Aktiv sedan 1 år</h2>
          <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed">
            Anna är en mogen kvinna med mycket erfarenhet och förståelse. Hon älskar djupa 
            samtal och sinnliga upplevelser. Från Uppsala kommer denna visa kvinna som har 
            varit aktiv på plattformen i ett år. Anna är känd för sin mogna approach och 
            förmåga att skapa djupa, meningsfulla kopplingar. Hon älskar tantrasex, sinnlighet 
            och djupa samtal med sina kunder.
          </p>
        </Card>

        {/* Secrets Section */}
        <Card className="bg-white shadow-lg border-none p-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-8">Annas Secrets</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Tantramästare</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Annas djupa kunskap inom tantra genomsyrar hennes hela sätt att leva. Hennes 
                kläder bär denna spirituella energi och ger köparen en känsla av hennes visdom.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Meditationsritualer</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Varje morgon börjar Anna med en timmes meditation och energiarbete. Detta ger 
                hennes kropp och kläder en speciell aura som hennes kunder känner igen.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Mogen Elegans</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
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