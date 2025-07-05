"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
}

interface GamificationState {
  level: number
  xp: number
  xpToNextLevel: number
  streak: number
  achievements: Achievement[]
  totalPoints: number
}

interface GamificationContextType extends GamificationState {
  addXP: (amount: number, reason?: string) => void
  unlockAchievement: (achievementId: string) => void
  incrementStreak: () => void
  resetStreak: () => void
}

const initialState: GamificationState = {
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  streak: 0,
  achievements: [
    {
      id: "first-task",
      title: "Primera Tarea",
      description: "Completa tu primera tarea",
      icon: "🎯",
      unlocked: false,
    },
    {
      id: "week-streak",
      title: "Racha Semanal",
      description: "Mantén una racha de 7 días",
      icon: "🔥",
      unlocked: false,
    },
    {
      id: "level-up",
      title: "Subida de Nivel",
      description: "Alcanza el nivel 2",
      icon: "⭐",
      unlocked: false,
    },
  ],
  totalPoints: 0,
}

type GamificationAction =
  | { type: "ADD_XP"; payload: { amount: number; reason?: string } }
  | { type: "UNLOCK_ACHIEVEMENT"; payload: { achievementId: string } }
  | { type: "INCREMENT_STREAK" }
  | { type: "RESET_STREAK" }
  | { type: "LEVEL_UP" }

function gamificationReducer(state: GamificationState, action: GamificationAction): GamificationState {
  switch (action.type) {
    case "ADD_XP": {
      const newXP = state.xp + action.payload.amount
      const newTotalPoints = state.totalPoints + action.payload.amount
      let newLevel = state.level
      let xpToNextLevel = state.xpToNextLevel

      // Check if level up
      if (newXP >= state.xpToNextLevel) {
        newLevel = state.level + 1
        xpToNextLevel = newLevel * 100 // Each level requires more XP
      }

      return {
        ...state,
        xp: newXP,
        level: newLevel,
        xpToNextLevel,
        totalPoints: newTotalPoints,
      }
    }

    case "UNLOCK_ACHIEVEMENT": {
      return {
        ...state,
        achievements: state.achievements.map((achievement) =>
          achievement.id === action.payload.achievementId
            ? { ...achievement, unlocked: true, unlockedAt: new Date() }
            : achievement,
        ),
      }
    }

    case "INCREMENT_STREAK": {
      return {
        ...state,
        streak: state.streak + 1,
      }
    }

    case "RESET_STREAK": {
      return {
        ...state,
        streak: 0,
      }
    }

    case "LEVEL_UP": {
      return {
        ...state,
        level: state.level + 1,
        xpToNextLevel: (state.level + 1) * 100,
      }
    }

    default:
      return state
  }
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gamificationReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("gamification-state")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        // Initialize with saved state
        Object.keys(parsed).forEach((key) => {
          if (key === "xp" && parsed[key] > 0) {
            dispatch({ type: "ADD_XP", payload: { amount: parsed[key] } })
          }
        })
      } catch (error) {
        console.error("Error loading gamification state:", error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gamification-state", JSON.stringify(state))
  }, [state])

  const addXP = (amount: number, reason?: string) => {
    dispatch({ type: "ADD_XP", payload: { amount, reason } })
  }

  const unlockAchievement = (achievementId: string) => {
    dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: { achievementId } })
  }

  const incrementStreak = () => {
    dispatch({ type: "INCREMENT_STREAK" })
  }

  const resetStreak = () => {
    dispatch({ type: "RESET_STREAK" })
  }

  const contextValue: GamificationContextType = {
    ...state,
    addXP,
    unlockAchievement,
    incrementStreak,
    resetStreak,
  }

  return <GamificationContext.Provider value={contextValue}>{children}</GamificationContext.Provider>
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
