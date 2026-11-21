import { api } from "@/lib/api";

export const analyticsService = {
  admin: () => api.get("/analytics/admin").then((r) => r.data),
  owner: () => api.get("/analytics/owner").then((r) => r.data),
};
