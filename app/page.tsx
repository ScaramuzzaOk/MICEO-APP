"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle,
  Star,
  Brain,
  Zap,
  Activity,
  Award,
  Clock,
  AlertCircle,
  Loader2,
  BarChart3,
} from "lucide-react"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Datos de progreso semanal
const weeklyProgressData = [
  { day: "Lun", habitos: 3, productividad: 85, finanzas: 70, general: 75 },
  { day: "Mar", habitos: 4, productividad: 90, finanzas: 75, general: 80 },
  { day: "Mié", habitos: 2, productividad: 60, finanzas: 65, general: 65 },
  { day: "Jue", habitos: 4, productividad: 95, finanzas: 80, general: 85 },
  { day: "Vie", habitos: 3, productividad: 80, finanzas: 85, general: 82 },
  { day: "Sáb", habitos: 1, productividad: 40, finanzas: 60, general: 50 },
  { day: "Dom", habitos: 3, productividad: 75, finanzas: 70, general: 73 },
]

// Datos nutricionales
const nutritionData = [
  { name: "Consumidas", value: 1850, color: "#ef4444" },
  { name: "Restantes", value: 350, color: "#64748b" },
]

const macroData = [
  { name: "Proteínas", value: 120, percentage: 80, color: "#3b82f6", target: 150 },
  { name: "Carbohidratos", value: 230, percentage: 84, color: "#10b981", target: 275 },
  { name: "Grasas", value: 65, percentage: 89, color: "#f59e0b", target: 73 },
]

export default function DashboardPage() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const [aiReport, setAiReport] = useState("")
  const [reportError, setReportError] = useState("")
  const [nutritionView, setNutritionView] = useState<"calories" | "macros">("calories")

  // Función para generar reporte con IA
  const generateAIReport = async () => {
    setIsGeneratingReport(true)
    setReportError("")
    setAiReport("")

    try {
      const response = await fetch("/api/ai/weekly-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weeklyData: weeklyProgressData,
          nutritionData: {
            calories: { consumed: 1850, target: 2200 },
            macros: macroData,
          },
          habits: {
            completed: 20,
            total: 28,
            streaks: [12, 8, 5, 3],
          },
          tasks: {
            completed: 12,
            total: 15,
          },
          courses: {
            completed: 2,
            total: 4,
            progress: [75, 45],
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Error al generar el análisis")
      }

      const data = await response.json()
      setAiReport(data.analysis)
    } catch (error) {
      console.error("Error generating AI report:", error)
      setReportError("No se pudo generar el análisis. Intenta de nuevo más tarde.")
    } finally {
      setIsGeneratingReport(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            ¡Bienvenido de vuelta!
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Continúa tu camino hacia el éxito. Tienes 0 días de racha.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
            <Award className="h-4 w-4 text-yellow-400" />
            <span className="text-sm font-semibold">Nivel 1</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-semibold">0 XP</span>
          </div>
        </div>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-400" />
                <span className="text-sm text-slate-400">Tareas Semanales</span>
              </div>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white">Tareas</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-400">12</span>
                <span className="text-slate-400">de 15 completadas</span>
              </div>
              <Progress value={80} className="h-2" />
              <div className="text-sm text-blue-400 font-semibold">80% completado</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-400" />
                <span className="text-sm text-slate-400">Cursos</span>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700 text-white">Aprendizaje</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-green-400">2</span>
                <span className="text-slate-400">de 4 completados</span>
              </div>
              <Progress value={50} className="h-2" />
              <div className="text-sm text-green-400 font-semibold">50% completado</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-400" />
                <span className="text-sm text-slate-400">Libros</span>
              </div>
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white">Lectura</Badge>
            </div>
            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-purple-400">3</span>
                <span className="text-slate-400">de 5 completados</span>
              </div>
              <Progress value={60} className="h-2" />
              <div className="text-sm text-purple-400 font-semibold">60% completado</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Análisis de Progreso */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              <div>
                <CardTitle className="text-lg">Análisis de Progreso</CardTitle>
                <CardDescription className="text-sm">Tu rendimiento en las últimas semanas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="habitos"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                    name="Hábitos"
                  />
                  <Line
                    type="monotone"
                    dataKey="productividad"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                    name="Productividad"
                  />
                  <Line
                    type="monotone"
                    dataKey="finanzas"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                    name="Finanzas"
                  />
                  <Line
                    type="monotone"
                    dataKey="general"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    name="General"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Objetivos Nutricionales - Gráfico Inteligente */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-400" />
                <div>
                  <CardTitle className="text-lg">Objetivos Nutricionales</CardTitle>
                  <CardDescription className="text-sm">Progreso diario de macronutrientes y calorías</CardDescription>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={nutritionView === "calories" ? "default" : "outline"}
                  onClick={() => setNutritionView("calories")}
                  className={
                    nutritionView === "calories"
                      ? "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                      : "border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700/50"
                  }
                >
                  <Zap className="h-4 w-4 mr-1" />
                  Calorías
                </Button>
                <Button
                  size="sm"
                  variant={nutritionView === "macros" ? "default" : "outline"}
                  onClick={() => setNutritionView("macros")}
                  className={
                    nutritionView === "macros"
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                      : "border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700/50"
                  }
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Macros
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {nutritionView === "calories" ? (
              <>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-32 h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={nutritionData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="#334155"
                            strokeWidth={2}
                          >
                            {nutritionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-2xl font-bold text-white">1850</div>
                      <div className="text-xs text-slate-400">de 2200 kcal</div>
                      <div className="text-xs text-green-400 font-semibold">84%</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-slate-400">Consumidas: 1850 kcal</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                      <span className="text-sm text-slate-400">Restantes: 350 kcal</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={macroData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #334155",
                          borderRadius: "8px",
                          color: "#ffffff",
                        }}
                        formatter={(value: any, name: string) => [`${value}g`, name]}
                      />
                      <Bar dataKey="value" radius={[4, 4, 0, 0]} stroke="#334155" strokeWidth={1}>
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {macroData.map((macro, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }}></div>
                        <span className="text-xs text-slate-400">
                          {macro.name}: {macro.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-red-400">84%</div>
                <div className="text-xs text-slate-400">Calorías</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-400">80%</div>
                <div className="text-xs text-slate-400">Proteína</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400">84%</div>
                <div className="text-xs text-slate-400">Carbos</div>
              </div>
              <div>
                <div className="text-xl font-bold text-orange-400">89%</div>
                <div className="text-xs text-slate-400">Grasas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cursos en Progreso */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <div>
              <CardTitle className="text-lg">Cursos en Progreso</CardTitle>
              <CardDescription className="text-sm">
                Continúa con tu aprendizaje y desarrollo profesional
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">Curso de React Avanzado</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white text-xs">Programación</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-slate-400">4.8</span>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                Continuar
                <TrendingUp className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progreso</span>
                <span className="font-semibold">75% completado</span>
              </div>
              <Progress value={75} className="h-2" />
              <div className="flex justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>2h 30m restante</span>
                </div>
                <span>14/18 lecciones</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">Finanzas Personales</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">Finanzas</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-slate-400">4.6</span>
                  </div>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                Continuar
                <TrendingUp className="h-4 w-4 ml-2" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Progreso</span>
                <span className="font-semibold">45% completado</span>
              </div>
              <Progress value={45} className="h-2" />
              <div className="flex justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>4h 15m restante</span>
                </div>
                <span>8/18 lecciones</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Finanzas Personales */}
        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border-purple-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Finanzas Personales</h3>
                  <p className="text-sm text-purple-200">Gestiona tu presupuesto y alcanza tus metas financieras</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-purple-200">Presupuesto mensual</span>
                <span className="text-2xl font-bold text-purple-400">40% completado</span>
              </div>
              <Progress value={40} className="h-3 bg-purple-900/50" />
              <div className="flex justify-between text-sm text-purple-300">
                <span>6/15 lecciones</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white bg-transparent"
                >
                  Continuar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Análisis Semanal IA */}
        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Análisis Semanal IA</h3>
                  <p className="text-sm text-green-200">Obtén insights personalizados sobre tu progreso</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-200">Análisis disponible</span>
                <span className="text-2xl font-bold text-green-400">Generar reporte</span>
              </div>
              <Progress value={100} className="h-3 bg-green-900/50" />
              <div className="flex justify-between text-sm text-green-300">
                <span>Datos suficientes</span>
                <Button
                  onClick={generateAIReport}
                  disabled={isGeneratingReport}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
                >
                  {isGeneratingReport ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Ver análisis
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Report Display */}
      {reportError && (
        <Alert className="border-red-500/20 bg-red-500/10 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">{reportError}</AlertDescription>
        </Alert>
      )}

      {aiReport && (
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-400" />
              <CardTitle className="text-lg bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Análisis Semanal IA
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-slate-300 leading-relaxed">{aiReport}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
