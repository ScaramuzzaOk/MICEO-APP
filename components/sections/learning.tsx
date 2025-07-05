"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Star, Clock, Play, Trophy, Target } from "lucide-react"

interface Course {
  id: string
  title: string
  category: string
  progress: number
  rating: number
  duration: string
  instructor: string
  completed: boolean
  color: string
}

interface Book {
  id: string
  title: string
  author: string
  progress: number
  totalPages: number
  currentPage: number
  category: string
}

export function Learning() {
  const courses: Course[] = [
    {
      id: "1",
      title: "Curso de React Avanzado",
      category: "Programación",
      progress: 75,
      rating: 4.8,
      duration: "2h 30m restante",
      instructor: "Juan Pérez",
      completed: false,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "2",
      title: "Finanzas Personales",
      category: "Finanzas",
      progress: 100,
      rating: 4.6,
      duration: "Completado",
      instructor: "María García",
      completed: true,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "3",
      title: "Liderazgo Efectivo",
      category: "Desarrollo Personal",
      progress: 30,
      rating: 4.9,
      duration: "5h 45m restante",
      instructor: "Carlos López",
      completed: false,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const books: Book[] = [
    {
      id: "1",
      title: "Hábitos Atómicos",
      author: "James Clear",
      progress: 65,
      totalPages: 320,
      currentPage: 208,
      category: "Desarrollo Personal",
    },
    {
      id: "2",
      title: "El Inversor Inteligente",
      author: "Benjamin Graham",
      progress: 40,
      totalPages: 640,
      currentPage: 256,
      category: "Finanzas",
    },
    {
      id: "3",
      title: "Piense y Hágase Rico",
      author: "Napoleon Hill",
      progress: 100,
      totalPages: 280,
      currentPage: 280,
      category: "Motivación",
    },
  ]

  const completedCourses = courses.filter((c) => c.completed).length
  const totalCourses = courses.length
  const completedBooks = books.filter((b) => b.progress === 100).length
  const totalBooks = books.length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Aprendizaje</h1>
          <p className="text-muted-foreground">Invierte en tu conocimiento y crecimiento personal</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <BookOpen className="w-4 h-4 mr-1" />
            {completedCourses}/{totalCourses} cursos
          </Badge>
          <Badge variant="outline" className="px-3 py-1">
            <Trophy className="w-4 h-4 mr-1" />
            {completedBooks}/{totalBooks} libros
          </Badge>
        </div>
      </div>

      {/* Estadísticas de aprendizaje */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardContent className="p-4 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="text-2xl font-bold text-blue-700">{totalCourses}</div>
            <div className="text-xs text-muted-foreground">Cursos Activos</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="text-2xl font-bold text-green-700">{completedBooks}</div>
            <div className="text-xs text-muted-foreground">Libros Leídos</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="text-2xl font-bold text-purple-700">4.8</div>
            <div className="text-xs text-muted-foreground">Rating Promedio</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950">
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <div className="text-2xl font-bold text-orange-700">24h</div>
            <div className="text-xs text-muted-foreground">Esta Semana</div>
          </CardContent>
        </Card>
      </div>

      {/* Cursos en progreso */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5" />
            Cursos en Progreso
          </CardTitle>
          <CardDescription>Continúa con tu desarrollo profesional y personal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    {course.completed && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Trophy className="w-3 h-3 mr-1" />
                        Completado
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <Badge variant="outline" className="text-xs">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{course.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">por {course.instructor}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className={
                    course.completed ? "bg-green-600 hover:bg-green-700" : `bg-gradient-to-r ${course.color} text-white`
                  }
                  disabled={course.completed}
                >
                  {course.completed ? "Completado" : "Continuar"}
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium">{course.progress}% completado</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </span>
                  <span>{Math.round((course.progress * 18) / 100)}/18 lecciones</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Libros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Biblioteca Personal
          </CardTitle>
          <CardDescription>Tu colección de libros y progreso de lectura</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {books.map((book) => (
            <div key={book.id} className="p-4 rounded-lg border bg-muted/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold">{book.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">por {book.author}</p>
                  <Badge variant="outline" className="text-xs mb-3">
                    {book.category}
                  </Badge>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{book.progress}%</div>
                  <div className="text-xs text-muted-foreground">
                    {book.currentPage}/{book.totalPages} páginas
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={book.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Página {book.currentPage}</span>
                  <span>{book.totalPages - book.currentPage} páginas restantes</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recomendaciones */}
      <Card className="border-dashed">
        <CardContent className="p-6 text-center">
          <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">Descubre Nuevo Contenido</h3>
          <p className="text-muted-foreground mb-4">Explora cursos y libros recomendados para ti</p>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600">Ver Recomendaciones</Button>
        </CardContent>
      </Card>
    </div>
  )
}
