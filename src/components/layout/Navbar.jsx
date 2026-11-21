"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import UserAvatar from "./UserAvatar";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isPending, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const active = (href) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  const links = NAV_LINKS.map((l) => (
    <Link key={l.href} href={l.href} onClick={() => setOpen(false)} aria-current={active(l.href) ? "page" : undefined}
      className={cn("rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:text-foreground", active(l.href) && "text-foreground shadow-[inset_0_-2px_0_rgb(var(--primary))]")}>
      {l.label}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-x flex h-full items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">{links}</nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isPending && (user ? (
            <>
              <Link href="/dashboard" className="hidden items-center gap-2 sm:flex"><UserAvatar user={user} /></Link>
              <Button href="/dashboard" size="sm" variant="outline" className="hidden sm:inline-flex"><LayoutDashboard className="h-4 w-4" />Dashboard</Button>
              <Button size="sm" variant="ghost" onClick={logout} className="hidden sm:inline-flex"><LogOut className="h-4 w-4" />Logout</Button>
            </>
          ) : (
            <>
              <Button href="/login" size="sm" variant="ghost" className="hidden sm:inline-flex">Login</Button>
              <Button href="/register" size="sm">Register</Button>
            </>
          ))}
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute inset-x-0 top-16 border-b border-border bg-background p-4 shadow-lg lg:hidden">
          <nav className="flex flex-col [&>a]:py-3">{links}</nav>
          <div className="mt-3 flex gap-2 sm:hidden">
            {user ? (
              <>
                <Button href="/dashboard" variant="outline" className="flex-1" onClick={() => setOpen(false)}>Dashboard</Button>
                <Button variant="danger" className="flex-1" onClick={logout}>Logout</Button>
              </>
            ) : (
              <Button href="/login" variant="outline" className="w-full" onClick={() => setOpen(false)}>Login</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
