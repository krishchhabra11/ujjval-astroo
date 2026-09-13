import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Sparkles, Star, Users, ShoppingBag, PhoneCall, ShieldCheck, 
  MessageSquare, Heart, Briefcase, IndianRupee, Flame, Compass, 
  ArrowRight, CheckCircle2, ChevronRight, Award, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { usePujas } from "@/hooks/use-pujas";
import { useProducts } from "@/hooks/use-products";

// Mock Verified Astrologer Seed Data for marketplace presentation
const FEATURED_ASTROLOGERS = [
  {
    id: 1,
    name: "Acharya Raman Shastri",
    title: "Senior Vedic & KP Jyotish",
    experience: "18+ Yrs Exp",
    languages: "Hindi, English, Sanskrit",
    rating: 4.9,
    reviewsCount: 3420,
    specialties: ["Kundli Milan", "Career Muhurat", "Sade Sati"],
    rate: "₹25/min",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250",
    isOnline: true,
  },
  {
    id: 2,
    name: "Dr. Gayatri Devi",
    title: "Nadi Astrology & Gemology",
    experience: "14+ Yrs Exp",
    languages: "Hindi, English",
    rating: 4.95,
    reviewsCount: 2890,
    specialties: ["Love & Marriage", "Gemstone Remedy", "Medical Astrology"],
    rate: "₹30/min",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250",
    isOnline: true,
  },
  {
    id: 3,
    name: "Pandit Devendra Joshi",
    title: "Vedic Rituals & Prashna Kundli",
    experience: "22+ Yrs Exp",
    languages: "Hindi, Gujarati",
    rating: 4.88,
    reviewsCount: 4150,
    specialties: ["Business Growth", "Property Dispute", "Kaal Sarp"],
    rate: "₹20/min",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    isOnline: true,
  },
  {
    id: 4,
    name: "Acharya Vidya Sagar",
    title: "Numerology & Vastu Consultant",
    experience: "12+ Yrs Exp",
    languages: "Hindi, English, Punjabi",
    rating: 4.92,
    reviewsCount: 1980,
    specialties: ["Vastu Correction", "Financial Growth", "Name Correction"],
    rate: "₹22/min",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250",
    isOnline: true,
  },
];

const LIFE_CONCERNS = [
  {
    id: "love",
    label: "Love & Marriage",
    icon: Heart,
    color: "from-rose-500/20 to-pink-500/10",
    badge: "Most Consulted",
    headline: "Facing Delays in Marriage or Relationship Obstacles?",
    description: "Get detailed Kundli Matchmaking, Manglik Dosha remedies, and auspicious marriage muhurats from senior Vedic acharyas.",
    remedy: "Shukra Graha Shanti & Guna Milan",
    action: "Consult Love Astrologer",
  },
  {
    id: "career",
    label: "Career & Business",
    icon: Briefcase,
    color: "from-blue-500/20 to-cyan-500/10",
    badge: "High Growth",
    headline: "Seeking Job Promotion, Career Switch or Business Expansion?",
    description: "Analyze your 10th House (Karma Bhava) and current Mahadasha to pinpoint optimal timing for job changes and investments.",
    remedy: "Surya & Budh Planetary Remedies",
    action: "Consult Career Expert",
  },
  {
    id: "wealth",
    label: "Wealth & Finance",
    icon: IndianRupee,
    color: "from-amber-500/20 to-yellow-500/10",
    badge: "Prosperity",
    headline: "Overcome Financial Debts & Unlock Prosperity Yogas",
    description: "Discover Dhana Yogas in your birth chart, auspicious investment muhurats, and remedies to remove financial roadblocks.",
    remedy: "Maha Lakshmi Puja & Shree Yantra",
    action: "Consult Wealth Astrologer",
  },
  {
    id: "health",
    label: "Health & Dosha",
    icon: Flame,
    color: "from-purple-500/20 to-indigo-500/10",
    badge: "Peace of Mind",
    headline: "Relief from Shani Sade Sati, Pitra Dosha & Negative Energies",
    description: "Customized remedial pujas, energized rudraksha, and sacred Vedic mantras to restore peace, vitality, and planetary harmony.",
    remedy: "Maha Mrityunjaya & Navgraha Shanti",
    action: "Get Dosha Remedies",
  },
];

const ZODIAC_LIST = [
  { name: "Aries", symbol: "♈", dates: "Mar 21 - Apr 19" },
  { name: "Taurus", symbol: "♉", dates: "Apr 20 - May 20" },
  { name: "Gemini", symbol: "♊", dates: "May 21 - Jun 20" },
  { name: "Cancer", symbol: "♋", dates: "Jun 21 - Jul 22" },
  { name: "Leo", symbol: "♌", dates: "Jul 23 - Aug 22" },
  { name: "Virgo", symbol: "♍", dates: "Aug 23 - Sep 22" },
  { name: "Libra", symbol: "♎", dates: "Sep 23 - Oct 22" },
  { name: "Scorpio", symbol: "♏", dates: "Oct 23 - Nov 21" },
  { name: "Sagittarius", symbol: "♐", dates: "Nov 22 - Dec 21" },
  { name: "Capricorn", symbol: "♑", dates: "Dec 22 - Jan 19" },
  { name: "Aquarius", symbol: "♒", dates: "Jan 20 - Feb 18" },
  { name: "Pisces", symbol: "♓", dates: "Feb 19 - Mar 20" },
];

export default function Home() {
  const [activeConcern, setActiveConcern] = useState(LIFE_CONCERNS[0]);
  const { data: pujas } = usePujas();
  const { data: products } = useProducts();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* 1. HERO SECTION: Conversion-focused split banner */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Ambient Cosmic Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[700px] bg-gradient-to-b from-[#240c42] via-[#1a0b2e] to-background" />
          <div className="absolute top-20 right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
          <div className="absolute top-40 left-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
          <div 
            className="absolute inset-0 opacity-15" 
            style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-4 inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Trusted by 50,000+ Seekers Across India
              </Badge>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold gold-text-gradient tracking-tight mb-6 leading-tight">
                Unlock Your Cosmic Destiny
              </h1>

              <p className="text-base sm:text-xl text-gray-300 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                Consult India’s top Vedic astrologers for precision birth chart guidance, auspicious life timing, and powerful sacred remedies.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/consultations">
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/25 hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <PhoneCall className="w-5 h-5" />
                    Consult Top Astrologer Now
                  </Button>
                </Link>

                <Link href="/ai-astrologer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 py-6 rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:border-primary backdrop-blur-sm shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Ask 24/7 AI Astrologer
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Quick Problem Selector (Concern Tabs) */}
          <div className="mt-12 glass-card rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl max-w-5xl mx-auto">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Choose Your Life Concern for Personalized Guidance
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {LIFE_CONCERNS.map((concern) => {
                const IconComponent = concern.icon;
                const isSelected = activeConcern.id === concern.id;
                return (
                  <button
                    key={concern.id}
                    onClick={() => setActiveConcern(concern)}
                    className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      isSelected
                        ? "bg-primary/20 border-primary text-white shadow-md shadow-primary/20"
                        : "bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isSelected ? "text-primary" : "text-gray-400"}`} />
                    <span className="text-xs font-semibold">{concern.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Concern Details Card */}
            <div className={`p-6 rounded-xl bg-gradient-to-br ${activeConcern.color} border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Badge className="bg-primary text-primary-foreground text-[10px] font-bold">
                    {activeConcern.badge}
                  </Badge>
                  <span className="text-xs text-primary font-medium">Remedy: {activeConcern.remedy}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {activeConcern.headline}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-2xl font-light">
                  {activeConcern.description}
                </p>
              </div>

              <Link href="/consultations" className="shrink-0 w-full md:w-auto">
                <Button className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-5 rounded-xl shadow-lg flex items-center justify-center gap-2">
                  {activeConcern.action} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE ASTROLOGERS DIRECTORY SHOWCASE */}
      <section className="py-16 bg-[#130623] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Verified Vedic Gurus
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Talk to Certified Astrologers
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Consult with seasoned acharyas specializing in Vedic, KP, Nadi & Prashna Jyotish.
              </p>
            </div>

            <Link href="/consultations">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-full text-xs font-semibold">
                View All Astrologers <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_ASTROLOGERS.map((astro) => (
              <Card 
                key={astro.id} 
                className="bg-card/70 border-white/10 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between overflow-hidden group"
              >
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img 
                        src={astro.avatar} 
                        alt={astro.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/40 group-hover:border-primary transition-colors" 
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-white text-sm truncate">{astro.name}</h4>
                        <span title="Verified Acharya">
                          <Award className="w-3.5 h-3.5 text-primary shrink-0" />
                        </span>
                      </div>
                      <p className="text-xs text-primary font-medium">{astro.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                        <span>{astro.experience}</span>
                        <span>•</span>
                        <span className="flex items-center text-amber-400 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                          {astro.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs">
                    <div className="text-gray-400 text-[11px]">
                      <span className="text-gray-300 font-medium">Languages:</span> {astro.languages}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {astro.specialties.map((spec, idx) => (
                        <span key={idx} className="bg-white/5 text-gray-300 text-[10px] px-2 py-0.5 rounded-md">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-gray-400">Rate:</span>
                      <p className="text-sm font-bold text-primary">{astro.rate}</p>
                    </div>

                    <Link href="/consultations">
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs px-4 rounded-full shadow-md">
                        <MessageSquare className="w-3 h-3 mr-1.5" /> Consult
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DAILY ZODIAC PULSE & HOROSCOPES */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-3 py-1 rounded-full mb-3 inline-flex items-center gap-1.5 text-xs">
              <Compass className="w-3.5 h-3.5" /> Planetary Transits & Rashifal
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Daily Zodiac Horoscopes
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Select your Sun/Moon sign to uncover today’s auspicious planetary alignments for love, career, and vitality.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ZODIAC_LIST.map((sign) => (
              <Link key={sign.name} href="/horoscopes">
                <Card className="bg-card/60 border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all text-center p-4 cursor-pointer group rounded-xl">
                  <div className="text-3xl mb-2 text-primary/80 group-hover:text-primary group-hover:scale-110 transition-transform">
                    {sign.symbol}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-0.5">{sign.name}</h4>
                  <p className="text-[10px] text-gray-500 truncate">{sign.dates}</p>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/horoscopes">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-full text-xs font-semibold px-6">
                Read Complete Daily Horoscope <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. SACRED VEDIC PUJAS SHOWCASE */}
      <section className="py-16 bg-[#130623] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                <Flame className="w-3.5 h-3.5 text-primary" />
                Vedic Remedies
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Divine Vedic Pujas with Sankalp
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Authentic rituals performed by Vedic Pandits for health, wealth, and obstacle removal.
              </p>
            </div>

            <Link href="/pujas">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-full text-xs font-semibold">
                Explore All Pujas <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pujas && pujas.length > 0 ? (
              pujas.slice(0, 4).map((puja) => (
                <Card key={puja.id} className="bg-card/70 border-white/10 hover:border-primary/30 transition-all overflow-hidden flex flex-col justify-between">
                  <div className="h-40 bg-white/5 relative overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1609105400828-090c8a584041?q=80&w=600&auto=format&fit=crop" 
                      alt={puja.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                      <h4 className="font-bold text-white text-base leading-tight">{puja.name}</h4>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                      {puja.description}
                    </p>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-base font-bold text-primary">₹{parseFloat(puja.price).toFixed(0)}</span>
                      <Link href="/pujas">
                        <Button size="sm" className="bg-white/10 hover:bg-primary hover:text-primary-foreground text-white text-xs rounded-full">
                          Book Puja
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-gray-500 text-sm">Loading divine pujas...</div>
            )}
          </div>
        </div>
      </section>

      {/* 5. ENERGIZED ASTRO SHOP HIGHLIGHTS */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
                <ShoppingBag className="w-3.5 h-3.5 text-primary" />
                Energized Spiritual Store
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Certified Gemstones & Rudraksha
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                100% lab-certified, consecrated Vedic remedies to amplify planetary strength.
              </p>
            </div>

            <Link href="/shop">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 rounded-full text-xs font-semibold">
                Visit Astro Shop <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products && products.length > 0 ? (
              products.slice(0, 4).map((product) => (
                <Card key={product.id} className="bg-card/70 border-white/10 hover:border-primary/30 transition-all overflow-hidden flex flex-col justify-between">
                  <div className="h-48 overflow-hidden relative bg-black/40">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <Badge className="absolute top-3 right-3 bg-black/60 text-white text-[10px] uppercase backdrop-blur-sm">
                      {product.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">{product.name}</h4>
                      <p className="text-xs text-gray-400 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-base font-bold text-primary">₹{product.price}</span>
                      <Link href="/shop">
                        <Button size="sm" className="bg-white/10 hover:bg-primary hover:text-primary-foreground text-white text-xs rounded-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-gray-500 text-sm">Loading spiritual remedies...</div>
            )}
          </div>
        </div>
      </section>

      {/* 6. AI ASTROLOGER SPOTLIGHT BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#1c0836] via-[#2f1155] to-[#1c0836] border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <Badge variant="outline" className="border-primary text-primary bg-primary/10 px-3 py-1 text-xs">
                ✨ Instant 24/7 Astrological Intelligence
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white">
                Meet Your Personal AI Vedic Astrologer
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                Have an urgent question at midnight about planetary transitions, marriage suitability, or auspicious muhurat? Chat instantly with our AI assistant trained in classical Jyotish Shastra.
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
                <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">⚡ Zero Wait Time</span>
                <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">🔒 100% Private</span>
                <span className="bg-white/5 border border-white/10 text-gray-300 text-xs px-3 py-1 rounded-full">📜 Vedic Calculations</span>
              </div>
            </div>

            <div className="shrink-0 w-full lg:w-auto text-center">
              <Link href="/ai-astrologer">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 rounded-full text-base shadow-xl shadow-primary/25 hover:scale-105 transition-all">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Chat with AI Astrologer Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST & TESTIMONIALS */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3">
              Why Devotees Trust Ujjval Astroo
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-4" />
            <p className="text-gray-400 text-sm max-w-xl mx-auto">
              Our guiding mission is to deliver authentic, scripture-backed Vedic guidance that genuinely transforms lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[#140624] border-white/5 p-6 rounded-2xl relative shadow-xl">
              <div className="text-primary text-5xl font-serif absolute top-3 left-5 opacity-20">“</div>
              <p className="text-gray-300 text-sm italic mb-6 relative z-10 pt-4 leading-relaxed">
                "The consultation with Acharya Raman Shastri gave me absolute clarity regarding my business partner's chart. The Shani remedy we performed turned around our cash flow in 45 days."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  PS
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Priya Sharma</h4>
                  <p className="text-xs text-primary font-medium">Business Owner, Mumbai</p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#140624] border-white/5 p-6 rounded-2xl relative shadow-xl">
              <div className="text-primary text-5xl font-serif absolute top-3 left-5 opacity-20">“</div>
              <p className="text-gray-300 text-sm italic mb-6 relative z-10 pt-4 leading-relaxed">
                "I was skeptical about online Kundli matching, but the depth of analysis provided by Dr. Gayatri Devi was exceptional. She explained the Nadi Dosha cancellation with clear scriptural references."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  RV
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Rahul Verma</h4>
                  <p className="text-xs text-primary font-medium">Tech Executive, Bengaluru</p>
                </div>
              </div>
            </Card>

            <Card className="bg-[#140624] border-white/5 p-6 rounded-2xl relative shadow-xl">
              <div className="text-primary text-5xl font-serif absolute top-3 left-5 opacity-20">“</div>
              <p className="text-gray-300 text-sm italic mb-6 relative z-10 pt-4 leading-relaxed">
                "Booked the Griha Pravesh Puja with Sankalp. The pundits arrived on time, conducted the Havan with proper Vedic chanting, and sent us the energized Yantra. Truly divine service!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground font-bold text-xs">
                  AG
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Anjali Gupta</h4>
                  <p className="text-xs text-primary font-medium">Homemaker, Delhi NCR</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
