"use client"

import { useEffect } from "react"

interface TawkChatProps {
  siteId: string
  chatId?: string
}

export default function TawkChat({ siteId, chatId = "default" }: TawkChatProps) {
  useEffect(() => {
    // Create Tawk script element
    const script = document.createElement("script")
    script.async = true
    script.src = `https://embed.tawk.to/${siteId}/${chatId}`
    script.charset = "UTF-8"
    script.setAttribute("crossorigin", "*")

    // Append script to body
    document.body.appendChild(script)

    // Clean up function
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [siteId, chatId])

  // This component doesn't render anything visible
  return null
}
