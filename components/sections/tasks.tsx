"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Calendar, Flag, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: Date
  category: string
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Completar módulo de React",
      description: "Terminar las lecciones 5-8 del curso avanzado",
      completed: false,
      priority: "high",
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      category: "Aprendizaje",
    },
    {
      id: "2",
      title: "Revisar presupuesto mensual",
      completed: true,
      priority: "medium",
      category: "Finanzas",
    },
    {
      id: "3",
      title: "Ejercicio matutino",
      completed: false,
      priority: "medium",
      category: "Salud",
    },
  ])
  const [newTask, setNewTask] = useState("")
  const { toast } = useToast()

  const addTask = () => {
    if (!newTask.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: "medium",
      category: "General",
    }

    setTasks((prev) => [task, ...prev])
    setNewTask("")
    toast({
      title: "Tarea agregada",
      description: "Nueva tarea añadida a tu lista.",
    })
  }

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "low":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const completedTasks = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tareas</h1>
          <p className="text-muted-foreground">
            {completedTasks} de {totalTasks} tareas completadas
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <CheckCircle2 className="w-4 h-4 mr-1" />
          {Math.round((completedTasks / totalTasks) * 100)}% completado
        </Badge>
      </div>

      {/* Agregar nueva tarea */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Agregar Nueva Tarea</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="¿Qué necesitas hacer?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
              className="flex-1"
            />
            <Button onClick={addTask} className="bg-gradient-to-r from-indigo-500 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Agregar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de tareas */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <Card key={task.id} className={`transition-all ${task.completed ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} className="mt-1" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
                      {task.description && <p className="text-sm text-muted-foreground mt-1">{task.description}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        <Flag className="w-3 h-3 mr-1" />
                        {task.priority}
                      </Badge>
                      <Badge variant="secondary">{task.category}</Badge>
                    </div>
                  </div>

                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Vence: {task.dueDate.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No hay tareas</h3>
            <p className="text-muted-foreground">¡Perfecto! No tienes tareas pendientes.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
