import { Link } from "wouter";
import { ArrowLeft, MapPin, Ruler, Weight, Shirt, ArrowDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import cj1 from "@assets/cj_1755031566269.jpg";
import cj2 from "@assets/cj2_1755031566270.webp";
import cj3 from "@assets/cj3_1755031566270.webp";
import cj4 from "@assets/cj4_1755031566271.jpg";
import cj5 from "@assets/cj5_1755031566271.webp";
import emmaHero from "@assets/cj5_1755031566271.webp";

export default function EmmaProfile() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const galleryImages = [
    { src: cj1, alt: "Emma Gallery 1" },
    { src: cj2, alt: "Emma Gallery 2" },
    { src: cj3, alt: "Emma Gallery 3" },
    { src: cj4, alt: "Emma Gallery 4" },
    { src: cj5, alt: "Emma Gallery 5" }
  ];

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
      <div 
        className="relative h-96 bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${emmaHero})`,
          backgroundPosition: 'center 65%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
      </div>

      {/* Action Buttons */}
      <div className="relative flex justify-start ml-8 -mt-8 mb-4 z-10 gap-4">
        <Button
          onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          className="gold-button font-medium px-8 py-4 text-lg rounded-3xl shadow-lg"
        >
          Emmas Galleri
        </Button>
        <Link href="/womens">
          <Button
            className="gold-button font-medium px-8 py-4 text-lg rounded-3xl shadow-lg"
          >
            Se Emmas Använda Trosor
          </Button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Model Name and Info */}
        <div className="text-center mb-12">
          <h1 className="font-cormorant font-bold text-6xl gold-text-static mb-4">Emma</h1>
          <p className="font-dm-sans text-xl text-[#4A5568]">24 år • Stockholm</p>
        </div>

        {/* Model Stats */}
        <div className="flex justify-center items-center gap-12 mb-8 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-midnight-cyan rounded-full flex items-center justify-center shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="font-dm-sans text-sm text-[#4A5568] mb-1">Ursprung</div>
              <div className="font-cormorant font-bold text-lg text-[#064F8C]">Sverige</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-midnight-cyan rounded-full flex items-center justify-center shadow-lg">
              <Ruler className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="font-dm-sans text-sm text-[#4A5568] mb-1">Längd</div>
              <div className="font-cormorant font-bold text-lg text-[#064F8C]">168 cm</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-midnight-cyan rounded-full flex items-center justify-center shadow-lg">
              <Weight className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="font-dm-sans text-sm text-[#4A5568] mb-1">Vikt</div>
              <div className="font-cormorant font-bold text-lg text-[#064F8C]">58 kg</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 gradient-midnight-cyan rounded-full flex items-center justify-center shadow-lg">
              <Shirt className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="font-dm-sans text-sm text-[#4A5568] mb-1">Storlek</div>
              <div className="font-cormorant font-bold text-lg text-[#064F8C]">S</div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="p-8 mb-8">
          <h1 className="font-cormorant font-bold text-5xl text-[#064F8C] mb-8 text-center">Om Emma</h1>
          <div className="text-center">
            <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-4">Aktiv sedan 2 år</h2>
            <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed max-w-3xl mx-auto">
              Emma är en spontan och lekfull tjej som älskar att utforska nya upplevelser. 
              Hon trivs med att vara naturlig och äkta i allt hon gör. Emma kommer från Stockholm 
              och har varit aktiv på plattformen i två år. Hon är känd för sin varma personlighet 
              och sina äkta upplevelser som hon delar med sina kunder. Emma älskar intimitet, 
              rollspel och romantiska stunder.
            </p>
          </div>
        </div>

        {/* Secrets Section */}
        <div className="p-8">
          <h1 className="font-cormorant font-bold text-5xl text-[#064F8C] mb-8 text-center">Emmas Secrets</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Naturlig Skönhet</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Emma tror på naturlig skönhet och använder aldrig konstgjorda dofter eller parfymer. 
                Hennes naturliga arom är något helt unikt som hennes kunder uppskattar mest av allt.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Hemliga Ritualer</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                Varje morgon börjar Emma dagen med yoga och meditation. Detta ger henne den inre 
                balans och energi som hon för över till sina intima plagg.
              </p>
            </div>
            
            <div>
              <h2 className="font-lora font-semibold text-2xl text-[#064F8C] mb-3">Favoritaktiviteter</h2>
              <p className="font-dm-sans text-[#4A5568] leading-relaxed">
                När Emma inte arbetar älskar hon att vara ute i naturen, läsa romantiska böcker 
                och njuta av långa varma bad med väldoftande oljor.
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div id="gallery" className="p-8 mt-8">
          <h1 className="font-cormorant font-bold text-5xl text-[#064F8C] mb-8 text-center">Emmas Galleri</h1>
          
          <div className="grid grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg cursor-pointer">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onClick={() => setSelectedImage(image.src)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
              >
                <X className="h-6 w-6 text-gray-800" />
              </button>
              <img 
                src={selectedImage} 
                alt="Förstorad bild" 
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}