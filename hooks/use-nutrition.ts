"use client"

import { useState, useEffect } from "react"
import { db, type Nutrition } from "./use-database"

interface NutritionGoals {
  calories: number
  protein: number
  carbs: number
  fats: number
}

export function useNutrition() {
  const [nutrition, setNutrition] = useState<Nutrition[]>([])
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoals>({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
  })

  useEffect(() => {
    const loadNutrition = async () => {
      try {
        const now = new Date().toISOString()
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        const nutritionData = await db.nutrition.where("date").between(monthAgo, now).toArray()
        setNutrition(nutritionData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } catch (error) {
        console.error("Error loading nutrition:", error)
      }
    }

    const loadGoals = () => {
      const savedGoals = localStorage.getItem("nutrition-goals")
      if (savedGoals) {
        setNutritionGoals(JSON.parse(savedGoals))
      }
    }

    loadNutrition()
    loadGoals()
  }, [])

  const addMeal = async (
    mealData: Omit<Nutrition, "id" | "date"> & { protein?: number; carbs?: number; fats?: number },
  ) => {
    try {
      const newMeal: Nutrition = {
        ...mealData,
        protein: mealData.protein || 0,
        carbs: mealData.carbs || 0,
        fats: mealData.fats || 0,
        date: new Date().toISOString(),
      }

      const id = await db.nutrition.add(newMeal)
      const mealWithId = { ...newMeal, id }
      setNutrition((prev) => [mealWithId, ...prev])
      return mealWithId
    } catch (error) {
      console.error("Error adding meal:", error)
      throw error
    }
  }

  const updateNutritionGoals = (goals: NutritionGoals) => {
    setNutritionGoals(goals)
    localStorage.setItem("nutrition-goals", JSON.stringify(goals))
  }

  return {
    nutrition,
    nutritionGoals,
    addMeal,
    updateNutritionGoals,
  }
}
