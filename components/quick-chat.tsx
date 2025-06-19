"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"

import { Send, Bot, User, X, Sparkles, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuickChatProps {
  onClose: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

// Pre-made Q&A for instant responses
const quickAnswers: { [key: string]: string } = {
  skills:
    "Ocean's main skills include:\n\n🚀 **Frontend:** HTML, CSS, JavaScript, React\n💻 **Backend:** Node.js, MongoDB\n🎨 **Design:** UI/UX Design\n🔧 **Hardware:** Arduino, Electronics\n⚡ **Other:** Full Stack Development, Database Management",

  projects:
    "Ocean has worked on several exciting projects:\n\n🛒 **E-Commerce Platform** - React, Node.js, MongoDB, Stripe\n📋 **Task Management App** - Next.js, Socket.io, PostgreSQL\n🌤️ **Weather Dashboard** - React, OpenWeather API, Chart.js\n📊 **Social Media Analytics** - Vue.js, Python, FastAPI\n🤖 **AI Chat Assistant** - Python, TensorFlow, Flask\n🚗 **Arduino Robot Cars** - Arduino, Wireless Control Systems",

  education:
    "Ocean's educational background:\n\n🎓 **Higher Education** (2023-2025)\n📍 Prerana College - Currently pursuing\n\n🎓 **Secondary Level** (2021-2023)\n📍 Kalika Model Secondary School - GPA: 3.65/4.0\n\n🎓 **Basic Level** (2015-2020)\n📍 Kalika Model Secondary School - GPA: 4.0/4.0",

  work: "Ocean's work experience:\n\n💼 **Senior Full Stack Developer** at Astranix\n📅 2025 - Present\n📍 Chaubiskoti Bharatpur\n\n✨ **Key Achievements:**\n• Reduced app load time by 40%\n• Led team of 5 developers\n• Implemented CI/CD pipeline\n• Serves 100K+ users",

  contact:
    "Here's how you can reach Ocean:\n\n📧 **Email:** Chaliseocean756@gmail.com\n📱 **Phone:** +977 9748202958\n💼 **LinkedIn:** linkedin.com/in/ocean-chalise-045a1a303/\n💻 **GitHub:** github.com/chaliseocean\n📺 **YouTube:** youtube.com/@40A_ocean",

  about:
    "Ocean Chalise is a passionate tech enthusiast from Nepal! 🇳🇵\n\n👨‍💻 **Role:** Full Stack Developer & UI/UX Designer\n🎯 **Passion:** Creating beautiful, functional web experiences\n🚀 **Journey:** Started with Arduino projects, now building scalable web applications\n💡 **Goal:** Contributing meaningfully to Nepal's tech community\n\n🔥 He loves working across the full stack - from designing intuitive UIs to building robust backend systems!",

  technologies:
    "Ocean works with modern technologies:\n\n**Frontend:**\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Next.js\n• Tailwind CSS, Responsive Design\n\n**Backend:**\n• Node.js, Express.js\n• MongoDB, PostgreSQL\n• RESTful APIs\n\n**Tools & Others:**\n• Git, GitHub\n• Arduino Programming\n• UI/UX Design Principles\n• Full Stack Architecture",

  hire: "Interested in working with Ocean? 🤝\n\n💼 **Available for:**\n• Full Stack Development Projects\n• UI/UX Design Consultation\n• Arduino/IoT Projects\n• Web Application Development\n\n📞 **Get in touch:**\n• Email: Chaliseocean756@gmail.com\n• LinkedIn: Professional inquiries welcome\n• Phone: +977 9748202958\n\n⚡ Ocean is passionate about creating innovative solutions and would love to discuss your project!",
}

const quickQuestions = [
  { text: "Skills?", key: "skills", icon: "🚀" },
  { text: "Projects?", key: "projects", icon: "💻" },
  { text: "Education?", key: "education", icon: "🎓" },
  { text: "Work?", key: "work", icon: "💼" },
  { text: "Contact?", key: "contact", icon: "📞" },
  { text: "About?", key: "about", icon: "👨‍💻" },
  { text: "Tech?", key: "technologies", icon: "⚡" },
  { text: "Hire?", key: "hire", icon: "🤝" },
]

export default function QuickChat({ onClose }: QuickChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [questionsCollapsed, setQuestionsCollapsed] = useState(false)

  // Ref for auto-scrolling to latest messages
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
    }
  }

  // Scroll to bottom whenever messages change or typing status changes
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const findBestAnswer = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase()

    // Check for skill-related keywords
    if (lowerQuestion.includes("skill") || lowerQuestion.includes("technology") || lowerQuestion.includes("tech")) {
      return quickAnswers.skills
    }

    // Check for project-related keywords
    if (lowerQuestion.includes("project") || lowerQuestion.includes("work") || lowerQuestion.includes("built")) {
      return quickAnswers.projects
    }

    // Check for education keywords
    if (
      lowerQuestion.includes("education") ||
      lowerQuestion.includes("study") ||
      lowerQuestion.includes("school") ||
      lowerQuestion.includes("college")
    ) {
      return quickAnswers.education
    }

    // Check for work experience keywords
    if (
      lowerQuestion.includes("job") ||
      lowerQuestion.includes("experience") ||
      lowerQuestion.includes("company") ||
      lowerQuestion.includes("astranix")
    ) {
      return quickAnswers.work
    }

    // Check for contact keywords
    if (
      lowerQuestion.includes("contact") ||
      lowerQuestion.includes("email") ||
      lowerQuestion.includes("phone") ||
      lowerQuestion.includes("reach")
    ) {
      return quickAnswers.contact
    }

    // Check for about keywords
    if (lowerQuestion.includes("about") || lowerQuestion.includes("who") || lowerQuestion.includes("background")) {
      return quickAnswers.about
    }

    // Check for hire keywords
    if (
      lowerQuestion.includes("hire") ||
      lowerQuestion.includes("available") ||
      lowerQuestion.includes("freelance") ||
      lowerQuestion.includes("work together")
    ) {
      return quickAnswers.hire
    }

    return null
  }

  const handleQuickQuestion = (key: string) => {
    const question = quickQuestions.find((q) => q.key === key)?.text || ""
    const answer = quickAnswers[key]

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate typing delay for better UX
    setIsTyping(true)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])

    // Try to find a quick answer
    const quickAnswer = findBestAnswer(input)

    setIsTyping(true)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          quickAnswer ||
          "That's a great question! For detailed information about that topic, I'd recommend checking out Ocean's full portfolio above or contacting him directly. You can reach him at Chaliseocean756@gmail.com or through his LinkedIn profile. He'd be happy to discuss more specific details with you! 😊",
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 600)

    setInput("")
  }

  const resetChat = () => {
    setMessages([])
    setInput("")
    setIsTyping(false)
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-[480px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 flex flex-col">
      {/* Header with Close Button */}
      <div className="flex items-center justify-between p-3 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bot className="h-4 w-4" />
            <Sparkles className="h-2 w-2 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
          </div>
          <h3 className="font-semibold text-sm">Ocean's AI Assistant ⚡</h3>
        </div>
        <div className="flex items-center space-x-1">
          {messages.length > 0 && (
            <Button
              onClick={resetChat}
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/20"
              title="Reset Chat"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white hover:bg-red-500/40 bg-red-500/30 border-2 border-red-300 rounded-full"
            title="Close Chat"
          >
            <X className="h-4 w-4 font-bold" />
          </Button>
        </div>
      </div>

      {/* Chat Messages - Compact with Auto-scroll */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            <div className="relative mb-3">
              <Bot className="h-10 w-10 mx-auto text-blue-600 animate-bounce" />
              <Sparkles className="h-4 w-4 absolute top-0 right-1/2 transform translate-x-6 text-yellow-500 animate-pulse" />
            </div>
            <p className="text-sm mb-1 font-medium">Hi! I'm Ocean's AI assistant! ⚡</p>
            <p className="text-xs text-gray-400">Use quick questions below!</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-2 rounded-lg text-xs leading-relaxed ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
            {message.role === "user" && (
              <div className="flex-shrink-0 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-3 w-3 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
              <Bot className="h-3 w-3 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-1 h-1 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Invisible div for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Compact Horizontal Scrolling Quick Questions */}
      <div className="px-3 py-2 border-t bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">💡 Quick Questions</p>
          <Button
            onClick={() => setQuestionsCollapsed(!questionsCollapsed)}
            variant="ghost"
            size="icon"
            className="h-5 w-5 text-gray-400 hover:text-gray-600"
          >
            {questionsCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
          </Button>
        </div>

        {!questionsCollapsed && (
          <div className="flex space-x-1 overflow-x-auto pb-1 scrollbar-hide">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question.key)}
                disabled={isTyping}
                className="flex-shrink-0 text-xs bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-900/50 dark:hover:to-purple-900/50 transition-all duration-200 transform hover:scale-105 border border-blue-200 dark:border-blue-800 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <span className="mr-1">{question.icon}</span>
                {question.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-3 border-t bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about Ocean..."
            className="flex-1 bg-white dark:bg-gray-700 text-xs h-8"
            disabled={isTyping}
          />
          <Button
            type="submit"
            disabled={isTyping || !input.trim()}
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-8 w-8"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </form>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
