"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface NutritionChartProps {
  current: {
    calories: number
    protein: number
    carbs: number
    fats: number
  }
  goals: {
    calories: number
    protein: number
    carbs: number
    fats: number
  }
}

export function NutritionChart({ current, goals }: NutritionChartProps) {
  const getPercentage = (current: number, goal: number) => {
    return goal > 0 ? Math.min((current / goal) * 100, 100) : 0
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500"
    if (percentage >= 70) return "bg-blue-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-gray-400"
  }

  const macros = [
    {
      name: "Calorías",
      current: current.calories,
      goal: goals.calories,
      unit: "kcal",
      color: "from-red-500 to-pink-500",
    },
    {
      name: "Proteínas",
      current: current.protein,
      goal: goals.protein,
      unit: "g",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Carbohidratos",
      current: current.carbs,
      goal: goals.carbs,
      unit: "g",
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Grasas",
      current: current.fats,
      goal: goals.fats,
      unit: "g",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div className="space-y-4">
      {macros.map((macro) => {
        const percentage = getPercentage(macro.current, macro.goal)
        return (
          <div key={macro.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${macro.color} text-white border-0`} size="sm">
                  {macro.name}
                </Badge>
                <span className="text-sm font-medium">
                  {Math.round(macro.current)}/{macro.goal} {macro.unit}
                </span>
              </div>
              <span className="text-sm font-semibold text-muted-foreground">{Math.round(percentage)}%</span>
            </div>
            <div className="relative">
              <Progress value={percentage} className="h-2 bg-muted/30" />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r ${macro.color} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
