"use client"

import { useEffect, useRef } from "react"
import { useHabits } from "@/hooks/use-habits"
import { useTasks } from "@/hooks/use-tasks"
import { useWorkouts } from "@/hooks/use-workouts"
import { useFinances } from "@/hooks/use-finances"

export function AnalyticsChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { habits } = useHabits()
  const { tasks } = useTasks()
  const { workouts } = useWorkouts()
  const { finances } = useFinances()

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Get last 7 days data
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date
    })

    const dailyData = last7Days.map((date) => {
      const dateStr = date.toDateString()

      // Calculate daily scores (0-100)
      const dayHabits = habits.filter((h) => new Date(h.date).toDateString() === dateStr)
      const completedHabits = dayHabits.filter((h) => h.completed).length
      const habitScore = dayHabits.length > 0 ? (completedHabits / dayHabits.length) * 100 : 0

      const dayTasks = tasks.filter((t) => new Date(t.date).toDateString() === dateStr)
      const completedTasks = dayTasks.filter((t) => t.completed).length
      const taskScore = dayTasks.length > 0 ? (completedTasks / dayTasks.length) * 100 : 0

      const dayWorkouts = workouts.filter((w) => new Date(w.date).toDateString() === dateStr)
      const workoutScore = Math.min(dayWorkouts.length * 25, 100) // Max 4 workouts = 100%

      const dayFinances = finances.filter((f) => new Date(f.date).toDateString() === dateStr)
      const income = dayFinances.filter((f) => f.type === "Ingresos").reduce((sum, f) => sum + f.amount, 0)
      const expenses = dayFinances.filter((f) => f.type === "Gastos").reduce((sum, f) => sum + f.amount, 0)
      const financeScore = income > 0 ? Math.min(((income - expenses) / income) * 100 + 50, 100) : 50

      return {
        date,
        habitScore,
        productivityScore: (taskScore + workoutScore) / 2,
        financeScore,
        overallScore: (habitScore + taskScore + workoutScore + financeScore) / 4,
      }
    })

    const maxScore = 100
    const stepX = width / (last7Days.length - 1)

    // Draw grid lines
    ctx.strokeStyle = "#E5E7EB"
    ctx.lineWidth = 1
    for (let i = 0; i <= 4; i++) {
      const y = (height - 40) * (i / 4) + 20
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw lines for different metrics
    const metrics = [
      { data: dailyData.map((d) => d.habitScore), color: "#10B981", label: "Hábitos" },
      { data: dailyData.map((d) => d.productivityScore), color: "#3B82F6", label: "Productividad" },
      { data: dailyData.map((d) => d.financeScore), color: "#F59E0B", label: "Finanzas" },
      { data: dailyData.map((d) => d.overallScore), color: "#8B5CF6", label: "General", width: 3 },
    ]

    metrics.forEach((metric) => {
      ctx.strokeStyle = metric.color
      ctx.lineWidth = metric.width || 2
      ctx.beginPath()

      metric.data.forEach((score, index) => {
        const x = index * stepX
        const y = height - 40 - (score / maxScore) * (height - 60)

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.stroke()

      // Draw points
      ctx.fillStyle = metric.color
      metric.data.forEach((score, index) => {
        const x = index * stepX
        const y = height - 40 - (score / maxScore) * (height - 60)
        ctx.beginPath()
        ctx.arc(x, y, 3, 0, 2 * Math.PI)
        ctx.fill()
      })
    })

    // Draw day labels
    ctx.fillStyle = "#6B7280"
    ctx.font = "10px sans-serif"
    ctx.textAlign = "center"
    last7Days.forEach((date, index) => {
      const x = index * stepX
      ctx.fillText(date.toLocaleDateString("es", { weekday: "short" }), x, height - 5)
    })

    // Draw score labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 4; i++) {
      const score = (4 - i) * 25
      const y = (height - 40) * (i / 4) + 25
      ctx.fillText(`${score}%`, width - 5, y)
    }
  }, [habits, tasks, workouts, finances])

  return (
    <div className="space-y-2">
      <canvas ref={canvasRef} width={300} height={180} className="w-full h-36 border rounded" />
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Hábitos</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Productividad</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Finanzas</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-500 rounded"></div>
          <span>General</span>
        </div>
      </div>
    </div>
  )
}
