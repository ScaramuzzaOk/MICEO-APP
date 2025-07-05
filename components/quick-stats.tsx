"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useHabits } from "@/hooks/use-habits"
import { useFinances } from "@/hooks/use-finances"
import { useTasks } from "@/hooks/use-tasks"
import { useWorkouts } from "@/hooks/use-workouts"
import { CheckCircle, DollarSign, Target, Flame, TrendingUp } from "lucide-react"

export function QuickStats() {
  const { habits } = useHabits()
  const { finances } = useFinances()
  const { tasks } = useTasks()
  const { workouts } = useWorkouts()

  const today = new Date().toDateString()

  const todayHabits = habits.filter((h) => h.completed && new Date(h.date).toDateString() === today).length

  const totalIncome = finances.filter((f) => f.type === "Ingresos").reduce((sum, f) => sum + f.amount, 0)

  const totalExpenses = finances.filter((f) => f.type === "Gastos").reduce((sum, f) => sum + f.amount, 0)

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length

  const weeklyWorkouts = workouts.filter((w) => {
    const workoutDate = new Date(w.date)
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    return workoutDate >= weekAgo
  }).length

  const maxStreak = Math.max(...habits.map((h) => h.streak), 0)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hábitos Hoy</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{todayHabits}</div>
          <p className="text-xs text-muted-foreground">Completados</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <DollarSign className={`h-4 w-4 ${totalIncome - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`} />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${(totalIncome - totalExpenses).toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Este mes</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tareas</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            {completedTasks}/{totalTasks} completadas
          </p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Racha Máxima</CardTitle>
          <Flame className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">{maxStreak}</div>
          <p className="text-xs text-muted-foreground">días consecutivos</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Entrenamiento</CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{weeklyWorkouts}</div>
          <p className="text-xs text-muted-foreground">esta semana</p>
        </CardContent>
      </Card>
    </div>
  )
}
