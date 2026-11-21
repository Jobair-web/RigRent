import { api } from "@/lib/api";

export const bookingService = {
  checkout: (payload) => api.post("/bookings/checkout", payload).then((r) => r.data),
  mine: (params) => api.get("/bookings/my", { params }).then((r) => r.data),
  owner: (params) => api.get("/bookings/owner", { params }).then((r) => r.data),
  all: (params) => api.get("/bookings", { params }).then((r) => r.data),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }).then((r) => r.data),
  confirmPayment: (sessionId) => api.post("/payments/confirm", { sessionId }).then((r) => r.data),
};
