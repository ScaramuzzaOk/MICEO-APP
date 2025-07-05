"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle2, Target, TrendingUp, Plus } from "lucide-react"

interface Habit {
  id: string
  name: string
  description: string
  streak: number
  completedToday: boolean
  weeklyGoal: number
  weeklyProgress: number
  category: string
  color: string
}

export function Habits() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Ejercicio matutino",
      description: "30 minutos de ejercicio cada mañana",
      streak: 12,
      completedToday: true,
      weeklyGoal: 7,
      weeklyProgress: 5,
      category: "Salud",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "2",
      name: "Lectura diaria",
      description: "Leer al menos 20 páginas",
      streak: 8,
      completedToday: false,
      weeklyGoal: 7,
      weeklyProgress: 4,
      category: "Aprendizaje",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "3",
      name: "Meditación",
      description: "10 minutos de mindfulness",
      streak: 5,
      completedToday: false,
      weeklyGoal: 5,
      weeklyProgress: 3,
      category: "Bienestar",
      color: "from-purple-500 to-pink-600",
    },
  ])

  const toggleHabit = (id: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
              weeklyProgress: !habit.completedToday
                ? Math.min(habit.weeklyGoal, habit.weeklyProgress + 1)
                : Math.max(0, habit.weeklyProgress - 1),
            }
          : habit,
      ),
    )
  }

  const totalHabits = habits.length
  const completedToday = habits.filter((h) => h.completedToday).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hábitos</h1>
          <p className="text-muted-foreground">
            {completedToday} de {totalHabits} hábitos completados hoy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <Target className="w-4 h-4 mr-1" />
            {Math.round((completedToday / totalHabits) * 100)}% hoy
          </Badge>
          <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Hábito
          </Button>
        </div>
      </div>

      {/* Resumen diario */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Progreso de Hoy
          </CardTitle>
          <CardDescription>Tu consistencia diaria construye el éxito a largo plazo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progreso diario</span>
              <span className="text-2xl font-bold">
                {completedToday}/{totalHabits}
              </span>
            </div>
            <Progress value={(completedToday / totalHabits) * 100} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">{habits.reduce((acc, h) => acc + h.streak, 0)}</p>
                <p className="text-xs text-muted-foreground">Días totales</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{Math.max(...habits.map((h) => h.streak))}</p>
                <p className="text-xs text-muted-foreground">Mejor racha</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">
                  {habits.filter((h) => h.weeklyProgress >= h.weeklyGoal).length}
                </p>
                <p className="text-xs text-muted-foreground">Metas semanales</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de hábitos */}
      <div className="grid gap-4">
        {habits.map((habit) => (
          <Card key={habit.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`h-1 bg-gradient-to-r ${habit.color}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{habit.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {habit.category}
                      </Badge>
                      {habit.completedToday && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{habit.description}</p>

                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-orange-500" />
                        <span className="font-medium">{habit.streak} días</span>
                        <span className="text-muted-foreground">de racha</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="font-medium">
                          {habit.weeklyProgress}/{habit.weeklyGoal}
                        </span>
                        <span className="text-muted-foreground">esta semana</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => toggleHabit(habit.id)}
                    variant={habit.completedToday ? "default" : "outline"}
                    className={
                      habit.completedToday
                        ? "bg-green-600 hover:bg-green-700"
                        : `bg-gradient-to-r ${habit.color} text-white hover:opacity-90`
                    }
                  >
                    {habit.completedToday ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Completado
                      </>
                    ) : (
                      "Marcar como hecho"
                    )}
                  </Button>
                </div>

                {/* Progreso semanal */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progreso semanal</span>
                    <span className="font-medium">{Math.round((habit.weeklyProgress / habit.weeklyGoal) * 100)}%</span>
                  </div>
                  <Progress value={(habit.weeklyProgress / habit.weeklyGoal) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
