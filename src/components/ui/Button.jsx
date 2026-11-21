import Link from "next/link";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

const variants = {
  primary: "bg-primary text-primary-fg hover:opacity-90",
  accent: "bg-accent text-navy hover:bg-amber-400",
  outline: "border border-border bg-transparent hover:bg-tint",
  ghost: "hover:bg-tint",
  danger: "border border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400",
  success: "bg-success text-white hover:opacity-90",
  light: "border border-white/40 text-white hover:bg-white/10",
};
const sizes = { sm: "h-8 px-3 text-xs", md: "h-10 px-4 text-sm", lg: "h-12 px-6 text-base" };

export default function Button({ href, variant = "primary", size = "md", loading, className, children, disabled, ...props }) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition active:scale-[.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant], sizes[size], className
  );
  if (href) return <Link href={href} className={cls} {...props}>{children}</Link>;
  return (
    <button className={cls} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
