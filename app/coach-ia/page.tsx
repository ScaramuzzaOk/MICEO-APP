"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Brain, Send, Mic, MicOff, User, Bot, Sparkles, Target, TrendingUp, Heart } from "lucide-react"
import SpeechRecognition from "speech-recognition"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  type?: "analysis" | "motivation" | "advice"
}

interface AIMemory {
  goals: number
  achievements: number
  conversations: number
  personality: string
}

export default function CoachIAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy tu Coach IA personal. Estoy aquí para ayudarte a alcanzar tus metas y convertirte en el CEO de tu vida. ¿En qué puedo ayudarte hoy?",
      role: "assistant",
      timestamp: new Date(),
      type: "motivation",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [aiMemory] = useState<AIMemory>({
    goals: 0,
    achievements: 0,
    conversations: 1,
    personality: "Motivador Y Empático",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined" && SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "es-ES"

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInput(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const toggleListening = () => {
    if (!recognitionRef.current) return

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/coach-ia/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          memory: aiMemory,
        }),
      })

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.content,
        role: "assistant",
        timestamp: new Date(),
        type: data.type || "advice",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        role: "assistant",
        timestamp: new Date(),
        type: "advice",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case "analysis":
        return <TrendingUp className="h-4 w-4 text-blue-400" />
      case "motivation":
        return <Sparkles className="h-4 w-4 text-purple-400" />
      case "advice":
        return <Target className="h-4 w-4 text-green-400" />
      default:
        return <Brain className="h-4 w-4 text-blue-400" />
    }
  }

  const getMessageTypeLabel = (type?: string) => {
    switch (type) {
      case "analysis":
        return "Análisis"
      case "motivation":
        return "Motivación"
      case "advice":
        return "Consejo"
      default:
        return "Respuesta"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-slate-800/50 bg-gradient-to-r from-slate-900/50 to-purple-900/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Coach IA Personal
                </h1>
                <p className="text-sm text-slate-400">Tu asistente inteligente con memoria infinita</p>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1">
              <Sparkles className="h-3 w-3 mr-1" />
              IA Avanzada
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Chat Messages */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 border-slate-800/50 backdrop-blur-sm min-h-[500px] flex flex-col">
          <CardContent className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[500px]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-auto"
                      : "bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-700/50"
                  }`}
                >
                  {message.role === "assistant" && message.type && (
                    <div className="flex items-center gap-2 mb-2 text-xs">
                      {getMessageIcon(message.type)}
                      <span className="text-slate-400">{getMessageTypeLabel(message.type)}</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <div className="text-xs text-slate-400 mt-2">
                    {message.timestamp.toLocaleTimeString("es-ES", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                {message.role === "user" && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600">
                    <AvatarFallback>
                      <User className="h-4 w-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600">
                  <AvatarFallback>
                    <Bot className="h-4 w-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-700/50 rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    Analizando y pensando...
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="border-t border-slate-800/50 p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? "Escuchando..." : "Escribe tu mensaje o usa el micrófono..."}
                  className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 pr-12"
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleListening}
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                    isListening ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Memory Panel */}
        <Card className="bg-gradient-to-br from-slate-900/30 to-purple-900/20 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Brain className="h-5 w-5 text-purple-400" />
              Memoria IA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Metas</div>
                <div className="text-lg font-semibold text-blue-400">{aiMemory.goals} registradas</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Logros</div>
                <div className="text-lg font-semibold text-green-400">{aiMemory.achievements} completados</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Conversaciones</div>
                <div className="text-lg font-semibold text-purple-400">{aiMemory.conversations} mensajes</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-slate-400 mb-1">Personalidad</div>
                <div className="text-sm font-semibold text-orange-400 flex items-center justify-center gap-1">
                  <Heart className="h-3 w-3" />
                  {aiMemory.personality}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
