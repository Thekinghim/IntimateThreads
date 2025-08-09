import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, Eye, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function ModelsPage() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  // Sample model data - would come from database in real app
  const models = [
    {
      id: 1,
      name: "ASTRID NORDSTRÖM",
      age: 24,
      location: "GÖTEBORG / SWEDEN",
      followers: "12.4K",
      shortDescription: "Naturlig svensk skönhet som älskar att utforska sin sexualitet genom intima plagg",
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
    },
    {
      id: 2,
      name: "EMMA LINDQVIST",
      age: 22,
      location: "STOCKHOLM / SWEDEN",
      followers: "8.7K",
      shortDescription: "Petite brunett med vild sida som älskar läderdetaljer och spets",
      stats: {
        years: "1 YEAR OLD",
        ethnicity: "SWEDISH / NORDIC",
        height: "5'4\"FT"
      },
      mainImage: "/api/placeholder/400/600",
      galleryImages: Array(18).fill("/api/placeholder/150/150"),
      about: "Emma är en petite brunett från Stockholm med en mystisk och vild sida. Trots sin unga ålder på 22 år har hon redan utvecklat en stark personlighet och vet precis vad hon vill. Emma specialiserar sig på läderdetaljer kombinerat med mjuk spets - en kontrast som perfekt speglar hennes personlighet. Hon började sälja intima plagg för ett år sedan och har snabbt byggt upp en lojal följarskara.",
      secrets: [
        {
          title: "WILD SIDE",
          text: "Trots att jag ser oskyldig ut har jag en riktigt vild sida. Jag älskar att blanda mjuka spetsdetaljer med tuffa läderaccenter - det representerar verkligen vem jag är."
        },
        {
          title: "STOCKHOLM GIRL",
          text: "Som äkta Stockholmsbruden älskar jag storstadslivet och allt vad det innebär. Mina intima plagg reflekterar den urbana, sofistikerade stilen som Stockholm är känt för."
        },
        {
          title: "KVALITET ÖVER KVANTITET",
          text: "Jag tror på kvalitet framför kvantitet. Varje plagg jag väljer är noggrant utvalt och jag ser till att det verkligen representerar min stil och personlighet innan jag delar det."
        }
      ]
    },
    {
      id: 3,
      name: "SARA ANDERSSON",
      age: 26,
      location: "MALMÖ / SWEDEN",
      followers: "15.2K",
      shortDescription: "Erfaren blondin med kurvig kropp som älskar att visa sina naturliga former",
      stats: {
        years: "3 YEARS OLD",
        ethnicity: "SWEDISH / NORDIC",
        height: "5'6\"FT"
      },
      mainImage: "/api/placeholder/400/600",
      galleryImages: Array(25).fill("/api/placeholder/150/150"),
      about: "Sara är en erfaren 26-årig blondin från Malmö med naturligt kurviga former som hon är stolt över. Med tre års erfarenhet inom branschen har hon utvecklat en stark förståelse för vad hennes följare älskar. Sara är känd för sin öppenhet och ärlighet om sin kropp och sexualitet. Hon älskar att inspirera andra kvinnor att känna sig bekväma med sina kroppar oavsett form eller storlek.",
      secrets: [
        {
          title: "BODY POSITIVE",
          text: "Som kvinna med kurvor älskar jag att visa att skönhet kommer i alla former. Jag vill inspirera andra att känna sig sexiga och bekväma i sin egen hud, precis som jag gör."
        },
        {
          title: "MALMÖ MAMI",
          text: "Malmö har gett mig en internationell känsla - här möts Sverige med kontinenten. Det påverkar min stil som blandar klassisk skandinavisk elegans med mer vågade europeiska influenser."
        },
        {
          title: "EXPERIENCED QUEEN",
          text: "Med tre år i branschen vet jag precis vad som får mina följare att må bra. Jag älskar att dela tips och tricks för hur man känner sig mest självsäker i intima plagg."
        }
      ]
    },
    {
      id: 4,
      name: "NINA KARLSSON",
      age: 20,
      location: "UPPSALA / SWEDEN",
      followers: "6.1K",
      shortDescription: "Ung rödhårig student som kombinerar studier med intim modellering",
      stats: {
        years: "6 MONTHS OLD",
        ethnicity: "SWEDISH / CELTIC",
        height: "5'5\"FT"
      },
      mainImage: "/api/placeholder/400/600",
      galleryImages: Array(12).fill("/api/placeholder/150/150"),
      about: "Nina är vår yngsta modell - en 20-årig rödhårig student från Uppsala med keltiska rötter. Hon kombinerar sina universitetsstudier med intim modellering och har snabbt blivit populär för sin naturliga, flickaktiga charm. Nina representerar den nya generationen av svenska kvinnor som är bekväma med sin sexualitet och inte är rädda för att utforska den. Hennes unika röda hår och bleka hud gör henne till något alldeles speciellt.",
      secrets: [
        {
          title: "STUDENT LIFE",
          text: "Att vara student och modell samtidigt ger mig det bästa av två världar. Jag älskar den intellektuella stimulansen från studierna och den kreativa friheten från modelleringen."
        },
        {
          title: "CELTIC BEAUTY",
          text: "Mitt röda hår och bleka hud kommer från mina keltiska rötter. Jag älskar hur unikt det gör mig i den svenska modellvärlden - det är min speciella touch."
        },
        {
          title: "YOUNG & FREE",
          text: "Som 20-åring är jag i den perfekta åldern för att utforska min sexualitet. Jag är nyfiken, öppen och inte rädd för att prova nya saker - det märks i mina kollektioner."
        }
      ]
    },
    {
      id: 5,
      name: "MAJA BLOMBERG",
      age: 28,
      location: "VÄSTERÅS / SWEDEN",
      followers: "9.8K",
      shortDescription: "Mogen brunett som älskar lyxiga material och klassisk elegans",
      stats: {
        years: "2 YEARS OLD",
        ethnicity: "SWEDISH / NORDIC",
        height: "5'8\"FT"
      },
      mainImage: "/api/placeholder/400/600",
      galleryImages: Array(22).fill("/api/placeholder/150/150"),
      about: "Maja är en sofistikerad 28-årig brunett från Västerås som förkroppsligar mogen elegans. Hon har en bakgrund inom mode och design vilket syns i hennes omsorgsfullt kurerade kollektioner av intima plagg. Maja föredrar lyxiga material som siden och fransk spets, och hennes stil är tidlös snarare än trendig. Hon attraherar kunder som uppskattar kvalitet och raffinement över snabba trender.",
      secrets: [
        {
          title: "LUXURY LOVER",
          text: "Jag har alltid haft en svaghet för lyxiga material. Siden mot huden, fransk spets och handgjorda detaljer - det är vad som får mig att känna mig som en riktig kvinna."
        },
        {
          title: "DESIGN BACKGROUND",
          text: "Min bakgrund inom mode och design hjälper mig att välja plagg som inte bara är vackra utan också tidlösa. Jag tänker på varje detalj - från passform till finish."
        },
        {
          title: "MATURE CONFIDENCE",
          text: "Som 28-åring har jag den självförtroende som bara kommer med ålder. Jag vet vad som ser bra ut på mig och jag är inte rädd för att investera i kvalitet framför kvantitet."
        }
      ]
    }
  ];

  const currentModel = selectedModel ? models.find(m => m.id === selectedModel) : null;

  if (currentModel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FEFBEA] via-white to-[#F8F4E6]">
        {/* Back Button */}
        <div className="bg-gradient-to-r from-[#064F8C] to-[#0A5BA8] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <Button 
              onClick={() => setSelectedModel(null)}
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#064F8C] mb-4"
            >
              ← Tillbaka till alla modeller
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{currentModel.name}</h1>
            <p className="text-xl opacity-90">{currentModel.shortDescription}</p>
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
            <Link href={`/models/${currentModel.name.toLowerCase().replace(/\s+/g, '-').replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')}`}>
              <Button className="gradient-midnight-cyan text-white px-8 py-3 rounded-full hover:opacity-90">
                SE {currentModel.name.split(' ')[0]}S TROSOR
              </Button>
            </Link>
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
            <h3 className="text-3xl font-bold text-center text-[#064F8C] mb-6">OM {currentModel.name.split(' ')[0]}</h3>
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
          <h3 className="text-4xl font-bold text-center text-[#064F8C] mb-8">{currentModel.name.split(' ')[0]}S HEMLIGHETER</h3>
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
            {models.filter(m => m.id !== currentModel.id).map((model) => (
              <Card 
                key={model.id} 
                className="bg-white/80 backdrop-blur-sm border-[#064F8C]/20 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => setSelectedModel(model.id)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Heart className="w-8 h-8 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-[#064F8C] text-sm">{model.name}</h4>
                  <p className="text-xs text-gray-600">{model.age} år, {model.location.split(' / ')[0]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  }

  // Main models list view
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FEFBEA] via-white to-[#F8F4E6]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#064F8C] to-[#0A5BA8] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">VÅRA MODELLER</h1>
          <p className="text-xl opacity-90">Träffa de vackra kvinnorna bakom våra exklusiva kollektioner</p>
          <div className="flex justify-center items-center gap-2 mt-6">
            <Users className="w-5 h-5" />
            <span className="text-lg">{models.length} EXKLUSIVA MODELLER</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <Card 
              key={model.id}
              className="bg-white/80 backdrop-blur-sm border-[#064F8C]/20 hover:shadow-xl transition-all cursor-pointer group overflow-hidden"
              onClick={() => setSelectedModel(model.id)}
            >
              {/* Model Image */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-purple-200 to-pink-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-white text-sm">Klicka för profil</p>
                  </div>
                </div>
                {/* Model Stats Overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-black/50 text-white border-none">
                      {model.age} år
                    </Badge>
                    <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      {model.followers}
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#064F8C] mb-2">{model.name}</h3>
                
                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{model.location}</span>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {model.shortDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] text-xs">
                    {model.stats.height}
                  </Badge>
                  <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] text-xs">
                    {model.stats.years}
                  </Badge>
                </div>

                <Button 
                  className="w-full bg-[#064F8C] hover:bg-[#053F6F] text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedModel(model.id);
                  }}
                >
                  SE PROFIL & TROSOR
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}