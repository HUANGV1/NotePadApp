"use client"

export function HeroPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-background overflow-hidden pt-50">

      <div className="text-center px-6 max-w-2xl">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to Notepad
          </span>
        </h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          A clean, minimal note-taking app designed for distraction-free writing.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">📝 Create Notes</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">✨ Stay Organized</p>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-sm text-muted-foreground">⚡ Always Saved</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-12">
          Select a note from the sidebar or create a new one to get started
        </p>
      </div>
    </div>
  )
}
