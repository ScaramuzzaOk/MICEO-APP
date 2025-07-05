"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Send, Bot, User, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "voice"
}

interface AIMemory {
  userGoals: string[]
  preferences: string[]
  achievements: string[]
  challenges: string[]
  personality: string
}

export function AICoachChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy tu Coach IA personal. Estoy aquí para ayudarte a alcanzar tus metas y convertirte en el CEO de tu vida. ¿En qué puedo ayudarte hoy?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [aiMemory, setAiMemory] = useState<AIMemory>({
    userGoals: [],
    preferences: [],
    achievements: [],
    challenges: [],
    personality: "motivador y empático",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const { toast } = useToast()

  // Configurar reconocimiento de voz
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "es-ES"

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
        toast({
          title: "Error de reconocimiento de voz",
          description: "No se pudo procesar el audio. Intenta de nuevo.",
          variant: "destructive",
        })
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [toast])

  // Auto-scroll a los mensajes más recientes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Reconocimiento de voz no disponible",
        description: "Tu navegador no soporta reconocimiento de voz.",
        variant: "destructive",
      })
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simular procesamiento IA con memoria contextual
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    // Analizar el mensaje del usuario para actualizar la memoria
    const lowerMessage = userMessage.toLowerCase()

    // Detectar metas
    if (lowerMessage.includes("quiero") || lowerMessage.includes("meta") || lowerMessage.includes("objetivo")) {
      const newGoal = userMessage
      setAiMemory((prev) => ({
        ...prev,
        userGoals: [...prev.userGoals.slice(-4), newGoal], // Mantener últimas 5 metas
      }))
    }

    // Detectar logros
    if (lowerMessage.includes("logré") || lowerMessage.includes("completé") || lowerMessage.includes("terminé")) {
      const achievement = userMessage
      setAiMemory((prev) => ({
        ...prev,
        achievements: [...prev.achievements.slice(-4), achievement],
      }))
    }

    // Respuestas contextuales basadas en la memoria
    const responses = [
      `Entiendo perfectamente. Basándome en lo que me has contado antes, creo que esto se alinea con tus objetivos de crecimiento personal. ¿Cómo te sientes al respecto?`,
      `Excelente pregunta. Recordando nuestras conversaciones anteriores, veo que tienes una mentalidad muy proactiva. Te sugiero que enfoques esto desde la perspectiva de tus fortalezas.`,
      `Me alegra que compartas esto conmigo. He notado un patrón muy positivo en tu desarrollo. ¿Qué estrategia crees que funcionaría mejor para ti?`,
      `Perfecto. Basándome en tu personalidad y lo que hemos discutido, creo que tienes todas las herramientas para superar este desafío. ¿Por dónde te gustaría empezar?`,
      `Interesante perspectiva. Veo que sigues creciendo y evolucionando. Esto me recuerda a algo que mencionaste antes sobre tus metas. ¿Cómo podemos conectar esto con tus objetivos principales?`,
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const aiResponse = await generateAIResponse(inputMessage)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar tu mensaje. Intenta de nuevo.",
        variant: "destructive",
      })
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

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Coach IA Personal
              </h2>
              <p className="text-sm text-muted-foreground font-normal">Tu asistente inteligente con memoria infinita</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              IA Avanzada
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "ai" && (
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600">
                      <AvatarFallback className="bg-transparent">
                        <Bot className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                  </div>

                  {message.sender === "user" && (
                    <Avatar className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600">
                      <AvatarFallback className="bg-transparent">
                        <User className="w-4 h-4 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div ref={messagesEndRef} />
          </ScrollArea>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje o usa el micrófono..."
                  className="pr-12 bg-background"
                  disabled={isLoading}
                />
                <Button
                  onClick={toggleVoiceRecognition}
                  variant="ghost"
                  size="sm"
                  className={`absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                    isListening ? "text-red-500 animate-pulse" : "text-muted-foreground"
                  }`}
                  disabled={isLoading}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {isListening && (
              <p className="text-sm text-muted-foreground mt-2 text-center animate-pulse">
                🎤 Escuchando... Habla ahora
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Panel de memoria IA */}
      <Card className="mt-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Memoria IA
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <p className="font-medium text-muted-foreground mb-1">Metas</p>
              <p className="text-indigo-600">{aiMemory.userGoals.length} registradas</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Logros</p>
              <p className="text-green-600">{aiMemory.achievements.length} completados</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Conversaciones</p>
              <p className="text-purple-600">{messages.length} mensajes</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground mb-1">Personalidad</p>
              <p className="text-orange-600 capitalize">{aiMemory.personality}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
