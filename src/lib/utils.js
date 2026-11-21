import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));

export const formatCurrency = (n = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(n);

export const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : "-";

export const capitalize = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);
export const initials = (name = "") => name.trim().charAt(0).toUpperCase() || "U";
export const todayISO = () => new Date().toISOString().slice(0, 10);

export const rentalUnit = (type) => ({ daily: "day", weekly: "week", monthly: "month" })[type] || "day";

export function getErrorMessage(err) {
  return err?.response?.data?.message || err?.error?.message || err?.message || "Something went wrong";
}

/** Same formula as the server (server/src/utils/rental.js) - used for the live price preview. */
export function calcRentalAmount({ rentalType, price, startDate, endDate, quantity }) {
  const days = Math.round((new Date(endDate) - new Date(startDate)) / 86400000) + 1;
  if (!startDate || !endDate || !(days > 0)) return 0;
  const units = rentalType === "weekly" ? Math.ceil(days / 7) : rentalType === "monthly" ? Math.ceil(days / 30) : days;
  return Number((units * price * quantity).toFixed(2));
}

export function validatePassword(pw = "") {
  if (pw.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(pw)) return "Password must include an uppercase letter";
  if (!/[a-z]/.test(pw)) return "Password must include a lowercase letter";
  return "";
}
