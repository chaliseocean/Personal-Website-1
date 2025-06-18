"use client"

import { useEffect } from "react"

interface TawkChatProps {
  siteId: string
  chatId: string
}

export default function TawkChat({ siteId, chatId }: TawkChatProps) {
  useEffect(() => {
    // Prevent multiple instances
    if (window.Tawk_API) {
      return
    }

    // Create Tawk script element
    const script = document.createElement("script")
    script.async = true
    script.src = `https://embed.tawk.to/${siteId}/${chatId}`
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    // Set up Tawk_API before script loads
    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    // Append script to head instead of body for better loading
    document.head.appendChild(script)

    // Clean up function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      // Clean up global variables
      if (window.Tawk_API) {
        delete window.Tawk_API
      }
      if (window.Tawk_LoadStart) {
        delete window.Tawk_LoadStart
      }
    }
  }, [siteId, chatId])

  // This component doesn't render anything visible
  return null
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}
