"use client"

import type React from "react"
import { useState } from "react"
import { Moon, Sun, Mail, Phone, Github, Linkedin, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function MaintenancePage() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col min-h-screen">
        {/* Header */}
        <div className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CHALISE
            </h1>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center pt-20 pb-40">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              {/* Building Animation */}
              <div className="mb-12 flex justify-center">
                <div className="relative w-24 h-32">
                  {/* Building Structure */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {/* Building Body */}
                    <div className="w-20 h-24 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg relative">
                      {/* Windows */}
                      <div className="grid grid-cols-2 gap-2 p-3">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 bg-yellow-300 rounded-sm animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s` }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Crane */}
                    <div className="absolute -top-6 right-0 w-12 h-8 border-4 border-orange-500 rounded-full animate-spin" style={{ animationDuration: "3s" }} />
                    {/* Crane Hook */}
                    <div className="absolute -top-8 right-2 w-1 h-4 bg-orange-500 animate-bounce" style={{ animationDelay: "0s" }} />
                  </div>
                </div>
              </div>

              {/* Maintenance Message */}
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Site Under Maintenance
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                We're working on something great!
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                My portfolio is currently undergoing improvements. I'll be back online soon with an even better experience. Thank you for your patience!
              </p>

              {/* Status Indicator */}
              <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-full mb-8 border border-blue-200 dark:border-blue-800">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Currently Updating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">Get In Touch</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                Feel free to reach out to me through any of the following channels:
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    href: "mailto:Chaliseocean756@gmail.com",
                    color: "hover:text-blue-600",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    href: "tel:+977-9748202958",
                    color: "hover:text-green-600",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/chaliseocean",
                    color: "hover:text-blue-700",
                  },
                  {
                    icon: Github,
                    label: "GitHub",
                    href: "https://github.com/chaliseocean",
                    color: "hover:text-gray-800 dark:hover:text-gray-200",
                  },
                  {
                    icon: Youtube,
                    label: "YouTube",
                    href: "https://www.youtube.com/@40A_ocean",
                    color: "hover:text-red-600",
                  },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 transition-colors ${color}`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{label}</span>
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center border-t border-gray-300 dark:border-gray-600 pt-8">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  © 2025 Ocean Chalise. All rights reserved.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                  Portfolio currently under maintenance. Check back soon!
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
