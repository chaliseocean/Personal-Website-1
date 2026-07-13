import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ocean Chalise - Full Stack Developer & UI/UX Designer",
  description:
    "Personal portfolio of Ocean Chalise, a passionate tech enthusiast, aspiring full stack developer, and beginner UI/UX designer from Nepal.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>

        {/* Tawk.to Live Chat Script */}
        <Script
          src="https://embed.tawk.to/6765bd3caf5bfec1dbdf204d/1ifimmdtr"
          strategy="lazyOnload"
          onLoad={() => {
            // @ts-ignore
            window.Tawk_API = window.Tawk_API || {}
            // @ts-ignore
            window.Tawk_LoadStart = new Date()
          }}
        />
      </body>
    </html>
  )
}
