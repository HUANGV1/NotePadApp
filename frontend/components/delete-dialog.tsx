"use client"

interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function DeleteDialog({ open, onOpenChange, onConfirm }: DeleteDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-sm w-full">
        <div className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-2">Delete Note</h2>
          <p className="text-muted-foreground mb-6">
            Are you sure you want to delete this note? This action cannot be undone.
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm()
                onOpenChange(false)
              }}
              className="px-4 py-2 rounded-lg bg-destructive text-black hover:bg-destructive/90 hover:text-black transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
