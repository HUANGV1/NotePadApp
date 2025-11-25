"use client"

import type { Note } from "@/app/page"
import { Trash2 } from "lucide-react"
import { formatDateLong } from "@/lib/date-utils"

interface EditorProps {
  note: Note
  onTitleChange: (title: string) => void
  onContentChange: (content: string) => void
  onDelete: () => void
}

export function Editor({ note, onTitleChange, onContentChange, onDelete }: EditorProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={note.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Note title..."
              className="w-full text-3xl font-bold bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 rounded px-2 py-1 mb-2"
            />
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span>Created: {formatDateLong(note.created_at)}</span>
              <span>Updated: {formatDateLong(note.updated_at)}</span>
            </div>
          </div>
          <button
            onClick={onDelete}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            title="Delete note"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <textarea
        value={note.content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="Start typing your note..."
        className="flex-1 px-6 py-4 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 font-mono"
      />
    </div>
  )
}
