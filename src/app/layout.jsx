"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Component that uses useSearchParams
function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Pesque Pague Águas Claras</title>
        <meta
          name="description"
          content="Seu destino perfeito para lazer, pesca e contato com a natureza em Campina Grande do Sul. Oferecemos piscinas naturais, churrasqueiras, playground e estrutura completa para toda a família."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main>
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
