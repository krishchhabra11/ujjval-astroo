import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { useCreateConsultation } from "@/hooks/use-consultations";
import { useUser } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

// Extended schema for the form to ensure types are correct before sending to API
const formSchema = api.consultations.create.input.extend({
  // Override or ensure these are strings if needed, but the schema imports are robust
});

export default function Consultations() {
  const { mutate: createConsultation, isPending } = useCreateConsultation();
  const { data: user } = useUser();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user?.id,
      name: "",
      dateOfBirth: "",
      timeOfBirth: "",
      placeOfBirth: "",
      gender: "male",
      problem: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // If not logged in, we can either block or allow guest (backend supports optional userId)
    // For this flow, we'll allow guest or logged in.
    
    // Simulate Payment
    toast({
      title: "Processing Payment...",
      description: "Redirecting to secure gateway.",
      duration: 2000,
    });

    setTimeout(() => {
      createConsultation(values, {
        onSuccess: () => {
          toast({
            title: "Consultation Booked!",
            description: "An astrologer will review your chart and contact you soon.",
            variant: "default",
          });
          form.reset();
        },
        onError: (error) => {
          toast({
            title: "Booking Failed",
            description: error.message,
            variant: "destructive",
          });
        }
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-display font-bold gold-text-gradient mb-4">
            Book a Consultation
          </h1>
          <p className="text-gray-400">
            Get personalized guidance from expert Vedic astrologers. Fill in your birth details accurately.
          </p>
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-6 md:p-8 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" className="bg-white/5 border-white/10 text-white focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Time of Birth</FormLabel>
                      <FormControl>
                        <Input type="time" className="bg-white/5 border-white/10 text-white focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="placeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Place of Birth</FormLabel>
                      <FormControl>
                        <Input placeholder="City, State, Country" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Gender</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-primary/50">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-card border-white/10 text-white">
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="problem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Problem / Question</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your concern briefly..." 
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-primary/50 min-h-[120px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all shadow-lg shadow-primary/20"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Pay ₹500 & Book Now"
                  )}
                </Button>
                <p className="text-center text-xs text-gray-500 mt-3">
                  Secure payment via Razorpay (Mock)
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
