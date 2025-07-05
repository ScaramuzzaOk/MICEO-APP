"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, TrendingDown, Target, PiggyBank, CreditCard } from "lucide-react"

interface FinancialGoal {
  name: string
  current: number
  target: number
  category: "savings" | "investment" | "debt" | "budget"
  color: string
}

export function Finances() {
  const financialGoals: FinancialGoal[] = [
    {
      name: "Fondo de Emergencia",
      current: 15000,
      target: 25000,
      category: "savings",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Inversiones",
      current: 8500,
      target: 15000,
      category: "investment",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Pagar Deuda",
      current: 3000,
      target: 8000,
      category: "debt",
      color: "from-red-500 to-orange-600",
    },
  ]

  const monthlyBudget = {
    income: 45000,
    expenses: 32000,
    savings: 8000,
    investments: 5000,
  }

  const recentTransactions = [
    { id: 1, description: "Supermercado", amount: -1200, category: "Alimentación", date: "Hoy" },
    { id: 2, description: "Salario", amount: 45000, category: "Ingresos", date: "Ayer" },
    { id: 3, description: "Gym", amount: -800, category: "Salud", date: "2 días" },
    { id: 4, description: "Inversión ETF", amount: -5000, category: "Inversiones", date: "3 días" },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "savings":
        return PiggyBank
      case "investment":
        return TrendingUp
      case "debt":
        return CreditCard
      default:
        return Target
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "savings":
        return "Ahorros"
      case "investment":
        return "Inversiones"
      case "debt":
        return "Deudas"
      case "budget":
        return "Presupuesto"
      default:
        return "General"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Finanzas</h1>
          <p className="text-muted-foreground">Controla tu dinero y construye riqueza</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <DollarSign className="w-4 h-4 mr-1" />${(monthlyBudget.income - monthlyBudget.expenses).toLocaleString()}{" "}
          disponible
        </Badge>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-xs text-green-600 font-medium">+12%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ingresos</p>
              <p className="text-2xl font-bold text-green-700">${monthlyBudget.income.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              <span className="text-xs text-red-600 font-medium">-5%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Gastos</p>
              <p className="text-2xl font-bold text-red-700">${monthlyBudget.expenses.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <PiggyBank className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">+18%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Ahorros</p>
              <p className="text-2xl font-bold text-blue-700">${monthlyBudget.savings.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">+25%</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Inversiones</p>
              <p className="text-2xl font-bold text-purple-700">${monthlyBudget.investments.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metas financieras */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Metas Financieras
          </CardTitle>
          <CardDescription>Tu progreso hacia la libertad financiera</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {financialGoals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100)
            const IconComponent = getCategoryIcon(goal.category)

            return (
              <div
                key={index}
                className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color} text-white`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {getCategoryLabel(goal.category)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progreso</span>
                      <span className="font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2 mb-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{Math.round(percentage)}% completado</span>
                      <span>Faltan ${(goal.target - goal.current).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Transacciones recientes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Transacciones Recientes
          </CardTitle>
          <CardDescription>Tus movimientos financieros más recientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.amount > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
