import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";

const ZODIAC_SIGNS = [
  { name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈" },
  { name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉" },
  { name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋" },
  { name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍" },
  { name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓" },
];

export default function Horoscopes() {
  const [selectedSign, setSelectedSign] = useState<typeof ZODIAC_SIGNS[0] | null>(null);

  // Mock horoscope text generation
  const getDailyHoroscope = (sign: string) => {
    return `Today is a powerful day for ${sign}. The cosmic alignment suggests a breakthrough in personal or professional matters. Trust your intuition as the moon guides your emotions. Financial gains are possible in the evening. Lucky Color: Gold. Lucky Number: 7.`;
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold gold-text-gradient mb-6">
            Daily Horoscope
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Select your zodiac sign to reveal what the stars have planned for you today.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ZODIAC_SIGNS.map((sign, index) => (
            <motion.div
              key={sign.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 215, 0, 0.5)" }}
              onClick={() => setSelectedSign(sign)}
              className="bg-card border border-white/5 rounded-2xl p-6 text-center cursor-pointer hover:shadow-lg hover:shadow-primary/10 transition-all group"
            >
              <div className="text-5xl mb-4 text-primary/80 group-hover:text-primary transition-colors">
                {sign.symbol}
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{sign.name}</h3>
              <p className="text-xs text-gray-500">{sign.dates}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedSign} onOpenChange={(open) => !open && setSelectedSign(null)}>
        <DialogContent className="bg-card border-primary/20 text-white sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl text-primary">{selectedSign?.symbol}</div>
              <DialogTitle className="text-3xl font-display text-center">{selectedSign?.name}</DialogTitle>
              <DialogDescription className="text-center text-primary/80 font-medium">
                {selectedSign?.dates}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="mt-4 p-6 bg-white/5 rounded-xl border border-white/5">
            <h4 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Today's Prediction</h4>
            <p className="text-lg leading-relaxed text-gray-200">
              {selectedSign && getDailyHoroscope(selectedSign.name)}
            </p>
          </div>
          <div className="mt-2 text-center text-xs text-gray-500">
            Predictions are general. For detailed analysis, book a consultation.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
