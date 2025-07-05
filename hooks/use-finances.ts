"use client"

import { useState, useEffect } from "react"
import { db, type Finance } from "./use-database"

export function useFinances() {
  const [finances, setFinances] = useState<Finance[]>([])

  useEffect(() => {
    const loadFinances = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const financesData = await db.finances.where("date").between(monthAgo, now).toArray()
        setFinances(financesData)
      } catch (error) {
        console.error("Error loading finances:", error)
      }
    }

    loadFinances()
  }, [])

  const addFinance = async (financeData: Omit<Finance, "id" | "date">) => {
    try {
      const newFinance: Finance = {
        ...financeData,
        date: new Date().toISOString(),
      }

      const id = await db.finances.add(newFinance)
      const financeWithId = { ...newFinance, id }
      setFinances((prev) => [...prev, financeWithId])
      return financeWithId
    } catch (error) {
      console.error("Error adding finance:", error)
      throw error
    }
  }

  return {
    finances,
    addFinance,
  }
}
