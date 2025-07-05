"use client"

import { useState, useEffect } from "react"
import Dexie, { type Table } from "dexie"

export interface Habit {
  id?: number
  date: string
  description: string
  completed: boolean
  category: string
  streak: number
  frequency: string
  time?: string
  order?: number
}

export interface Finance {
  id?: number
  date: string
  amount: number
  type: string
  category: string
  notes: string
}

export interface DiaryEntry {
  id?: number
  date: string
  mood: string
  notes: string
  reflection: string
}

export interface Nutrition {
  id?: number
  date: string
  meal: string
  calories: number
  protein: number
  carbs: number
  fats: number
  caloriesBurned: number
  macros?: string
}

export interface Workout {
  id?: number
  date: string
  exercise: string
  duration: number
  intensity?: string
  category?: string
  calories?: number
  notes: string
}

export interface Task {
  id?: number
  date: string
  description: string
  priority: string
  completed: boolean
  dueDate?: string
  dueTime?: string
  type?: string
}

export interface User {
  id: number
  level: number
  xp: number
  name: string
  badges: string[]
}

export interface MindsetEntry {
  id?: number
  date: string
  category: string
  content: string
  prompt?: string
}

class CEOVidaDB extends Dexie {
  habits!: Table<Habit>
  finances!: Table<Finance>
  diary!: Table<DiaryEntry>
  nutrition!: Table<Nutrition>
  workouts!: Table<Workout>
  tasks!: Table<Task>
  user!: Table<User>
  mindset!: Table<MindsetEntry>

  constructor() {
    super("CEOVidaDB")
    this.version(1).stores({
      habits: "++id,date,description,completed,category,streak,frequency",
      finances: "++id,date,amount,type,category,notes",
      diary: "++id,date,mood,notes,reflection",
      nutrition: "++id,date,meal,calories,caloriesBurned,macros",
      workouts: "++id,date,exercise,duration,notes",
      tasks: "++id,date,description,priority,completed,dueDate",
      user: "id,level,xp,name,badges",
    })

    this.version(2).stores({
      habits: "++id,date,description,completed,category,streak,frequency,time,order",
      finances: "++id,date,amount,type,category,notes",
      diary: "++id,date,mood,notes,reflection",
      nutrition: "++id,date,meal,calories,protein,carbs,fats,caloriesBurned,macros",
      workouts: "++id,date,exercise,duration,intensity,category,calories,notes",
      tasks: "++id,date,description,priority,completed,dueDate,dueTime,type",
      user: "id,level,xp,name,badges",
      mindset: "++id,date,category,content,prompt",
    })
  }
}

export const db = new CEOVidaDB()

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const initializeDB = async () => {
      try {
        await db.open()

        // Initialize user if doesn't exist
        const existingUser = await db.user.get(1)
        if (!existingUser) {
          await db.user.put({
            id: 1,
            level: 1,
            xp: 0,
            name: "Usuario",
            badges: [],
          })
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error initializing database:", error)
        setIsInitialized(true) // Still set to true to prevent infinite loading
      }
    }

    initializeDB()
  }, [])

  return { isInitialized, db }
}
