"use client"

import { Menu, Plus } from "lucide-react"

interface HeaderProps {
  onCreateNote: () => void
  onMenuClick: () => void
  onLogoClick: () => void
}

export function Header({ onCreateNote, onMenuClick, onLogoClick }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors">
          <Menu className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={onLogoClick}
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity cursor-pointer"
        >
          Notepad
        </button>
      </div>

      <button
        onClick={onCreateNote}
        className="flex items-center gap-2 bg-primary hover:bg-accent text-primary-foreground px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
      >
        <Plus className="w-5 h-5" />
        <span className="hidden sm:inline">New Note</span>
      </button>
    </header>
  )
}
