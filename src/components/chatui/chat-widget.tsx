"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Smile, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatWidgetProps {
  primaryColor?: string
  title?: string
  avatar?: string
}

export default function ChatWidget({
  primaryColor = "hsl(var(--primary))",
  title = "AI Assistant",
  avatar = "/friendly-ai-assistant.png",
}: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: "2",
      text: "I'm looking for information about your services.",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: "3",
      text: "We provide web development, mobile apps, and AI solutions. Which one interests you?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [messages, isOpen, isTyping])

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello")) {
      return "Hello! How can I assist you today?"
    }
    if (message.includes("service") || message.includes("services")) {
      return "We provide web development, mobile apps, and AI solutions."
    }
    if (message.includes("web") || message.includes("website")) {
      return "We build fast, responsive websites using modern stacks like Next.js + Tailwind."
    }

    return "I'm still learning — can you tell me more?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: selectedFile ? `${inputValue} [File: ${selectedFile.name}]` : inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setSelectedFile(null)
    setIsTyping(true)

    // Simulate API delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(userMessage.text),
          isUser: false,
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      Math.random() * 200 + 700,
    ) // 700-900ms delay
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const insertEmoji = () => {
    setInputValue((prev) => prev + "😊")
  }

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50",
          isOpen && "rotate-180",
        )}
        style={{ backgroundColor: primaryColor }}
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl border transition-all duration-300 z-40",
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none",
        )}
        style={{ maxHeight: "500px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={title} />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Say hi — I'm here to help!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={cn("flex", message.isUser ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[60%] px-4 py-2 rounded-2xl text-sm",
                    message.isUser
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-muted-foreground rounded-bl-md",
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground px-4 py-2 rounded-2xl rounded-bl-md text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-muted/20">
          {selectedFile && (
            <div className="mb-2 p-2 bg-muted rounded-lg text-xs flex items-center justify-between">
              <span>📎 {selectedFile.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)} className="h-4 w-4 p-0">
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={insertEmoji}
              className="h-10 w-10 p-0 shrink-0"
              aria-label="Add emoji"
            >
              <Smile className="h-4 w-4" />
            </Button>

            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="pr-12 rounded-full border-2 focus:border-primary/50"
                disabled={isTyping}
              />
            </div>

            <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" accept="*/*" />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="h-10 w-10 p-0 shrink-0"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </Button>

            <Button
              onClick={handleSendMessage}
              disabled={(!inputValue.trim() && !selectedFile) || isTyping}
              className="h-10 w-10 p-0 rounded-full shrink-0"
              style={{ backgroundColor: primaryColor }}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
