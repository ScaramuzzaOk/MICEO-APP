"use client"

import { MainContent } from "@/components/main-content"
import { SidebarProvider } from "@/components/ui/sidebar"
import { GamificationProvider } from "@/components/gamification-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function HomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <GamificationProvider>
        <SidebarProvider>
          <div className="min-h-screen bg-background">
            <MainContent />
            <Toaster />
          </div>
        </SidebarProvider>
      </GamificationProvider>
    </ThemeProvider>
  )
}
