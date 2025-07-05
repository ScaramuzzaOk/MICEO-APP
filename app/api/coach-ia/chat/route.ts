import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(request: NextRequest) {
  try {
    const { messages, memory } = await request.json()

    const systemPrompt = `Eres el Coach IA Personal de la aplicación "CEO de Mi Vida". Tu personalidad es ${memory.personality}.

CONTEXTO DEL USUARIO:
- Metas registradas: ${memory.goals}
- Logros completados: ${memory.achievements}
- Conversaciones previas: ${memory.conversations}

TU MISIÓN:
Actúas como un coach personal, psicólogo y mentor que ayuda al usuario a convertirse en el CEO de su propia vida. Eres empático, motivador y siempre ofreces consejos prácticos.

TIPOS DE RESPUESTA:
- "analysis": Cuando analizas patrones, comportamientos o datos del usuario
- "motivation": Cuando das ánimo, celebras logros o inspiras al usuario
- "advice": Cuando das consejos prácticos, estrategias o recomendaciones

ESTILO DE COMUNICACIÓN:
- Usa un tono cálido y profesional
- Sé específico y actionable en tus consejos
- Haz preguntas reflexivas cuando sea apropiado
- Celebra los pequeños logros
- Mantén un enfoque en el crecimiento personal

ÁREAS DE EXPERTISE:
- Gestión de tareas y productividad
- Desarrollo de hábitos saludables
- Finanzas personales
- Entrenamiento y nutrición
- Mentalidad y bienestar mental
- Aprendizaje y desarrollo profesional

Responde de manera natural y humana, como si fueras un coach personal real que conoce al usuario.`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      messages: messages,
    })

    // Determine response type based on content
    let responseType = "advice"
    if (
      text.toLowerCase().includes("analiz") ||
      text.toLowerCase().includes("patrón") ||
      text.toLowerCase().includes("datos")
    ) {
      responseType = "analysis"
    } else if (
      text.toLowerCase().includes("felicit") ||
      text.toLowerCase().includes("excelente") ||
      text.toLowerCase().includes("¡")
    ) {
      responseType = "motivation"
    }

    return NextResponse.json({
      content: text,
      type: responseType,
    })
  } catch (error) {
    console.error("Error in coach-ia chat:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}
