"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useFinances } from "@/hooks/use-finances"
import { DollarSign, TrendingUp, AlertTriangle, Target, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BudgetCategory {
  name: string
  allocated: number
  spent: number
  recommended: number
  priority: "alta" | "media" | "baja"
}

interface SmartRecommendation {
  type: "ahorrar" | "invertir" | "reducir" | "emergencia"
  title: string
  description: string
  amount: number
  impact: "alto" | "medio" | "bajo"
}

export function SmartBudget() {
  const { finances } = useFinances()
  const { toast } = useToast()
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([])

  useEffect(() => {
    calculateSmartBudget()
  }, [finances])

  const calculateSmartBudget = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyFinances = finances.filter((f) => {
      const date = new Date(f.date)
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear
    })

    const totalIncome = monthlyFinances.filter((f) => f.type === "Ingresos").reduce((sum, f) => sum + f.amount, 0)

    const totalExpenses = monthlyFinances.filter((f) => f.type === "Gastos").reduce((sum, f) => sum + f.amount, 0)

    setMonthlyIncome(totalIncome)

    // Calculate spending by category
    const expensesByCategory = monthlyFinances
      .filter((f) => f.type === "Gastos")
      .reduce(
        (acc, f) => {
          acc[f.category] = (acc[f.category] || 0) + f.amount
          return acc
        },
        {} as Record<string, number>,
      )

    // Smart budget allocation (50/30/20 rule with AI adjustments)
    const smartCategories: BudgetCategory[] = [
      {
        name: "Vivienda",
        allocated: totalIncome * 0.25,
        spent: expensesByCategory["Vivienda"] || 0,
        recommended: totalIncome * 0.25,
        priority: "alta",
      },
      {
        name: "Alimentos",
        allocated: totalIncome * 0.15,
        spent: expensesByCategory["Alimentos"] || 0,
        recommended: totalIncome * 0.12,
        priority: "alta",
      },
      {
        name: "Transporte",
        allocated: totalIncome * 0.1,
        spent: expensesByCategory["Transporte"] || 0,
        recommended: totalIncome * 0.08,
        priority: "media",
      },
      {
        name: "Entretenimiento",
        allocated: totalIncome * 0.1,
        spent: expensesByCategory["Entretenimiento"] || 0,
        recommended: totalIncome * 0.08,
        priority: "baja",
      },
      {
        name: "Ahorros",
        allocated: totalIncome * 0.2,
        spent: -monthlyFinances.filter((f) => f.type === "Ahorros").reduce((sum, f) => sum + f.amount, 0),
        recommended: totalIncome * 0.25,
        priority: "alta",
      },
      {
        name: "Inversiones",
        allocated: totalIncome * 0.15,
        spent: -monthlyFinances.filter((f) => f.type === "Inversiones").reduce((sum, f) => sum + f.amount, 0),
        recommended: totalIncome * 0.2,
        priority: "media",
      },
      {
        name: "Otros",
        allocated: totalIncome * 0.05,
        spent: expensesByCategory["Otros"] || 0,
        recommended: totalIncome * 0.02,
        priority: "baja",
      },
    ]

    setBudgetCategories(smartCategories)

    // Generate AI recommendations
    const newRecommendations: SmartRecommendation[] = []

    // Check overspending
    smartCategories.forEach((category) => {
      if (category.spent > category.allocated && category.priority === "alta") {
        newRecommendations.push({
          type: "reducir",
          title: `Reducir gastos en ${category.name}`,
          description: `Estás gastando $${(category.spent - category.allocated).toFixed(0)} más de lo recomendado`,
          amount: category.spent - category.allocated,
          impact: "alto",
        })
      }
    })

    // Savings recommendations
    const currentSavingsRate =
      (monthlyFinances.filter((f) => f.type === "Ahorros").reduce((sum, f) => sum + f.amount, 0) / totalIncome) * 100
    if (currentSavingsRate < 20) {
      newRecommendations.push({
        type: "ahorrar",
        title: "Aumentar tasa de ahorro",
        description: `Tu tasa de ahorro actual es ${currentSavingsRate.toFixed(1)}%. Intenta llegar al 20%`,
        amount: totalIncome * 0.2 - (totalIncome * currentSavingsRate) / 100,
        impact: "alto",
      })
    }

    // Investment recommendations
    const currentInvestments = monthlyFinances
      .filter((f) => f.type === "Inversiones")
      .reduce((sum, f) => sum + f.amount, 0)
    if (currentInvestments < totalIncome * 0.15 && currentSavingsRate >= 15) {
      newRecommendations.push({
        type: "invertir",
        title: "Comenzar a invertir",
        description: "Tienes un buen nivel de ahorro. Considera invertir para hacer crecer tu dinero",
        amount: totalIncome * 0.15,
        impact: "medio",
      })
    }

    // Emergency fund check
    const totalSavings = finances.filter((f) => f.type === "Ahorros").reduce((sum, f) => sum + f.amount, 0)
    const monthlyExpenses = totalExpenses
    if (totalSavings < monthlyExpenses * 3) {
      newRecommendations.push({
        type: "emergencia",
        title: "Fondo de emergencia insuficiente",
        description: "Necesitas al menos 3 meses de gastos en tu fondo de emergencia",
        amount: monthlyExpenses * 3 - totalSavings,
        impact: "alto",
      })
    }

    setRecommendations(newRecommendations.slice(0, 4))
  }

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "ahorrar":
        return <DollarSign className="h-4 w-4 text-green-600" />
      case "invertir":
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case "reducir":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "emergencia":
        return <Target className="h-4 w-4 text-orange-600" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "alto":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "medio":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "bajo":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
      case "media":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
      case "baja":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Presupuesto Inteligente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budgetCategories.map((category) => {
              const percentage = category.allocated > 0 ? (Math.abs(category.spent) / category.allocated) * 100 : 0
              const isOverBudget = Math.abs(category.spent) > category.allocated

              return (
                <Card key={category.name} className={`p-4 ${isOverBudget ? "border-red-200" : ""}`}>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{category.name}</h4>
                      <Badge className={getPriorityColor(category.priority)}>{category.priority}</Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Gastado: ${Math.abs(category.spent).toLocaleString()}</span>
                        <span>Presupuesto: ${category.allocated.toLocaleString()}</span>
                      </div>
                      <Progress value={Math.min(percentage, 100)} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{percentage.toFixed(0)}% usado</span>
                        <span className={isOverBudget ? "text-red-600" : "text-green-600"}>
                          ${(category.allocated - Math.abs(category.spent)).toLocaleString()} restante
                        </span>
                      </div>
                    </div>

                    {category.recommended !== category.allocated && (
                      <div className="text-xs text-blue-600">
                        💡 Recomendado: ${category.recommended.toLocaleString()}
                      </div>
                    )}
                  </div>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Recomendaciones IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>¡Excelente! Tu presupuesto está bien balanceado.</p>
              <p className="text-sm">Sigue así para alcanzar tus metas financieras.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3">
                    {getRecommendationIcon(rec.type)}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge className={getImpactColor(rec.impact)}>impacto {rec.impact}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                      <p className="text-sm font-medium text-green-600">
                        Potencial ahorro/ganancia: ${rec.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
