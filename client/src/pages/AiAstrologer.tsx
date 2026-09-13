import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  Sparkles, Send, Bot, User as UserIcon, Loader2, 
  HelpCircle, ArrowRight, ShieldCheck, Star, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/hooks/use-auth";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  {
    category: "Career",
    text: "What does my 10th house indicate for career growth and promotions?",
    icon: "💼",
  },
  {
    category: "Marriage",
    text: "How to check Kundli compatibility and Manglik Dosha for marriage?",
    icon: "💍",
  },
  {
    category: "Shani Sade Sati",
    text: "What are effective Vedic remedies for Shani Sade Sati and Dhaiya?",
    icon: "🪐",
  },
  {
    category: "Gemstones",
    text: "Which gemstone strengthens Jupiter and Venus according to Vedic astrology?",
    icon: "💎",
  },
  {
    category: "Finance",
    text: "What astrological planetary transits affect wealth and debt clearance?",
    icon: "💰",
  },
];

const ZODIAC_LIST = [
  "Aries (Mesha)", "Taurus (Vrishabha)", "Gemini (Mithuna)", 
  "Cancer (Karka)", "Leo (Simha)", "Virgo (Kanya)", 
  "Libra (Tula)", "Scorpio (Vrishchika)", "Sagittarius (Dhanu)", 
  "Capricorn (Makara)", "Aquarius (Kumbha)", "Pisces (Meena)"
];

export default function AiAstrologer() {
  const { data: user } = useUser();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [userName, setUserName] = useState(user?.username ? user.username.split("@")[0] : "");
  const [selectedZodiac, setSelectedZodiac] = useState<string>("Aries (Mesha)");
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content: "Namaste! 🙏 I am your **Ujjval Astroo AI Vedic Guide**, trained in classical Parashari & Jaimini principles. Ask me about your Kundli, planetary dashas, career muhurat, marriage compatibility, or remedial mantras. How may I assist your spiritual path today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageText) setInput("");
    setIsLoading(true);

    try {
      // Build context payload
      const contextPrefix = userName || selectedZodiac 
        ? `[Context: User Name: ${userName || "Devotee"}, Zodiac/Rashi: ${selectedZodiac}] ` 
        : "";

      const res = await apiRequest("POST", "/api/chat", { 
        message: `${contextPrefix}${textToSend.trim()}` 
      });

      if (!res.ok) {
        throw new Error("Failed to receive divine response");
      }

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: data.message || "The stars are in transition. Please ask your question again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Cosmic Connection Busy",
        description: error.message || "Unable to reach the astrological assistant. Please check your connection.",
        variant: "destructive",
      });

      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: "I apologize, our celestial server is momentarily busy. For urgent remedies, you can directly book a consultation with our senior Vedic Pandits.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content: "Conversation refreshed. Please share your birth details or astrological query.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background relative overflow-hidden">
      {/* Mystical Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-4 py-1.5 rounded-full mb-3 inline-flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            24/7 Vedic Intelligence Engine
          </Badge>
          <h1 className="text-3xl md:text-5xl font-display font-bold gold-text-gradient mb-3">
            AI Vedic Astrologer
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base font-light">
            Instant insights on planetary dashas, birth chart queries, and Vedic remedies powered by authentic astrological wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column: Context & Controls */}
          <div className="lg:col-span-1 space-y-5">
            <Card className="glass-card border-white/10">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-sm font-semibold text-white flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-primary" />
                    Personalization
                  </span>
                  <button 
                    onClick={handleClearChat}
                    title="Reset Chat"
                    className="text-xs text-gray-400 hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-medium">Your Name / Title</label>
                  <Input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 text-sm h-9"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-medium">Your Zodiac (Rashi)</label>
                  <Select value={selectedZodiac} onValueChange={setSelectedZodiac}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white text-sm h-9">
                      <SelectValue placeholder="Select Sign" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1a0b2e] border-white/10 text-white max-h-60">
                      {ZODIAC_LIST.map((sign) => (
                        <SelectItem key={sign} value={sign} className="text-sm">
                          {sign}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-gray-400 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-primary">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Private & Confidential
                  </div>
                  <p>Your astrological inputs are not shared with any third party.</p>
                </div>
              </CardContent>
            </Card>

            {/* Human Specialist Handoff Card */}
            <Card className="bg-gradient-to-br from-[#2a124a] to-[#1a0b2e] border border-primary/30 p-5 shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                  <Star className="w-4 h-4 fill-primary" /> Need a Certified Pandit?
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  For critical life decisions, personalized birth time rectification, or customized Vedic Pujas:
                </p>
                <Link href="/consultations">
                  <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs rounded-lg shadow-md mt-1 flex items-center justify-center gap-1">
                    Book Live Consultation <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Chat Interface */}
          <div className="lg:col-span-3 flex flex-col h-[650px] glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Chat Header Bar */}
            <div className="px-6 py-4 bg-card/80 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    Ujjval Vedic AI
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </h2>
                  <p className="text-xs text-gray-400">Parashara & Jaimini Jyotish System</p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                <Badge variant="secondary" className="bg-white/5 text-gray-300 text-xs border border-white/10">
                  Active Rashi: <span className="text-primary font-semibold ml-1">{selectedZodiac.split(" ")[0]}</span>
                </Badge>
              </div>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-md ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                          : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-none backdrop-blur-sm"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                      <div
                        className={`text-[10px] mt-1.5 text-right ${
                          msg.role === "user" ? "text-primary-foreground/70" : "text-gray-500"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>

                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                        <UserIcon className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex gap-3 items-center text-gray-400 text-xs pl-1">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2">
                    <span>Consulting cosmic alignments...</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2.5 bg-black/20 border-t border-white/5 overflow-x-auto flex gap-2 no-scrollbar">
              <span className="text-xs text-gray-400 flex items-center gap-1 shrink-0">
                <HelpCircle className="w-3.5 h-3.5 text-primary" /> Suggested:
              </span>
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt.text)}
                  disabled={isLoading}
                  className="text-xs bg-white/5 hover:bg-primary/20 hover:text-primary text-gray-300 border border-white/10 rounded-full px-3 py-1 whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>{prompt.icon}</span>
                  <span>{prompt.category}</span>
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-4 bg-card/90 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your Kundli, career timing, love compatibility, remedies..."
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 text-sm h-11 rounded-xl"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-5 h-11 rounded-xl shadow-lg transition-all"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

