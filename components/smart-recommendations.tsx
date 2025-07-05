"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Clock, Target, TrendingUp, Lightbulb } from "lucide-react"

export function SmartRecommendations() {
  const recommendations = [
    {
      id: 1,
      type: "routine",
      title: "Optimiza tu rutina matutina",
      description: "Basado en tus hábitos, podrías ganar 30 minutos extra cada mañana",
      priority: "high",
      category: "Productividad",
      action: "Configurar",
      icon: Clock,
    },
    {
      id: 2,
      type: "goal",
      title: "Ajusta tu meta de ejercicio",
      description: "Has superado tu objetivo 3 semanas seguidas. ¡Es hora de subir el nivel!",
      priority: "medium",
      category: "Fitness",
      action: "Actualizar",
      icon: Target,
    },
    {
      id: 3,
      type: "insight",
      title: "Patrón de productividad detectado",
      description: "Eres más productivo los martes y jueves por la tarde",
      priority: "low",
      category: "Análisis",
      action: "Ver detalles",
      icon: TrendingUp,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <Card className="hover-lift">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Recomendaciones IA
        </CardTitle>
        <CardDescription>Sugerencias basadas en tu comportamiento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 hover:from-purple-100 hover:to-indigo-100 dark:hover:from-purple-900/20 dark:hover:to-indigo-900/20 transition-all duration-300"
          >
            <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
              <rec.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium">{rec.title}</h4>
                <Badge className={getPriorityColor(rec.priority)}>
                  {rec.priority === "high" && "Alta"}
                  {rec.priority === "medium" && "Media"}
                  {rec.priority === "low" && "Baja"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {rec.category}
                </Badge>
                <Button size="sm" variant="outline">
                  {rec.action}
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-4 border-t">
          <Button
            variant="ghost"
            className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Ver más recomendaciones
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
