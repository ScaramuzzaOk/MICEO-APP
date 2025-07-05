"use client"

import { useEffect, useRef } from "react"
import type { Workout } from "@/hooks/use-database"

interface WorkoutChartProps {
  workouts: Workout[]
}

export function WorkoutChart({ workouts }: WorkoutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Get last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date
    })

    const dailyData = last7Days.map((date) => {
      const dayWorkouts = workouts.filter((w) => new Date(w.date).toDateString() === date.toDateString())
      return {
        date,
        duration: dayWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0),
        calories: dayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0),
        sessions: dayWorkouts.length,
      }
    })

    const maxDuration = Math.max(...dailyData.map((d) => d.duration), 60)
    const maxCalories = Math.max(...dailyData.map((d) => d.calories), 300)

    // Draw duration bars
    const barWidth = width / 7 - 10
    dailyData.forEach((data, index) => {
      const x = index * (width / 7) + 5
      const barHeight = (data.duration / maxDuration) * (height - 60)

      // Duration bar
      ctx.fillStyle = "#3B82F6"
      ctx.fillRect(x, height - barHeight - 30, barWidth / 2 - 2, barHeight)

      // Calories bar
      const calorieHeight = (data.calories / maxCalories) * (height - 60)
      ctx.fillStyle = "#EF4444"
      ctx.fillRect(x + barWidth / 2 + 2, height - calorieHeight - 30, barWidth / 2 - 2, calorieHeight)

      // Day label
      ctx.fillStyle = "#6B7280"
      ctx.font = "10px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(data.date.toLocaleDateString("es", { weekday: "short" }), x + barWidth / 2, height - 10)

      // Duration label
      if (data.duration > 0) {
        ctx.fillStyle = "#3B82F6"
        ctx.fillText(`${data.duration}m`, x + barWidth / 4, height - barHeight - 35)
      }

      // Calories label
      if (data.calories > 0) {
        ctx.fillStyle = "#EF4444"
        ctx.fillText(`${data.calories}cal`, x + (barWidth * 3) / 4, height - calorieHeight - 35)
      }
    })

    // Legend
    ctx.fillStyle = "#3B82F6"
    ctx.fillRect(10, 10, 15, 10)
    ctx.fillStyle = "#374151"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "left"
    ctx.fillText("Duración (min)", 30, 20)

    ctx.fillStyle = "#EF4444"
    ctx.fillRect(130, 10, 15, 10)
    ctx.fillText("Calorías", 150, 20)
  }, [workouts])

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} width={300} height={200} className="max-w-full border rounded" />
      <p className="text-xs text-muted-foreground mt-2">Últimos 7 días</p>
    </div>
  )
}
