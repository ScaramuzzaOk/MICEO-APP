"use client"

import { useState, useEffect } from "react"

export interface Quote {
  id?: number
  quote: string
  page?: number
  reflection?: string
  date: string
}

export interface Book {
  id?: number
  title: string
  author: string
  totalPages: number
  currentPage: number
  category: string
  rating?: number
  startDate: string
  finishDate?: string
  quotes?: Quote[]
}

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    const loadBooks = () => {
      const savedBooks = localStorage.getItem("ceo-vida-books")
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks))
      }
    }
    loadBooks()
  }, [])

  const saveBooks = (updatedBooks: Book[]) => {
    setBooks(updatedBooks)
    localStorage.setItem("ceo-vida-books", JSON.stringify(updatedBooks))
  }

  const addBook = async (bookData: Omit<Book, "id" | "currentPage" | "startDate" | "quotes">) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now(),
      currentPage: 0,
      startDate: new Date().toISOString(),
      quotes: [],
    }

    saveBooks([...books, newBook])
    return newBook
  }

  const updateBookProgress = async (bookId: number, pages: number) => {
    const updatedBooks = books.map((book) => {
      if (book.id === bookId) {
        const newCurrentPage = Math.min(book.currentPage + pages, book.totalPages)
        return {
          ...book,
          currentPage: newCurrentPage,
          finishDate: newCurrentPage === book.totalPages ? new Date().toISOString() : book.finishDate,
        }
      }
      return book
    })
    saveBooks(updatedBooks)
  }

  const addQuote = async (quoteData: Omit<Quote, "id" | "date"> & { bookId: number }) => {
    const newQuote: Quote = {
      ...quoteData,
      id: Date.now(),
      date: new Date().toISOString(),
    }

    const updatedBooks = books.map((book) => {
      if (book.id === quoteData.bookId) {
        return {
          ...book,
          quotes: [...(book.quotes || []), newQuote],
        }
      }
      return book
    })

    saveBooks(updatedBooks)
    return newQuote
  }

  return {
    books,
    addBook,
    updateBookProgress,
    addQuote,
  }
}
