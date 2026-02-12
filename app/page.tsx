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
              {/* Maintenance Worker Animation */}
              <div className="mb-12 flex justify-center">
                <style>{`
                  @keyframes spinGear {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                  @keyframes spinGearReverse {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(-360deg); }
                  }
                  @keyframes holdWrench {
                    0%, 100% { transform: rotate(-30deg); }
                    50% { transform: rotate(-45deg); }
                  }
                  @keyframes bobWorker {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                  }
                  .spin-gear {
                    animation: spinGear 4s linear infinite;
                  }
                  .spin-gear-reverse {
                    animation: spinGearReverse 3s linear infinite;
                  }
                  .hold-wrench {
                    animation: holdWrench 1.5s ease-in-out infinite;
                    transform-origin: center;
                  }
                  .bob-worker {
                    animation: bobWorker 2s ease-in-out infinite;
                  }
                `}</style>
                <div className="relative w-96 h-64">
                  {/* Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg" />

                  {/* Warning Stripes Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-8">
                    <div className="flex h-full">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-full ${i % 2 === 0 ? 'bg-yellow-400' : 'bg-black'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Left Gear (Large) */}
                  <div className="absolute left-4 top-8 spin-gear">
                    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="32" cy="32" r="20" fill="#9ca3af" stroke="#6b7280" strokeWidth="2" />
                      {[...Array(8)].map((_, i) => {
                        const angle = (i * 360) / 8
                        const rad = (angle * Math.PI) / 180
                        const x = 32 + Math.cos(rad) * 24
                        const y = 32 + Math.sin(rad) * 24
                        return (
                          <rect
                            key={i}
                            x={x - 3}
                            y={y - 6}
                            width="6"
                            height="12"
                            fill="#9ca3af"
                            stroke="#6b7280"
                            strokeWidth="1"
                          />
                        )
                      })}
                      <circle cx="32" cy="32" r="8" fill="#6b7280" />
                    </svg>
                  </div>

                  {/* Right Gear (Medium) */}
                  <div className="absolute right-6 top-12 spin-gear-reverse">
                    <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="24" cy="24" r="15" fill="#d1d5db" stroke="#9ca3af" strokeWidth="2" />
                      {[...Array(6)].map((_, i) => {
                        const angle = (i * 360) / 6
                        const rad = (angle * Math.PI) / 180
                        const x = 24 + Math.cos(rad) * 18
                        const y = 24 + Math.sin(rad) * 18
                        return (
                          <rect
                            key={i}
                            x={x - 2.5}
                            y={y - 5}
                            width="5"
                            height="10"
                            fill="#d1d5db"
                            stroke="#9ca3af"
                            strokeWidth="1"
                          />
                        )
                      })}
                      <circle cx="24" cy="24" r="6" fill="#9ca3af" />
                    </svg>
                  </div>

                  {/* Computer/Window */}
                  <div className="absolute left-1/2 top-16 -translate-x-1/2">
                    {/* Monitor Body */}
                    <div className="w-48 bg-gradient-to-b from-purple-500 to-purple-600 rounded-lg shadow-lg overflow-hidden">
                      {/* Monitor Top */}
                      <div className="flex justify-center gap-2 p-2 bg-purple-700">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      {/* Screen */}
                      <div className="bg-purple-400 p-4 h-24 flex items-center justify-center border-4 border-yellow-400">
                        <div className="text-center">
                          <div className="text-yellow-300 font-bold text-sm">UNDER</div>
                          <div className="text-yellow-300 font-bold text-lg">MAINTENANCE</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Worker Figure */}
                  <div className="absolute left-8 bottom-12 bob-worker">
                    {/* Hard Hat */}
                    <div className="w-10 h-6 bg-orange-500 rounded-t-3xl mx-auto border-2 border-orange-600 relative">
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-orange-600 rounded" />
                    </div>
                    {/* Head */}
                    <div className="w-8 h-8 bg-orange-200 rounded-full mx-auto border border-orange-300" />
                    {/* Body */}
                    <div className="w-6 h-8 bg-blue-600 mx-auto border border-blue-700" />
                    {/* Left Arm */}
                    <div className="absolute top-10 left-0 w-1.5 h-6 bg-orange-200 origin-top" style={{ transform: 'rotate(-25deg)' }} />
                    {/* Right Arm (Wrench) */}
                    <div className="absolute top-10 -right-2 hold-wrench">
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-gray-600">
                        <rect x="4" y="8" width="4" height="12" rx="2" />
                        <circle cx="18" cy="10" r="3" />
                        <path d="M 8 8 L 16 6" stroke="#4b5563" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    {/* Legs */}
                    <div className="flex gap-1 mt-1 justify-center">
                      <div className="w-1.5 h-4 bg-gray-800" />
                      <div className="w-1.5 h-4 bg-gray-800" />
                    </div>
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
