"use client"

import { useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Importar todas las secciones
import { Dashboard } from "@/components/sections/dashboard"
import { AICoachChat } from "@/components/ai-coach-chat"
import { Tasks } from "@/components/sections/tasks"
import { Habits } from "@/components/sections/habits"
import { Mindset } from "@/components/sections/mindset"
import { Workouts } from "@/components/sections/workouts"
import { Nutrition } from "@/components/sections/nutrition"
import { Finances } from "@/components/sections/finances"
import { Learning } from "@/components/sections/learning"
import { Diary } from "@/components/sections/diary"
import { AppSidebar } from "@/components/app-sidebar"

const sectionTitles: Record<string, string> = {
  dashboard: "Dashboard",
  "ai-coach": "Coach IA",
  tasks: "Tareas",
  habits: "Hábitos",
  mindset: "Mentalidad",
  workouts: "Entrenamiento",
  nutrition: "Nutrición",
  finances: "Finanzas",
  learning: "Aprendizaje",
  diary: "Diario",
}

export function MainContent() {
  const [activeSection, setActiveSection] = useState("dashboard")

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "ai-coach":
        return <AICoachChat />
      case "tasks":
        return <Tasks />
      case "habits":
        return <Habits />
      case "mindset":
        return <Mindset />
      case "workouts":
        return <Workouts />
      case "nutrition":
        return <Nutrition />
      case "finances":
        return <Finances />
      case "learning":
        return <Learning />
      case "diary":
        return <Diary />
      default:
        return <Dashboard />
    }
  }

  return (
    <>
      <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-gradient-to-r from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950 px-4">
          <SidebarTrigger className="-ml-1 text-indigo-600 hover:text-indigo-700" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="text-indigo-600 hover:text-indigo-700"
                  onClick={() => setActiveSection("dashboard")}
                >
                  CEO de Mi Vida
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {sectionTitles[activeSection]}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-950 dark:to-indigo-950">
          <div className="p-6 h-full">{renderSection()}</div>
        </div>
      </SidebarInset>
    </>
  )
}
