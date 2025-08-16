import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Sparkles, Coffee } from 'lucide-react';
import { Link } from 'wouter';
import PrivacyBanner from '@/components/privacy-banner';
import modelsHeroImage from '@/assets/cj4_1755033026450.jpg';
import { useEffect } from 'react';
import SEOHead from '@/components/seo-head';

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
  const modelsStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Våra Modeller - Scandiscent",
    "url": "https://scandiscent.replit.app/models",
    "description": "Möt våra verifierade nordiska modeller som erbjuder exklusiva använda trosor med personliga handskrivna kort.",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": models.length,
      "itemListElement": models.map((model, index) => ({
        "@type": "Person",
        "position": index + 1,
        "name": model.name,
        "description": model.bio,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": model.location,
          "addressCountry": "Sverige"
        },
        "knowsAbout": model.specialty
      }))
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <SEOHead
        title="Våra Modeller - Verifierade Nordiska Kvinnor | Scandiscent"
        description="Möt våra verifierade nordiska modeller från Stockholm, Göteborg, Malmö och Lund. Erfarna kvinnor som erbjuder exklusiva använda trosor med personliga handskrivna kort."
        keywords="nordiska modeller, svenska tjejer, verifierade kvinnor, Stockholm modeller, Göteborg modeller, Malmö modeller, personliga kort"
        canonicalUrl="https://scandiscent.replit.app/models"
        structuredData={modelsStructuredData}
      />
      <PrivacyBanner />
      
      {/* Hero Section */}
      <div 
        className="relative text-white py-20 sm:py-24 md:py-32 lg:py-40 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${modelsHeroImage}')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-cormorant font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 drop-shadow-lg gold-text">
            Våra Modeller
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-dm-sans text-white/95 max-w-2xl mx-auto drop-shadow-md px-4">
            Möt våra verifierade och erfarna modeller som erbjuder unika och personliga upplevelser
          </p>
        </div>
      </div>



      {/* Models Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {models.map((model) => (
            <Card key={model.id} className="bg-white shadow-xl border-none overflow-hidden">
              {/* Model Header */}
              <div className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-cormorant font-bold text-2xl" style={{ color: '#F5D061' }}>{model.name}</h3>
                    <p className="font-dm-sans text-white/80">{model.age} år • {model.location}</p>
                  </div>
                </div>

              </div>

              <CardContent className="p-6">
                {/* Bio */}
                <p className="font-dm-sans text-gray-700 text-sm mb-6 leading-relaxed">
                  {model.bio}
                </p>

                {/* Action Button */}
                <div>
                  <Link href={`/profile/${model.id}`}>
                    <Button className="w-full bg-gradient-to-r from-[#064F8C] to-[#111B3E] hover:from-[#053d6b] hover:to-[#0d1426] text-white font-dm-sans">
                      Se profil & produkter
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-8 bg-gradient-to-r from-[#064F8C] to-[#111B3E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl px-8 py-6 border border-white/20 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="font-cormorant font-bold text-2xl text-white mb-2">
                Gå med i vår trosklubb för att få de senaste nyheterna
              </h3>
              <p className="font-dm-sans text-white/80 text-sm">
                Bli först att veta om nya modeller och exklusiva erbjudanden
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 min-w-fit">
              <input
                type="email"
                placeholder="Din e-postadress..."
                className="px-4 py-3 rounded-lg border-none bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:outline-none font-dm-sans text-sm w-64"
              />
              <Button className="gradient-midnight-cyan text-white hover:bg-[#064F8C] transition-all duration-200 font-medium px-6 py-3 rounded-lg whitespace-nowrap text-sm shadow-lg">
                Gå med nu
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}