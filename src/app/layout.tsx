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
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/manifest.json' },
      { rel: 'mask-icon', url: '/favicon-96x96.png', color: '#d4af37' },
      { rel: 'apple-touch-icon', url: '/apple-touch-icon.png' },
      { rel: 'apple-touch-icon-precomposed', url: '/apple-touch-icon.png' },
    ],
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
  // Google Search structured data for Organization + Logo (rich results)
  other: {
    "application-name": "AL ARAB",
    "msapplication-TileColor": "#0f0f1a",
    "msapplication-TileImage": "/android-chrome-192x192.png",
    "theme-color": "#0f0f1a",
    "googlebot": "index, follow",
    "robots": "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for Google Search rich results
  // (Organization schema with logo — used by Google for logo search)
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AL ARAB",
    "alternateName": "AlArab",
    "description": "The Digital Future of the Arab World — a unified digital ecosystem combining technology, culture and innovation.",
    "url": "https://alarab-defi.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://alarab-defi.com/android-chrome-512x512.png",
      "width": 512,
      "height": 512,
    },
    "image": "https://alarab-defi.com/android-chrome-512x512.png",
    "sameAs": [
      "https://x.com/Alarab_official",
      "https://github.com/AlArab-EAU/al-arab-web",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AL ARAB",
    "url": "https://alarab-defi.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://alarab-defi.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={`${cairo.variable} ${amiri.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        <I18nProvider>{children}</I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
