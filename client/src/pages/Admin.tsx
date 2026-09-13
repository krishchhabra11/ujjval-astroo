import { useAdminConsultations } from "@/hooks/use-consultations";
import { useUser } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useEffect } from "react";
import { Loader2, Calendar, FileText, ShoppingBag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// NOTE: I need to wrap admin hooks because they might not be exported from use-consultations fully in the previous step
// Assuming I placed useAdminConsultations in use-consultations.ts, useAdminBookings in use-pujas.ts, useAdminOrders in use-products.ts
// Re-importing correctly based on previous files:
import { useAdminBookings as useBookingsAdmin } from "@/hooks/use-pujas";
import { useAdminOrders as useOrdersAdmin } from "@/hooks/use-products";

export default function Admin() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const [, setLocation] = useLocation();

  const { data: consultations, isLoading: isConsLoading } = useAdminConsultations();
  const { data: bookings, isLoading: isBookLoading } = useBookingsAdmin();
  const { data: orders, isLoading: isOrdLoading } = useOrdersAdmin();

  useEffect(() => {
    if (!isUserLoading && (!user || !user.isAdmin)) {
      setLocation("/");
    }
  }, [user, isUserLoading, setLocation]);

  if (isUserLoading || isConsLoading || isBookLoading || isOrdLoading) {
    return <div className="min-h-screen flex items-center justify-center text-primary"><Loader2 className="w-10 h-10 animate-spin" /></div>;
  }

  if (!user?.isAdmin) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold text-white mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="consultations" className="space-y-8">
          <TabsList className="bg-card border border-white/10">
            <TabsTrigger value="consultations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" /> Consultations
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Calendar className="w-4 h-4 mr-2" /> Puja Bookings
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingBag className="w-4 h-4 mr-2" /> Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultations">
            <Card className="bg-card border-white/10 text-white">
              <CardHeader>
                <CardTitle>Recent Consultation Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">DOB</TableHead>
                      <TableHead className="text-gray-400">Problem</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultations?.map((c) => (
                      <TableRow key={c.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell>{c.dateOfBirth} {c.timeOfBirth}</TableCell>
                        <TableCell className="max-w-md truncate" title={c.problem}>{c.problem}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${c.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                            {c.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card className="bg-card border-white/10 text-white">
              <CardHeader>
                <CardTitle>Puja Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Name</TableHead>
                      <TableHead className="text-gray-400">Date</TableHead>
                      <TableHead className="text-gray-400">Location</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings?.map((b) => (
                      <TableRow key={b.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">{b.name}</TableCell>
                        <TableCell>{b.date}</TableCell>
                        <TableCell>{b.location}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {b.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="bg-card border-white/10 text-white">
              <CardHeader>
                <CardTitle>Store Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-gray-400">Order ID</TableHead>
                      <TableHead className="text-gray-400">User ID</TableHead>
                      <TableHead className="text-gray-400">Amount</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.map((o) => (
                      <TableRow key={o.id} className="border-white/10 hover:bg-white/5">
                        <TableCell className="font-medium">#{o.id}</TableCell>
                        <TableCell>{o.userId}</TableCell>
                        <TableCell>₹{o.totalAmount}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${o.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                            {o.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
