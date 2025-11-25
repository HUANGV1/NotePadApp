"use client"

import { useState } from "react"
import type { Note } from "@/app/page"
import { Header } from "./header"
import { Sidebar } from "./sidebar"
import { Editor } from "./editor"
import { HeroPage } from "./hero-page"
import { DeleteDialog } from "./delete-dialog"

interface NotepadLayoutProps {
  notes: Note[]
  selectedNote: Note | null
  onSelectNote: (id: string) => void
  onCreateNote: () => void
  onUpdateNote: (id: string, updates: Partial<Note>) => void
  onDeleteNote: (id: string) => void
  showHero: boolean
  setShowHero: (value: boolean) => void
}


export function NotepadLayout({
  notes,
  selectedNote,
  onSelectNote,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  showHero,
  setShowHero,
}: NotepadLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null)

  const handleDeleteClick = (id: string) => {
    setNoteToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (noteToDelete) {
      onDeleteNote(noteToDelete)
      setDeleteDialogOpen(false)
      setNoteToDelete(null)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <Header
        onCreateNote={() => {
          setShowHero(false);   // hide hero when a new note is created
          onCreateNote();
        }}
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onLogoClick={() => setShowHero(true)}  // logo always shows hero
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNote?.id || null}
          onSelectNote={(id) => {
            onSelectNote(id)
            setShowHero(false)
          }}
          onDeleteNote={handleDeleteClick}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-hidden">
          {showHero ? (
            <HeroPage />
          ) : selectedNote ? (
            <Editor
              note={selectedNote}
              onTitleChange={(title) => onUpdateNote(selectedNote.id, { title })}
              onContentChange={(content) => onUpdateNote(selectedNote.id, { content })}
              onDelete={() => handleDeleteClick(selectedNote.id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <p className="text-muted-foreground text-lg">No notes yet</p>
                <p className="text-muted-foreground text-sm mt-2">Create a new note to get started</p>
              </div>
            </div>
          )}
        </main>
      </div>

      <DeleteDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} onConfirm={confirmDelete} />
    </div>
  )
}
