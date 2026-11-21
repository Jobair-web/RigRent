import { api } from "@/lib/api";

export const userService = {
  me: () => api.get("/users/me").then((r) => r.data),
  updateMe: (payload) => api.patch("/users/me", payload).then((r) => r.data),
  list: (params) => api.get("/users", { params }).then((r) => r.data),
  changeRole: (id, role) => api.patch(`/users/${id}/role`, { role }).then((r) => r.data),
  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),
};
