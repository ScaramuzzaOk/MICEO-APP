"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Zap, Target } from "lucide-react"

export function NutritionGoalsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [activeView, setActiveView] = useState<"calories" | "macros">("calories")

  // Datos simulados de nutrición
  const nutritionData = {
    calories: {
      current: 1850,
      goal: 2200,
      percentage: 84,
    },
    macros: {
      protein: { current: 120, goal: 150, percentage: 80 },
      carbs: { current: 230, goal: 275, percentage: 84 },
      fats: { current: 65, goal: 73, percentage: 89 },
    },
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    if (activeView === "calories") {
      // Dibujar gráfico circular de calorías
      const percentage = nutritionData.calories.percentage
      const angle = (percentage / 100) * 2 * Math.PI

      // Background circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 12
      ctx.stroke()

      // Progress arc
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + angle)
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 12
      ctx.lineCap = "round"
      ctx.stroke()

      // Center text
      ctx.fillStyle = "#1f2937"
      ctx.font = "bold 24px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${nutritionData.calories.current}`, centerX, centerY - 10)
      ctx.font = "14px sans-serif"
      ctx.fillStyle = "#6b7280"
      ctx.fillText(`de ${nutritionData.calories.goal} kcal`, centerX, centerY + 15)
      ctx.fillText(`${percentage}%`, centerX, centerY + 35)
    } else {
      // Dibujar gráfico de barras de macros
      const macros = Object.entries(nutritionData.macros)
      const barWidth = width / macros.length - 20
      const maxHeight = height - 80

      macros.forEach(([name, data], index) => {
        const x = index * (barWidth + 20) + 20
        const barHeight = (data.percentage / 100) * maxHeight

        // Background bar
        ctx.fillStyle = "#f3f4f6"
        ctx.fillRect(x, 40, barWidth, maxHeight)

        // Progress bar
        const colors = {
          protein: "#3b82f6",
          carbs: "#10b981",
          fats: "#f59e0b",
        }
        ctx.fillStyle = colors[name as keyof typeof colors]
        ctx.fillRect(x, 40 + maxHeight - barHeight, barWidth, barHeight)

        // Labels
        ctx.fillStyle = "#374151"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(name.charAt(0).toUpperCase() + name.slice(1), x + barWidth / 2, height - 25)
        ctx.fillText(`${data.current}g`, x + barWidth / 2, height - 10)
        ctx.fillText(`${data.percentage}%`, x + barWidth / 2, 30)
      })
    }
  }, [activeView])

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex gap-2">
        <Button
          variant={activeView === "calories" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveView("calories")}
          className="flex items-center gap-1"
        >
          <Zap className="w-3 h-3" />
          Calorías
        </Button>
        <Button
          variant={activeView === "macros" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveView("macros")}
          className="flex items-center gap-1"
        >
          <Target className="w-3 h-3" />
          Macros
        </Button>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={280} height={200} className="max-w-full" />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        {activeView === "calories" ? (
          <>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Consumidas: {nutritionData.calories.current} kcal</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded"></div>
              <span>Restantes: {nutritionData.calories.goal - nutritionData.calories.current} kcal</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Proteínas: {nutritionData.macros.protein.percentage}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Carbohidratos: {nutritionData.macros.carbs.percentage}%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Grasas: {nutritionData.macros.fats.percentage}%</span>
            </div>
          </>
        )}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t">
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">{nutritionData.calories.percentage}%</div>
          <div className="text-xs text-muted-foreground">Calorías</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{nutritionData.macros.protein.percentage}%</div>
          <div className="text-xs text-muted-foreground">Proteína</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">{nutritionData.macros.carbs.percentage}%</div>
          <div className="text-xs text-muted-foreground">Carbos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-600">{nutritionData.macros.fats.percentage}%</div>
          <div className="text-xs text-muted-foreground">Grasas</div>
        </div>
      </div>
    </div>
  )
}
