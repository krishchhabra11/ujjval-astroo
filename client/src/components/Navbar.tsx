import { Link, useLocation } from "wouter";
import { useUser, useLogout } from "@/hooks/use-auth";
import { 
  Menu, X, User as UserIcon, LogOut, ShieldCheck, 
  PhoneCall, ShoppingBag, Compass
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/consultations", label: "Consultation", badge: "Live" },
    { href: "/ai-astrologer", label: "AI Astrologer", badge: "24/7 AI", special: true },
    { href: "/horoscopes", label: "Horoscopes" },
    { href: "/pujas", label: "Vedic Pujas" },
    { href: "/shop", label: "Astro Shop" },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Top Auspicious Ticker / Announcement Bar */}
      <div className="bg-gradient-to-r from-[#200b3b] via-[#35165f] to-[#200b3b] border-b border-primary/20 text-xs py-1.5 px-4 text-center text-gray-300 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-primary">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold">Verified Vedic Pandits Online</span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-2 text-xs">
            <span className="text-primary font-bold">✨ Today's Shubh Muhurat:</span>
            <span className="text-gray-200">Abhijit Muhurat 11:45 AM - 12:35 PM</span>
            <span className="hidden md:inline text-gray-500">|</span>
            <span className="hidden md:inline text-emerald-400 font-medium">100% Confidential & Private</span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-xs">
            <Link href="/consultations" className="text-primary hover:underline font-semibold flex items-center gap-1">
              <PhoneCall className="w-3 h-3" /> Connect Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-card border-b border-white/10 bg-[#160829]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Brand Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center text-primary-foreground font-display font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                ॐ
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-bold gold-text-gradient group-hover:scale-[1.02] transition-transform duration-300 tracking-tight">
                  Ujjval Astroo
                </span>
                <span className="text-[10px] uppercase tracking-widest text-primary/80 font-sans font-medium -mt-1">
                  Vedic Wisdom & Remedies
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-all relative py-1 flex items-center gap-1.5 ${
                      isActive ? "text-primary font-semibold" : "text-gray-300 hover:text-white"
                    } ${link.special ? "text-amber-300 font-semibold" : ""}`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${
                        link.special 
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30 animate-pulse" 
                          : "bg-white/10 text-primary border border-primary/20"
                      }`}>
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right CTAs / User Auth */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/consultations">
                <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10 hover:text-primary rounded-full text-xs font-semibold px-4">
                  <PhoneCall className="w-3.5 h-3.5 mr-1.5" />
                  Talk to Pandit
                </Button>
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full hover:bg-white/10 text-primary flex items-center gap-2 border border-white/10 px-3">
                      <UserIcon className="h-4 w-4" />
                      <span className="text-xs font-medium text-gray-200 truncate max-w-[100px]">
                        {user.username.split("@")[0]}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#1a0b2e] border-white/10 text-foreground" align="end">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-primary truncate">{user.username}</p>
                    </div>

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/20 mt-1">
                      <Link href="/consultations" className="flex items-center">
                        <Compass className="mr-2 h-4 w-4 text-primary" />
                        My Consultations
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/20">
                      <Link href="/shop" className="flex items-center">
                        <ShoppingBag className="mr-2 h-4 w-4 text-primary" />
                        Astro Orders
                      </Link>
                    </DropdownMenuItem>

                    {user.isAdmin && (
                      <>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/20 text-purple-300">
                          <Link href="/admin" className="flex items-center">
                            <ShieldCheck className="mr-2 h-4 w-4 text-purple-400" />
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="cursor-pointer text-destructive focus:bg-destructive/20 focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 rounded-full text-xs shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                    Login / Signup
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Link href="/consultations">
                <Button size="sm" className="bg-primary text-primary-foreground text-xs px-3 h-8 rounded-full sm:hidden">
                  Consult
                </Button>
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/5"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-primary" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#160829] border-b border-white/10 shadow-2xl overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      location === link.href
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="flex items-center gap-2">
                      {link.label}
                    </span>
                    {link.badge && (
                      <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                ))}

                <div className="pt-3 border-t border-white/10 space-y-2">
                  {user ? (
                    <>
                      <div className="px-3.5 py-1 text-xs text-gray-400">
                        Logged in as <span className="text-primary font-semibold">{user.username}</span>
                      </div>
                      {user.isAdmin && (
                        <Link
                          href="/admin"
                          className="flex items-center px-3.5 py-2 rounded-lg text-sm font-medium text-purple-300 hover:bg-white/5"
                          onClick={() => setIsOpen(false)}
                        >
                          <ShieldCheck className="mr-2 h-4 w-4" /> Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl h-10 mt-2">
                        Login / Register
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
