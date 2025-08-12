import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Heart, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SofiaProfile() {
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
          <div className="text-8xl mb-4">🖤</div>
          <h1 className="font-cormorant font-bold text-5xl">Sofia</h1>
          <p className="font-dm-sans text-xl mt-2 opacity-90">29 år • Göteborg</p>
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
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">172 cm</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Weight className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Vikt</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">62 kg</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">BH-storlek</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">80C</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#064F8C] to-[#111B3E] rounded-full flex items-center justify-center">
                <Shirt className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-dm-sans text-sm text-[#4A5568]">Trosstorlek</div>
                <div className="font-cormorant font-bold text-lg text-[#064F8C]">M</div>
              </div>
            </div>
          </div>

          {/* Collection Link */}
          <div className="mt-8 text-center">
            <Link href="/womens">
              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8960F] hover:from-[#B8960F] hover:to-[#9A7A0A] text-white font-dm-sans px-8 py-3 text-lg">
                Se Sofias Använda Trosor
              </Button>
            </Link>
          </div>
        </Card>

        {/* About Section */}
        <Card className="bg-white shadow-lg border-none p-8 mb-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Om Sofia</h1>
          <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Aktiv sedan 1 år</h2>
          <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed">
            Sofia är en erfaren och självsäker kvinna som vet vad hon vill. Hon älskar att ta 
            kontroll och skapa intensiva upplevelser. Från Göteborg kommer denna mäktiga kvinna 
            som har varit aktiv på plattformen i ett år. Sofia är känd för sin dominanta natur 
            och förmåga att skapa extraordinära upplevelser för sina kunder. Hon älskar dominans, 
            BDSM och rollspel.
          </p>
        </Card>

        {/* Secrets Section */}
        <Card className="bg-white shadow-lg border-none p-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-8">Sofias Secrets</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Dominant Aura</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Sofias naturliga dominans genomsyrar allt hon gör. Hennes kläder bär hennes 
                kraftfulla energi och ger den som köper dem en känsla av hennes starka personlighet.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Hemliga Träningsrutiner</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Sofia tränar intensivt varje dag, vilket ger hennes kropp den perfekta balansen 
                av styrka och femininet som hennes kunder så älskar.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Lyx och Elegans</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                På sin fritid njuter Sofia av finare saker i livet - exklusiva spa-behandlingar, 
                lyxiga restauranger och privata shopping-sessioner på de bästa butikerna.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}