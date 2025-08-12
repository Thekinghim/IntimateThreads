import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Star, Sparkles, Heart, MapPin, Clock, Award } from "lucide-react";

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
  fullBio?: string;
  photos?: string[];
}

const models: Record<string, Model> = {
  'emma': {
    id: 'emma',
    name: 'Emma',
    age: 24,
    location: 'Stockholm',
    bio: 'Spontan och lekfull tjej som älskar att utforska nya upplevelser. Jag trivs med att vara naturlig och äkta i allt jag gör.',
    fullBio: 'Hej! Jag är Emma, en 24-årig spontan tjej från Stockholm som älskar att leva livet till fullo. För mig handlar intimitet om äkthet och naturlighet - jag tror på att vara helt sig själv och att skapa genuina förbindelser. Jag älskar att utforska nya upplevelser tillsammans med andra som delar min passion för spontanitet och naturlig intimitet.\n\nMina tre år inom denna bransch har lärt mig vikten av öppen kommunikation och att alltid vara lyhörd för min partners behov. Jag är lekfull och varm av naturen, och jag trivs bäst när vi båda kan slappna av och bara vara oss själva.\n\nUtanför arbetet älskar jag att måla, gå på konserter och utforska Stockholms dolda pärlor. Jag är också stort fan av spontana äventyr - oavsett om det är en oplanerad helgresa eller bara att prova en ny restaurang.',
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
  'sofia': {
    id: 'sofia',
    name: 'Sofia',
    age: 29,
    location: 'Göteborg',
    bio: 'Erfaren och självsäker kvinna som vet vad hon vill. Jag älskar att ta kontroll och skapa intensiva upplevelser.',
    fullBio: 'Jag är Sofia, en 29-årig självsäker kvinna från Göteborg med sex års erfarenhet inom intimitetsbranschen. Jag är känd för min förmåga att ta kontroll och skapa intensiva, minnesvärda upplevelser för mina klienter.\n\nMin specialitet ligger inom dominans och BDSM, men jag är också mångsidig och kan anpassa mig efter olika önskemål och komfortnivåer. Jag tror starkt på vikten av förtroende och kommunikation - innan vi ens börjar pratar vi alltid igenom gränser och önskemål.\n\nJag är passionerad inom mitt område och ser varje möte som en möjlighet att skapa något unikt och personligt. Utanför arbetet älskar jag att träna, läsa böcker om psykologi och utforska Göteborgs kulinariska scen.',
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
  'lina': {
    id: 'lina',
    name: 'Lina',
    age: 22,
    location: 'Malmö',
    bio: 'Ung och nyfiken tjej som älskar att lära sig nya saker. Jag är öppen för att utforska olika fantasier tillsammans.',
    fullBio: 'Hej! Jag heter Lina och är en 22-årig nyfiken tjej från Malmö. Trots att jag är relativt ny inom branschen (ett år nu), har jag redan upptäckt min passion för rollspel och att utforska olika fantasier tillsammans med andra.\n\nJag älskar cosplay och har en fantastisk garderob med olika dräkter och outfits för olika scenarier. Min öppenhet och nyfikenhet gör att jag alltid är villig att prova nya saker, och jag trivs bäst i en miljö där vi kan vara kreativa tillsammans.\n\nMitt ungdomliga utseende kombinerat med min entusiasm skapar en unik upplevelse. Jag är lyhörd och lärer mig snabbt vad som fungerar bäst för varje person. Utanför arbetet studerar jag konsthistoria och älskar att måla och designa nya cosplay-outfits.',
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
  'anna': {
    id: 'anna',
    name: 'Anna',
    age: 35,
    location: 'Uppsala',
    bio: 'Mogen kvinna med mycket erfarenhet och förståelse. Jag älskar djupa samtal och sinnliga upplevelser.',
    fullBio: 'Jag är Anna, en 35-årig mogen kvinna från Uppsala med åtta års bred erfarenhet inom intimitet och tantra. Min mognad och djupa förståelse för kropp och själ gör mig till en unik partner för dem som söker något mer än bara fysisk intimitet.\n\nMy specialitet ligger inom tantrasex och sinnliga upplevelser där vi tar tid att verkligen utforska varandra på alla nivåer. Jag tror på att intimitet ska vara en helande och transformerande upplevelse som lämnar båda parter berikade.\n\nMina djupa samtal och min förmåga att verkligen lyssna gör att många klienter återkommer för den emotionella förbindelse vi skapar. Jag har utbildning inom massage och tantra, och kombinerar dessa färdigheter för att skapa en holistisk upplevelse.\n\nUtanför arbetet praktiserar jag yoga och meditation, läser filosofi och älskar att laga mat. Jag tror på en hälsosam livsstil och att ta hand om både kropp och själ.',
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
  'maja': {
    id: 'maja',
    name: 'Maja',
    age: 27,
    location: 'Lund',
    bio: 'Kreativ konstnär som älskar att uttrycka sig genom kroppen. Jag kombinerar konst med passion på unika sätt.',
    fullBio: 'Hej! Jag är Maja, en 27-årig kreativ konstnär från Lund som har hittat ett unikt sätt att kombinera min passion för konst med intimitet. Med fyra års erfarenhet har jag utvecklat en specialitet inom konstnärliga och estetiska upplevelser.\n\nBody painting är en av mina favoriter - att måla på kroppen och använda den som en canvas för konst skapar en intim och samtidigt artistisk upplevelse som är helt unik. Jag älskar också fotografering och har skapat många vackra konstprojekt tillsammans med mina klienter.\n\nMy kreativitet sträcker sig bortom det visuella - jag skapar upplevelser som engagerar alla sinnen och som ofta blir minnesvärda konstverket i sig själva. Varje möte är unikt och designat efter personens individuella smak och önskemål.\n\nUtanför arbetet målar jag, arbetar med skulptur och ställer ut på lokala gallerier. Jag tror på att konst har kraften att förvandla och beröra människor på djupt sätt.',
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
};

// Mapping from URL slug to model ID
const urlToModelMap: Record<string, string> = {
  'emma-lindqvist': 'emma',
  'sofia-andersson': 'sofia',
  'lina-karlsson': 'lina',
  'anna-nilsson': 'anna',
  'maja-eriksson': 'maja'
};

export default function ModelProfilePage() {
  const { modelSlug } = useParams<{ modelSlug: string }>();
  
  const modelId = urlToModelMap[modelSlug || ''];
  const model = modelId ? models[modelId] : null;

  if (!model) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#064F8C] mb-4">Modell hittades inte</h1>
          <Link href="/models">
            <Button className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] text-white">
              Tillbaka till Modeller
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/models">
              <Button variant="outline" size="sm" className="flex items-center gap-2 text-white border-white/30 hover:bg-white/10">
                <ArrowLeft className="h-4 w-4" />
                Tillbaka till Modeller
              </Button>
            </Link>
          </div>
          
          <div className="flex items-start gap-8">
            <div className="text-8xl">{model.avatar}</div>
            <div className="flex-1">
              <h1 className="font-cormorant font-bold text-5xl mb-2">{model.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-dm-sans text-lg">{model.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-dm-sans text-lg">{model.age} år</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span className="font-dm-sans text-lg">{model.experience} erfarenhet</span>
                </div>
              </div>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(model.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="font-dm-sans text-lg">{model.rating} ({model.reviews} recensioner)</span>
                {model.verified && (
                  <Badge className="bg-green-500 text-white border-none">
                    <Star className="w-3 h-3 mr-1" />
                    Verifierad
                  </Badge>
                )}
                {model.premium && (
                  <Badge className="bg-yellow-500 text-white border-none">
                    Premium
                  </Badge>
                )}
              </div>

              <p className="font-dm-sans text-xl text-white/90 max-w-3xl">
                {model.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - About */}
          <div className="lg:col-span-2 space-y-8">
            {/* Full Bio */}
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-8">
                <h2 className="font-cormorant font-bold text-3xl text-[#064F8C] mb-6">Om mig</h2>
                <div className="prose prose-lg max-w-none">
                  {model.fullBio?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="font-dm-sans text-gray-700 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-8">
                <h2 className="font-cormorant font-bold text-3xl text-[#064F8C] mb-6">Mina intressen</h2>
                <div className="grid grid-cols-2 gap-4">
                  {model.interests.map((interest, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-[#F5F1E8] rounded-lg">
                      <Heart className="w-5 h-5 text-[#064F8C]" />
                      <span className="font-dm-sans text-[#064F8C] font-medium">{interest}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Specialty */}
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-6">
                <h3 className="font-lora font-bold text-xl text-[#064F8C] mb-4">Specialitet</h3>
                <Badge variant="outline" className="border-[#064F8C] text-[#064F8C] text-sm p-3">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {model.specialty}
                </Badge>
              </CardContent>
            </Card>

            {/* Personality */}
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-6">
                <h3 className="font-lora font-bold text-xl text-[#064F8C] mb-4">Personlighet</h3>
                <p className="font-dm-sans text-gray-700">{model.personality}</p>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-white shadow-xl border-none">
              <CardContent className="p-6">
                <h3 className="font-lora font-bold text-xl text-[#064F8C] mb-4">Taggar</h3>
                <div className="flex flex-wrap gap-2">
                  {model.tags.map((tag, index) => (
                    <Badge key={index} className="bg-[#064F8C]/10 text-[#064F8C] border-none">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-[#064F8C] to-[#111B3E] text-white shadow-xl border-none">
              <CardContent className="p-6 text-center">
                <h3 className="font-cormorant font-bold text-2xl mb-4">Boka tid</h3>
                <p className="font-dm-sans mb-6 text-white/90">
                  Intresserad av att träffa {model.name}? Se tillgängliga produkter och boka tid.
                </p>
                <Link href={`/models/${modelSlug}/products`}>
                  <Button className="w-full bg-white text-[#064F8C] hover:bg-white/90 font-dm-sans font-semibold">
                    Se produkter & boka
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}