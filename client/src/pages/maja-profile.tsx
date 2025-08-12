import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Heart, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MajaProfile() {
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
          <div className="text-8xl mb-4">🎨</div>
          <h1 className="font-cormorant font-bold text-5xl">Maja</h1>
          <p className="font-dm-sans text-xl mt-2 opacity-90">27 år • Lund</p>
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
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">170 cm</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Weight className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Vikt</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">60 kg</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Heart className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">BH-storlek</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">75C</div>
          </div>
          <div className="text-center group">
            <div className="w-24 h-24 gradient-midnight-cyan rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-all duration-500">
              <Shirt className="h-12 w-12 text-white" />
            </div>
            <div className="font-dm-sans text-sm text-[#4A5568] mb-2">Trosstorlek</div>
            <div className="font-cormorant font-bold text-lg text-[#064F8C]">M</div>
          </div>
        </div>

        {/* Collection Link */}
        <div className="text-center mb-8">
          <Link href="/womens">
            <Button
              size="lg"
              className="gold-button font-medium px-16 py-8 text-2xl rounded-3xl shadow-lg"
            >
              Se Majas Använda Trosor
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <Card className="bg-white shadow-lg border-none p-8 mb-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-6">Om Maja</h1>
          <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Aktiv sedan 2 år</h2>
          <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed">
            Maja är en kreativ konstnär som älskar att uttrycka sig genom kroppen. Hon kombinerar 
            konst med passion på unika sätt. Från Lund kommer denna konstnärliga kvinna som har 
            varit aktiv på plattformen i två år. Maja är känd för sina kreativa uttryck och 
            förmåga att förvandla vardagliga ögonblick till konst. Hon älskar body painting, 
            fotografering och att skapa estetiska upplevelser.
          </p>
        </Card>

        {/* Secrets Section */}
        <Card className="bg-white shadow-lg border-none p-8">
          <h1 className="font-cormorant font-bold text-4xl text-[#064F8C] mb-8">Majas Secrets</h1>
          
          <div className="space-y-8">
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Konstnärlig Vision</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Majas kreativa ögon ser konst överallt. Hennes kläder blir till konstverken som 
                bär hennes unika konstnärliga vision och kreativa energi.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Body Art Specialist</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Som expert på body painting använder Maja sin kropp som duk. Denna kreativa 
                process genomsyrar även hennes intima kläder med en speciell artistisk aura.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Estetisk Känsla</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Majas ögon för det vackra genomsyrar allt hon gör. Varje plagg hon bär blir till 
                en del av hennes estetiska värld och bär hennes passion för skönhet.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}