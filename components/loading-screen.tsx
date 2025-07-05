"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Crown, Sparkles } from "lucide-react"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentTip, setCurrentTip] = useState(0)

  const tips = [
    "Cargando tu dashboard personalizado...",
    "Preparando tus estadísticas...",
    "Sincronizando tus datos...",
    "¡Casi listo para ser el CEO de tu vida!",
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 2
      })
    }, 40)

    const tipTimer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length)
    }, 800)

    return () => {
      clearInterval(timer)
      clearInterval(tipTimer)
    }
  }, [tips.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        {/* Logo animado */}
        <div className="relative">
          <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce-gentle">
            <Crown className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
          </div>
        </div>

        {/* Título */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            CEO de Mi Vida
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Tu asistente personal inteligente</p>
        </div>

        {/* Barra de progreso */}
        <div className="w-80 mx-auto space-y-4">
          <Progress value={progress} className="h-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">{tips[currentTip]}</p>
        </div>

        {/* Estadísticas de carga */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-indigo-600">12</div>
            <div className="text-xs text-gray-500">Módulos</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-600">AI</div>
            <div className="text-xs text-gray-500">Powered</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-600">24/7</div>
            <div className="text-xs text-gray-500">Disponible</div>
          </div>
        </div>
      </div>
    </div>
  )
}
