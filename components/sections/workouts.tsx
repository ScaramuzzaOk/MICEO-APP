"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dumbbell, Clock, Target, TrendingUp, Play, Calendar } from "lucide-react"

interface Workout {
  id: string
  name: string
  type: "strength" | "cardio" | "flexibility" | "hiit"
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  calories: number
  exercises: number
}

export function Workouts() {
  const workouts: Workout[] = [
    {
      id: "1",
      name: "Entrenamiento de Fuerza - Tren Superior",
      type: "strength",
      duration: 45,
      difficulty: "intermediate",
      completed: false,
      calories: 320,
      exercises: 8,
    },
    {
      id: "2",
      name: "Cardio HIIT Intenso",
      type: "hiit",
      duration: 30,
      difficulty: "advanced",
      completed: true,
      calories: 400,
      exercises: 6,
    },
    {
      id: "3",
      name: "Yoga y Flexibilidad",
      type: "flexibility",
      duration: 25,
      difficulty: "beginner",
      completed: false,
      calories: 150,
      exercises: 10,
    },
  ]

  const weeklyStats = {
    workoutsCompleted: 4,
    totalWorkouts: 6,
    caloriesBurned: 1250,
    totalMinutes: 180,
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "strength":
        return "from-red-500 to-orange-600"
      case "cardio":
        return "from-blue-500 to-cyan-600"
      case "flexibility":
        return "from-green-500 to-emerald-600"
      case "hiit":
        return "from-purple-500 to-pink-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "strength":
        return "Fuerza"
      case "cardio":
        return "Cardio"
      case "flexibility":
        return "Flexibilidad"
      case "hiit":
        return "HIIT"
      default:
        return "General"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-50"
      case "intermediate":
        return "text-yellow-600 bg-yellow-50"
      case "advanced":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Entrenamiento</h1>
          <p className="text-muted-foreground">Mantén tu cuerpo fuerte y saludable</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Dumbbell className="w-4 h-4 mr-1" />
          {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts} esta semana
        </Badge>
      </div>

      {/* Estadísticas semanales */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progreso Semanal
          </CardTitle>
          <CardDescription>Tu rendimiento y consistencia en el entrenamiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{weeklyStats.workoutsCompleted}</div>
              <div className="text-xs text-muted-foreground">Entrenamientos</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{weeklyStats.caloriesBurned}</div>
              <div className="text-xs text-muted-foreground">Calorías</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{weeklyStats.totalMinutes}</div>
              <div className="text-xs text-muted-foreground">Minutos</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Completado</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meta semanal</span>
              <span className="font-medium">
                {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}
              </span>
            </div>
            <Progress value={(weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Lista de entrenamientos */}
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`h-1 bg-gradient-to-r ${getTypeColor(workout.type)}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{workout.name}</h3>
                      {workout.completed && <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(workout.type)}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        <span>{workout.exercises} ejercicios</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className={`bg-gradient-to-r ${getTypeColor(workout.type)} text-white`}
                    disabled={workout.completed}
                  >
                    {workout.completed ? (
                      "Completado"
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Comenzar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendario de entrenamientos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Próximos Entrenamientos
          </CardTitle>
          <CardDescription>Tu plan de entrenamiento para los próximos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Mañana - Cardio Matutino</p>
                <p className="text-sm text-muted-foreground">30 min • Intensidad media</p>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Miércoles - Fuerza Tren Inferior</p>
                <p className="text-sm text-muted-foreground">45 min • Alta intensidad</p>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
