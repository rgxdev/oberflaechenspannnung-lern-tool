import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Oberflächenspannung - Interaktives Lernmodul",
  description: "Interaktives Lernmodul zur Oberflächenspannung für Klasse 9 Gymnasium Bayern",
  keywords: ["Oberflächenspannung", "Physik", "Lernmodul", "Gymnasium", "Bayern", "Klasse 9"],
  authors: [{ name: "Lernmodul Team" }],
  creator: "Lernmodul Team",
  publisher: "Gymnasium Bayern",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://oberflaechenspannung.d-aaron.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oberflächenspannung - Interaktives Lernmodul",
    description: "Interaktives Lernmodul zur Oberflächenspannung für Klasse 9 Gymnasium Bayern",
    url: "https://oberflaechenspannung.d-aaron.dev",
    siteName: "Oberflächenspannung Lernmodul",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Oberflächenspannung Lernmodul",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oberflächenspannung - Interaktives Lernmodul",
    description: "Interaktives Lernmodul zur Oberflächenspannung für Klasse 9 Gymnasium Bayern",
    images: ["/placeholder.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Oberflächenspannung",
    startupImage: [
      {
        url: "/placeholder.jpg",
        media: "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
  applicationName: "Oberflächenspannung Lernmodul",
  referrer: "origin-when-cross-origin",
  category: "education",
  classification: "Bildung",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d9488" },
    { media: "(prefers-color-scheme: dark)", color: "#0d9488" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <link rel="icon" href="/placeholder.svg" type="image/svg+xml" />
        <link rel="icon" href="/placeholder-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Oberflächenspannung" />
        <meta name="msapplication-TileColor" content="#0d9488" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="theme-color" content="#0d9488" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
