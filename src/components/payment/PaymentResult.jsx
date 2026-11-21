"use client";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { bookingService } from "@/services/bookingService";
import { useAsync } from "@/hooks/useAsync";
import { formatCurrency, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export function PaymentSuccess() {
  const sessionId = useSearchParams().get("session_id");
  const started = useRef(false);
  const { data, loading, error, refetch } = useAsync(() => bookingService.confirmPayment(sessionId), [sessionId], { immediate: false });

  useEffect(() => {
    if (sessionId && !started.current) { started.current = true; refetch(); } // guards React strict-mode double run
  }, [sessionId, refetch]);

  if (!sessionId || error)
    return <Result icon={XCircle} tone="text-red-500" title="We could not verify your payment" text={error || "Missing payment session."} action={<Button href="/dashboard/customer/rentals">Go to my rentals</Button>} />;
  if (loading || !data)
    return <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 text-muted"><Spinner className="h-10 w-10 text-primary" />Confirming your payment…</div>;

  const b = data.booking;
  return (
    <Result icon={CheckCircle2} tone="text-success" title="Payment successful" text="Your booking is confirmed and the owner has been notified."
      action={<Button href="/dashboard/customer/rentals">View my rentals</Button>}>
      <div className="card-surface mx-auto mt-6 max-w-sm space-y-2 p-5 text-left text-sm">
        <Row k="Equipment" v={b.equipmentName} /><Row k="Dates" v={`${formatDate(b.startDate)} - ${formatDate(b.endDate)}`} />
        <Row k="Quantity" v={b.quantity} /><Row k="Total paid" v={formatCurrency(b.totalAmount)} /><Row k="Transaction" v={<span className="font-mono text-xs">{data.transactionId}</span>} />
      </div>
    </Result>
  );
}

export function PaymentCancel() {
  return <Result icon={XCircle} tone="text-amber-500" title="Payment cancelled" text="No charge was made. You can return to the equipment and try again."
    action={<Button href="/equipment">Browse equipment</Button>} />;
}

const Row = ({ k, v }) => <div className="flex justify-between gap-4"><span className="text-muted">{k}</span><span className="font-semibold">{v}</span></div>;

function Result({ icon: Icon, tone, title, text, action, children }) {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center py-12 text-center">
      <Icon className={`h-16 w-16 ${tone}`} />
      <h1 className="mt-4 text-3xl font-bold">{title}</h1>
      <p className="mt-2 max-w-md text-muted">{text}</p>
      {children}
      <div className="mt-6">{action}</div>
    </div>
  );
}
