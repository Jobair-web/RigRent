import { api, publicApi } from "@/lib/api";

export const equipmentService = {
  list: (params) => publicApi.get("/equipment", { params }).then((r) => r.data),
  featured: (limit = 6) => publicApi.get("/equipment/featured", { params: { limit } }).then((r) => r.data),
  categoryCounts: () => publicApi.get("/equipment/categories").then((r) => r.data),
  getById: (id) => api.get(`/equipment/${id}`).then((r) => r.data),
  mine: () => api.get("/equipment/owner/mine").then((r) => r.data),
  adminAll: () => api.get("/equipment/admin/all").then((r) => r.data),
  create: (payload) => api.post("/equipment", payload).then((r) => r.data),
  update: (id, payload) => api.put(`/equipment/${id}`, payload).then((r) => r.data),
  remove: (id) => api.delete(`/equipment/${id}`).then((r) => r.data),
  setStatus: (id, status) => api.patch(`/equipment/${id}/status`, { status }).then((r) => r.data),
};
