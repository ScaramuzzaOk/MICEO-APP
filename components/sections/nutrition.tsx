"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Apple, Droplets, Zap, Target, Plus, TrendingUp, Edit, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NutritionGoal {
  name: string
  current: number
  target: number
  unit: string
  color: string
  icon: any
}

interface Meal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  completed: boolean
  foods: string[]
}

export function Nutrition() {
  const [nutritionGoals, setNutritionGoals] = useState({
    calories: 2200,
    protein: 150,
    carbs: 275,
    fats: 73,
    water: 8,
  })

  const [currentIntake, setCurrentIntake] = useState({
    calories: 1850,
    protein: 120,
    carbs: 230,
    fats: 65,
    water: 6,
  })

  const [meals, setMeals] = useState<Meal[]>([
    {
      id: "1",
      name: "Desayuno",
      time: "08:00",
      calories: 450,
      protein: 25,
      carbs: 45,
      fats: 18,
      completed: true,
      foods: ["Avena con frutas", "Yogur griego", "Café"],
    },
    {
      id: "2",
      name: "Almuerzo",
      time: "13:00",
      calories: 650,
      protein: 40,
      carbs: 75,
      fats: 22,
      completed: true,
      foods: ["Pollo a la plancha", "Arroz integral", "Ensalada"],
    },
    {
      id: "3",
      name: "Merienda",
      time: "16:30",
      calories: 200,
      protein: 15,
      carbs: 20,
      fats: 8,
      completed: false,
      foods: ["Frutos secos", "Fruta"],
    },
    {
      id: "4",
      name: "Cena",
      time: "20:00",
      calories: 550,
      protein: 35,
      carbs: 45,
      fats: 25,
      completed: false,
      foods: ["Salmón", "Verduras al vapor", "Quinoa"],
    },
  ])

  const [editingGoals, setEditingGoals] = useState(false)
  const [editingMeal, setEditingMeal] = useState<string | null>(null)
  const [tempGoals, setTempGoals] = useState(nutritionGoals)
  const [tempMeal, setTempMeal] = useState<Meal | null>(null)
  const { toast } = useToast()

  const dailyGoals: NutritionGoal[] = [
    {
      name: "Calorías",
      current: currentIntake.calories,
      target: nutritionGoals.calories,
      unit: "kcal",
      color: "text-red-600",
      icon: Zap,
    },
    {
      name: "Proteínas",
      current: currentIntake.protein,
      target: nutritionGoals.protein,
      unit: "g",
      color: "text-blue-600",
      icon: Target,
    },
    {
      name: "Carbohidratos",
      current: currentIntake.carbs,
      target: nutritionGoals.carbs,
      unit: "g",
      color: "text-green-600",
      icon: Apple,
    },
    {
      name: "Grasas",
      current: currentIntake.fats,
      target: nutritionGoals.fats,
      unit: "g",
      color: "text-yellow-600",
      icon: Target,
    },
    {
      name: "Agua",
      current: currentIntake.water,
      target: nutritionGoals.water,
      unit: "vasos",
      color: "text-cyan-600",
      icon: Droplets,
    },
  ]

  const saveGoals = () => {
    setNutritionGoals(tempGoals)
    setEditingGoals(false)
    toast({
      title: "Objetivos actualizados",
      description: "Tus metas nutricionales han sido guardadas.",
    })
  }

  const startEditingMeal = (meal: Meal) => {
    setTempMeal({ ...meal })
    setEditingMeal(meal.id)
  }

  const saveMeal = () => {
    if (!tempMeal) return
    setMeals((prev) => prev.map((meal) => (meal.id === tempMeal.id ? tempMeal : meal)))
    setEditingMeal(null)
    setTempMeal(null)
    toast({
      title: "Comida actualizada",
      description: "Los datos de la comida han sido guardados.",
    })
  }

  const toggleMealCompletion = (id: string) => {
    setMeals((prev) => prev.map((meal) => (meal.id === id ? { ...meal, completed: !meal.completed } : meal)))
  }

  const addFood = (mealId: string, food: string) => {
    if (!food.trim()) return
    setMeals((prev) => prev.map((meal) => (meal.id === mealId ? { ...meal, foods: [...meal.foods, food] } : meal)))
  }

  const removeFood = (mealId: string, foodIndex: number) => {
    setMeals((prev) =>
      prev.map((meal) =>
        meal.id === mealId ? { ...meal, foods: meal.foods.filter((_, index) => index !== foodIndex) } : meal,
      ),
    )
  }

  const totalCaloriesPlanned = meals.reduce((acc, meal) => acc + meal.calories, 0)
  const completedMeals = meals.filter((meal) => meal.completed).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Nutrición</h1>
          <p className="text-muted-foreground">Alimenta tu cuerpo para el éxito</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <Apple className="w-4 h-4 mr-1" />
            {completedMeals}/{meals.length} comidas hoy
          </Badge>
          <Dialog open={editingGoals} onOpenChange={setEditingGoals}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Editar Objetivos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Editar Objetivos Nutricionales</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Calorías (kcal)</label>
                    <Input
                      type="number"
                      value={tempGoals.calories}
                      onChange={(e) => setTempGoals({ ...tempGoals, calories: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Proteínas (g)</label>
                    <Input
                      type="number"
                      value={tempGoals.protein}
                      onChange={(e) => setTempGoals({ ...tempGoals, protein: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Carbohidratos (g)</label>
                    <Input
                      type="number"
                      value={tempGoals.carbs}
                      onChange={(e) => setTempGoals({ ...tempGoals, carbs: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Grasas (g)</label>
                    <Input
                      type="number"
                      value={tempGoals.fats}
                      onChange={(e) => setTempGoals({ ...tempGoals, fats: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Agua (vasos)</label>
                    <Input
                      type="number"
                      value={tempGoals.water}
                      onChange={(e) => setTempGoals({ ...tempGoals, water: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setEditingGoals(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={saveGoals}>Guardar</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Objetivos diarios */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyGoals.map((goal, index) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100)
          const IconComponent = goal.icon

          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-5 h-5 ${goal.color}`} />
                  <span className="text-xs text-muted-foreground">{Math.round(percentage)}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium">{goal.name}</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {goal.current}
                    <span className="text-sm text-muted-foreground ml-1">
                      /{goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plan de comidas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Apple className="w-5 h-5" />
            Plan de Comidas de Hoy
          </CardTitle>
          <CardDescription>
            {totalCaloriesPlanned} kcal planificadas • {completedMeals} de {meals.length} completadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={`p-4 rounded-lg border ${meal.completed ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" : "bg-muted/50"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold">{meal.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {meal.time}
                    </Badge>
                    {meal.completed && <Badge className="bg-green-100 text-green-800 text-xs">Completado</Badge>}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground mb-2">
                    <span>{meal.calories} kcal</span>
                    <span>{meal.protein}g proteína</span>
                    <span>{meal.carbs}g carbos</span>
                    <span>{meal.fats}g grasas</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {meal.foods.map((food, foodIndex) => (
                      <Badge key={foodIndex} variant="secondary" className="text-xs">
                        {food}
                        {editingMeal === meal.id && (
                          <button
                            onClick={() => removeFood(meal.id, foodIndex)}
                            className="ml-1 text-red-500 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => (editingMeal === meal.id ? saveMeal() : startEditingMeal(meal))}
                  >
                    {editingMeal === meal.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant={meal.completed ? "secondary" : "default"}
                    onClick={() => toggleMealCompletion(meal.id)}
                    className={!meal.completed ? "bg-gradient-to-r from-green-500 to-emerald-600" : ""}
                  >
                    {meal.completed ? "Completado" : "Marcar"}
                  </Button>
                </div>
              </div>

              {editingMeal === meal.id && tempMeal && (
                <div className="space-y-3 border-t pt-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div>
                      <label className="text-xs font-medium">Calorías</label>
                      <Input
                        type="number"
                        value={tempMeal.calories}
                        onChange={(e) => setTempMeal({ ...tempMeal, calories: Number(e.target.value) })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Proteína (g)</label>
                      <Input
                        type="number"
                        value={tempMeal.protein}
                        onChange={(e) => setTempMeal({ ...tempMeal, protein: Number(e.target.value) })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Carbos (g)</label>
                      <Input
                        type="number"
                        value={tempMeal.carbs}
                        onChange={(e) => setTempMeal({ ...tempMeal, carbs: Number(e.target.value) })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Grasas (g)</label>
                      <Input
                        type="number"
                        value={tempMeal.fats}
                        onChange={(e) => setTempMeal({ ...tempMeal, fats: Number(e.target.value) })}
                        className="h-8"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium">Agregar alimento</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Nombre del alimento"
                        className="h-8"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            addFood(meal.id, e.currentTarget.value)
                            e.currentTarget.value = ""
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement
                          addFood(meal.id, input.value)
                          input.value = ""
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Estadísticas nutricionales */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Progreso Semanal
          </CardTitle>
          <CardDescription>Tu consistencia nutricional durante la semana</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-xs text-muted-foreground">Meta de calorías</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-xs text-muted-foreground">Hidratación</div>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <div className="text-2xl font-bold text-purple-600">78%</div>
              <div className="text-xs text-muted-foreground">Balance macros</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
