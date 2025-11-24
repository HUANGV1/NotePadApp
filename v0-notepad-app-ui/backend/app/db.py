from pathlib import Path
import sqlite3

DB_PATH = Path(__file__).parent / "notes.db"

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT,
            updated_at INTEGER
        );
    """)

    conn.commit()
    conn.close()