import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function usePujas() {
  return useQuery({
    queryKey: [api.pujas.list.path],
    queryFn: async () => {
      const res = await fetch(api.pujas.list.path);
      if (!res.ok) throw new Error("Failed to fetch pujas");
      return api.pujas.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.bookings.create.input>) => {
      const validated = api.bookings.create.input.parse(data);
      const res = await fetch(api.bookings.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to book puja");
      return api.bookings.create.responses[201].parse(await res.json());
    },
  });
}

export function useAdminBookings() {
  return useQuery({
    queryKey: [api.admin.bookings.path],
    queryFn: async () => {
      const res = await fetch(api.admin.bookings.path);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.admin.bookings.responses[200].parse(await res.json());
    },
  });
}
