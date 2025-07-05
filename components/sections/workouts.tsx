"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dumbbell, Clock, Target, TrendingUp, Play, Calendar, Edit, Save, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Workout {
  id: string
  name: string
  type: "strength" | "cardio" | "flexibility" | "hiit"
  duration: number
  difficulty: "beginner" | "intermediate" | "advanced"
  completed: boolean
  calories: number
  exercises: string[]
  notes: string
}

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: "1",
      name: "Entrenamiento de Fuerza - Tren Superior",
      type: "strength",
      duration: 45,
      difficulty: "intermediate",
      completed: false,
      calories: 320,
      exercises: ["Press de banca", "Dominadas", "Remo con barra", "Press militar"],
      notes: "Aumentar peso en press de banca",
    },
    {
      id: "2",
      name: "Cardio HIIT Intenso",
      type: "hiit",
      duration: 30,
      difficulty: "advanced",
      completed: true,
      calories: 400,
      exercises: ["Burpees", "Mountain climbers", "Jump squats", "High knees"],
      notes: "Excelente sesión, muy sudorosa",
    },
    {
      id: "3",
      name: "Yoga y Flexibilidad",
      type: "flexibility",
      duration: 25,
      difficulty: "beginner",
      completed: false,
      calories: 150,
      exercises: ["Saludo al sol", "Guerrero I", "Postura del niño", "Torsión espinal"],
      notes: "",
    },
  ])

  const [editingWorkout, setEditingWorkout] = useState<string | null>(null)
  const [tempWorkout, setTempWorkout] = useState<Workout | null>(null)
  const [showAddWorkout, setShowAddWorkout] = useState(false)
  const [newWorkout, setNewWorkout] = useState<Partial<Workout>>({
    name: "",
    type: "strength",
    duration: 30,
    difficulty: "intermediate",
    calories: 200,
    exercises: [],
    notes: "",
  })
  const { toast } = useToast()

  const weeklyStats = {
    workoutsCompleted: 4,
    totalWorkouts: 6,
    caloriesBurned: 1250,
    totalMinutes: 180,
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "strength":
        return "from-red-500 to-orange-600"
      case "cardio":
        return "from-blue-500 to-cyan-600"
      case "flexibility":
        return "from-green-500 to-emerald-600"
      case "hiit":
        return "from-purple-500 to-pink-600"
      default:
        return "from-gray-500 to-slate-600"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "strength":
        return "Fuerza"
      case "cardio":
        return "Cardio"
      case "flexibility":
        return "Flexibilidad"
      case "hiit":
        return "HIIT"
      default:
        return "General"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600 bg-green-50"
      case "intermediate":
        return "text-yellow-600 bg-yellow-50"
      case "advanced":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const startEditingWorkout = (workout: Workout) => {
    setTempWorkout({ ...workout })
    setEditingWorkout(workout.id)
  }

  const saveWorkout = () => {
    if (!tempWorkout) return
    setWorkouts((prev) => prev.map((workout) => (workout.id === tempWorkout.id ? tempWorkout : workout)))
    setEditingWorkout(null)
    setTempWorkout(null)
    toast({
      title: "Entrenamiento actualizado",
      description: "Los datos del entrenamiento han sido guardados.",
    })
  }

  const addNewWorkout = () => {
    if (!newWorkout.name) return
    const workout: Workout = {
      id: Date.now().toString(),
      name: newWorkout.name,
      type: newWorkout.type as any,
      duration: newWorkout.duration || 30,
      difficulty: newWorkout.difficulty as any,
      completed: false,
      calories: newWorkout.calories || 200,
      exercises: newWorkout.exercises || [],
      notes: newWorkout.notes || "",
    }
    setWorkouts((prev) => [...prev, workout])
    setNewWorkout({
      name: "",
      type: "strength",
      duration: 30,
      difficulty: "intermediate",
      calories: 200,
      exercises: [],
      notes: "",
    })
    setShowAddWorkout(false)
    toast({
      title: "Entrenamiento agregado",
      description: "Nuevo entrenamiento añadido a tu plan.",
    })
  }

  const toggleWorkoutCompletion = (id: string) => {
    setWorkouts((prev) =>
      prev.map((workout) => (workout.id === id ? { ...workout, completed: !workout.completed } : workout)),
    )
  }

  const addExercise = (workoutId: string, exercise: string) => {
    if (!exercise.trim()) return
    if (editingWorkout === workoutId && tempWorkout) {
      setTempWorkout({ ...tempWorkout, exercises: [...tempWorkout.exercises, exercise] })
    } else {
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === workoutId ? { ...workout, exercises: [...workout.exercises, exercise] } : workout,
        ),
      )
    }
  }

  const removeExercise = (workoutId: string, exerciseIndex: number) => {
    if (editingWorkout === workoutId && tempWorkout) {
      setTempWorkout({
        ...tempWorkout,
        exercises: tempWorkout.exercises.filter((_, index) => index !== exerciseIndex),
      })
    } else {
      setWorkouts((prev) =>
        prev.map((workout) =>
          workout.id === workoutId
            ? { ...workout, exercises: workout.exercises.filter((_, index) => index !== exerciseIndex) }
            : workout,
        ),
      )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Entrenamiento</h1>
          <p className="text-muted-foreground">Mantén tu cuerpo fuerte y saludable</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <Dumbbell className="w-4 h-4 mr-1" />
            {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts} esta semana
          </Badge>
          <Dialog open={showAddWorkout} onOpenChange={setShowAddWorkout}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-indigo-500 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Nuevo Entrenamiento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Entrenamiento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre</label>
                  <Input
                    value={newWorkout.name}
                    onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                    placeholder="Ej: Entrenamiento de piernas"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Select
                      value={newWorkout.type}
                      onValueChange={(value) => setNewWorkout({ ...newWorkout, type: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strength">Fuerza</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="hiit">HIIT</SelectItem>
                        <SelectItem value="flexibility">Flexibilidad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Dificultad</label>
                    <Select
                      value={newWorkout.difficulty}
                      onValueChange={(value) => setNewWorkout({ ...newWorkout, difficulty: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Principiante</SelectItem>
                        <SelectItem value="intermediate">Intermedio</SelectItem>
                        <SelectItem value="advanced">Avanzado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Duración (min)</label>
                    <Input
                      type="number"
                      value={newWorkout.duration}
                      onChange={(e) => setNewWorkout({ ...newWorkout, duration: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Calorías estimadas</label>
                    <Input
                      type="number"
                      value={newWorkout.calories}
                      onChange={(e) => setNewWorkout({ ...newWorkout, calories: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddWorkout(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={addNewWorkout}>Agregar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Estadísticas semanales */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progreso Semanal
          </CardTitle>
          <CardDescription>Tu rendimiento y consistencia en el entrenamiento</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{weeklyStats.workoutsCompleted}</div>
              <div className="text-xs text-muted-foreground">Entrenamientos</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{weeklyStats.caloriesBurned}</div>
              <div className="text-xs text-muted-foreground">Calorías</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{weeklyStats.totalMinutes}</div>
              <div className="text-xs text-muted-foreground">Minutos</div>
            </div>
            <div className="text-center p-4 bg-white/50 dark:bg-black/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Completado</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Meta semanal</span>
              <span className="font-medium">
                {weeklyStats.workoutsCompleted}/{weeklyStats.totalWorkouts}
              </span>
            </div>
            <Progress value={(weeklyStats.workoutsCompleted / weeklyStats.totalWorkouts) * 100} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Lista de entrenamientos */}
      <div className="grid gap-4">
        {workouts.map((workout) => (
          <Card key={workout.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className={`h-1 bg-gradient-to-r ${getTypeColor(workout.type)}`} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{workout.name}</h3>
                      {workout.completed && <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>}
                    </div>

                    <div className="flex items-center gap-4 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(workout.type)}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(workout.difficulty)}>
                        {workout.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>{workout.calories} cal</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dumbbell className="w-4 h-4" />
                        <span>{workout.exercises.length} ejercicios</span>
                      </div>
                    </div>

                    {/* Ejercicios */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {(editingWorkout === workout.id ? tempWorkout?.exercises : workout.exercises)?.map(
                          (exercise, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {exercise}
                              {editingWorkout === workout.id && (
                                <button
                                  onClick={() => removeExercise(workout.id, index)}
                                  className="ml-1 text-red-500 hover:text-red-700"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              )}
                            </Badge>
                          ),
                        )}
                      </div>

                      {editingWorkout === workout.id && (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Agregar ejercicio"
                            className="h-8 text-sm"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                addExercise(workout.id, e.currentTarget.value)
                                e.currentTarget.value = ""
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement
                              addExercise(workout.id, input.value)
                              input.value = ""
                            }}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {workout.notes && <p className="text-sm text-muted-foreground mt-2 italic">"{workout.notes}"</p>}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => (editingWorkout === workout.id ? saveWorkout() : startEditingWorkout(workout))}
                    >
                      {editingWorkout === workout.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    </Button>
                    <Button
                      onClick={() => toggleWorkoutCompletion(workout.id)}
                      className={
                        workout.completed
                          ? "bg-green-600 hover:bg-green-700"
                          : `bg-gradient-to-r ${getTypeColor(workout.type)} text-white`
                      }
                      disabled={workout.completed}
                    >
                      {workout.completed ? (
                        "Completado"
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Comenzar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {editingWorkout === workout.id && tempWorkout && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium">Duración (min)</label>
                        <Input
                          type="number"
                          value={tempWorkout.duration}
                          onChange={(e) => setTempWorkout({ ...tempWorkout, duration: Number(e.target.value) })}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Calorías</label>
                        <Input
                          type="number"
                          value={tempWorkout.calories}
                          onChange={(e) => setTempWorkout({ ...tempWorkout, calories: Number(e.target.value) })}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium">Notas</label>
                      <Input
                        value={tempWorkout.notes}
                        onChange={(e) => setTempWorkout({ ...tempWorkout, notes: e.target.value })}
                        placeholder="Notas sobre el entrenamiento"
                        className="h-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendario de entrenamientos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Próximos Entrenamientos
          </CardTitle>
          <CardDescription>Tu plan de entrenamiento para los próximos días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Mañana - Cardio Matutino</p>
                <p className="text-sm text-muted-foreground">30 min • Intensidad media</p>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="font-medium">Miércoles - Fuerza Tren Inferior</p>
                <p className="text-sm text-muted-foreground">45 min • Alta intensidad</p>
              </div>
              <Badge variant="outline">Programado</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
