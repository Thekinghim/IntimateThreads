import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Heart, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function LinaProfile() {
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
          <div className="text-8xl mb-4">🌸</div>
          <h1 className="font-cormorant font-bold text-5xl">Lina</h1>
          <p className="font-dm-sans text-xl mt-2 opacity-90">22 år • Malmö</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Model Stats */}
        <Card className="bg-white shadow-lg border-none p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Ursprung</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">Sverige</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Ruler className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Längd</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">165 cm</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Vikt</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">54 kg</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">BH-storlek</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">70A</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Trosstorlek</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">XS</div>
              </div>
            </div>
          </div>

          {/* Collection Link */}
          <div className="mt-8 text-center">
            <Link href="/womens">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8960F] hover:from-[#B8960F] hover:to-[#9A7A0A] text-white font-dm-sans px-8 py-3 text-lg">
                Se Linas Använda Trosor
              </Button>
            </Link>
          </div>
        </Card>

        {/* About Section */}
        <Card className="bg-white shadow-lg border-none p-8 mb-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Om Lina</h1>
          <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Aktiv sedan 2 år</h2>
          <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed">
            Lina är en ung och nyfiken tjej som älskar att lära sig nya saker. Hon är öppen 
            för att utforska olika fantasier tillsammans med sina kunder. Från Malmö kommer 
            denna lekfulla kvinna som har varit aktiv på plattformen i två år. Lina är känd 
            för sin nyfikenhet och öppenhet för nya upplevelser. Hon älskar rollspel, cosplay 
            och att experimentera med olika saker.
          </p>
        </Card>

        {/* Secrets Section */}
        <Card className="bg-white shadow-lg border-none p-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-8">Linas Secrets</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Lekfull Fantasi</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Linas rika fantasi lyser igenom i allt hon gör. Hennes kläder bär hennes 
                kreativa energi och ger köparen en känsla av hennes lekfulla natur.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Cosplay-passion</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Lina älskar att klä ut sig och rolla olika karaktärer. Hennes cosplay-outfits 
                har en speciell charm som gör varje plagg till något unikt och efterlängtat.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Ungdomlig Energi</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Med sin unga ålder kommer en naturlig energi och entusiasm som genomsyrar 
                allt Lina gör. Hennes livsglädje och nyfikenhet gör varje upplevelse speciell.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}