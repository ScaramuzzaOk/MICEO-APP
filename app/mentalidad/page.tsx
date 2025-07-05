"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Star, Lightbulb, TrendingUp, Heart, Brain, Target } from "lucide-react"

// Base de datos de frases de empresarios famosos
const entrepreneurQuotes = [
  // Brian Tracy
  "El éxito es metas, todo lo demás son comentarios. - Brian Tracy",
  "No hay límites para lo que puedes lograr, excepto los límites que te pones a ti mismo. - Brian Tracy",
  "La disciplina es el puente entre metas y logros. - Brian Tracy",
  "Tu mayor activo es tu capacidad de ganar. - Brian Tracy",
  "El futuro pertenece a los competentes. - Brian Tracy",
  "La clave del éxito es la acción. - Brian Tracy",
  "Desarrolla una actitud de gratitud y da las gracias por todo lo que te sucede. - Brian Tracy",
  "La comunicación es una habilidad que puedes aprender. - Brian Tracy",
  "Los líderes exitosos tienen la valentía de tomar acción mientras otros dudan. - Brian Tracy",
  "Tu velocidad de implementación determina tu velocidad de éxito. - Brian Tracy",

  // Napoleon Hill
  "Todo lo que la mente puede concebir y creer, lo puede lograr. - Napoleon Hill",
  "El punto de partida de todo logro es el deseo. - Napoleon Hill",
  "La persistencia es el trabajo duro que haces después de estar cansado del trabajo duro que ya hiciste. - Napoleon Hill",
  "Los pensamientos son cosas. - Napoleon Hill",
  "El éxito requiere no disculpas, el fracaso no permite excusas. - Napoleon Hill",
  "La oportunidad a menudo viene disfrazada de trabajo duro. - Napoleon Hill",
  "Antes de que el éxito llegue a la vida de cualquier hombre, seguramente encontrará derrotas temporales. - Napoleon Hill",
  "Una meta es un sueño con una fecha límite. - Napoleon Hill",
  "La fuerza y el crecimiento vienen solo a través del esfuerzo y la lucha continua. - Napoleon Hill",
  "El camino hacia el éxito y el camino hacia el fracaso son casi exactamente iguales. - Napoleon Hill",

  // Bill Gates
  "Tu cliente más insatisfecho es tu mayor fuente de aprendizaje. - Bill Gates",
  "El éxito es un mal maestro. Seduce a las personas inteligentes a pensar que no pueden perder. - Bill Gates",
  "La mayoría de las personas sobreestiman lo que pueden hacer en un año y subestiman lo que pueden hacer en diez años. - Bill Gates",
  "Si naces pobre no es tu culpa, pero si mueres pobre sí es tu culpa. - Bill Gates",
  "La información es poder, pero la información distribuida es empoderamiento. - Bill Gates",
  "No compares tu negocio con nadie más, compáralo con lo que eres capaz de hacer. - Bill Gates",
  "La tecnología es solo una herramienta. En términos de llevar a los niños juntos y motivarlos, el maestro es lo más importante. - Bill Gates",
  "Medir el progreso de la programación por líneas de código es como medir el progreso de la construcción de aviones por peso. - Bill Gates",
  "Como gastamos mucho tiempo en el trabajo, es importante que sea algo que realmente disfrutemos hacer. - Bill Gates",
  "La paciencia es un elemento clave del éxito. - Bill Gates",

  // Henry Ford
  "Ya sea que pienses que puedes o que no puedes, tienes razón. - Henry Ford",
  "El fracaso es simplemente la oportunidad de comenzar de nuevo, esta vez de forma más inteligente. - Henry Ford",
  "Reunirse es un comienzo; mantenerse juntos es progreso; trabajar juntos es éxito. - Henry Ford",
  "La calidad significa hacer lo correcto cuando nadie está mirando. - Henry Ford",
  "No encuentres fallas, encuentra un remedio. - Henry Ford",
  "Los obstáculos son esas cosas espantosas que ves cuando apartas los ojos de tu meta. - Henry Ford",
  "Cualquiera que deje de aprender es viejo, ya sea a los veinte o a los ochenta. - Henry Ford",
  "La visión sin ejecución es solo alucinación. - Henry Ford",
  "El dinero no cambia a los hombres, simplemente los desenmascara. - Henry Ford",
  "Hay alegría en el trabajo. No hay felicidad excepto en la realización de que hemos logrado algo. - Henry Ford",

  // Steve Jobs
  "La innovación distingue entre un líder y un seguidor. - Steve Jobs",
  "Tu trabajo va a llenar una gran parte de tu vida, y la única manera de estar verdaderamente satisfecho es hacer lo que crees que es un gran trabajo. - Steve Jobs",
  "Mantente hambriento, mantente tonto. - Steve Jobs",
  "La gente no sabe lo que quiere hasta que se lo muestras. - Steve Jobs",
  "Es mejor ser un pirata que unirse a la marina. - Steve Jobs",
  "Los detalles no son detalles. Hacen el diseño. - Steve Jobs",
  "Creo que las cosas que haces por pasión siempre son las que más recuerdas. - Steve Jobs",
  "La calidad es más importante que la cantidad. Un jonrón es mejor que dos dobles. - Steve Jobs",
  "No puedes conectar los puntos mirando hacia adelante; solo puedes conectarlos mirando hacia atrás. - Steve Jobs",
  "Ser el hombre más rico del cementerio no me importa. Irme a la cama por la noche diciendo que hemos hecho algo maravilloso, eso es lo que me importa. - Steve Jobs",

  // Warren Buffett
  "El precio es lo que pagas. El valor es lo que obtienes. - Warren Buffett",
  "Toma 20 años construir una reputación y cinco minutos arruinarla. - Warren Buffett",
  "Nunca inviertas en un negocio que no puedas entender. - Warren Buffett",
  "El riesgo viene de no saber lo que estás haciendo. - Warren Buffett",
  "Es mucho mejor comprar una empresa maravillosa a un precio justo que una empresa justa a un precio maravilloso. - Warren Buffett",
  "Alguien está sentado en la sombra hoy porque alguien plantó un árbol hace mucho tiempo. - Warren Buffett",
  "Las cadenas del hábito son demasiado ligeras para ser sentidas hasta que son demasiado pesadas para ser rotas. - Warren Buffett",
  "La diferencia entre personas exitosas y realmente exitosas es que las realmente exitosas dicen no a casi todo. - Warren Buffett",
  "Nuestro trabajo favorito de tenencia es para siempre. - Warren Buffett",
  "El tiempo es el amigo de los negocios maravillosos y el enemigo de los mediocres. - Warren Buffett",

  // Jeff Bezos
  "Creo que la frugalidad impulsa la innovación. - Jeff Bezos",
  "Si duplicas el número de experimentos que haces por año, vas a duplicar tu inventiva. - Jeff Bezos",
  "Prefiero arrepentirme de las cosas que hice que de las cosas que no hice. - Jeff Bezos",
  "La obsesión por el cliente es lo que nos diferencia. - Jeff Bezos",
  "En el mundo de los negocios, la palabra 'imposible' no existe. - Jeff Bezos",
  "Mantén tus gastos variables y tus ingresos fijos. - Jeff Bezos",
  "La marca para una empresa es como la reputación para una persona. - Jeff Bezos",
  "Si construyes una gran experiencia, los clientes se lo dirán a otros. - Jeff Bezos",
  "Creo que uno de los aspectos más difíciles de ser emprendedor es que tienes que tener una piel gruesa. - Jeff Bezos",
  "La vida es demasiado corta para rodearte de gente que no es ingeniosa. - Jeff Bezos",

  // Elon Musk
  "Cuando algo es lo suficientemente importante, lo haces incluso si las probabilidades no están a tu favor. - Elon Musk",
  "El fracaso es una opción aquí. Si las cosas no están fallando, no estás innovando lo suficiente. - Elon Musk",
  "Creo que es posible que la gente ordinaria elija ser extraordinaria. - Elon Musk",
  "La persistencia es muy importante. No debes rendirte a menos que te veas obligado a rendirte. - Elon Musk",
  "Si algo es lo suficientemente importante, deberías intentarlo incluso si el resultado probable es el fracaso. - Elon Musk",
  "Creo que es importante tener un circuito de retroalimentación, donde constantemente piensas en lo que has hecho y cómo podrías hacerlo mejor. - Elon Musk",
  "No creo en el proceso. De hecho, cuando digo 'no creo en el proceso', creo que es muy importante razonar desde los primeros principios. - Elon Musk",
  "Algunas personas no les gusta el cambio, pero necesitas abrazar el cambio si la alternativa es el desastre. - Elon Musk",
  "Realmente, la única cosa que tiene sentido es esforzarse por una mayor iluminación colectiva. - Elon Musk",
  "Si estás tratando de crear una empresa, es como hornear un pastel. Tienes que tener todos los ingredientes en la proporción correcta. - Elon Musk",

  // Mark Cuban
  "No importa cuán exitoso seas, siempre puedes hacer más. - Mark Cuban",
  "El trabajo duro vence al talento cuando el talento no trabaja duro. - Mark Cuban",
  "Las ventas curan todo. Conoce cómo vender. - Mark Cuban",
  "Siempre hay algo que puedes hacer. Nunca te rindas. - Mark Cuban",
  "El único deporte que he dominado es el de los negocios. - Mark Cuban",
  "Cada 'no' te acerca a un 'sí'. - Mark Cuban",
  "La ventaja competitiva más grande en cualquier negocio es la pasión. - Mark Cuban",
  "No necesitas ser el más inteligente de la habitación, solo necesitas estar dispuesto a trabajar más duro que todos los demás. - Mark Cuban",
  "El éxito y la suerte están estrechamente relacionados. - Mark Cuban",
  "En los negocios, para ser exitoso, tienes que estar dispuesto a hacer lo que otros no harán. - Mark Cuban",

  // Richard Branson
  "Los negocios tienen que dar a la gente enriquecimiento, diversión y placer. - Richard Branson",
  "Mi filosofía es que si disfrutas lo que haces, nunca trabajarás un día en tu vida. - Richard Branson",
  "El cliente no siempre tiene la razón, pero el cliente siempre debe ser escuchado. - Richard Branson",
  "Protege la reputación de tu empresa. Es tu activo más valioso. - Richard Branson",
  "Los negocios son fluidos. Las estrategias cambian. - Richard Branson",
  "Nunca mires hacia atrás en ira o hacia adelante en miedo, sino alrededor en conciencia. - Richard Branson",
  "Respeta a tus empleados y ellos respetarán tu negocio. - Richard Branson",
  "Una empresa exitosa es aquella que puede nutrir el espíritu emprendedor de sus empleados. - Richard Branson",
  "Si alguien te ofrece una oportunidad increíble pero no estás seguro de poder hacerlo, di que sí, luego aprende cómo hacerlo después. - Richard Branson",
  "Los emprendedores son simplemente aquellos que entienden que hay poca diferencia entre obstáculo y oportunidad. - Richard Branson",

  // Oprah Winfrey
  "El mayor descubrimiento de todos los tiempos es que una persona puede cambiar su futuro simplemente cambiando su actitud. - Oprah Winfrey",
  "Conviértete en la persona que merece el éxito que deseas. - Oprah Winfrey",
  "La clave del éxito es enfocarte en las metas, no en los obstáculos. - Oprah Winfrey",
  "Sé agradecido por lo que tienes; terminarás teniendo más. - Oprah Winfrey",
  "La educación es la clave para abrir el mundo, un pasaporte a la libertad. - Oprah Winfrey",
  "Donde no hay lucha, no hay fuerza. - Oprah Winfrey",
  "Tu mayor regalo es tu intuición. - Oprah Winfrey",
  "Haz lo que tienes que hacer hasta que puedas hacer lo que quieres hacer. - Oprah Winfrey",
  "La vida es sobre convertirte en más de quien eres. - Oprah Winfrey",
  "El éxito es un proceso, no un destino. - Oprah Winfrey",

  // Tony Robbins
  "El progreso es igual a la felicidad. - Tony Robbins",
  "La calidad de tu vida es la calidad de tus relaciones. - Tony Robbins",
  "Es en tus momentos de decisión que tu destino se forma. - Tony Robbins",
  "El éxito es hacer lo ordinario extraordinariamente bien. - Tony Robbins",
  "La diferencia en las personas es su nivel de compromiso. - Tony Robbins",
  "Donde el enfoque va, la energía fluye y los resultados aparecen. - Tony Robbins",
  "La única cosa que puedes controlar es tu enfoque. - Tony Robbins",
  "Los líderes gastan el 5% de su tiempo en el problema y el 95% en la solución. - Tony Robbins",
  "Si haces lo que siempre has hecho, obtendrás lo que siempre has obtenido. - Tony Robbins",
  "El secreto del éxito es aprender a usar el dolor y el placer en lugar de que el dolor y el placer te usen a ti. - Tony Robbins",

  // Jack Ma
  "Nunca renuncies. Hoy es difícil, mañana será peor, pero pasado mañana será sol. - Jack Ma",
  "Si no renuncias, aún tienes una oportunidad. - Jack Ma",
  "Los clientes primero, empleados segundo, accionistas tercero. - Jack Ma",
  "Cuando vendes a pequeñas empresas, tienes muy buenos ingresos. - Jack Ma",
  "Nunca compitas en precios, compite en servicios y innovación. - Jack Ma",
  "Si quieres ser exitoso, aprende de los errores de otros, no de los tuyos. - Jack Ma",
  "Oportunidad yace en el lugar donde la gente se queja. - Jack Ma",
  "Ayuda a los jóvenes. Ayúdalos a tener éxito. - Jack Ma",
  "El dinero no es todo. Asegúrate de ganar dinero haciendo algo que ames. - Jack Ma",
  "Hoy es cruel. Mañana es más cruel. Y pasado mañana es hermoso. - Jack Ma",

  // Frases adicionales
  "El éxito no es final, el fracaso no es fatal: es el coraje de continuar lo que cuenta. - Winston Churchill",
  "La manera de empezar es dejar de hablar y empezar a hacer. - Walt Disney",
  "Si realmente miras de cerca, la mayoría de los éxitos de la noche a la mañana tomaron mucho tiempo. - Steve Jobs",
  "Tu red es tu patrimonio neto. - Porter Gale",
  "El emprendimiento es vivir algunos años de tu vida como la mayoría de la gente no lo hará, para que puedas pasar el resto de tu vida como la mayoría de la gente no puede. - Anónimo",
  "No busques ser una persona de éxito, busca ser una persona de valor. - Albert Einstein",
  "El único lugar donde el éxito viene antes que el trabajo es en el diccionario. - Vidal Sassoon",
  "Haz lo que amas y no trabajarás ni un día de tu vida. - Confucio",
  "La oportunidad es perdida por la mayoría de la gente porque viene vestida de overol y parece trabajo. - Thomas Edison",
  "No puedes usar la creatividad. Mientras más la uses, más tienes. - Maya Angelou",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día. - Robert Collier",
  "La diferencia entre lo ordinario y lo extraordinario es ese pequeño 'extra'. - Jimmy Johnson",
  "No esperes por la oportunidad. Créala. - George Bernard Shaw",
  "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora. - Proverbio Chino",
  "Si puedes soñarlo, puedes hacerlo. - Walt Disney",
  "La única manera de hacer un gran trabajo es amar lo que haces. - Steve Jobs",
  "No tengas miedo de renunciar a lo bueno para ir por lo grandioso. - John D. Rockefeller",
  "El éxito es ir de fracaso en fracaso sin perder el entusiasmo. - Winston Churchill",
  "La innovación es lo que distingue a un líder de un seguidor. - Steve Jobs",
  "El camino hacia el éxito y el camino hacia el fracaso son casi exactamente iguales. - Colin R. Davis",
  "Si no construyes tu sueño, alguien más te contratará para ayudar a construir el suyo. - Dhirubhai Ambani",
  "El éxito no se mide por la posición que uno alcanza en la vida, sino por los obstáculos que supera. - Booker T. Washington",
  "La única cosa imposible es aquella que no intentas. - Tommy Lasorda",
  "El fracaso es el condimento que da sabor al éxito. - Truman Capote",
  "No dejes que lo que no puedes hacer interfiera con lo que puedes hacer. - John Wooden",
  "La persistencia puede cambiar el fracaso en un logro extraordinario. - Matt Biondi",
  "El éxito no es la clave de la felicidad. La felicidad es la clave del éxito. - Albert Schweitzer",
  "Si amas lo que haces, nunca tendrás que trabajar un día en tu vida. - Marc Anthony",
  "El único límite para nuestros logros de mañana serán nuestras dudas de hoy. - Franklin D. Roosevelt",
  "La motivación es lo que te pone en marcha. El hábito es lo que hace que sigas. - Jim Ryun",
  "No cuentes los días, haz que los días cuenten. - Muhammad Ali",
  "El éxito es donde la preparación y la oportunidad se encuentran. - Bobby Unser",
  "La única manera de predecir el futuro es creándolo. - Peter Drucker",
  "No busques el momento perfecto, toma el momento y hazlo perfecto. - Zoey Sayward",
  "El éxito es conseguir lo que quieres. La felicidad es querer lo que consigues. - Dale Carnegie",
  "La diferencia entre ganar y perder es muy a menudo no rendirse. - Walt Disney",
  "Si quieres algo que nunca has tenido, tienes que hacer algo que nunca has hecho. - Thomas Jefferson",
  "No esperes. El tiempo nunca será el adecuado. - Napoleon Hill",
  "La única persona que está destinada a convertirse es la persona que decides ser. - Ralph Waldo Emerson",
  "El éxito no es accidental. Es trabajo duro, perseverancia, aprendizaje, estudio, sacrificio y sobre todo, amor por lo que estás haciendo. - Pelé",
  "La vida es 10% lo que te sucede y 90% cómo reaccionas a ello. - Charles R. Swindoll",
  "No dejes para mañana lo que puedes hacer hoy. - Benjamin Franklin",
  "Si no diseñas tu propio plan de vida, es probable que caigas en el plan de alguien más. - Jim Rohn",
  "La única cosa que se interpone entre tú y tu meta es la historia que sigues diciéndote sobre por qué no puedes lograrla. - Jordan Belfort",
  "Si realmente quieres hacer algo, encontrarás una manera. Si no, encontrarás una excusa. - Jim Rohn",
  "El éxito es 1% inspiración y 99% transpiración. - Thomas Edison",
  "La fortuna favorece a la mente preparada. - Louis Pasteur",
  "La excelencia no es una habilidad, es una actitud. - Ralph Marston",
  "Si no te gusta algo, cámbialo. Si no puedes cambiarlo, cambia tu actitud. - Maya Angelou",
  "La vida es lo que pasa mientras estás ocupado haciendo otros planes. - John Lennon",
  "El futuro pertenece a aquellos que creen en la belleza de sus sueños. - Eleanor Roosevelt",
  "No juzgues cada día por la cosecha que recoges, sino por las semillas que plantas. - Robert Louis Stevenson",
  "El éxito no es la ausencia de fracaso; es la persistencia a través del fracaso. - Aisha Tyler",
  "Si puedes soñarlo, puedes lograrlo. - Zig Ziglar",
  "La única manera de predecir el futuro es inventándolo. - Alan Kay",
  "No tengas miedo de dar un gran paso si uno es necesario. No puedes cruzar un abismo en dos pequeños saltos. - David Lloyd George",
  "Si quieres ser feliz, establece una meta que dirija tus pensamientos, libere tu energía e inspire tus esperanzas. - Andrew Carnegie",
  "El éxito no es para los débiles y tímidos. Es para aquellos que buscan orientación, coraje y determinación para perseverar cuando las cosas se ponen difíciles. - Thomas S. Monson",
  "La única cosa que tienes que saber es cómo confiar en tu propio inconsciente, y eso requiere valor. - Carlos Castaneda",
  "No busques ser exitoso, busca ser valioso. - Albert Einstein",
  "El éxito es caminar de fracaso en fracaso sin perder el entusiasmo. - Winston Churchill",
  "La oportunidad es perdida por la mayoría de la gente porque viene vestida de overol y parece trabajo. - Thomas Edison",
]

export default function MentalidadPage() {
  const [currentQuote, setCurrentQuote] = useState(
    "Soy capaz de lograr todo lo que me propongo con determinación y perseverancia",
  )

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * entrepreneurQuotes.length)
    setCurrentQuote(entrepreneurQuotes[randomIndex])
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Mentalidad
          </h1>
          <p className="text-slate-400 text-sm md:text-base">Desarrolla una mentalidad ganadora y resiliente</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Brain className="h-4 w-4" />
          <span>66% progreso general</span>
        </div>
      </div>

      {/* Afirmación del Día */}
      <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-800/50 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <div>
              <CardTitle className="text-lg text-white">Afirmación del Día</CardTitle>
              <CardDescription className="text-purple-200">
                Comienza tu día con pensamientos positivos y poderosos
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <blockquote className="text-lg md:text-xl font-medium text-purple-100 italic leading-relaxed">
              "{currentQuote}"
            </blockquote>
          </div>
          <div className="flex justify-center">
            <Button
              onClick={getRandomQuote}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg text-white border-0"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Nueva Afirmación
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Módulos de Desarrollo */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Módulos de Desarrollo</h2>

        {/* Desarrollar Confianza */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Desarrollar Confianza</h3>
                  <p className="text-sm text-slate-400">Trabajar en la autoestima y seguridad personal</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-400">75%</div>
                <Badge className="bg-orange-600 hover:bg-orange-700 text-white mt-1">Confianza</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progreso</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2 bg-slate-800" />
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  Continuar
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-700/50 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Recursos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fortalecer Resiliencia */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Fortalecer Resiliencia</h3>
                  <p className="text-sm text-slate-400">Mejorar la capacidad de recuperación ante adversidades</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">60%</div>
                <Badge className="bg-green-600 hover:bg-green-700 text-white mt-1">Resiliencia</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progreso</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2 bg-slate-800" />
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  Continuar
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-700/50 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Recursos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mindset de Crecimiento */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Mindset de Crecimiento</h3>
                  <p className="text-sm text-slate-400">Desarrollar una mentalidad orientada al aprendizaje</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">45%</div>
                <Badge className="bg-blue-600 hover:bg-blue-700 text-white mt-1">Crecimiento</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progreso</span>
                <span>45%</span>
              </div>
              <Progress value={45} className="h-2 bg-slate-800" />
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  Continuar
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-700/50 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Recursos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestión del Estrés */}
        <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Gestión del Estrés</h3>
                  <p className="text-sm text-slate-400">Técnicas para manejar la presión y ansiedad</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-400">30%</div>
                <Badge className="bg-purple-600 hover:bg-purple-700 text-white mt-1">Bienestar</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Progreso</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2 bg-slate-800" />
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg">
                  Continuar
                </Button>
                <Button variant="outline" className="border-slate-700 hover:bg-slate-700/50 bg-transparent">
                  <Target className="h-4 w-4 mr-2" />
                  Recursos
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas de Progreso */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg text-white">Resumen de Progreso</CardTitle>
          <CardDescription>Tu desarrollo mental en números</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">4</div>
              <div className="text-sm text-slate-400">Módulos Activos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">52%</div>
              <div className="text-sm text-slate-400">Progreso Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">28</div>
              <div className="text-sm text-slate-400">Días Consecutivos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">156</div>
              <div className="text-sm text-slate-400">Afirmaciones Vistas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
