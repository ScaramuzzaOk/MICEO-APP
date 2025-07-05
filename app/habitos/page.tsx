"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CheckCircle,
  Circle,
  Plus,
  Target,
  TrendingUp,
  Flame,
  Clock,
  Star,
  Edit,
  BarChart3,
  Activity,
  Zap,
} from "lucide-react"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts"

// Datos de ejemplo para el progreso semanal
const weeklyProgressData = [
  { day: "Lun", completados: 3, total: 4 },
  { day: "Mar", completados: 4, total: 4 },
  { day: "Mié", completados: 2, total: 4 },
  { day: "Jue", completados: 4, total: 4 },
  { day: "Vie", completados: 3, total: 4 },
  { day: "Sáb", completados: 1, total: 4 },
  { day: "Dom", completados: 3, total: 4 },
]

// Datos de racha mensual
const streakData = [
  { week: "S1", dias: 5 },
  { week: "S2", dias: 7 },
  { week: "S3", dias: 4 },
  { week: "S4", dias: 6 },
]

interface Habit {
  id: string
  name: string
  description: string
  category: string
  frequency: "daily" | "weekly"
  target: number
  completed: boolean
  streak: number
  bestStreak: number
  weeklyProgress: number
  completedToday: boolean
  icon: string
  color: string
}

export default function HabitosPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Ejercicio Matutino",
      description: "30 minutos de ejercicio cada mañana",
      category: "Salud",
      frequency: "daily",
      target: 7,
      completed: true,
      streak: 12,
      bestStreak: 25,
      weeklyProgress: 71,
      completedToday: true,
      icon: "💪",
      color: "from-green-500 to-green-600",
    },
    {
      id: "2",
      name: "Lectura Diaria",
      description: "Leer al menos 20 páginas",
      category: "Aprendizaje",
      frequency: "daily",
      target: 7,
      completed: false,
      streak: 8,
      bestStreak: 15,
      weeklyProgress: 57,
      completedToday: false,
      icon: "📚",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "3",
      name: "Meditación",
      description: "10 minutos de meditación mindfulness",
      category: "Bienestar",
      frequency: "daily",
      target: 7,
      completed: true,
      streak: 5,
      bestStreak: 18,
      weeklyProgress: 43,
      completedToday: true,
      icon: "🧘",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "4",
      name: "Escribir Diario",
      description: "Reflexionar y escribir pensamientos del día",
      category: "Desarrollo Personal",
      frequency: "daily",
      target: 7,
      completed: false,
      streak: 3,
      bestStreak: 12,
      weeklyProgress: 29,
      completedToday: false,
      icon: "✍️",
      color: "from-orange-500 to-orange-600",
    },
  ])

  const [showNewHabitDialog, setShowNewHabitDialog] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()

  // Nuevo hábito form
  const [newHabit, setNewHabit] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "daily" as "daily" | "weekly",
    target: 7,
    icon: "⭐",
  })

  const toggleHabitCompletion = (habitId: string) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            }
          : habit,
      ),
    )
  }

  const addNewHabit = () => {
    if (!newHabit.name.trim()) return

    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      category: newHabit.category || "General",
      frequency: newHabit.frequency,
      target: newHabit.target,
      completed: false,
      streak: 0,
      bestStreak: 0,
      weeklyProgress: 0,
      completedToday: false,
      icon: newHabit.icon,
      color: "from-gray-500 to-gray-600",
    }

    setHabits((prev) => [...prev, habit])
    setNewHabit({
      name: "",
      description: "",
      category: "",
      frequency: "daily",
      target: 7,
      icon: "⭐",
    })
    setShowNewHabitDialog(false)
  }

  // Estadísticas
  const completedToday = habits.filter((h) => h.completedToday).length
  const totalHabits = habits.length
  const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0
  const bestStreak = Math.max(...habits.map((h) => h.bestStreak))
  const activeStreaks = habits.filter((h) => h.streak > 0).length

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Hábitos
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            {completedToday} de {totalHabits} hábitos completados hoy
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-slate-400">{completionRate}% hoy</span>
            </div>
          </div>
          <Button
            onClick={() => setShowNewHabitDialog(true)}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Hábito
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-400" />
              <span className="text-xs text-slate-400">Completados Hoy</span>
            </div>
            <div className="text-lg md:text-xl font-bold text-green-400">{completedToday}</div>
            <div className="text-xs text-slate-400">de {totalHabits} hábitos</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-xs text-slate-400">Mejor Racha</span>
            </div>
            <div className="text-lg md:text-xl font-bold text-orange-400">{bestStreak}</div>
            <div className="text-xs text-slate-400">días consecutivos</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-slate-400">Rachas Activas</span>
            </div>
            <div className="text-lg md:text-xl font-bold text-purple-400">{activeStreaks}</div>
            <div className="text-xs text-slate-400">en progreso</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-500/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-slate-400">Tasa de Éxito</span>
            </div>
            <div className="text-lg md:text-xl font-bold text-yellow-400">{completionRate}%</div>
            <div className="text-xs text-slate-400">esta semana</div>
          </CardContent>
        </Card>
      </div>

      {/* Progreso Semanal */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              <CardTitle className="text-lg">Progreso Semanal</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
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
                  <Bar
                    dataKey="completados"
                    fill="url(#greenGradient)"
                    name="Completados"
                    radius={[4, 4, 0, 0]}
                    stroke="#10b981"
                    strokeWidth={1}
                  />
                  <Bar
                    dataKey="total"
                    fill="url(#grayGradient)"
                    name="Total"
                    radius={[4, 4, 0, 0]}
                    stroke="#6b7280"
                    strokeWidth={1}
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                    <linearGradient id="grayGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6b7280" />
                      <stop offset="100%" stopColor="#4b5563" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-lg">Tendencia de Rachas</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={streakData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="week" stroke="#64748b" />
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
                    dataKey="dias"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Hábitos */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <div>
                <CardTitle className="text-lg">Mis Hábitos</CardTitle>
                <CardDescription className="text-sm">Construye tu rutina diaria perfecta</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`rounded-lg p-4 space-y-3 transition-all duration-300 border ${
                habit.completedToday
                  ? "bg-gradient-to-r from-green-600/10 to-green-800/10 border-green-500/30 shadow-lg"
                  : "bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-700/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleHabitCompletion(habit.id)}
                    className="hover:scale-110 transition-all duration-200 cursor-pointer"
                  >
                    {habit.completedToday ? (
                      <CheckCircle className="h-6 w-6 text-green-400 drop-shadow-lg" />
                    ) : (
                      <Circle className="h-6 w-6 text-slate-400 hover:text-green-400 transition-colors" />
                    )}
                  </button>
                  <div className="text-2xl">{habit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{habit.name}</h3>
                    <p className="text-sm text-slate-400">{habit.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span className="text-sm font-semibold">{habit.streak} días</span>
                    </div>
                    <div className="text-xs text-slate-400">Mejor: {habit.bestStreak} días</div>
                  </div>
                  {habit.completedToday && (
                    <Badge className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                      Completado
                    </Badge>
                  )}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-700/50">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50">
                    {habit.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{habit.frequency === "daily" ? "Diario" : "Semanal"}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-slate-300">{habit.weeklyProgress}%</div>
                  <div className="text-xs text-slate-400">esta semana</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progreso semanal</span>
                  <span>{habit.weeklyProgress}%</span>
                </div>
                <Progress value={habit.weeklyProgress} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dialog Nuevo Hábito */}
      <Dialog open={showNewHabitDialog} onOpenChange={setShowNewHabitDialog}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 max-w-2xl backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Nuevo Hábito
            </DialogTitle>
            <DialogDescription>Crea un nuevo hábito para mejorar tu rutina diaria</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Hábito *</Label>
                <Input
                  id="name"
                  placeholder="Ej: Ejercicio matutino"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  className="bg-slate-800/50 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icon">Emoji</Label>
                <Input
                  id="icon"
                  placeholder="⭐"
                  value={newHabit.icon}
                  onChange={(e) => setNewHabit({ ...newHabit, icon: e.target.value })}
                  className="bg-slate-800/50 border-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Describe tu hábito..."
                value={newHabit.description}
                onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                className="bg-slate-800/50 border-slate-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Categoría</Label>
                <Input
                  placeholder="Ej: Salud, Aprendizaje..."
                  value={newHabit.category}
                  onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
                  className="bg-slate-800/50 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label>Frecuencia</Label>
                <Select
                  value={newHabit.frequency}
                  onValueChange={(value) => setNewHabit({ ...newHabit, frequency: value as "daily" | "weekly" })}
                >
                  <SelectTrigger className="bg-slate-800/50 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diario</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={addNewHabit}
                disabled={!newHabit.name.trim()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 flex-1 shadow-lg"
              >
                Crear Hábito
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewHabitDialog(false)}
                className="border-slate-700 hover:bg-slate-700/50"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
