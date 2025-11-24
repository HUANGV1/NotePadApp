"use client"

import { useState, useEffect } from "react"
import { NotepadLayout } from "@/components/notepad-layout"
import { Toast } from "@/components/toast"

const API_BASE = "http://127.0.0.1:8000";

export interface Note {
  id: string
  title: string
  content: string
  created_at?: number
  updated_at: number
}

export default function Page() {
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Fetch notes (based on page mount)
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const res = await fetch(`${API_BASE}/notes`);
        const data = await res.json();

        const normalized: Note[] = data.map((n: any) => ({
          ...n,
          updated_at: Number(n.updated_at),
          created_at: n.created_at !== undefined ? Number(n.created_at) : undefined,
        }));

        setNotes(normalized);
        if (normalized.length > 0) setSelectedNoteId(normalized[0].id);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };
    loadNotes();
  }, []);



  // Save note (create/update)
  // Note payload we send to backend doesn't need updated_at;
  // backend will compute it.
  type NotePayload = {
    id: string
    title: string
    content: string
  }

  const upsertNote = async (note: NotePayload) => {
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note),
    });

    if (!res.ok) {
      showToast("Failed to save note", "error");
      return;
    }

    // This is the Note as the backend sees it, with the correct updated_at
    const saved: Note = await res.json();

    setNotes(prev => {
      const exists = prev.some(n => n.id === saved.id);
      return exists
        ? prev.map(n => (n.id === saved.id ? saved : n))
        : [saved, ...prev];
    });
  };


  // Delete note
  const handleDeleteNote = async (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));

    await fetch(`${API_BASE}/notes/${id}`, {
      method: "DELETE",
    });
  };

  const createNote = async () => {
    const id = Date.now().toString();

    await upsertNote({
      id,
      title: "New Note",
      content: "",
    });

    setSelectedNoteId(id);
    showToast("Note created", "success");
  };


  const updateNote = async (id: string, updates: Partial<Note>) => {
    const existing = notes.find((n) => n.id === id);
    if (!existing) return;

    const updatedNote = {
      ...existing,
      ...updates,
    };

    // Update selectedNote immediately for visible typing
    if (selectedNoteId === id) {
      setSelectedNoteId(id); // keep it selected
    }

    // Update notes list
    setNotes(prev =>
      prev.map(n => (n.id === id ? updatedNote : n))
    );

    // Send to backend
    await upsertNote({
      id,
      title: updatedNote.title,
      content: updatedNote.content,
    });
  };



  const deleteNote = (id: string) => {
    handleDeleteNote(id);

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
