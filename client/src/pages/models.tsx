import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Coffee } from 'lucide-react';
import { Link } from 'wouter';
import PrivacyBanner from '@/components/privacy-banner';

interface Model {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  specialty: string;
  personality: string;
  experience: string;
  avatar: string;
  rating: number;
  reviews: number;
  verified: boolean;
  premium: boolean;
  tags: string[];
}

// Mapping from model IDs to URL slugs for navigation
const modelUrlSlugs: Record<string, string> = {
  emma: 'emma-lindqvist',
  sofia: 'sofia-andersson',
  lina: 'lina-karlsson',
  anna: 'anna-nilsson',
  maja: 'maja-eriksson'
};

const models: Model[] = [
  {
    id: 'emma',
    name: 'Emma',
    age: 24,
    location: 'Stockholm',
    bio: 'Spontan och lekfull tjej som älskar att utforska nya upplevelser. Jag trivs med att vara naturlig och äkta i allt jag gör.',
    interests: ['Naturlig intimitet', 'Rollspel', 'Romantik', 'Massage'],
    specialty: 'Äkta upplevelser & intimitet',
    personality: 'Spontan, varm, äkta',
    experience: '3 år',
    avatar: '👱‍♀️',
    rating: 4.9,
    reviews: 127,
    verified: true,
    premium: true,
    tags: ['Naturlig', 'Romantisk', 'Lekfull']
  },
  {
    id: 'sofia',
    name: 'Sofia',
    age: 29,
    location: 'Göteborg',
    bio: 'Erfaren och självsäker kvinna som vet vad hon vill. Jag älskar att ta kontroll och skapa intensiva upplevelser.',
    interests: ['Dominans', 'BDSM', 'Fetisch', 'Rollspel'],
    specialty: 'Dominans & kontroll',
    personality: 'Självsäker, intensiv, erfaren',
    experience: '6 år',
    avatar: '🖤',
    rating: 4.8,
    reviews: 203,
    verified: true,
    premium: true,
    tags: ['Dominant', 'Erfaren', 'Intensiv']
  },
  {
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
  },
  {
    id: 'anna',
    name: 'Anna',
    age: 35,
    location: 'Uppsala',
    bio: 'Mogen kvinna med mycket erfarenhet och förståelse. Jag älskar djupa samtal och sinnliga upplevelser.',
    interests: ['Tantrasex', 'Sinnlighet', 'Djupa samtal', 'Massage'],
    specialty: 'Tantra & sinnlighet',
    personality: 'Mogen, förståelsefull, sinnlig',
    experience: '8 år',
    avatar: '🌹',
    rating: 4.9,
    reviews: 156,
    verified: true,
    premium: true,
    tags: ['Mogen', 'Tantrik', 'Sinnlig']
  },
  {
    id: 'maja',
    name: 'Maja',
    age: 27,
    location: 'Lund',
    bio: 'Kreativ konstnär som älskar att uttrycka sig genom kroppen. Jag kombinerar konst med passion på unika sätt.',
    interests: ['Body painting', 'Fotografering', 'Kreativitet', 'Estetik'],
    specialty: 'Konstnärliga upplevelser',
    personality: 'Kreativ, artistisk, passionerad',
    experience: '4 år',
    avatar: '🎨',
    rating: 4.8,
    reviews: 134,
    verified: true,
    premium: true,
    tags: ['Kreativ', 'Artistisk', 'Unik']
  }
];

export default function ModelsPage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <PrivacyBanner />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cormorant font-bold text-5xl md:text-6xl mb-4">
            Våra Modeller
          </h1>
          <p className="text-xl font-dm-sans text-white/90 max-w-2xl mx-auto">
            Möt våra verifierade och erfarna modeller som erbjuder unika och personliga upplevelser
          </p>
        </div>
      </div>

      {/* Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {models.map((model) => (
            <Card key={model.id} className="bg-white shadow-xl border-none overflow-hidden hover:shadow-2xl transition-all duration-300">
              {/* Model Header */}
              <div className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-4xl">{model.avatar}</div>
                    <div>
                      <h3 className="font-cormorant font-bold text-2xl">{model.name}</h3>
                      <p className="font-dm-sans text-white/80">{model.age} år • {model.location}</p>
                    </div>
                  </div>
                  {model.verified && (
                    <Badge className="bg-green-500 text-white border-none">
                      <Star className="w-3 h-3 mr-1" />
                      Verifierad
                    </Badge>
                  )}
                </div>
                
                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(model.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-dm-sans text-sm text-white/90">{model.rating} ({model.reviews} recensioner)</span>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Bio */}
                <p className="font-dm-sans text-gray-700 text-sm mb-4 leading-relaxed">
                  {model.bio}
                </p>

                {/* Specialty */}
                <div className="mb-4">
                  <h4 className="font-lora font-semibold text-[#064F8C] mb-2">Specialitet</h4>
                  <Badge variant="outline" className="border-[#064F8C] text-[#064F8C]">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {model.specialty}
                  </Badge>
                </div>

                {/* Interests */}
                <div className="mb-4">
                  <h4 className="font-lora font-semibold text-[#064F8C] mb-2">Intressen</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-[#F5F1E8] text-[#064F8C]">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {model.tags.map((tag, index) => (
                      <Badge key={index} className="bg-[#064F8C]/10 text-[#064F8C] border-none text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-dm-sans text-sm text-gray-600">Erfarenhet:</span>
                    <span className="font-dm-sans text-sm font-medium text-[#064F8C]">{model.experience}</span>
                  </div>
                </div>

                {/* Action Button */}
                <div>
                  <Link href={`/models/${modelUrlSlugs[model.id]}`}>
                    <Button className="w-full bg-gradient-to-r from-[#064F8C] to-[#111B3E] hover:from-[#053d6b] hover:to-[#0d1426] text-white font-dm-sans">
                      Se profil & produkter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <h2 className="font-cormorant font-bold text-3xl text-[#064F8C] mb-4">
              Varför välja våra verifierade modeller?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="bg-[#064F8C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-2">Verifierade profiler</h3>
                <p className="font-dm-sans text-gray-600">Alla våra modeller är ID-verifierade och autentiska</p>
              </div>
              <div className="text-center">
                <div className="bg-[#064F8C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-2">Unika upplevelser</h3>
                <p className="font-dm-sans text-gray-600">Personliga och skräddarsydda upplevelser för alla preferenser</p>
              </div>
              <div className="text-center">
                <div className="bg-[#064F8C]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-[#064F8C]" />
                </div>
                <h3 className="font-lora font-semibold text-xl text-[#064F8C] mb-2">Diskret & säkert</h3>
                <p className="font-dm-sans text-gray-600">100% diskret hantering med säker betalning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}