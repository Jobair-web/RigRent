import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/providers/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading", display: "swap" });

export const metadata = {
  title: { default: "RigRent | Equipment Rental Platform", template: "%s | RigRent" },
  description: "Rent professional equipment from verified owners. Construction, photography, vehicles, agriculture, electronics and event gear.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-screen font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
