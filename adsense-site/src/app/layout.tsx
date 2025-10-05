import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Menu, Newspaper, Phone, ShieldCheck, Wallet } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Naija Insights | News, Guides, and How‑Tos",
    template: "%s | Naija Insights",
  },
  description:
    "Professional, fast, mobile‑first content site with helpful articles, guides, and reviews for Nigerians.",
  metadataBase: new URL("https://example.com"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Naija Insights",
    description:
      "Helpful guides, tech tips, finance, and lifestyle content for Nigerians.",
    type: "website",
    url: "https://example.com",
    siteName: "Naija Insights",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naija Insights",
    description: "Guides and how‑tos built for Nigeria",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="sticky top-0 z-50 border-b border-black/5 dark:border-white/10 backdrop-blur bg-white/75 dark:bg-zinc-950/75">
          <div className="site-container flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Newspaper className="h-5 w-5" />
              <span>Naija Insights</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
              <Link href="/about" className="hover:underline underline-offset-4">
                About
              </Link>
              <Link href="/contact" className="hover:underline underline-offset-4">
                Contact
              </Link>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                Privacy
              </Link>
            </nav>
            <button className="md:hidden btn btn-outline" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
        <main className="site-container py-6 sm:py-8 lg:py-10 min-h-[70vh]">
          {children}
        </main>
        <footer className="border-t border-black/5 dark:border-white/10">
          <div className="site-container grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
            <div>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Wallet className="h-4 w-4" />
                <span>Finance</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Guides on savings, payments, and side hustles in Nigeria.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Newspaper className="h-4 w-4" />
                <span>How‑Tos</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Simple step‑by‑step tutorials for everyday tasks.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <Phone className="h-4 w-4" />
                <span>Tech</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400">
                Mobile data, apps, and device tips optimized for low bandwidth.
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Legal</span>
              </div>
              <ul className="space-y-1">
                <li>
                  <Link href="/terms" className="link">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="link">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="link">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-black/5 dark:border-white/10 py-4">
            <div className="site-container text-xs text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Naija Insights. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
