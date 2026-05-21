import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans-custom",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Father — Bespoke Tailoring",
  description:
    "An ultra-luxury tailoring house. Bespoke suits handcrafted with old-world tradition and an uncompromising eye for detail.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
