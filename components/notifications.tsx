"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { useTasks } from "@/hooks/use-tasks"
import { useHabits } from "@/hooks/use-habits"

interface Notification {
  id: string
  type: "success" | "warning" | "info"
  title: string
  message: string
  timestamp: Date
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const { tasks } = useTasks()
  const { habits } = useHabits()

  useEffect(() => {
    // Generar notificaciones basadas en el estado actual
    const newNotifications: Notification[] = []

    // Tareas vencidas
    const overdueTasks = tasks.filter((t) => !t.completed && t.dueDate && new Date(t.dueDate) < new Date())

    if (overdueTasks.length > 0) {
      newNotifications.push({
        id: "overdue-tasks",
        type: "warning",
        title: "Tareas Vencidas",
        message: `Tienes ${overdueTasks.length} tarea(s) vencida(s)`,
        timestamp: new Date(),
      })
    }

    // Hábitos sin completar hoy
    const today = new Date().toDateString()
    const todayHabits = habits.filter((h) => new Date(h.date).toDateString() === today)
    const uncompletedHabits = todayHabits.filter((h) => !h.completed)

    if (uncompletedHabits.length > 0 && new Date().getHours() >= 18) {
      newNotifications.push({
        id: "incomplete-habits",
        type: "info",
        title: "Hábitos Pendientes",
        message: `Te quedan ${uncompletedHabits.length} hábito(s) por completar hoy`,
        timestamp: new Date(),
      })
    }

    setNotifications(newNotifications)
  }, [tasks, habits])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="relative h-9 w-9">
        <Bell className="h-4 w-4" />
        {notifications.length > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">{notifications.length}</Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center justify-between">
              Notificaciones
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6">
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No hay notificaciones nuevas</p>
            ) : (
              notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeNotification(notification.id)}
                    className="h-6 w-6"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
