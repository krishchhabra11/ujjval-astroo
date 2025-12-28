import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#120520] border-t border-white/5 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold gold-text-gradient">Ujjval Astro</h3>
            <p className="text-sm leading-relaxed">
              Guiding you through the cosmic journey. Discover your destiny with ancient Vedic wisdom and modern astrological insights.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/horoscopes" className="hover:text-primary transition-colors">Daily Horoscope</Link></li>
              <li><Link href="/consultations" className="hover:text-primary transition-colors">Book Consultation</Link></li>
              <li><Link href="/pujas" className="hover:text-primary transition-colors">Puja Services</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Astro Shop</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Kundli Matching</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Career Guidance</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Love & Marriage</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Gemstone Consultancy</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Vastu Shastra</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>123 Cosmic Way, Galaxy Tower,<br />Mumbai, MH 400001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <span>contact@ujjvalastro.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Ujjval Astro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
