import { usePujas, useCreateBooking } from "@/hooks/use-pujas";
import { useUser } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Pujas() {
  const { data: pujas, isLoading } = usePujas();
  const { mutate: bookPuja, isPending: isBooking } = useCreateBooking();
  const { data: user } = useUser();
  const { toast } = useToast();
  
  const [selectedPuja, setSelectedPuja] = useState<any>(null);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
    location: "",
  });

  const handleBook = () => {
    if (!selectedPuja) return;

    bookPuja({
      userId: user?.id,
      pujaId: selectedPuja.id,
      name: bookingDetails.name,
      date: bookingDetails.date,
      location: bookingDetails.location,
    }, {
      onSuccess: () => {
        toast({
          title: "Booking Successful",
          description: "Our pundits will contact you for coordination.",
        });
        setSelectedPuja(null);
        setBookingDetails({ name: "", date: "", location: "" });
      },
      onError: () => {
        toast({
          title: "Booking Failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-primary"><Loader2 className="w-10 h-10 animate-spin" /></div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold gold-text-gradient mb-6">
            Divine Puja Services
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sacred rituals performed by experienced Vedic Pandits for health, wealth, and harmony in your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pujas?.map((puja) => (
            <motion.div
              key={puja.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-primary/20 transition-all group"
            >
              {/* Unsplash Placeholder for Puja */}
              {/* puja ceremonial fire ritual */}
              <div className="h-48 bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                <img 
                  src={`https://images.unsplash.com/photo-1609105400828-090c8a584041?q=80&w=1000&auto=format&fit=crop`} 
                  alt={puja.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <h3 className="text-2xl font-bold text-white">{puja.name}</h3>
                  <div className="text-primary font-bold">₹{parseFloat(puja.price).toFixed(2)}</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-400 mb-6 line-clamp-3 text-sm">{puja.description}</p>
                <Button 
                  onClick={() => setSelectedPuja(puja)}
                  className="w-full bg-white/10 hover:bg-primary hover:text-primary-foreground text-white border border-white/10 hover:border-transparent transition-all"
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedPuja} onOpenChange={(open) => !open && setSelectedPuja(null)}>
        <DialogContent className="bg-card border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Book {selectedPuja?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter details for the Sankalp.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Devotee Name</Label>
              <Input 
                value={bookingDetails.name}
                onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                placeholder="Full Name"
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Preferred Date</Label>
              <Input 
                type="date"
                value={bookingDetails.date}
                onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Location (City/Address)</Label>
              <Input 
                value={bookingDetails.location}
                onChange={(e) => setBookingDetails({...bookingDetails, location: e.target.value})}
                placeholder="e.g. Mumbai or 'Online'"
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setSelectedPuja(null)}>Cancel</Button>
            <Button onClick={handleBook} disabled={isBooking} className="bg-primary text-primary-foreground">
              {isBooking ? "Confirming..." : "Confirm Booking"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
