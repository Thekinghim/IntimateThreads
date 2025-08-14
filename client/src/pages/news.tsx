import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Tag } from "lucide-react";

export default function News() {
  // Sample news data
  const newsArticles = [
    {
      id: 1,
      title: "Nya modeller ansluter till Scandiscent",
      excerpt: "Vi välkomnar fem nya modeller från Stockholm och Göteborg som har anslutit sig till vår exklusiva plattform.",
      content: "Under den senaste månaden har vi fått glädjen att välkomna fem nya modeller till vår exklusiva plattform. Dessa kvinnor kommer från Stockholm och Göteborg och har alla genomgått vår noggranna verifieringsprocess. De bidrar med unika stilar och personligheter som berikar vårt utbud av diskreta och högkvalitativa produkter.",
      date: "2025-08-10",
      category: "Modeller",
      image: "/api/placeholder/400/200"
    },
    {
      id: 2,
      title: "Utökat sortiment med premiumkvalitet",
      excerpt: "Vi har utökat vårt sortiment med nya premiumplagg i exklusiva material och designer.",
      content: "Vår kollektion har utökats med handplocka premiumplagg i exklusiva material som spets, silke och organisk bomull. Varje plagg genomgår kvalitetskontroll för att säkerställa den högsta standarden. Våra modeller väljer själva sina favoritmaterial, vilket garanterar både komfort och elegans.",
      date: "2025-08-05",
      category: "Produkter", 
      image: "/api/placeholder/400/200"
    },
    {
      id: 3,
      title: "Förbättrad diskret leverans",
      excerpt: "Vi har implementerat nya leveransmetoder för ännu mer diskret och säker frakt.",
      content: "För att möta våra kunders behov av diskret leverans har vi implementerat nya förpackningsmetoder och leveransalternativ. All frakt sker nu i helt neutrala förpackningar utan några avslöjande märkningar. Vi samarbetar med pålitliga fraktföretag som respekterar våra kunders integritet.",
      date: "2025-07-28",
      category: "Leverans",
      image: "/api/placeholder/400/200"
    },
    {
      id: 4,
      title: "Ny betalningsmetod: Revolut",
      excerpt: "Vi har lagt till Revolut som betalningsalternativ för ännu enklare och säkrare transaktioner.",
      content: "Utöver våra befintliga betalningsmetoder som kryptovaluta har vi nu även lagt till Revolut som betalningsalternativ. Detta ger våra kunder fler valmöjligheter och gör det ännu enklare att genomföra säkra och diskreta transaktioner. Alla betalningar är krypterade och behandlas med högsta säkerhet.",
      date: "2025-07-20",
      category: "Betalning",
      image: "/api/placeholder/400/200"
    },
    {
      id: 5,
      title: "Scandiscent Community växer",
      excerpt: "Vår community har nått över 10 000 nöjda kunder som värdesätter kvalitet och diskretion.",
      content: "Vi är stolta över att meddela att vår community har vuxit till över 10 000 nöjda kunder. Detta visar på förtroendet för vår plattform och vårt engagemang för kvalitet, diskretion och kundservice. Våra kunders återkoppling hjälper oss att kontinuerligt förbättra våra tjänster.",
      date: "2025-07-15",
      category: "Community",
      image: "/api/placeholder/400/200"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Modeller": "bg-blue-100 text-blue-800",
      "Produkter": "bg-purple-100 text-purple-800", 
      "Leverans": "bg-green-100 text-green-800",
      "Betalning": "bg-orange-100 text-orange-800",
      "Community": "bg-pink-100 text-pink-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#064F8C] to-[#111B3E] text-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cormorant font-bold text-6xl mb-6" style={{ color: '#F5D061' }}>Nyheter</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-dm-sans">
            Håll dig uppdaterad med de senaste nyheterna från Scandiscent. Nya modeller, produkter och förbättringar.
          </p>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {newsArticles.map((article) => (
              <Card key={article.id} className="bg-white shadow-lg border-none overflow-hidden">
                <div className="md:flex">
                  {/* Article Image */}
                  <div className="md:w-1/3">
                    <div className="h-64 md:h-full bg-gradient-to-br from-[#064F8C]/20 to-[#111B3E]/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-[#064F8C]/20 rounded-full flex items-center justify-center">
                        <Tag className="w-8 h-8 text-[#064F8C]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Article Content */}
                  <div className="md:w-2/3 p-8">
                    <CardContent className="p-0">
                      {/* Category and Date */}
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={`${getCategoryColor(article.category)} border-none`}>
                          {article.category}
                        </Badge>
                        <div className="flex items-center gap-2 text-[#4A5568] text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="font-cormorant font-bold text-3xl text-[#064F8C] mb-4">
                        {article.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-[#4A5568] text-lg mb-4 font-dm-sans">
                        {article.excerpt}
                      </p>

                      {/* Full Content */}
                      <p className="text-[#4A5568] leading-relaxed font-dm-sans">
                        {article.content}
                      </p>

                      {/* Reading Time */}
                      <div className="flex items-center gap-2 text-[#4A5568] text-sm mt-6 pt-4 border-t border-gray-200">
                        <Clock className="w-4 h-4" />
                        <span>2-3 min läsning</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}