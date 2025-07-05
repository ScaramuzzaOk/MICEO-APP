import { type NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { weeklyData, nutritionData, habits, tasks, courses } = await request.json()

    // Crear el prompt para el análisis
    const prompt = `
Como un coach personal experto, analiza los siguientes datos de la semana del usuario y proporciona un análisis detallado y personalizado:

DATOS DE PROGRESO SEMANAL:
${weeklyData.map((day: any) => `${day.day}: Hábitos: ${day.habitos}/4, Productividad: ${day.productividad}%, Finanzas: ${day.finanzas}%`).join("\n")}

NUTRICIÓN:
- Calorías consumidas: ${nutritionData.calories.consumed}/${nutritionData.calories.target}
- Macronutrientes: ${nutritionData.macros.map((m: any) => `${m.name}: ${m.value}%`).join(", ")}

HÁBITOS:
- Completados: ${habits.completed}/${habits.total} esta semana
- Rachas activas: ${habits.streaks.join(", ")} días

TAREAS:
- Completadas: ${tasks.completed}/${tasks.total}

CURSOS:
- Completados: ${courses.completed}/${courses.total}
- Progreso actual: ${courses.progress.join("%, ")}%

Por favor proporciona:

1. **RESUMEN EJECUTIVO** (2-3 líneas sobre el rendimiento general)

2. **FORTALEZAS IDENTIFICADAS** (qué está funcionando bien)

3. **ÁREAS DE MEJORA** (qué necesita atención)

4. **RECOMENDACIONES ESPECÍFICAS** (3-4 acciones concretas para la próxima semana)

5. **MOTIVACIÓN PERSONALIZADA** (mensaje inspirador basado en los datos)

Mantén un tono motivador, profesional y específico. Usa los datos reales para hacer el análisis preciso y personalizado.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres un coach personal experto que analiza datos de productividad y bienestar para proporcionar insights valiosos y motivadores.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const analysis = completion.choices[0]?.message?.content || "No se pudo generar el análisis."

    return NextResponse.json({ analysis })
  } catch (error) {
    console.error("Error generating AI analysis:", error)
    return NextResponse.json({ error: "Error al generar el análisis IA" }, { status: 500 })
  }
}
