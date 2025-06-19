"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Bot, Mail, Phone, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import QuickChat from "./quick-chat"

export default function ChatFallback() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showQuickChat, setShowQuickChat] = useState(false)

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

  if (showQuickChat) {
    return <QuickChat onClose={() => setShowQuickChat(false)} />
  }

  return (
    <>
      {/* Simplified Animated Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Subtle Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-10"></div>

        {/* Main Button */}
        <Button
          onClick={() => setIsChatOpen(true)}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          size="icon"
        >
          <MessageCircle className="h-7 w-7 text-white" />

          {/* Notification Badge */}
          <div className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-white font-bold">💬</span>
          </div>
        </Button>

        {/* Hover Tooltip */}
        <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat with Ocean! 🚀
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      {/* Chat Options Modal - Smaller Size */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-72 h-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header with Clear Close Button */}
          <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <h3 className="font-semibold flex items-center text-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Ocean
            </h3>
            <Button
              onClick={() => setIsChatOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-red-500/40 bg-red-500/30 rounded-full border-2 border-red-300"
              title="Close"
            >
              <X className="h-4 w-4 font-bold" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col items-center text-center">
            <div className="relative mb-3">
              <MessageCircle className="h-10 w-10 text-blue-600" />
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h4 className="font-semibold mb-2 text-base">Let's Connect! 🚀</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Choose how you'd like to get in touch with Ocean:
            </p>

            <div className="space-y-2 w-full">
              <Button
                onClick={() => {
                  setIsChatOpen(false)
                  setShowQuickChat(true)
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 transition-all duration-200 h-10 text-sm"
              >
                <Bot className="mr-2 h-4 w-4" />⚡ Instant Chat Assistant
              </Button>

              <Button
                onClick={() =>
                  window.open("https://mail.google.com/mail/?view=cm&to=Chaliseocean756@gmail.com", "_blank")
                }
                variant="outline"
                className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all duration-200 h-10 text-sm"
              >
                <Mail className="mr-2 h-4 w-4" />
                Send Email via Gmail
              </Button>

              <Button
                onClick={() => window.open("https://www.linkedin.com/in/ocean-chalise-045a1a303/", "_blank")}
                variant="outline"
                className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all duration-200 h-10 text-sm"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn Message
              </Button>

              <Button
                onClick={() => window.open("tel:+9779748202958", "_blank")}
                variant="outline"
                className="w-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transform hover:scale-105 transition-all duration-200 h-10 text-sm"
              >
                <Phone className="mr-2 h-4 w-4" />
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
