"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatFallback() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  useEffect(() => {
    // Check if Tawk.to has loaded after 3 seconds
    const timer = setTimeout(() => {
      if (!window.Tawk_API || !window.Tawk_API.onLoad) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg z-50 p-0"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Modal */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Chat with Ocean</h3>
            <Button
              onClick={() => setIsChatOpen(false)}
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-blue-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-center items-center text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mb-4" />
            <h4 className="font-semibold mb-2">Let's Connect!</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              I'd love to hear from you. Choose your preferred way to get in touch:
            </p>

            <div className="space-y-2 w-full">
              <Button
                onClick={() =>
                  window.open("https://mail.google.com/mail/?view=cm&to=Chaliseocean756@gmail.com", "_blank")
                }
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Send Email via Gmail
              </Button>
              <Button
                onClick={() => window.open("https://www.linkedin.com/in/ocean-chalise-045a1a303/", "_blank")}
                variant="outline"
                className="w-full"
              >
                LinkedIn Message
              </Button>
              <Button onClick={() => window.open("tel:+9779748202958", "_blank")} variant="outline" className="w-full">
                Call Me
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}
