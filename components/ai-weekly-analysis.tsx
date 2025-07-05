"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useHabits } from "@/hooks/use-habits"
import { useFinances } from "@/hooks/use-finances"
import { useTasks } from "@/hooks/use-tasks"
import { useWorkouts } from "@/hooks/use-workouts"
import { useMindset } from "@/hooks/use-mindset"
import { Brain, TrendingUp, AlertTriangle, Target, Lightbulb, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AIInsight {
  type: "success" | "warning" | "improvement" | "goal"
  category: string
  title: string
  description: string
  actionable: string
  priority: "high" | "medium" | "low"
}

interface WeeklyAnalysis {
  week: string
  overallScore: number
  insights: AIInsight[]
  trends: {
    habits: number
    finances: number
    productivity: number
    wellness: number
  }
  recommendations: string[]
}

export function AIWeeklyAnalysis() {
  const [analysis, setAnalysis] = useState<WeeklyAnalysis | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { habits } = useHabits()
  const { finances } = useFinances()
  const { tasks } = useTasks()
  const { workouts } = useWorkouts()
  const { mindsetEntries } = useMindset()
  const { toast } = useToast()

  const generateAnalysis = async () => {
    setIsGenerating(true)

    try {
      // Simulate AI analysis with real data
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - 7)

      const weeklyHabits = habits.filter((h) => new Date(h.date) >= weekStart)
      const weeklyFinances = finances.filter((f) => new Date(f.date) >= weekStart)
      const weeklyTasks = tasks.filter((t) => new Date(t.date) >= weekStart)
      const weeklyWorkouts = workouts.filter((w) => new Date(w.date) >= weekStart)
      const weeklyMindset = mindsetEntries.filter((m) => new Date(m.date) >= weekStart)

      // Calculate metrics
      const habitCompletionRate =
        weeklyHabits.length > 0 ? (weeklyHabits.filter((h) => h.completed).length / weeklyHabits.length) * 100 : 0

      const taskCompletionRate =
        weeklyTasks.length > 0 ? (weeklyTasks.filter((t) => t.completed).length / weeklyTasks.length) * 100 : 0

      const totalIncome = weeklyFinances.filter((f) => f.type === "Ingresos").reduce((sum, f) => sum + f.amount, 0)
      const totalExpenses = weeklyFinances.filter((f) => f.type === "Gastos").reduce((sum, f) => sum + f.amount, 0)
      const financialHealth = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0

      // Generate AI insights
      const insights: AIInsight[] = []

      if (habitCompletionRate >= 80) {
        insights.push({
          type: "success",
          category: "Hábitos",
          title: "Excelente consistencia",
          description: `Has completado ${habitCompletionRate.toFixed(0)}% de tus hábitos esta semana.`,
          actionable: "Mantén este ritmo y considera añadir un nuevo hábito desafiante.",
          priority: "low",
        })
      } else if (habitCompletionRate < 50) {
        insights.push({
          type: "warning",
          category: "Hábitos",
          title: "Consistencia baja",
          description: `Solo has completado ${habitCompletionRate.toFixed(0)}% de tus hábitos.`,
          actionable: "Reduce el número de hábitos y enfócate en 2-3 fundamentales.",
          priority: "high",
        })
      }

      if (weeklyWorkouts.length >= 3) {
        insights.push({
          type: "success",
          category: "Entrenamiento",
          title: "Rutina de ejercicio sólida",
          description: `${weeklyWorkouts.length} sesiones de entrenamiento esta semana.`,
          actionable: "Considera variar los tipos de ejercicio para evitar el estancamiento.",
          priority: "low",
        })
      } else if (weeklyWorkouts.length < 2) {
        insights.push({
          type: "improvement",
          category: "Entrenamiento",
          title: "Actividad física insuficiente",
          description: "Solo has entrenado una vez esta semana.",
          actionable: "Programa al menos 3 sesiones de 30 minutos por semana.",
          priority: "medium",
        })
      }

      if (financialHealth > 20) {
        insights.push({
          type: "success",
          category: "Finanzas",
          title: "Salud financiera positiva",
          description: `Tus ingresos superan tus gastos en ${financialHealth.toFixed(0)}%.`,
          actionable: "Considera aumentar tus inversiones o ahorros.",
          priority: "low",
        })
      } else if (financialHealth < 0) {
        insights.push({
          type: "warning",
          category: "Finanzas",
          title: "Gastos exceden ingresos",
          description: "Estás gastando más de lo que generas.",
          actionable: "Revisa tus gastos y crea un presupuesto estricto.",
          priority: "high",
        })
      }

      if (weeklyMindset.length >= 3) {
        insights.push({
          type: "success",
          category: "Mentalidad",
          title: "Excelente reflexión personal",
          description: `${weeklyMindset.length} reflexiones esta semana.`,
          actionable: "Tus reflexiones muestran un crecimiento personal constante.",
          priority: "low",
        })
      }

      if (taskCompletionRate < 60) {
        insights.push({
          type: "improvement",
          category: "Productividad",
          title: "Gestión de tareas mejorable",
          description: `Solo has completado ${taskCompletionRate.toFixed(0)}% de tus tareas.`,
          actionable: "Usa la técnica Pomodoro y prioriza tareas por impacto.",
          priority: "medium",
        })
      }

      // Calculate overall score
      const overallScore = Math.round(
        habitCompletionRate * 0.3 +
          taskCompletionRate * 0.25 +
          Math.min(financialHealth + 50, 100) * 0.25 +
          Math.min(weeklyWorkouts.length * 20, 100) * 0.2,
      )

      // Generate recommendations
      const recommendations = [
        "Enfócate en completar tus hábitos matutinos antes de revisar el teléfono",
        "Dedica 15 minutos cada domingo a planificar la semana siguiente",
        "Implementa la regla 50/30/20 para tus finanzas (necesidades/deseos/ahorros)",
        "Combina ejercicio con actividades que disfrutes para mantener la consistencia",
        "Practica la reflexión diaria durante 5 minutos antes de dormir",
      ]

      const newAnalysis: WeeklyAnalysis = {
        week: `${weekStart.toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
        overallScore,
        insights: insights.sort((a, b) => {
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        }),
        trends: {
          habits: habitCompletionRate,
          finances: Math.max(financialHealth, 0),
          productivity: taskCompletionRate,
          wellness: Math.min(weeklyWorkouts.length * 25, 100),
        },
        recommendations: recommendations.slice(0, 3),
      }

      setAnalysis(newAnalysis)

      toast({
        title: "Análisis completado",
        description: "Tu reporte semanal ha sido generado con IA.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el análisis.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  useEffect(() => {
    // Auto-generate analysis on component mount if it's Monday
    const today = new Date()
    if (today.getDay() === 1 && !analysis) {
      // Monday
      generateAnalysis()
    }
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "success":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "improvement":
        return <Target className="h-4 w-4 text-yellow-600" />
      case "goal":
        return <Lightbulb className="h-4 w-4 text-blue-600" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Análisis Semanal con IA
          </CardTitle>
          <Button onClick={generateAnalysis} disabled={isGenerating} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Analizando..." : "Generar Análisis"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {!analysis ? (
          <div className="text-center py-8 text-muted-foreground">
            <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Genera tu primer análisis semanal con IA</p>
            <p className="text-sm">Obtén insights personalizados sobre tu progreso</p>
          </div>
        ) : (
          <Tabs defaultValue="insights" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="insights">Insights</TabsTrigger>
              <TabsTrigger value="trends">Tendencias</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            </TabsList>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">Semana: {analysis.week}</h3>
                <p className="text-sm text-muted-foreground">Puntuación general</p>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}/100
              </div>
            </div>

            <TabsContent value="insights" className="space-y-4">
              {analysis.insights.map((insight, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <h4 className="font-semibold">{insight.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{insight.category}</Badge>
                        <Badge className={getPriorityColor(insight.priority)}>{insight.priority}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    <p className="text-sm font-medium text-blue-600">{insight.actionable}</p>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(analysis.trends).map(([key, value]) => (
                  <Card key={key} className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="capitalize font-medium">{key}</span>
                        <span className={`font-bold ${getScoreColor(value)}`}>{value.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            value >= 80 ? "bg-green-500" : value >= 60 ? "bg-yellow-500" : "bg-red-500"
                          }`}
                          style={{ width: `${Math.min(value, 100)}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-4">
              {analysis.recommendations.map((rec, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm">{rec}</p>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
