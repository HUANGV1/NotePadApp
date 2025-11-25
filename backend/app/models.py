from pydantic import BaseModel

class NoteIn(BaseModel):
    id: str
    title: str
    content: str

class NoteOut(NoteIn):
    updated_at: int

