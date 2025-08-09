import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Eye, MapPin } from "lucide-react";

export default function ModelsPage() {
  // Sample model data - would come from database in real app
  const models = [
    {
      id: 1,
      name: "ASTRID NORDSTRÖM",
      age: 24,
      location: "GÖTEBORG / SWEDEN",
      followers: "12.4K",
      stats: {
        years: "2 YEARS OLD",
        ethnicity: "SWEDISH / NORDIC", 
        height: "5'7\"FT"
      },
      mainImage: "/api/placeholder/400/600",
      galleryImages: Array(20).fill("/api/placeholder/150/150"),
      about: "Astrid är en äkta svensk skönhet med naturligt blont hår och strålande blå ögon. Hon älskar att utforska sin sexualitet genom intima klädesplagg och har varit med oss i över två år. Astrid är känd för sin naturliga charm och ärlighet, vilket gör henne till en av våra mest populära modeller. Hon älskar att dela personliga moments och skapa äkta kontakt med sina följare.",
      secrets: [
        {
          title: "NATURLIG SKÖNHET",
          text: "Jag är inte blyg för att visa min naturliga kropp. Jag älskar att vara bekväm i min egen hud och det märks i varje bild jag tar. Mina intima plagg väljer jag noggrant för att framhäva det bästa av mig."
        },
        {
          title: "ÄKTA SVENSK TJEJ",
          text: "Jag är född och uppvuxen i Göteborg och har den äkta svenska charmen. I mina 24 år har jag lärt mig att uppskatta min kropp och älskar att dela denna glädje med andra genom mina intima kollektioner."
        },
        {
          title: "PERSONLIG KONTAKT",
          text: "Det jag älskar mest är att skapa äkta kontakt. Varje plagg jag säljer kommer med en personlig touch och jag älskar att höra från mina kunder om deras upplevelser."
        }
      ]
    }
  ];

  const currentModel = models[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFBEA] via-white to-[#F8F4E6]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#064F8C] to-[#0A5BA8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">VÅRA MODELLER</h1>
          <p className="text-xl opacity-90">Träffa de vackra kvinnorna bakom våra exklusiva kollektioner</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Model Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main Image */}
          <div className="lg:col-span-1">
            <div className="relative bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl overflow-hidden aspect-[3/4]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Eye className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-white text-lg">Exklusiv modellbild</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
              {currentModel.galleryImages.map((_, index) => (
                <div 
                  key={index}
                  className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Model Info */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-[#064F8C] mb-4">{currentModel.name}</h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-[#064F8C]">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                {currentModel.stats.years}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{currentModel.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                {currentModel.stats.height}
              </Badge>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button className="bg-[#064F8C] hover:bg-[#053F6F] text-white px-8 py-3 rounded-full">
              KÖPTE ASTRIDS TROSOR
            </Button>
            <Button variant="outline" className="border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-white px-8 py-3 rounded-full">
              SKICKA PRIVAT MEDDELANDE
            </Button>
          </div>

          <div className="flex justify-center items-center gap-2 text-[#064F8C]">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-bold">{currentModel.followers} FÖLJARE</span>
          </div>
        </div>

        {/* About Section */}
        <Card className="mb-12 bg-white/80 backdrop-blur-sm border-[#064F8C]/20">
          <CardContent className="p-8">
            <h3 className="text-3xl font-bold text-center text-[#064F8C] mb-6">OM ASTRID</h3>
            <div className="flex justify-center gap-8 mb-6 text-sm text-[#064F8C]">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                  TROSFÖRSÄLJNING SEDAN 2023
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                  500+ NÖJDA KUNDER
                </Badge>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
              {currentModel.about}
            </p>
          </CardContent>
        </Card>

        {/* Secrets Section */}
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-center text-[#064F8C] mb-8">ASTRIDS HEMLIGHETER</h3>
          <p className="text-center text-gray-600 mb-8">
            Roliga fakta som vår modell vill dela med sig av
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentModel.secrets.map((secret, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-[#064F8C]/20 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="font-bold text-[#064F8C] mb-3 text-center">{secret.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{secret.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Models Preview */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-[#064F8C] mb-8">FLER MODELLER</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["EMMA LINDQVIST", "SARA ANDERSSON", "NINA KARLSSON", "MAJA BLOMBERG"].map((name, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-[#064F8C]/20 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Heart className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-[#064F8C] text-sm">{name}</h4>
                  <p className="text-xs text-gray-600">Tillgänglig snart</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}