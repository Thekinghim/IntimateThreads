import { create } from 'zustand';

export type Language = 'sv' | 'no' | 'da' | 'en';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>()((set) => ({
  language: (typeof window !== 'undefined' ? localStorage.getItem('scandiscent-language') as Language : null) || 'sv',
  setLanguage: (language) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('scandiscent-language', language);
    }
    set({ language });
  },
}));

export const translations = {
  sv: {
    // Navigation
    all: 'Alla',
    womensUsed: 'Kvinnors Använda',
    mensUsed: 'Mäns Använda',
    trackOrder: 'Spåra Beställning',
    
    // Home page
    heroTitle: 'Exklusiva Nordiska Plagg',
    heroSubtitle: 'Diskret marketplace för använda underkläder från verifierade nordiska kvinnor',
    exploreCollection: 'Använda trosor',
    
    // How it works
    howItWorksTitle: 'Så fungerar det',
    step1Title: '1. Välj',
    step1Desc: 'Bläddra igenom vår exklusiva kollektion och välj det plagg som tilltalar dig mest.',
    step2Title: '2. Betala',
    step2Desc: 'Diskret betalning via kryptovaluta, Revolut eller andra säkra betalningsmetoder.',
    step3Title: '3. Diskret Frakt',
    step3Desc: 'Plagget skickas diskret i neutral förpackning utan avslöjande märkningar.',
    step4Title: '4. Få Hem',
    step4Desc: 'Motta ditt paket hemma med fullständig anonymitet och diskretion.',
    
    // Why choose section
    whyChooseTitle: 'Varför välja Scandiscent?',
    whyChooseSubtitle: 'Vi erbjuder den mest diskreta och säkra upplevelsen för våra kunder',
    anonymityTitle: 'Fullständig Anonymitet',
    anonymityDesc: 'All kommunikation och leverans sker diskret utan avslöjande information',
    packagingTitle: 'Diskret Förpackning',
    packagingDesc: 'Neutral förpackning utan logotyper eller avslöjande märkningar',
    securityTitle: 'Säker Betalning',
    securityDesc: 'Krypterade betalningar som garanterar din integritet',
    
    // Collection page
    collectionTitle: 'KOLLEKTION',
    collectionDesc: 'Exklusiva plagg från verifierade nordiska kvinnor',
    womensUsedTitle: 'KVINNORS ANVÄNDA',
    womensUsedDesc: 'Exklusiva använda damplagg från verifierade nordiska kvinnor',
    mensUsedTitle: 'MÄNS ANVÄNDA',
    mensUsedDesc: 'Exklusiva använda herrplagg från verifierade nordiska kvinnor',
    
    // Search and filters
    searchPlaceholder: 'Sök produkter, säljare...',
    allSizes: 'Alla Storlekar',
    allMaterials: 'Alla Material',
    allColors: 'Alla Färger',
    wearDays: 'Använd Dagar',
    newDays: 'Ny (0 dagar)',
    sortBy: 'Sortera efter',
    newest: 'Nyast',
    priceLowHigh: 'Pris: Låg till Hög',
    priceHighLow: 'Pris: Hög till Låg',
    
    // Common
    home: 'Hem',
    noProductsFound: 'Inga produkter hittades som matchar dina kriterier.',
    clearFilters: 'Rensa Filter',
    productsFound: 'produkter hittades',
    loading: 'Laddar...',
  },
  
  no: {
    // Navigation
    all: 'Alle',
    womensUsed: 'Dameklær Brukt',
    mensUsed: 'Herreklær Brukt',
    trackOrder: 'Spor Bestilling',
    
    // Home page
    heroTitle: 'Eksklusive Nordiske Plagg',
    heroSubtitle: 'Diskret markedsplass for intime plagg fra verifiserte nordiske kvinner',
    exploreCollection: 'Utforsk Samlingen',
    
    // How it works
    howItWorksTitle: 'Slik fungerer det',
    step1Title: '1. Velg',
    step1Desc: 'Bla gjennom vår eksklusive samling og velg det plagget som appellerer til deg mest.',
    step2Title: '2. Betal',
    step2Desc: 'Diskret betaling via kryptovaluta, Revolut eller andre sikre betalingsmetoder.',
    step3Title: '3. Diskret Frakt',
    step3Desc: 'Plagget sendes diskret i nøytral emballasje uten avslørende merkinger.',
    step4Title: '4. Få Hjem',
    step4Desc: 'Motta pakken din hjemme med fullstendig anonymitet og diskresjon.',
    
    // Why choose section
    whyChooseTitle: 'Hvorfor velge Scandiscent?',
    whyChooseSubtitle: 'Vi tilbyr den mest diskrete og sikre opplevelsen for våre kunder',
    anonymityTitle: 'Fullstendig Anonymitet',
    anonymityDesc: 'All kommunikasjon og levering skjer diskret uten avslørende informasjon',
    packagingTitle: 'Diskret Emballasje',
    packagingDesc: 'Nøytral emballasje uten logoer eller avslørende merkinger',
    securityTitle: 'Sikker Betaling',
    securityDesc: 'Krypterte betalinger som garanterer din integritet',
    
    // Collection page
    collectionTitle: 'SAMLING',
    collectionDesc: 'Eksklusive plagg fra verifiserte nordiske kvinner',
    womensUsedTitle: 'DAMEKLÆR BRUKT',
    womensUsedDesc: 'Eksklusive brukte dameklær fra verifiserte nordiske kvinner',
    mensUsedTitle: 'HERREKLÆR BRUKT',
    mensUsedDesc: 'Eksklusive brukte herreklær fra verifiserte nordiske kvinner',
    
    // Search and filters
    searchPlaceholder: 'Søk produkter, selgere...',
    allSizes: 'Alle Størrelser',
    allMaterials: 'Alle Materialer',
    allColors: 'Alle Farger',
    wearDays: 'Brukte Dager',
    newDays: 'Ny (0 dager)',
    sortBy: 'Sorter etter',
    newest: 'Nyeste',
    priceLowHigh: 'Pris: Lav til Høy',
    priceHighLow: 'Pris: Høy til Lav',
    
    // Common
    home: 'Hjem',
    noProductsFound: 'Ingen produkter funnet som matcher dine kriterier.',
    clearFilters: 'Fjern Filtre',
    productsFound: 'produkter funnet',
    loading: 'Laster...',
  },
  
  da: {
    // Navigation
    all: 'Alle',
    womensUsed: 'Dametøj Brugt',
    mensUsed: 'Herretøj Brugt',
    trackOrder: 'Spor Bestilling',
    
    // Home page
    heroTitle: 'Eksklusive Nordiske Tøj',
    heroSubtitle: 'Diskret markedsplads for intime tøj fra verificerede nordiske kvinder',
    exploreCollection: 'Udforsk Samlingen',
    
    // How it works
    howItWorksTitle: 'Sådan fungerer det',
    step1Title: '1. Vælg',
    step1Desc: 'Gennemse vores eksklusive samling og vælg det tøj, der appellerer til dig mest.',
    step2Title: '2. Betal',
    step2Desc: 'Diskret betaling via kryptovaluta, Revolut eller andre sikre betalingsmetoder.',
    step3Title: '3. Diskret Forsendelse',
    step3Desc: 'Tøjet sendes diskret i neutral emballage uden afslørende mærkninger.',
    step4Title: '4. Få Hjem',
    step4Desc: 'Modtag din pakke hjemme med fuldstændig anonymitet og diskretion.',
    
    // Why choose section
    whyChooseTitle: 'Hvorfor vælge Scandiscent?',
    whyChooseSubtitle: 'Vi tilbyder den mest diskrete og sikre oplevelse for vores kunder',
    anonymityTitle: 'Fuldstændig Anonymitet',
    anonymityDesc: 'Al kommunikation og levering sker diskret uden afslørende information',
    packagingTitle: 'Diskret Emballage',
    packagingDesc: 'Neutral emballage uden logoer eller afslørende mærkninger',
    securityTitle: 'Sikker Betaling',
    securityDesc: 'Krypterede betalinger der garanterer din integritet',
    
    // Collection page
    collectionTitle: 'SAMLING',
    collectionDesc: 'Eksklusive tøj fra verificerede nordiske kvinder',
    womensUsedTitle: 'DAMETØJ BRUGT',
    womensUsedDesc: 'Eksklusive brugte dametøj fra verificerede nordiske kvinder',
    mensUsedTitle: 'HERRETØJ BRUGT',
    mensUsedDesc: 'Eksklusive brugte herretøj fra verificerede nordiske kvinder',
    
    // Search and filters
    searchPlaceholder: 'Søg produkter, sælgere...',
    allSizes: 'Alle Størrelser',
    allMaterials: 'Alle Materialer',
    allColors: 'Alle Farver',
    wearDays: 'Brugte Dage',
    newDays: 'Ny (0 dage)',
    sortBy: 'Sorter efter',
    newest: 'Nyeste',
    priceLowHigh: 'Pris: Lav til Høj',
    priceHighLow: 'Pris: Høj til Lav',
    
    // Common
    home: 'Hjem',
    noProductsFound: 'Ingen produkter fundet, der matcher dine kriterier.',
    clearFilters: 'Ryd Filtre',
    productsFound: 'produkter fundet',
    loading: 'Indlæser...',
  },
  
  en: {
    // Navigation
    all: 'All',
    womensUsed: "Women's Used",
    mensUsed: "Men's Used",
    trackOrder: 'Track Order',
    
    // Home page
    heroTitle: 'Exclusive Nordic Garments',
    heroSubtitle: 'Discreet marketplace for intimate garments from verified Nordic women',
    exploreCollection: 'Explore Collection',
    
    // How it works
    howItWorksTitle: 'How it works',
    step1Title: '1. Choose',
    step1Desc: 'Browse through our exclusive collection and select the garment that appeals to you most.',
    step2Title: '2. Pay',
    step2Desc: 'Discreet payment via cryptocurrency, Revolut or other secure payment methods.',
    step3Title: '3. Discreet Shipping',
    step3Desc: 'The garment is shipped discreetly in neutral packaging without revealing markings.',
    step4Title: '4. Receive',
    step4Desc: 'Receive your package at home with complete anonymity and discretion.',
    
    // Why choose section
    whyChooseTitle: 'Why choose Scandiscent?',
    whyChooseSubtitle: 'We offer the most discreet and secure experience for our customers',
    anonymityTitle: 'Complete Anonymity',
    anonymityDesc: 'All communication and delivery happens discreetly without revealing information',
    packagingTitle: 'Discreet Packaging',
    packagingDesc: 'Neutral packaging without logos or revealing markings',
    securityTitle: 'Secure Payment',
    securityDesc: 'Encrypted payments that guarantee your privacy',
    
    // Collection page
    collectionTitle: 'COLLECTION',
    collectionDesc: 'Exclusive garments from verified Nordic women',
    womensUsedTitle: "WOMEN'S USED",
    womensUsedDesc: 'Exclusive used women\'s garments from verified Nordic women',
    mensUsedTitle: "MEN'S USED",
    mensUsedDesc: 'Exclusive used men\'s garments from verified Nordic women',
    
    // Search and filters
    searchPlaceholder: 'Search products, sellers...',
    allSizes: 'All Sizes',
    allMaterials: 'All Materials',
    allColors: 'All Colors',
    wearDays: 'Wear Days',
    newDays: 'New (0 days)',
    sortBy: 'Sort by',
    newest: 'Newest',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    
    // Common
    home: 'Home',
    noProductsFound: 'No products found matching your criteria.',
    clearFilters: 'Clear Filters',
    productsFound: 'products found',
    loading: 'Loading...',
  },
};

export const useTranslations = () => {
  const { language } = useLanguage();
  return translations[language] || translations.sv;
};

export const getLanguageName = (code: Language): string => {
  const names = {
    sv: 'Svenska',
    no: 'Norsk',
    da: 'Dansk',
    en: 'English',
  };
  return names[code];
};