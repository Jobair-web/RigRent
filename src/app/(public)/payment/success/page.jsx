import { Suspense } from "react";
import { PaymentSuccess } from "@/components/payment/PaymentResult";

export const metadata = { title: "Payment successful" };

export default function SuccessPage() {
  return <Suspense><PaymentSuccess /></Suspense>;
}
