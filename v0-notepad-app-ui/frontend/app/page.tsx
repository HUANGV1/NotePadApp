"use client"

import { useState, useEffect } from "react"
import { NotepadLayout } from "@/components/notepad-layout"
import { Toast } from "@/components/toast"

export interface Note {
  id: string
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Load notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notes")
    if (saved) {
      const parsed = JSON.parse(saved)
      setNotes(
        parsed.map((note: any) => ({
          ...note,
          created_at: new Date(note.created_at),
          updated_at: new Date(note.updated_at),
        })),
      )
      if (parsed.length > 0) {
        setSelectedNoteId(parsed[0].id)
      }
    }
  }, [])

  // Save notes to localStorage
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notes", JSON.stringify(notes))
    }
  }, [notes])

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      created_at: new Date(),
      updated_at: new Date(),
    }
    setNotes([newNote, ...notes])
    setSelectedNoteId(newNote.id)
    showToast("Note created", "success")
  }

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, ...updates, updated_at: new Date() } : note)))
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (selectedNoteId === id) {
      setSelectedNoteId(notes.length > 1 ? notes[0].id : null)
    }
    showToast("Note deleted", "success")
  }

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const selectedNote = notes.find((n) => n.id === selectedNoteId)

  return (
    <div className="min-h-screen bg-background">
      <NotepadLayout
        notes={notes}
        selectedNote={selectedNote || null}
        onSelectNote={setSelectedNoteId}
        onCreateNote={createNote}
        onUpdateNote={updateNote}
        onDeleteNote={deleteNote}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
