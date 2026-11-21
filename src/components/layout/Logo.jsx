import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className, light }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-heading text-xl font-extrabold", light && "text-white", className)} aria-label="RigRent home">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-base text-accent">R</span>
      RigRent
    </Link>
  );
}
