"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Goal {
  id: string
  title: string
  description: string
  target: number
  current: number
  category: string
  deadline: string
  unit: string
}

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    category: "Personal",
    deadline: "",
    unit: "unidades",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Cargar metas desde localStorage
    const savedGoals = localStorage.getItem("ceo-vida-goals")
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals)
    localStorage.setItem("ceo-vida-goals", JSON.stringify(updatedGoals))
  }

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target: Number.parseFloat(newGoal.target),
      current: 0,
      category: newGoal.category,
      deadline: newGoal.deadline,
      unit: newGoal.unit,
    }

    saveGoals([...goals, goal])
    setNewGoal({
      title: "",
      description: "",
      target: "",
      category: "Personal",
      deadline: "",
      unit: "unidades",
    })
    setIsAdding(false)
    toast({
      title: "Meta añadida",
      description: "Tu nueva meta ha sido creada exitosamente.",
    })
  }

  const updateProgress = (id: string, increment: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        const newCurrent = Math.min(goal.current + increment, goal.target)
        return { ...goal, current: newCurrent }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  const deleteGoal = (id: string) => {
    saveGoals(goals.filter((goal) => goal.id !== id))
    toast({
      title: "Meta eliminada",
      description: "La meta ha sido eliminada exitosamente.",
    })
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500"
    if (percentage >= 75) return "bg-blue-500"
    if (percentage >= 50) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Personal: "bg-blue-100 text-blue-800",
      Profesional: "bg-green-100 text-green-800",
      Salud: "bg-red-100 text-red-800",
      Financiero: "bg-yellow-100 text-yellow-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Seguimiento de Metas
          </CardTitle>
          <Button onClick={() => setIsAdding(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Meta
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAdding && (
          <Card className="p-4 border-dashed">
            <div className="space-y-3">
              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  placeholder="Título de la meta"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Meta objetivo"
                  value={newGoal.target}
                  onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                />
              </div>
              <Input
                placeholder="Descripción (opcional)"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
              <div className="grid gap-3 md:grid-cols-3">
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Profesional">Profesional</SelectItem>
                    <SelectItem value="Salud">Salud</SelectItem>
                    <SelectItem value="Financiero">Financiero</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Unidad (ej: kg, horas)"
                  value={newGoal.unit}
                  onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                />
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addGoal} size="sm">
                  Crear Meta
                </Button>
                <Button onClick={() => setIsAdding(false)} variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            </div>
          </Card>
        )}

        {goals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No tienes metas definidas aún.</p>
            <p className="text-sm">¡Crea tu primera meta para empezar a hacer seguimiento!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => {
              const percentage = (goal.current / goal.target) * 100
              const isCompleted = percentage >= 100
              const isOverdue = goal.deadline && new Date(goal.deadline) < new Date() && !isCompleted

              return (
                <Card
                  key={goal.id}
                  className={`p-4 ${isCompleted ? "bg-green-50 dark:bg-green-950" : isOverdue ? "bg-red-50 dark:bg-red-950" : ""}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <Badge className={getCategoryColor(goal.category)}>{goal.category}</Badge>
                          {isCompleted && <Badge className="bg-green-100 text-green-800">Completada</Badge>}
                          {isOverdue && <Badge variant="destructive">Vencida</Badge>}
                        </div>
                        {goal.description && <p className="text-sm text-muted-foreground">{goal.description}</p>}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>
                            {goal.current}/{goal.target} {goal.unit}
                          </span>
                          {goal.deadline && <span>Fecha límite: {new Date(goal.deadline).toLocaleDateString()}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateProgress(goal.id, 1)}
                          disabled={isCompleted}
                          className="h-8 w-8"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => deleteGoal(goal.id)} className="h-8 w-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progreso</span>
                        <span>{Math.round(percentage)}%</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
