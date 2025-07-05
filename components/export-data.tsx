"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Download, FileText, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useGamification } from "@/components/gamification-provider"

interface ExportDataProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportData({ open, onOpenChange }: ExportDataProps) {
  const [selectedSections, setSelectedSections] = useState({
    profile: true,
    dashboard: true,
    tasks: true,
    habits: true,
    finances: true,
    workouts: true,
    nutrition: true,
    learning: true,
    diary: true,
    analytics: true,
  })
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()
  const { level, xp, streak, achievements } = useGamification()

  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Datos simulados para el reporte (en una app real vendrían de la base de datos)
    const reportData = {
      profile: {
        name: "Usuario CEO",
        level: level,
        xp: xp,
        streak: streak,
        achievements: achievements.filter((a) => a.unlocked).length,
        totalAchievements: achievements.length,
      },
      tasks: {
        completed: 45,
        total: 60,
        completionRate: 75,
        highPriority: 8,
        mediumPriority: 15,
        lowPriority: 22,
      },
      habits: {
        active: 8,
        completedToday: 6,
        averageStreak: 12,
        bestStreak: 28,
        consistency: 85,
      },
      finances: {
        monthlyIncome: 45000,
        monthlyExpenses: 32000,
        savings: 13000,
        savingsRate: 29,
        budgetCompliance: 92,
      },
      workouts: {
        weeklyGoal: 4,
        completed: 3,
        totalMinutes: 180,
        caloriesBurned: 1250,
        consistency: 78,
      },
      nutrition: {
        dailyCalorieGoal: 2200,
        averageCalories: 1950,
        proteinGoal: 150,
        averageProtein: 135,
        hydrationGoal: 8,
        averageHydration: 7,
      },
      learning: {
        activeCourses: 3,
        completedCourses: 2,
        booksReading: 2,
        booksCompleted: 5,
        weeklyHours: 12,
      },
      diary: {
        entriesThisMonth: 18,
        averageMood: "Bien",
        reflectionStreak: 5,
        wordsWritten: 15420,
      },
    }

    return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reporte CEO de Mi Vida</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            min-height: 100vh;
            box-shadow: 0 0 50px rgba(0,0,0,0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        
        .header-content {
            position: relative;
            z-index: 1;
        }
        
        .logo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border-radius: 20px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            backdrop-filter: blur(10px);
        }
        
        .header h1 {
            font-size: 2.5rem;
            font-weight: 800;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .header p {
            font-size: 1.1rem;
            opacity: 0.9;
            margin-bottom: 20px;
        }
        
        .date-badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
        }
        
        .content {
            padding: 40px;
        }
        
        .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
        }
        
        .section-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #e5e7eb;
        }
        
        .section-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-weight: bold;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .stat-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2);
        }
        
        .stat-value {
            font-size: 2rem;
            font-weight: 800;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: #6b7280;
            font-weight: 500;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #059669);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .badge {
            display: inline-block;
            padding: 4px 12px;
            background: #ddd6fe;
            color: #7c3aed;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin: 2px;
        }
        
        .badge.success { background: #dcfce7; color: #16a34a; }
        .badge.warning { background: #fef3c7; color: #d97706; }
        .badge.info { background: #dbeafe; color: #2563eb; }
        
        .summary-box {
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 1px solid #0ea5e9;
            border-radius: 12px;
            padding: 25px;
            margin: 20px 0;
        }
        
        .summary-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #0c4a6e;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
        }
        
        .summary-title::before {
            content: '💡';
            margin-right: 10px;
            font-size: 1.5rem;
        }
        
        .achievement-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .achievement {
            background: white;
            border: 2px solid #e5e7eb;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .achievement.unlocked {
            border-color: #10b981;
            background: #f0fdf4;
        }
        
        .achievement-icon {
            font-size: 2rem;
            margin-bottom: 8px;
        }
        
        .achievement-title {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 4px;
        }
        
        .achievement-desc {
            font-size: 0.8rem;
            color: #6b7280;
        }
        
        .footer {
            background: #f8fafc;
            padding: 30px 40px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
            margin-top: 40px;
        }
        
        .footer-text {
            color: #6b7280;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }
        
        .footer-logo {
            font-weight: 700;
            color: #667eea;
            font-size: 1.1rem;
        }
        
        @media print {
            body { background: white; }
            .container { box-shadow: none; }
            .section { page-break-inside: avoid; }
        }
        
        .highlight {
            background: linear-gradient(120deg, #a78bfa 0%, #ec4899 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800;
        }
        
        .metric-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #f3f4f6;
        }
        
        .metric-row:last-child {
            border-bottom: none;
        }
        
        .metric-label {
            font-weight: 500;
            color: #374151;
        }
        
        .metric-value {
            font-weight: 700;
            color: #1f2937;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-content">
                <div class="logo">CEO</div>
                <h1>Reporte de Progreso</h1>
                <p>Tu análisis completo de productividad y crecimiento personal</p>
                <div class="date-badge">${currentDate}</div>
            </div>
        </div>
        
        <div class="content">
            ${
              selectedSections.profile
                ? `
            <!-- Perfil del Usuario -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">👤</div>
                    <h2 class="section-title">Perfil del Usuario</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value highlight">Nivel ${reportData.profile.level}</div>
                        <div class="stat-label">Nivel Actual</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.profile.xp.toLocaleString()}</div>
                        <div class="stat-label">Puntos de Experiencia</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.profile.streak}</div>
                        <div class="stat-label">Días de Racha</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.profile.achievements}/${reportData.profile.totalAchievements}</div>
                        <div class="stat-label">Logros Desbloqueados</div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.tasks
                ? `
            <!-- Gestión de Tareas -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">✅</div>
                    <h2 class="section-title">Gestión de Tareas</h2>
                </div>
                <div class="summary-box">
                    <div class="summary-title">Resumen de Productividad</div>
                    <div class="metric-row">
                        <span class="metric-label">Tareas Completadas</span>
                        <span class="metric-value">${reportData.tasks.completed}/${reportData.tasks.total}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Tasa de Finalización</span>
                        <span class="metric-value">${reportData.tasks.completionRate}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${reportData.tasks.completionRate}%"></div>
                    </div>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.tasks.highPriority}</div>
                        <div class="stat-label">Alta Prioridad</div>
                        <span class="badge warning">Urgente</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.tasks.mediumPriority}</div>
                        <div class="stat-label">Media Prioridad</div>
                        <span class="badge info">Normal</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.tasks.lowPriority}</div>
                        <div class="stat-label">Baja Prioridad</div>
                        <span class="badge success">Flexible</span>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.habits
                ? `
            <!-- Seguimiento de Hábitos -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">🔄</div>
                    <h2 class="section-title">Seguimiento de Hábitos</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.habits.active}</div>
                        <div class="stat-label">Hábitos Activos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.habits.completedToday}</div>
                        <div class="stat-label">Completados Hoy</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.habits.bestStreak}</div>
                        <div class="stat-label">Mejor Racha</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.habits.consistency}%</div>
                        <div class="stat-label">Consistencia</div>
                    </div>
                </div>
                <div class="summary-box">
                    <div class="summary-title">Análisis de Consistencia</div>
                    <p>Tu consistencia promedio es del <strong>${reportData.habits.consistency}%</strong>, lo que indica un excelente compromiso con tus rutinas diarias. La racha promedio de <strong>${reportData.habits.averageStreak} días</strong> demuestra tu dedicación al crecimiento personal.</p>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.finances
                ? `
            <!-- Finanzas Personales -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">💰</div>
                    <h2 class="section-title">Finanzas Personales</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">$${reportData.finances.monthlyIncome.toLocaleString()}</div>
                        <div class="stat-label">Ingresos Mensuales</div>
                        <span class="badge success">+12%</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">$${reportData.finances.monthlyExpenses.toLocaleString()}</div>
                        <div class="stat-label">Gastos Mensuales</div>
                        <span class="badge info">-5%</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">$${reportData.finances.savings.toLocaleString()}</div>
                        <div class="stat-label">Ahorros</div>
                        <span class="badge success">+18%</span>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.finances.savingsRate}%</div>
                        <div class="stat-label">Tasa de Ahorro</div>
                    </div>
                </div>
                <div class="summary-box">
                    <div class="summary-title">Salud Financiera</div>
                    <div class="metric-row">
                        <span class="metric-label">Balance Mensual</span>
                        <span class="metric-value">$${(reportData.finances.monthlyIncome - reportData.finances.monthlyExpenses).toLocaleString()}</span>
                    </div>
                    <div class="metric-row">
                        <span class="metric-label">Cumplimiento de Presupuesto</span>
                        <span class="metric-value">${reportData.finances.budgetCompliance}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${reportData.finances.budgetCompliance}%"></div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.workouts
                ? `
            <!-- Entrenamiento -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">🏋️</div>
                    <h2 class="section-title">Entrenamiento</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.workouts.completed}/${reportData.workouts.weeklyGoal}</div>
                        <div class="stat-label">Entrenamientos Semanales</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.workouts.totalMinutes}</div>
                        <div class="stat-label">Minutos Totales</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.workouts.caloriesBurned}</div>
                        <div class="stat-label">Calorías Quemadas</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.workouts.consistency}%</div>
                        <div class="stat-label">Consistencia</div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.nutrition
                ? `
            <!-- Nutrición -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">🍎</div>
                    <h2 class="section-title">Nutrición</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.nutrition.averageCalories}</div>
                        <div class="stat-label">Calorías Promedio</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(reportData.nutrition.averageCalories / reportData.nutrition.dailyCalorieGoal) * 100}%"></div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.nutrition.averageProtein}g</div>
                        <div class="stat-label">Proteína Promedio</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(reportData.nutrition.averageProtein / reportData.nutrition.proteinGoal) * 100}%"></div>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.nutrition.averageHydration}</div>
                        <div class="stat-label">Vasos de Agua</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(reportData.nutrition.averageHydration / reportData.nutrition.hydrationGoal) * 100}%"></div>
                        </div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.learning
                ? `
            <!-- Aprendizaje -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">📚</div>
                    <h2 class="section-title">Aprendizaje</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.learning.activeCourses}</div>
                        <div class="stat-label">Cursos Activos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.learning.completedCourses}</div>
                        <div class="stat-label">Cursos Completados</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.learning.booksCompleted}</div>
                        <div class="stat-label">Libros Leídos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.learning.weeklyHours}h</div>
                        <div class="stat-label">Horas Semanales</div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.diary
                ? `
            <!-- Diario Personal -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">📝</div>
                    <h2 class="section-title">Diario Personal</h2>
                </div>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${reportData.diary.entriesThisMonth}</div>
                        <div class="stat-label">Entradas este Mes</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.diary.averageMood}</div>
                        <div class="stat-label">Estado de Ánimo Promedio</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.diary.reflectionStreak}</div>
                        <div class="stat-label">Racha de Reflexión</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${reportData.diary.wordsWritten.toLocaleString()}</div>
                        <div class="stat-label">Palabras Escritas</div>
                    </div>
                </div>
            </div>
            `
                : ""
            }

            ${
              selectedSections.analytics
                ? `
            <!-- Análisis y Logros -->
            <div class="section">
                <div class="section-header">
                    <div class="section-icon">🏆</div>
                    <h2 class="section-title">Logros Desbloqueados</h2>
                </div>
                <div class="achievement-grid">
                    ${achievements
                      .map(
                        (achievement) => `
                        <div class="achievement ${achievement.unlocked ? "unlocked" : ""}">
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-title">${achievement.title}</div>
                            <div class="achievement-desc">${achievement.description}</div>
                        </div>
                    `,
                      )
                      .join("")}
                </div>
                
                <div class="summary-box">
                    <div class="summary-title">Resumen de Progreso General</div>
                    <p>En este período has demostrado un <strong>excelente compromiso</strong> con tu desarrollo personal. Tu consistencia en los hábitos (${reportData.habits.consistency}%) y tu tasa de finalización de tareas (${reportData.tasks.completionRate}%) reflejan una mentalidad de crecimiento sólida.</p>
                    <br>
                    <p><strong>Áreas destacadas:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        <li>💪 Excelente disciplina en el entrenamiento</li>
                        <li>💰 Gestión financiera responsable con ${reportData.finances.savingsRate}% de ahorro</li>
                        <li>📚 Compromiso constante con el aprendizaje</li>
                        <li>🎯 Alta productividad en la gestión de tareas</li>
                    </ul>
                    <br>
                    <p><strong>Recomendaciones para seguir creciendo:</strong></p>
                    <ul style="margin-left: 20px; margin-top: 10px;">
                        <li>🔥 Mantén tu racha actual de ${reportData.profile.streak} días</li>
                        <li>📈 Considera aumentar gradualmente tus metas semanales</li>
                        <li>🎨 Explora nuevas áreas de desarrollo personal</li>
                        <li>🤝 Comparte tu progreso con otros para mayor motivación</li>
                    </ul>
                </div>
            </div>
            `
                : ""
            }
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="footer-text">Reporte generado automáticamente por</div>
            <div class="footer-logo">CEO de Mi Vida - Tu Coach Personal IA</div>
            <div class="footer-text">Sigue construyendo la mejor versión de ti mismo 🚀</div>
        </div>
    </div>
</body>
</html>
    `
  }

  const handleExport = async () => {
    setIsExporting(true)

    try {
      // Generar el contenido HTML
      const htmlContent = generatePDFContent()

      // Crear un blob con el HTML
      const blob = new Blob([htmlContent], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      // Abrir en nueva ventana para imprimir como PDF
      const printWindow = window.open(url, "_blank")

      if (printWindow) {
        printWindow.onload = () => {
          setTimeout(() => {
            printWindow.print()
            URL.revokeObjectURL(url)
          }, 500)
        }
      }

      // También crear descarga directa del HTML
      const link = document.createElement("a")
      link.href = url
      link.download = `CEO-Vida-Reporte-${new Date().toISOString().split("T")[0]}.html`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Reporte generado",
        description: "Tu reporte PDF ha sido generado. Usa Ctrl+P para guardarlo como PDF.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo generar el reporte. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            Exportar Reporte PDF
          </DialogTitle>
          <DialogDescription>
            Genera un reporte completo con el estilo de la app en formato PDF profesional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Secciones a incluir:</Label>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {Object.entries(selectedSections).map(([key, checked]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={checked}
                    onCheckedChange={(checked) => setSelectedSections((prev) => ({ ...prev, [key]: !!checked }))}
                  />
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key === "profile" && "👤 Perfil"}
                    {key === "dashboard" && "📊 Dashboard"}
                    {key === "tasks" && "✅ Tareas"}
                    {key === "habits" && "🔄 Hábitos"}
                    {key === "finances" && "💰 Finanzas"}
                    {key === "workouts" && "🏋️ Entrenamiento"}
                    {key === "nutrition" && "🍎 Nutrición"}
                    {key === "learning" && "📚 Aprendizaje"}
                    {key === "diary" && "📝 Diario"}
                    {key === "analytics" && "🏆 Logros"}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Reporte PDF Profesional</span>
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              • Diseño idéntico al estilo de la app
              <br />• Gráficos y estadísticas completas
              <br />• Análisis detallado de progreso
              <br />• Recomendaciones personalizadas
              <br />• Optimizado para impresión
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700"
            >
              {isExporting ? (
                <>
                  <Calendar className="w-4 h-4 mr-2 animate-spin" />
                  Generando PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Generar Reporte PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
