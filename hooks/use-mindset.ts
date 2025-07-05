"use client"

import { useState, useEffect } from "react"
import { db } from "./use-database"

export interface MindsetEntry {
  id?: number
  date: string
  category: string
  content: string
  prompt?: string
}

export function useMindset() {
  const [mindsetEntries, setMindsetEntries] = useState<MindsetEntry[]>([])

  useEffect(() => {
    const loadMindsetEntries = async () => {
      try {
        // Add mindset table to database if it doesn't exist
        if (!db.mindset) {
          db.version(2).stores({
            habits: "++id,date,description,completed,category,streak,frequency,time,order",
            finances: "++id,date,amount,type,category,notes",
            diary: "++id,date,mood,notes,reflection",
            nutrition: "++id,date,meal,calories,caloriesBurned,macros",
            workouts: "++id,date,exercise,duration,notes",
            tasks: "++id,date,description,priority,completed,dueDate,dueTime,type",
            user: "id,level,xp,name,badges",
            mindset: "++id,date,category,content,prompt",
          })
        }

        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const entries = (await db.mindset?.where("date").between(monthAgo, now).toArray()) || []
        setMindsetEntries(entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } catch (error) {
        console.error("Error loading mindset entries:", error)
      }
    }

    loadMindsetEntries()
  }, [])

  const addMindsetEntry = async (entryData: Omit<MindsetEntry, "id" | "date">) => {
    try {
      const newEntry: MindsetEntry = {
        ...entryData,
        date: new Date().toISOString(),
      }

      const id = await db.mindset?.add(newEntry)
      const entryWithId = { ...newEntry, id }
      setMindsetEntries((prev) => [entryWithId, ...prev])
      return entryWithId
    } catch (error) {
      console.error("Error adding mindset entry:", error)
      throw error
    }
  }

  return {
    mindsetEntries,
    addMindsetEntry,
  }
}
