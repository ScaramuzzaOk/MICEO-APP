"use client"

import { useState, useEffect } from "react"
import { db, type Task } from "./use-database"
import { useUser } from "./use-user"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { addXP } = useUser()

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const tasksData = await db.tasks.where("date").between(monthAgo, now).toArray()
        setTasks(tasksData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } catch (error) {
        console.error("Error loading tasks:", error)
      }
    }

    loadTasks()
  }, [])

  const addTask = async (taskData: Omit<Task, "id" | "date"> & { dueTime?: string; type?: string }) => {
    try {
      const newTask: Task = {
        ...taskData,
        date: new Date().toISOString(),
        dueTime: taskData.dueTime,
        type: taskData.type,
      }

      const id = await db.tasks.add(newTask)
      const taskWithId = { ...newTask, id }
      setTasks((prev) => [taskWithId, ...prev])
      return taskWithId
    } catch (error) {
      console.error("Error adding task:", error)
      throw error
    }
  }

  const completeTask = async (id: number) => {
    try {
      await db.tasks.update(id, { completed: true })
      setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: true } : t)))
      await addXP(15)
    } catch (error) {
      console.error("Error completing task:", error)
      throw error
    }
  }

  return {
    tasks,
    addTask,
    completeTask,
  }
}
