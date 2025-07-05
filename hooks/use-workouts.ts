"use client"

import { useState, useEffect } from "react"
import { db, type Workout } from "./use-database"

export function useWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const workoutsData = await db.workouts.where("date").between(monthAgo, now).toArray()
        setWorkouts(workoutsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } catch (error) {
        console.error("Error loading workouts:", error)
      }
    }

    loadWorkouts()
  }, [])

  const addWorkout = async (
    workoutData: Omit<Workout, "id" | "date"> & { intensity?: string; category?: string; calories?: number },
  ) => {
    try {
      const newWorkout: Workout = {
        ...workoutData,
        intensity: workoutData.intensity,
        category: workoutData.category,
        calories: workoutData.calories || 0,
        date: new Date().toISOString(),
      }

      const id = await db.workouts.add(newWorkout)
      const workoutWithId = { ...newWorkout, id }
      setWorkouts((prev) => [workoutWithId, ...prev])
      return workoutWithId
    } catch (error) {
      console.error("Error adding workout:", error)
      throw error
    }
  }

  return {
    workouts,
    addWorkout,
  }
}
