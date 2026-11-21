import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo light />
          <p className="text-sm">Professional equipment from verified owners, on demand.</p>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-white">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/equipment" className="hover:text-white">All equipment</Link></li>
            <li><Link href="/#how-it-works" className="hover:text-white">How it works</Link></li>
            <li><Link href="/register" className="hover:text-white">Become an owner</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-white">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" />support@rigrent.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" />+880 1700-000000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" />Chattogram, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-bold text-white">Follow us</h3>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="RigRent on X" className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10"><XIcon /></a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs">© {new Date().getFullYear()} RigRent. All rights reserved.</div>
    </footer>
  );
}
