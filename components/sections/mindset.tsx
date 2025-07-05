"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, Brain, Target, TrendingUp, BookOpen, Lightbulb, Star } from "lucide-react"

interface MindsetGoal {
  id: string
  title: string
  description: string
  progress: number
  category: "confidence" | "resilience" | "growth" | "focus"
  color: string
}

export function Mindset() {
  const mindsetGoals: MindsetGoal[] = [
    {
      id: "1",
      title: "Desarrollar Confianza",
      description: "Trabajar en la autoestima y seguridad personal",
      progress: 75,
      category: "confidence",
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "2",
      title: "Fortalecer Resiliencia",
      description: "Mejorar la capacidad de recuperación ante adversidades",
      progress: 60,
      category: "resilience",
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "3",
      title: "Mentalidad de Crecimiento",
      description: "Adoptar una perspectiva de aprendizaje continuo",
      progress: 85,
      category: "growth",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "4",
      title: "Mejorar Concentración",
      description: "Desarrollar técnicas de enfoque y atención plena",
      progress: 45,
      category: "focus",
      color: "from-purple-500 to-pink-600",
    },
  ]

  const dailyAffirmations = [
    "Soy capaz de lograr todo lo que me propongo",
    "Cada desafío es una oportunidad de crecimiento",
    "Mi mentalidad positiva atrae el éxito",
    "Tengo el poder de crear mi propia realidad",
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "confidence":
        return Heart
      case "resilience":
        return Target
      case "growth":
        return TrendingUp
      case "focus":
        return Brain
      default:
        return Lightbulb
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "confidence":
        return "Confianza"
      case "resilience":
        return "Resiliencia"
      case "growth":
        return "Crecimiento"
      case "focus":
        return "Concentración"
      default:
        return "General"
    }
  }

  const averageProgress = Math.round(mindsetGoals.reduce((acc, goal) => acc + goal.progress, 0) / mindsetGoals.length)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mentalidad</h1>
          <p className="text-muted-foreground">Desarrolla una mentalidad ganadora y resiliente</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Brain className="w-4 h-4 mr-1" />
          {averageProgress}% progreso general
        </Badge>
      </div>

      {/* Afirmaciones diarias */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Afirmación del Día
          </CardTitle>
          <CardDescription>Comienza tu día con pensamientos positivos y poderosos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-white/50 dark:bg-black/20 rounded-lg">
            <p className="text-lg font-medium italic text-indigo-700 dark:text-indigo-300">"{dailyAffirmations[0]}"</p>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent">
              <Lightbulb className="w-4 h-4 mr-2" />
              Nueva Afirmación
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Objetivos de mentalidad */}
      <div className="grid gap-4">
        {mindsetGoals.map((goal) => {
          const IconComponent = getCategoryIcon(goal.category)
          return (
            <Card key={goal.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className={`h-1 bg-gradient-to-r ${goal.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color} text-white`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <h3 className="text-lg font-semibold">{goal.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryLabel(goal.category)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-indigo-600">{goal.progress}%</div>
                      <div className="text-xs text-muted-foreground">completado</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className={`bg-gradient-to-r ${goal.color} text-white`}>
                      Continuar
                    </Button>
                    <Button variant="outline" size="sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Recursos
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Estadísticas de progreso */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Progreso</CardTitle>
          <CardDescription>Tu evolución en el desarrollo de mentalidad</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mindsetGoals.map((goal) => {
              const IconComponent = getCategoryIcon(goal.category)
              return (
                <div key={goal.id} className="text-center p-4 rounded-lg bg-muted/50">
                  <div
                    className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${goal.color} flex items-center justify-center text-white`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold">{goal.progress}%</div>
                  <div className="text-xs text-muted-foreground">{getCategoryLabel(goal.category)}</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
