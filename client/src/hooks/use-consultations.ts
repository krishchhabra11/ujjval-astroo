import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function useCreateConsultation() {
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.consultations.create.input>) => {
      const validated = api.consultations.create.input.parse(data);
      const res = await fetch(api.consultations.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      if (!res.ok) throw new Error("Failed to book consultation");
      return api.consultations.create.responses[201].parse(await res.json());
    },
  });
}

export function useAdminConsultations() {
  return useQuery({
    queryKey: [api.admin.consultations.path],
    queryFn: async () => {
      const res = await fetch(api.admin.consultations.path);
      if (!res.ok) throw new Error("Failed to fetch consultations");
      return api.admin.consultations.responses[200].parse(await res.json());
    },
  });
}
