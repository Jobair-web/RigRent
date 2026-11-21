"use client";
import { useState } from "react";
import Image from "next/image";
import { Wrench } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Fixed-ratio image with a themed fallback, so every card has identical dimensions. */
export default function EquipmentImage({ src, alt, category, className, priority }) {
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORIES.find((c) => c.name === category)?.icon || Wrench;

  if (!src || failed) {
    return (
      <div className={cn("flex items-center justify-center bg-gradient-to-br from-primary to-navy text-white", className)}>
        <Icon className="h-14 w-14 opacity-90" aria-hidden="true" />
      </div>
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105" onError={() => setFailed(true)} />
    </div>
  );
}
