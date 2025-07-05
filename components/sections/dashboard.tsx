"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Target, Clock, BookOpen, Zap, Trophy, Calendar, CheckCircle, Star, ArrowRight } from "lucide-react"
import { useGamification } from "@/components/gamification-provider"

export function Dashboard() {
  const { level, xp, streak, achievements } = useGamification()

  const quickStats = [
    {
      title: "Tareas Semanales",
      value: "12",
      total: "15",
      progress: 80,
      icon: CheckCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cursos",
      value: "2",
      total: "4",
      progress: 50,
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Libros",
      value: "3",
      total: "5",
      progress: 60,
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const coursesInProgress = [
    {
      title: "Curso de React Avanzado",
      category: "Programación",
      progress: 75,
      rating: 4.8,
      timeRemaining: "2h 30m restante",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Finanzas Personales",
      category: "Finanzas",
      progress: 45,
      rating: 4.6,
      timeRemaining: "4h 15m restante",
      color: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header con estadísticas del usuario */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-muted-foreground mt-1">
            Continúa tu camino hacia el éxito. Tienes {streak} días de racha.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="px-3 py-1">
            <Trophy className="w-4 h-4 mr-1" />
            Nivel {level}
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <Zap className="w-4 h-4 mr-1" />
            {xp} XP
          </Badge>
        </div>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold">
                  {stat.value}
                  <span className="text-sm text-muted-foreground ml-1">de {stat.total} completados</span>
                </div>
              </div>
              <Progress value={stat.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{stat.progress}% completado</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cursos en progreso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Cursos en Progreso
          </CardTitle>
          <CardDescription>Continúa con tu aprendizaje y desarrollo profesional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {coursesInProgress.map((course, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{course.rating}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" className={`bg-gradient-to-r ${course.color} text-white`}>
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{course.progress}% completado</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.timeRemaining}
                  </span>
                  <span>{Math.round((course.progress * 18) / 100)}/18 lecciones</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Herramientas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
              <Target className="w-5 h-5" />
              Finanzas Personales
            </CardTitle>
            <CardDescription>Gestiona tu presupuesto y alcanza tus metas financieras</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Presupuesto mensual</span>
                <span className="font-semibold">40% completado</span>
              </div>
              <Progress value={40} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6/15 lecciones</span>
                <span>Continuar</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
              <Calendar className="w-5 h-5" />
              Exportar Datos
            </CardTitle>
            <CardDescription>Descarga tu progreso y estadísticas en diferentes formatos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Configuración</span>
                <span className="font-semibold">Continuar</span>
              </div>
              <Progress value={100} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Listo para exportar</span>
                <span>Descargar</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
