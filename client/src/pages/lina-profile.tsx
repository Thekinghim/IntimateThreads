import { Link } from "wouter";
import { ArrowLeft, Star, Heart, MapPin, Clock, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default function LinaProfile() {
  const model = {
    id: 'lina',
    name: 'Lina',
    age: 22,
    location: 'Malmö',
    bio: 'Ung och nyfiken tjej som älskar att lära sig nya saker. Jag är öppen för att utforska olika fantasier tillsammans.',
    interests: ['Rollspel', 'Cosplay', 'Experimenterande', 'Submission'],
    specialty: 'Rollspel & fantasier',
    personality: 'Nyfiken, lekfull, öppen',
    experience: '1 år',
    avatar: '🌸',
    rating: 4.7,
    reviews: 89,
    verified: true,
    premium: false,
    tags: ['Nyfiken', 'Rollspel', 'Ung']
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/models">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Tillbaka till Modeller
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Profile Card */}
        <Card className="bg-white shadow-xl border-none overflow-hidden mb-8">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="text-6xl">{model.avatar}</div>
                <div>
                  <h1 className="font-cormorant font-bold text-4xl mb-2">{model.name}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span className="font-dm-sans">{model.age} år • {model.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-dm-sans">{model.experience} erfarenhet</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                {model.verified && (
                  <Badge className="bg-green-500 text-white border-none mb-2">
                    <Shield className="w-3 h-3 mr-1" />
                    Verifierad
                  </Badge>
                )}
                {model.premium && (
                  <Badge className="bg-yellow-500 text-white border-none">
                    <Star className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mt-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(model.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-dm-sans text-lg text-white/90">{model.rating}</span>
              <span className="font-dm-sans text-white/70">({model.reviews} recensioner)</span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            {/* Bio */}
            <div className="mb-8">
              <h2 className="font-cormorant font-bold text-2xl text-[#064F8C] mb-4">Om mig</h2>
              <p className="font-dm-sans text-[#4A5568] text-lg leading-relaxed">{model.bio}</p>
            </div>

            {/* Specialty & Personality */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-3">Specialitet</h3>
                <p className="font-dm-sans text-[#4A5568]">{model.specialty}</p>
              </div>
              <div>
                <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-3">Personlighet</h3>
                <p className="font-dm-sans text-[#4A5568]">{model.personality}</p>
              </div>
            </div>

            {/* Interests */}
            <div className="mb-8">
              <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-4">Intressen</h3>
              <div className="flex flex-wrap gap-2">
                {model.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#F5F1E8] text-[#064F8C] border border-[#064F8C]/20">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/models/lina-karlsson">
                <Button className="w-full bg-gradient-to-r from-[#064F8C] to-[#111B3E] hover:from-[#053d6b] hover:to-[#0d1426] text-white font-dm-sans">
                  <Heart className="w-4 h-4 mr-2" />
                  Se Linas Kollektion
                </Button>
              </Link>
              <Button variant="outline" className="w-full border-[#064F8C] text-[#064F8C] hover:bg-[#064F8C] hover:text-white">
                <Users className="w-4 h-4 mr-2" />
                Kontakta Lina
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats Card */}
        <Card className="bg-white shadow-lg border-none p-6">
          <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-4">Statistik</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-cormorant font-bold text-2xl text-[#064F8C]">{model.reviews}</div>
              <div className="font-dm-sans text-sm text-[#4A5568]">Recensioner</div>
            </div>
            <div>
              <div className="font-cormorant font-bold text-2xl text-[#064F8C]">{model.rating}</div>
              <div className="font-dm-sans text-sm text-[#4A5568]">Betyg</div>
            </div>
            <div>
              <div className="font-cormorant font-bold text-2xl text-[#064F8C]">{model.experience}</div>
              <div className="font-dm-sans text-sm text-[#4A5568]">Erfarenhet</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}