"use client"

import type { Note } from "@/app/page"
import { Trash2, X } from "lucide-react"
import { formatDistanceToNow } from "@/lib/date-utils"

interface SidebarProps {
  notes: Note[]
  selectedNoteId: string | null
  onSelectNote: (id: string) => void
  onDeleteNote: (id: string) => void
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ notes, selectedNoteId, onSelectNote, onDeleteNote, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`
        fixed md:relative w-64 h-full bg-card border-r border-border z-40 transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-foreground">Notes</h2>
          <button onClick={onClose} className="md:hidden p-1 hover:bg-muted rounded transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {notes.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">No notes created yet</div>
          ) : (
            <div className="p-2 space-y-1">
              {notes.map((note) => (
                <button
                  key={note.id}
                  onClick={() => {
                    onSelectNote(note.id)
                    onClose()
                  }}
                  className={`
                    w-full text-left p-3 rounded-lg transition-all duration-200 group
                    ${
                      selectedNoteId === note.id
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className={`font-medium truncate ${
                          selectedNoteId === note.id ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        {note.title || "Untitled"}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          selectedNoteId === note.id ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {formatDistanceToNow(note.updated_at)}
                      </p>
                    </div>
                    <span
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteNote(note.id)
                      }}
                      className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                        selectedNoteId === note.id
                          ? "hover:bg-primary-foreground/20"
                          : "hover:bg-destructive/20 text-destructive"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
