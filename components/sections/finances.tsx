"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, TrendingUp, TrendingDown, Target, PiggyBank, CreditCard, Edit, Save, Plus, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FinancialGoal {
  id: string
  name: string
  current: number
  target: number
  category: "savings" | "investment" | "debt" | "budget"
  color: string
  deadline: string
  description: string
}

export function Finances() {
  const [financialGoals, setFinancialGoals] = useState<FinancialGoal[]>([
    {
      id: "1",
      name: "Fondo de Emergencia",
      current: 15000,
      target: 25000,
      category: "savings",
      color: "from-green-500 to-emerald-600",
      deadline: "2024-12-31",
      description: "6 meses de gastos de emergencia",
    },
    {
      id: "2",
      name: "Inversiones",
      current: 8500,
      target: 15000,
      category: "investment",
      color: "from-blue-500 to-indigo-600",
      deadline: "2024-06-30",
      description: "Portafolio diversificado de inversiones",
    },
    {
      id: "3",
      name: "Pagar Deuda Tarjeta",
      current: 3000,
      target: 8000,
      category: "debt",
      color: "from-red-500 to-orange-600",
      deadline: "2024-03-31",
      description: "Eliminar deuda de tarjeta de crédito",
    },
  ])

  const [editingGoal, setEditingGoal] = useState<string | null>(null)
  const [tempGoal, setTempGoal] = useState<FinancialGoal | null>(null)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState<Partial<FinancialGoal>>({
    name: "",
    current: 0,
    target: 1000,
    category: "savings",
    deadline: "",
    description: "",
  })
  const { toast } = useToast()

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

  const startEditingGoal = (goal: FinancialGoal) => {
    setTempGoal({ ...goal })
    setEditingGoal(goal.id)
  }

  const saveGoal = () => {
    if (!tempGoal) return
    setFinancialGoals((prev) => prev.map((goal) => (goal.id === tempGoal.id ? tempGoal : goal)))
    setEditingGoal(null)
    setTempGoal(null)
    toast({
      title: "Meta actualizada",
      description: "La meta financiera ha sido guardada.",
    })
  }

  const addNewGoal = () => {
    if (!newGoal.name || !newGoal.target) return
    const goal: FinancialGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      current: newGoal.current || 0,
      target: newGoal.target,
      category: newGoal.category as any,
      color: getColorByCategory(newGoal.category as any),
      deadline: newGoal.deadline || "",
      description: newGoal.description || "",
    }
    setFinancialGoals((prev) => [...prev, goal])
    setNewGoal({
      name: "",
      current: 0,
      target: 1000,
      category: "savings",
      deadline: "",
      description: "",
    })
    setShowAddGoal(false)
    toast({
      title: "Meta agregada",
      description: "Nueva meta financiera creada exitosamente.",
    })
  }

  const getColorByCategory = (category: string) => {
    switch (category) {
      case "savings":
        return "from-green-500 to-emerald-600"
      case "investment":
        return "from-blue-500 to-indigo-600"
      case "debt":
        return "from-red-500 to-orange-600"
      default:
        return "from-purple-500 to-pink-600"
    }
  }

  const updateGoalProgress = (id: string, amount: number) => {
    setFinancialGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, current: Math.max(0, goal.current + amount) } : goal)),
    )
  }

  const deleteGoal = (id: string) => {
    setFinancialGoals((prev) => prev.filter((goal) => goal.id !== id))
    toast({
      title: "Meta eliminada",
      description: "La meta financiera ha sido eliminada.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Finanzas</h1>
          <p className="text-muted-foreground">Controla tu dinero y construye riqueza</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <DollarSign className="w-4 h-4 mr-1" />${(monthlyBudget.income - monthlyBudget.expenses).toLocaleString()}{" "}
            disponible
          </Badge>
          <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600">
                <Plus className="w-4 h-4 mr-2" />
                Nueva Meta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Meta Financiera</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nombre de la meta</label>
                  <Input
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    placeholder="Ej: Vacaciones en Europa"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Descripción</label>
                  <Input
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="Descripción de la meta"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Monto actual</label>
                    <Input
                      type="number"
                      value={newGoal.current}
                      onChange={(e) => setNewGoal({ ...newGoal, current: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Monto objetivo</label>
                    <Input
                      type="number"
                      value={newGoal.target}
                      onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Categoría</label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value as any })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Ahorros</SelectItem>
                        <SelectItem value="investment">Inversiones</SelectItem>
                        <SelectItem value="debt">Deudas</SelectItem>
                        <SelectItem value="budget">Presupuesto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fecha límite</label>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={addNewGoal}>Crear Meta</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
          {financialGoals.map((goal) => {
            const percentage = Math.min((goal.current / goal.target) * 100, 100)
            const IconComponent = getCategoryIcon(goal.category)

            return (
              <div
                key={goal.id}
                className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${goal.color} text-white`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
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
                      <span>{goal.deadline && `Fecha límite: ${new Date(goal.deadline).toLocaleDateString()}`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => (editingGoal === goal.id ? saveGoal() : startEditingGoal(goal))}
                    >
                      {editingGoal === goal.id ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateGoalProgress(goal.id, 1000)}>
                      +$1K
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteGoal(goal.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {editingGoal === goal.id && tempGoal && (
                  <div className="space-y-3 border-t pt-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium">Monto actual</label>
                        <Input
                          type="number"
                          value={tempGoal.current}
                          onChange={(e) => setTempGoal({ ...tempGoal, current: Number(e.target.value) })}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium">Monto objetivo</label>
                        <Input
                          type="number"
                          value={tempGoal.target}
                          onChange={(e) => setTempGoal({ ...tempGoal, target: Number(e.target.value) })}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium">Descripción</label>
                      <Input
                        value={tempGoal.description}
                        onChange={(e) => setTempGoal({ ...tempGoal, description: e.target.value })}
                        className="h-8"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Fecha límite</label>
                      <Input
                        type="date"
                        value={tempGoal.deadline}
                        onChange={(e) => setTempGoal({ ...tempGoal, deadline: e.target.value })}
                        className="h-8"
                      />
                    </div>
                  </div>
                )}
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
