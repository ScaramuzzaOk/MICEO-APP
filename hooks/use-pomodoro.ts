"use client"

import { useState, useEffect, useCallback } from "react"
import { useUser } from "./use-user"
import { useToast } from "./use-toast"

export function usePomodoro() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const { addXP } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false)
            handlePomodoroComplete()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, time])

  const handlePomodoroComplete = useCallback(async () => {
    try {
      await addXP(5)
      toast({
        title: "¡Pomodoro completado!",
        description: "+5 XP ganados por completar una sesión de enfoque.",
      })
    } catch (error) {
      console.error("Error completing pomodoro:", error)
    }
  }, [addXP, toast])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = () => {
    setIsRunning(false)
    setTime(25 * 60)
  }

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
  }
}
