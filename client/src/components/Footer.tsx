import { Link } from "wouter";
import { 
  Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, 
  ShieldCheck, Award, Lock, Sparkles, Heart
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#10041d] border-t border-white/10 pt-16 pb-8 text-gray-400 font-sans relative overflow-hidden">
      {/* Background Subtle Star Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Verified Pandits</h5>
              <p className="text-[11px] text-gray-400">Gurukul trained scholars</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">100% Confidential</h5>
              <p className="text-[11px] text-gray-400">Private & encrypted chats</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Certified Remedies</h5>
              <p className="text-[11px] text-gray-400">Energized & Lab Tested</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">24/7 AI Assistance</h5>
              <p className="text-[11px] text-gray-400">Instant Vedic Answers</p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
                ॐ
              </div>
              <span className="text-2xl font-display font-bold gold-text-gradient">
                Ujjval Astroo
              </span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-300 font-light max-w-sm">
              India's premier sanctuary for authentic Vedic astrology, personalized birth chart analyses, certified energized remedies, and sacred rituals performed with pure Sankalp.
            </p>

            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-200 mb-2 uppercase tracking-wider">Connect With Us</p>
              <div className="flex space-x-3 text-gray-400">
                <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"><Facebook size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"><Twitter size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"><Instagram size={16} /></a>
                <a href="#" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"><Youtube size={16} /></a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-primary/20 pb-2 inline-block">
              Quick Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Cosmic Home</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Book Consultation</Link></li>
              <li><Link href="/ai-astrologer" className="text-amber-300 hover:text-primary transition-colors font-medium flex items-center gap-1.5"><span>✨</span> AI Astrologer</Link></li>
              <li><Link href="/horoscopes" className="hover:text-primary transition-colors">Daily Horoscopes</Link></li>
              <li><Link href="/pujas" className="hover:text-primary transition-colors">Sacred Vedic Pujas</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Energized Astro Shop</Link></li>
            </ul>
          </div>

          {/* Col 3: Specialized Guidance */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-primary/20 pb-2 inline-block">
              Vedic Guidance
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Kundli Matchmaking (Gun Milan)</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Love & Marriage Timing</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Career & Business Muhurat</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Shani Sade Sati Relief</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Manglik & Kaal Sarp Dosha</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Gemstone Recommendation</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-b border-primary/20 pb-2 inline-block">
              Sanctuary Contact
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span className="leading-relaxed">1E, Krishna Enclave Rd, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+91 9810226158</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-primary shrink-0" />
                <span className="truncate">krishchhabra11@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Astrological Disclaimer */}
        <div className="mt-12 pt-6 border-t border-white/10 text-[11px] text-gray-500 leading-relaxed text-justify">
          <p>
            <strong className="text-gray-400">Disclaimer:</strong> Astrology is an ancient spiritual science based on traditional Vedic principles and planetary calculations. The guidance, horoscope predictions, and remedial suggestions provided by Ujjval Astroo are intended for self-reflection, spiritual harmony, and positive guidance. Results may vary according to individual Karma and planetary periods.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p>&copy; {new Date().getFullYear()} Ujjval Astroo. All divine rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with sacred reverence <Heart size={12} className="text-rose-500 fill-rose-500 inline" /> for Vedic Seekers
          </p>
        </div>
      </div>
    </footer>
  );
}
