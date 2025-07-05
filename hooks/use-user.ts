"use client"

import { useState, useEffect } from "react"
import { db, type User } from "./use-database"

const levelTitles: Record<number, string> = {
  1: "Vagabundo",
  10: "Aprendiz",
  20: "Profesional",
  30: "Empresario",
  40: "Inversionista",
  50: "Magnate",
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await db.user.get(1)
        if (userData) {
          setUser(userData)
        }
      } catch (error) {
        console.error("Error loading user:", error)
      }
    }

    loadUser()
  }, [])

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return

    try {
      const updatedUser = { ...user, ...updates }
      await db.user.update(1, updatedUser)
      setUser(updatedUser)
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const addXP = async (xp: number) => {
    if (!user) return

    const newXP = user.xp + xp
    const newLevel = Math.floor(newXP / 100) + 1
    const newBadges = newLevel % 5 === 0 && newLevel > user.level ? [...user.badges, `Nivel ${newLevel}`] : user.badges

    // Get level title
    const levelTitle =
      Object.keys(levelTitles)
        .reverse()
        .find((lvl) => newLevel >= Number.parseInt(lvl)) || "1"

    const baseName = user.name.split(" ").slice(-1)[0]
    const newName = `${levelTitles[Number.parseInt(levelTitle)]} ${baseName}`

    await updateUser({
      xp: newXP,
      level: newLevel,
      badges: newBadges,
      name: newName,
    })

    return { xpGained: xp, levelUp: newLevel > user.level }
  }

  return {
    user,
    updateUser,
    addXP,
  }
}
