import type { Metadata } from "next";
import { Cairo, Amiri, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/lib/i18n/i18n-provider";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alarab.ecosystem"),
  title: "AL ARAB — The Digital Future of the Arab World",
  description:
    "AL ARAB is a comprehensive digital ecosystem combining technology, entertainment, commerce, culture, innovation and community into a unified metaverse experience inspired by the Arab world.",
  keywords: [
    "AlArab",
    "Metaverse",
    "Digital Economy",
    "Arab World",
    "Blockchain",
    "AI",
    "Web3",
    "Virtual Reality",
    "Digital Ecosystem",
  ],
  authors: [{ name: "AL ARAB" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "AL ARAB — The Digital Future of the Arab World",
    description:
      "A unified digital ecosystem combining technology, entertainment, commerce, culture and innovation inspired by the Arab world.",
    siteName: "AL ARAB",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "AL ARAB" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AL ARAB — The Digital Future of the Arab World",
    description:
      "A unified digital ecosystem combining technology, entertainment, commerce, culture and innovation.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${amiri.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
