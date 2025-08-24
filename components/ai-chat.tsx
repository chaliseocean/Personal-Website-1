"use client"
import { useChat } from "ai/react"
import { Send, Bot, User, X, Sparkles, AlertTriangle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface AIChatProps {
  onClose: () => void
}

export default function AIChat({ onClose }: AIChatProps) {
  const [warningMessages, setWarningMessages] = useState<string[]>([])

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    onError: (error) => {
      console.error("Chat error:", error)
    },
    onFinish: (message) => {
      // Check if the response contains a warning
      if (message.content.includes("⚠️") || message.content.includes("🤖")) {
        setWarningMessages((prev) => [...prev, message.id])
      }
    },
  })

  const suggestedQuestions = [
    "What are Ocean's main skills?",
    "Tell me about his Upwork experience",
    "What's his educational background?",
    "What data management services does he offer?",
    "How can I contact Ocean?",
    "What technologies does he use?",
  ]

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
  }

  const isWarningMessage = (messageId: string) => {
    return warningMessages.includes(messageId)
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bot className="h-5 w-5" />
            <Sparkles className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <h3 className="font-semibold">Ocean's AI Assistant</h3>
        </div>
        <Button onClick={onClose} variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            <div className="relative mb-4">
              <Bot className="h-12 w-12 mx-auto text-blue-600" />
              <Sparkles className="h-6 w-6 absolute top-0 right-1/2 transform translate-x-8 text-yellow-500" />
            </div>
            <p className="text-sm mb-4">
              Hi! I'm Ocean's AI assistant. I can answer questions about his professional background, skills, projects,
              and Upwork freelancing experience!
            </p>
            <div className="text-xs bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 p-2 rounded-lg mb-4 border border-yellow-200 dark:border-yellow-800">
              <Shield className="h-3 w-3 inline mr-1" />I maintain a professional environment and only discuss Ocean's
              portfolio. Please keep conversations respectful and relevant.
            </div>

            {/* Suggested Questions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Try asking:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error Message Display */}
        {error && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 rounded-lg rounded-bl-none max-w-[85%]">
              <div className="text-sm text-red-700 dark:text-red-300">
                {error.message ||
                  "I'm sorry, but I can't respond to that. Please ask me about Ocean's professional background, skills, or projects."}
              </div>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  isWarningMessage(message.id)
                    ? "bg-red-100 dark:bg-red-900"
                    : "bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900"
                }`}
              >
                {isWarningMessage(message.id) ? (
                  <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                ) : (
                  <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none"
                  : isWarningMessage(message.id)
                    ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-bl-none"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
              }`}
            >
              <div className="whitespace-pre-wrap">{message.content}</div>
            </div>
            {message.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
              <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Questions (when no messages) */}
      {messages.length === 0 && (
        <div className="px-4 pb-2">
          <div className="flex flex-wrap gap-1">
            {suggestedQuestions.slice(3).map((question, index) => (
              <button
                key={index}
                onClick={() => handleSuggestedQuestion(question)}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me about Ocean's professional background..."
            className="flex-1 bg-white dark:bg-gray-700"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          💡 Ask about Ocean's skills, projects, education, or Upwork experience
        </p>
      </form>
    </div>
  )
}
