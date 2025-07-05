"use client"

import { useState } from "react"
import {
  Home,
  Brain,
  CheckSquare,
  Repeat,
  Heart,
  Dumbbell,
  Apple,
  DollarSign,
  BookOpen,
  FileText,
  Download,
  Trophy,
  Zap,
  Target,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/components/gamification-provider"
import { ExportData } from "@/components/export-data"
import { ThemeToggle } from "@/components/theme-toggle"

const priorityItems = [
  { title: "Dashboard", icon: Home, id: "dashboard", priority: 1, badge: null },
  { title: "Coach IA", icon: Brain, id: "ai-coach", priority: 1, badge: "NUEVO" },
  { title: "Tareas", icon: CheckSquare, id: "tasks", priority: 1, badge: "3" },
  { title: "Hábitos", icon: Repeat, id: "habits", priority: 1, badge: null },
]

const developmentItems = [
  { title: "Mentalidad", icon: Heart, id: "mindset", priority: 2, badge: null },
  { title: "Entrenamiento", icon: Dumbbell, id: "workouts", priority: 2, badge: null },
  { title: "Nutrición", icon: Apple, id: "nutrition", priority: 2, badge: null },
  { title: "Finanzas", icon: DollarSign, id: "finances", priority: 2, badge: null },
]

const extraItems = [
  { title: "Aprendizaje", icon: BookOpen, id: "learning", priority: 3, badge: null },
  { title: "Diario", icon: FileText, id: "diary", priority: 3, badge: null },
]

interface AppSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const { level, xp, streak, achievements } = useGamification()
  const [showExport, setShowExport] = useState(false)

  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const dailyProgress = Math.min(xp % 100, 100)

  return (
    <>
      <Sidebar className="border-r-0 bg-gradient-to-b from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950">
        <SidebarHeader className="border-b border-indigo-200 dark:border-indigo-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              CEO
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                CEO de Mi Vida
              </h2>
              <p className="text-xs text-muted-foreground">Tu Coach Personal IA</p>
            </div>
          </div>

          {/* Progreso del Usuario */}
          <div className="space-y-3 p-4 rounded-xl glass">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nivel {level}</span>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold">{streak}</span>
              </div>
            </div>
            <Progress value={dailyProgress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{xp % 100} / 100 XP</span>
              <span>{unlockedAchievements} logros</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4">
          {/* Esenciales */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-2">
              <Target className="w-4 h-4" />
              Esenciales
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {priorityItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="group relative overflow-hidden transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50"
                    >
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <Badge
                          variant={item.badge === "NUEVO" ? "default" : "secondary"}
                          className="ml-auto text-xs animate-pulse"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Desarrollo */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Desarrollo
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {developmentItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="group transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50"
                    >
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Extras */}
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-600 dark:text-slate-400 font-semibold">Extras</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {extraItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSectionChange(item.id)}
                      isActive={activeSection === item.id}
                      className="group transition-all duration-300 hover:bg-gradient-to-r hover:from-slate-100 hover:to-gray-100 dark:hover:from-slate-800/50 dark:hover:to-gray-800/50"
                    >
                      <item.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-4 border-t border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center gap-2 mb-3">
            <Button
              onClick={() => setShowExport(true)}
              variant="outline"
              size="sm"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-0 hover:from-indigo-600 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <ThemeToggle />
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <ExportData open={showExport} onOpenChange={setShowExport} />
    </>
  )
}
