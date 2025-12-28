import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Star, Moon, Sun, Users, ShoppingBag, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[#1a0b2e]"></div>
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]"></div>
          {/* Constellation overlay - static image recommended for production, CSS pattern for now */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 gold-text-gradient tracking-tight">
              Unlock Your <br /> Cosmic Destiny
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
              Discover what the stars have aligned for you. Expert consultations, accurate horoscopes, and spiritual remedies for a harmonious life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/consultations">
                <Button size="lg" className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:scale-105 transition-all">
                  Book Consultation
                </Button>
              </Link>
              <Link href="/horoscopes">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary backdrop-blur-sm shadow-lg hover:scale-105 transition-all">
                  Read Horoscope
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-white">Our Divine Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Users className="w-10 h-10 text-primary" />}
              title="Expert Consultation"
              description="One-on-one sessions with renowned Vedic astrologers to guide your life path."
              link="/consultations"
            />
            <ServiceCard 
              icon={<Sparkles className="w-10 h-10 text-primary" />}
              title="Vedic Pujas"
              description="Powerful rituals performed by experienced pundits to remove obstacles."
              link="/pujas"
            />
            <ServiceCard 
              icon={<ShoppingBag className="w-10 h-10 text-primary" />}
              title="Astro Store"
              description="Authentic gemstones, rudrakshas, and yantras energized for your success."
              link="/shop"
            />
          </div>
        </div>
      </section>

      {/* Daily Insight Teaser */}
      <section className="py-24 bg-[#140824]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Daily Horoscopes</h2>
            <p className="text-gray-400 text-lg">
              Start your day with insights from the cosmos. Find out what today holds for your career, health, and relationships.
            </p>
            <Link href="/horoscopes">
              <Button className="mt-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-2 rounded-full transition-all">
                Check Your Sign
              </Button>
            </Link>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Visual representation of zodiac signs */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-card rounded-xl flex items-center justify-center border border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all">
                <Star className={`w-8 h-8 text-primary/40`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center text-white">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Priya Sharma" 
              role="Business Owner"
              text="The consultation was eye-opening. The remedies suggested helped me overcome a huge business loss. Highly recommended!"
            />
            <TestimonialCard 
              name="Rahul Verma" 
              role="Software Engineer"
              text="I was skeptical at first, but the accuracy of the horoscope predictions blew me away. The Gemstone recommendation was spot on."
            />
            <TestimonialCard 
              name="Anjali Gupta" 
              role="Homemaker"
              text="Booked a Griha Pravesh puja through Ujjval Astro. The pundits were very knowledgeable and the ceremony was beautiful."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description, link }: { icon: any, title: string, description: string, link: string }) {
  return (
    <Link href={link}>
      <motion.div 
        whileHover={{ y: -10 }}
        className="bg-card p-8 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors cursor-pointer group h-full"
      >
        <div className="mb-6 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </motion.div>
    </Link>
  );
}

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
  return (
    <div className="bg-[#120520] p-8 rounded-2xl border border-white/5 relative">
      <div className="text-primary text-6xl font-serif absolute top-4 left-6 opacity-20">"</div>
      <p className="text-gray-300 italic mb-6 relative z-10 pt-6">{text}</p>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600"></div>
        <div>
          <h4 className="font-bold text-white">{name}</h4>
          <p className="text-xs text-primary">{role}</p>
        </div>
      </div>
    </div>
  );
}
