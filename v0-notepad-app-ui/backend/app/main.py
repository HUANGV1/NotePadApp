import time
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .models import NoteIn, NoteOut
from .db import get_connection, init_db

init_db()

app = FastAPI()

# Allow frontend (Next.js) to fetch from backend
app.add_middleware(
    CORSMiddleware,
    origins = [
    "http://localhost:3000",      # dev
    # add your Vercel URL later, e.g. "https://your-app.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/notes", response_model=List[NoteOut])
def get_notes():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM notes ORDER BY updated_at DESC").fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/notes", response_model=NoteOut)
def save_note(note: NoteIn):
    updated_at = int(time.time() * 1000)
    conn = get_connection()
    conn.execute("""
        INSERT INTO notes (id, title, content, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET 
        title=excluded.title,
        content=excluded.content,
        updated_at=excluded.updated_at
    """, (note.id, note.title, note.content, updated_at))
    conn.commit()
    conn.close()
    return {**note.dict(), "updated_at": updated_at}

@app.delete("/notes/{note_id}")
def delete_note(note_id: str):
    conn = get_connection()
    cur = conn.execute("DELETE FROM notes WHERE id=?", (note_id,))
    conn.commit()
    conn.close()

    if cur.rowcount == 0:
        raise HTTPException(status_code=404, detail="Note not found")

    return {"success": True}

@app.get("/")
def home():
    return {"message": "FastAPI is running"}