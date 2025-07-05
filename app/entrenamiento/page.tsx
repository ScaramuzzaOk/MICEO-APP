"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  Clock,
  Flame,
  Target,
  Plus,
  Play,
  CheckCircle,
  Circle,
  Edit,
  Calendar,
  TrendingUp,
  Dumbbell,
  Heart,
  Zap,
} from "lucide-react"

export default function EntrenamientoPage() {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)

  // Datos del progreso semanal
  const weeklyStats = {
    entrenamientos: 4,
    calorias: 1250,
    minutos: 180,
    completado: 67,
    metaSemanal: 6,
  }

  // Entrenamientos de hoy
  const todayWorkouts = [
    {
      id: "fuerza-superior",
      name: "Entrenamiento de Fuerza - Tren Superior",
      category: "Fuerza",
      level: "intermediate",
      duration: 45,
      calories: 320,
      exercises: 4,
      exerciseList: ["Press de banca", "Dominadas", "Remo con barra", "Press militar"],
      completed: false,
      note: "Aumentar peso en press de banca",
      color: "border-red-500",
    },
    {
      id: "cardio-hiit",
      name: "Cardio HIIT Intenso",
      category: "HIIT",
      level: "advanced",
      duration: 30,
      calories: 400,
      exercises: 4,
      exerciseList: ["Burpees", "Mountain climbers", "Jump squats", "High knees"],
      completed: true,
      note: "Excelente sesión, muy sudorosa",
      color: "border-purple-500",
    },
    {
      id: "yoga-flexibilidad",
      name: "Yoga y Flexibilidad",
      category: "Flexibilidad",
      level: "beginner",
      duration: 25,
      calories: 150,
      exercises: 4,
      exerciseList: ["Saludo al sol", "Guerrero I", "Postura del niño", "Torsión espinal"],
      completed: false,
      note: "",
      color: "border-green-500",
    },
  ]

  // Próximos entrenamientos
  const upcomingWorkouts = [
    {
      id: "cardio-matutino",
      name: "Cardio Matutino",
      day: "Mañana",
      duration: 30,
      intensity: "Intensidad media",
      status: "Programado",
    },
    {
      id: "fuerza-inferior",
      name: "Fuerza Tren Inferior",
      day: "Miércoles",
      duration: 45,
      intensity: "Alta intensidad",
      status: "Programado",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "advanced":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case "beginner":
        return "beginner"
      case "intermediate":
        return "intermediate"
      case "advanced":
        return "advanced"
      default:
        return level
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="w-full max-w-none mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Entrenamiento</h1>
            <p className="text-slate-400 text-sm md:text-base">Mantén tu cuerpo fuerte y saludable</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Activity className="h-4 w-4" />
              <span>
                {weeklyStats.entrenamientos}/{weeklyStats.metaSemanal} esta semana
              </span>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Entrenamiento
            </Button>
          </div>
        </div>

        {/* Progreso Semanal */}
        <Card className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border-indigo-800/50">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
              <div>
                <CardTitle className="text-lg text-white">Progreso Semanal</CardTitle>
                <CardDescription className="text-slate-300">
                  Tu rendimiento y consistencia en el entrenamiento
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-400">{weeklyStats.entrenamientos}</div>
                <div className="text-sm text-slate-400">Entrenamientos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-400">{weeklyStats.calorias}</div>
                <div className="text-sm text-slate-400">Calorías</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-400">{weeklyStats.minutos}</div>
                <div className="text-sm text-slate-400">Minutos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-400">{weeklyStats.completado}%</div>
                <div className="text-sm text-slate-400">Completado</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Meta semanal</span>
                <span>
                  {weeklyStats.entrenamientos}/{weeklyStats.metaSemanal}
                </span>
              </div>
              <Progress value={weeklyStats.completado} className="h-2 bg-slate-800" />
            </div>
          </CardContent>
        </Card>

        {/* Entrenamientos de Hoy */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Entrenamientos de Hoy</h2>
          <div className="space-y-4">
            {todayWorkouts.map((workout) => (
              <Card key={workout.id} className={`bg-slate-900/50 border-slate-800 ${workout.color}`}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {workout.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          ) : (
                            <Circle className="h-5 w-5 text-slate-400 flex-shrink-0" />
                          )}
                          <div>
                            <h3 className="font-semibold text-white text-base md:text-lg">{workout.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs bg-slate-800 text-slate-300 border-slate-700">
                                {workout.category}
                              </Badge>
                              <Badge variant="outline" className={`text-xs border ${getLevelColor(workout.level)}`}>
                                {getLevelText(workout.level)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {workout.completed ? (
                            <Badge className="bg-green-600 hover:bg-green-700 text-white">Completado</Badge>
                          ) : (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                              <Play className="h-4 w-4 mr-1" />
                              Comenzar
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="h-4 w-4 text-slate-400" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Flame className="h-4 w-4 text-slate-400" />
                          <span>{workout.calories} cal</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Dumbbell className="h-4 w-4 text-slate-400" />
                          <span>{workout.exercises} ejercicios</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {workout.exerciseList.map((exercise, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-slate-800 text-slate-300 border-slate-700 text-xs"
                          >
                            {exercise}
                          </Badge>
                        ))}
                      </div>

                      {workout.note && <div className="text-sm text-slate-400 italic">"{workout.note}"</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Próximos Entrenamientos */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <div>
                <CardTitle className="text-lg text-white">Próximos Entrenamientos</CardTitle>
                <CardDescription className="text-slate-400">
                  Tu plan de entrenamiento para los próximos días
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{workout.name}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    <span>{workout.day}</span>
                    <span>•</span>
                    <span>{workout.duration} min</span>
                    <span>•</span>
                    <span>{workout.intensity}</span>
                  </div>
                </div>
                <Badge variant="outline" className="bg-slate-700 text-slate-300 border-slate-600">
                  {workout.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats Rápidas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-xs text-slate-400">Cardio</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-red-400">2</div>
              <div className="text-xs text-slate-400">esta semana</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-slate-400">Fuerza</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-blue-400">1</div>
              <div className="text-xs text-slate-400">esta semana</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-slate-400">HIIT</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-yellow-400">1</div>
              <div className="text-xs text-slate-400">esta semana</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-xs text-slate-400">Flexibilidad</span>
              </div>
              <div className="text-lg md:text-xl font-bold text-green-400">0</div>
              <div className="text-xs text-slate-400">esta semana</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
