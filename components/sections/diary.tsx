"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PenTool, Calendar, Heart, Plus, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DiaryEntry {
  id: string
  date: Date
  title: string
  content: string
  mood: "great" | "good" | "neutral" | "bad" | "terrible"
  tags: string[]
}

export function Diary() {
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: "1",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      title: "Un día productivo",
      content:
        "Hoy logré completar todas mis tareas importantes. Me siento muy satisfecho con mi progreso en el curso de React y también pude hacer ejercicio por la mañana. La clave fue levantarme temprano y seguir mi rutina.",
      mood: "great",
      tags: ["productividad", "ejercicio", "aprendizaje"],
    },
    {
      id: "2",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      title: "Reflexiones sobre metas",
      content:
        "Estuve pensando en mis objetivos a largo plazo. Creo que necesito ser más específico con mis metas financieras. Voy a revisar mi presupuesto y establecer objetivos más claros para los próximos 6 meses.",
      mood: "good",
      tags: ["reflexión", "metas", "finanzas"],
    },
  ])

  const [newEntry, setNewEntry] = useState({
    title: "",
    content: "",
    mood: "neutral" as const,
  })

  const { toast } = useToast()

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "great":
        return "text-green-600 bg-green-50"
      case "good":
        return "text-blue-600 bg-blue-50"
      case "neutral":
        return "text-yellow-600 bg-yellow-50"
      case "bad":
        return "text-orange-600 bg-orange-50"
      case "terrible":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "great":
        return "😄"
      case "good":
        return "😊"
      case "neutral":
        return "😐"
      case "bad":
        return "😔"
      case "terrible":
        return "😢"
      default:
        return "😐"
    }
  }

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case "great":
        return "Excelente"
      case "good":
        return "Bien"
      case "neutral":
        return "Normal"
      case "bad":
        return "Mal"
      case "terrible":
        return "Terrible"
      default:
        return "Normal"
    }
  }

  const addEntry = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa el título y contenido de tu entrada.",
        variant: "destructive",
      })
      return
    }

    const entry: DiaryEntry = {
      id: Date.now().toString(),
      date: new Date(),
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: [],
    }

    setEntries((prev) => [entry, ...prev])
    setNewEntry({ title: "", content: "", mood: "neutral" })

    toast({
      title: "Entrada guardada",
      description: "Tu reflexión ha sido añadida al diario.",
    })
  }

  const moodStats = entries.reduce(
    (acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Diario Personal</h1>
          <p className="text-muted-foreground">Reflexiona sobre tu día y registra tu crecimiento</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <BookOpen className="w-4 h-4 mr-1" />
          {entries.length} entradas
        </Badge>
      </div>

      {/* Estadísticas de estado de ánimo */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Estado de Ánimo
          </CardTitle>
          <CardDescription>Tu bienestar emocional en los últimos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-2">
            {["great", "good", "neutral", "bad", "terrible"].map((mood) => (
              <div key={mood} className="text-center p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <div className="text-2xl mb-1">{getMoodEmoji(mood)}</div>
                <div className="text-lg font-bold">{moodStats[mood] || 0}</div>
                <div className="text-xs text-muted-foreground">{getMoodLabel(mood)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nueva entrada */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva Entrada
          </CardTitle>
          <CardDescription>¿Cómo fue tu día? Comparte tus pensamientos y reflexiones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Título</label>
            <input
              type="text"
              placeholder="¿Cómo resumirías tu día?"
              value={newEntry.title}
              onChange={(e) => setNewEntry((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded-md bg-background"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Estado de ánimo</label>
            <div className="flex gap-2">
              {["great", "good", "neutral", "bad", "terrible"].map((mood) => (
                <Button
                  key={mood}
                  variant={newEntry.mood === mood ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewEntry((prev) => ({ ...prev, mood: mood as any }))}
                  className="flex items-center gap-1"
                >
                  <span>{getMoodEmoji(mood)}</span>
                  <span className="hidden sm:inline">{getMoodLabel(mood)}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Reflexión</label>
            <Textarea
              placeholder="Escribe sobre tu día, tus logros, desafíos, aprendizajes..."
              value={newEntry.content}
              onChange={(e) => setNewEntry((prev) => ({ ...prev, content: e.target.value }))}
              className="min-h-[120px] resize-none"
            />
          </div>

          <Button onClick={addEntry} className="w-full bg-gradient-to-r from-indigo-500 to-purple-600">
            <PenTool className="w-4 h-4 mr-2" />
            Guardar Entrada
          </Button>
        </CardContent>
      </Card>

      {/* Entradas del diario */}
      <div className="space-y-4">
        {entries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {entry.date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getMoodColor(entry.mood)}>
                  {getMoodEmoji(entry.mood)} {getMoodLabel(entry.mood)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">{entry.content}</p>

              {entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {entry.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {entries.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <PenTool className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Tu diario está vacío</h3>
            <p className="text-muted-foreground">Comienza a escribir tus reflexiones y experiencias diarias.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
