import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PWAInstaller } from "@/components/pwa-installer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CEO de Mi Vida - Tu Coach Personal IA",
  description:
    "Transforma tu vida con inteligencia artificial. Gestiona tareas, hábitos, finanzas y más con tu coach personal.",
  keywords: ["productividad", "hábitos", "finanzas", "coach", "IA", "desarrollo personal"],
  authors: [{ name: "CEO de Mi Vida" }],
  creator: "CEO de Mi Vida",
  publisher: "CEO de Mi Vida",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CEO de Mi Vida",
  },
  openGraph: {
    type: "website",
    siteName: "CEO de Mi Vida",
    title: "CEO de Mi Vida - Tu Coach Personal IA",
    description: "Transforma tu vida con inteligencia artificial",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "CEO de Mi Vida Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CEO de Mi Vida - Tu Coach Personal IA",
    description: "Transforma tu vida con inteligencia artificial",
    images: ["/icon-512x512.png"],
  },
    generator: 'v0.dev'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#667eea" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CEO de Mi Vida" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#667eea" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body>
        {children}
        <PWAInstaller />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
