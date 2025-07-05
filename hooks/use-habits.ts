"use client"

import { useState, useEffect } from "react"
import { db, type Habit } from "./use-database"
import { useUser } from "./use-user"

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const { addXP } = useUser()

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const habitsData = await db.habits.where("date").between(monthAgo, now).toArray()
        setHabits(habitsData)
      } catch (error) {
        console.error("Error loading habits:", error)
      }
    }

    loadHabits()
  }, [])

  const addHabit = async (habitData: Omit<Habit, "id" | "date" | "completed" | "streak"> & { time?: string }) => {
    try {
      const newHabit: Habit = {
        ...habitData,
        date: new Date().toISOString(),
        completed: false,
        streak: 0,
        time: habitData.time,
      }

      const id = await db.habits.add(newHabit)
      const habitWithId = { ...newHabit, id }
      setHabits((prev) => [...prev, habitWithId])
      return habitWithId
    } catch (error) {
      console.error("Error adding habit:", error)
      throw error
    }
  }

  const completeHabit = async (id: number) => {
    try {
      const habit = habits.find((h) => h.id === id)
      if (!habit || habit.completed) return

      const newStreak = habit.streak + 1
      await db.habits.update(id, { completed: true, streak: newStreak })

      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, completed: true, streak: newStreak } : h)))

      await addXP(10)
    } catch (error) {
      console.error("Error completing habit:", error)
      throw error
    }
  }

  const updateHabitOrder = async (orderedIds: number[]) => {
    try {
      // Update the order in the database and local state
      const updatedHabits = habits.map((habit, index) => ({
        ...habit,
        order: orderedIds.indexOf(habit.id!) !== -1 ? orderedIds.indexOf(habit.id!) : index,
      }))

      setHabits(updatedHabits)

      // Update each habit's order in the database
      for (const habit of updatedHabits) {
        if (habit.id) {
          await db.habits.update(habit.id, { order: habit.order })
        }
      }
    } catch (error) {
      console.error("Error updating habit order:", error)
    }
  }

  return {
    habits,
    addHabit,
    completeHabit,
    updateHabitOrder,
  }
}
