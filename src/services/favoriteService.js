import { api } from "@/lib/api";

export const favoriteService = {
  list: () => api.get("/favorites").then((r) => r.data),
  add: (equipmentId) => api.post(`/favorites/${equipmentId}`).then((r) => r.data),
  remove: (equipmentId) => api.delete(`/favorites/${equipmentId}`).then((r) => r.data),
};
