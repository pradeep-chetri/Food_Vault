from .initDB import conn
import sqlite3

def bookmarkTableInit():
    with conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS bookmarks (
            email TEXT NOT NULL,
            recipe_id INTEGER NOT NULL,
            PRIMARY KEY (email, recipe_id)
        )
        """)

# Initialize on module import
bookmarkTableInit()

def addBookmark(email: str, recipe_id: int):
    try:
        with conn:
            conn.execute(
                "INSERT INTO bookmarks (email, recipe_id) VALUES (?, ?)",
                (email, recipe_id)
            )
        return True
    except sqlite3.IntegrityError:
        return {"error": "Bookmark already exists"}
    except sqlite3.Error as e:
        return {"error": str(e)}

def removeBookmark(email: str, recipe_id: int):
    try:
        with conn:
            conn.execute(
                "DELETE FROM bookmarks WHERE email=? AND recipe_id=?",
                (email, recipe_id)
            )
        return True
    except sqlite3.Error as e:
        return {"error": str(e)}

def getBookmarksByEmail(email: str):
    try:
        with conn:
            cursor = conn.cursor()

            cursor.execute(
                """
                SELECT r.id, r.title, r.image_url, r.description, r.author 
                FROM recipes r 
                JOIN bookmarks b ON r.id = b.recipe_id
                WHERE b.email = ?
                """,
                (email,)
            )
            recipe_rows = cursor.fetchall()

            recipes = []
            for row in recipe_rows:
                recipe_id, title, image_url, description, author = row

                cursor.execute("""
                    SELECT tags.name
                    FROM tags
                    JOIN recipe_tags ON tags.id = recipe_tags.tag_id
                    WHERE recipe_tags.recipe_id = ?
                """, (recipe_id,))
                
                tags = [tag_row[0].capitalize() for tag_row in cursor.fetchall()]

                recipes.append({
                    "id": recipe_id,
                    "title": title,
                    "image_url": image_url,
                    "description": description,
                    "author": author,
                    "tags": tags
                })

            cursor.close()
            return recipes

    except sqlite3.Error as e:
        print(f"An error occurred: {e}")
        return []
