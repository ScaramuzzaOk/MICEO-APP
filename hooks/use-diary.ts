"use client"

import { useState, useEffect } from "react"
import { db, type DiaryEntry } from "./use-database"

export function useDiary() {
  const [diary, setDiary] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const loadDiary = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const diaryData = await db.diary.where("date").between(monthAgo, now).toArray()
        setDiary(diaryData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } catch (error) {
        console.error("Error loading diary:", error)
      }
    }

    loadDiary()
  }, [])

  const addDiaryEntry = async (entryData: Omit<DiaryEntry, "id" | "date">) => {
    try {
      const newEntry: DiaryEntry = {
        ...entryData,
        date: new Date().toISOString(),
      }

      const id = await db.diary.add(newEntry)
      const entryWithId = { ...newEntry, id }
      setDiary((prev) => [entryWithId, ...prev])
      return entryWithId
    } catch (error) {
      console.error("Error adding diary entry:", error)
      throw error
    }
  }

  return {
    diary,
    addDiaryEntry,
  }
}
