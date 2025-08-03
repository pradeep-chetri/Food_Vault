import sqlite3
from .initDB import conn


def usertableInit():
    with conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
        """)

# Initialize the table once
usertableInit()

def addUser(name, email, password):
    try:
        with conn:
            conn.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", (name, email, password))
        return True
    except sqlite3.IntegrityError:
        return {"error": "Email already exists."}
    except sqlite3.Error as e:
        return {"error": str(e)}

def getUserByEmail(email):
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
    user = cursor.fetchone()
    if user:
        return {
            "id": user[0],
            "name": user[1],
            "email": user[2],
            "hashed_password": user[3],
        }
    return None
