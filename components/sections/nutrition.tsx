"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Apple, Droplets, Zap, Target, Plus, TrendingUp } from "lucide-react"

interface NutritionGoal {
  name: string
  current: number
  target: number
  unit: string
  color: string
  icon: any
}

export function Nutrition() {
  const dailyGoals: NutritionGoal[] = [
    {
      name: "Calorías",
      current: 1850,
      target: 2200,
      unit: "kcal",
      color: "text-red-600",
      icon: Zap,
    },
    {
      name: "Proteínas",
      current: 120,
      target: 150,
      unit: "g",
      color: "text-blue-600",
      icon: Target,
    },
    {
      name: "Agua",
      current: 6,
      target: 8,
      unit: "vasos",
      color: "text-cyan-600",
      icon: Droplets,
    },
    {
      name: "Frutas/Verduras",
      current: 4,
      target: 5,
      unit: "porciones",
      color: "text-green-600",
      icon: Apple,
    },
  ]

  const meals = [
    {
      name: "Desayuno",
      time: "08:00",
      calories: 450,
      completed: true,
      foods: ["Avena con frutas", "Yogur griego", "Café"],
    },
    {
      name: "Almuerzo",
      time: "13:00",
      calories: 650,
      completed: true,
      foods: ["Pollo a la plancha", "Arroz integral", "Ensalada"],
    },
    {
      name: "Merienda",
      time: "16:30",
      calories: 200,
      completed: false,
      foods: ["Frutos secos", "Fruta"],
    },
    {
      name: "Cena",
      time: "20:00",
      calories: 550,
      completed: false,
      foods: ["Salmón", "Verduras al vapor", "Quinoa"],
    },
  ]

  const totalCaloriesPlanned = meals.reduce((acc, meal) => acc + meal.calories, 0)
  const completedMeals = meals.filter((meal) => meal.completed).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Nutrición</h1>
          <p className="text-muted-foreground">Alimenta tu cuerpo para el éxito</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <Apple className="w-4 h-4 mr-1" />
          {completedMeals}/{meals.length} comidas hoy
        </Badge>
      </div>

      {/* Objetivos diarios */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
          {meals.map((meal, index) => (
            <div
              key={index}
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
                  <p className="text-sm text-muted-foreground mb-2">{meal.calories} kcal</p>
                  <div className="flex flex-wrap gap-1">
                    {meal.foods.map((food, foodIndex) => (
                      <Badge key={foodIndex} variant="secondary" className="text-xs">
                        {food}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  variant={meal.completed ? "secondary" : "default"}
                  className={!meal.completed ? "bg-gradient-to-r from-green-500 to-emerald-600" : ""}
                >
                  {meal.completed ? "Completado" : "Marcar"}
                </Button>
              </div>
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
              <div className="text-xs text-muted-foreground">Frutas/Verduras</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botón para agregar comida */}
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            Registrar Comida
          </Button>
          <p className="text-sm text-muted-foreground mt-2">Añade una comida o snack a tu registro diario</p>
        </CardContent>
      </Card>
    </div>
  )
}
