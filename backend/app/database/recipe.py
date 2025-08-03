import sqlite3
from .initDB import conn
from typing import List


def recipetableInit():
    with conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            image_url TEXT NOT NULL,
            description TEXT NOT NULL,
            author TEXT NOT NULL    
        )
        """)
        conn.execute("""
            CREATE TABLE IF NOT EXISTS tags (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL
            )
        """)

        conn.execute("""
            CREATE TABLE IF NOT EXISTS recipe_tags (
                recipe_id INTEGER,
                tag_id INTEGER,
                FOREIGN KEY(recipe_id) REFERENCES recipes(id),
                FOREIGN KEY(tag_id) REFERENCES tags(id),
                PRIMARY KEY (recipe_id, tag_id)
            )
        """)



# Initialize the table once
recipetableInit()

def create_recipe(title: str, image_url: str, description: str, author: str, tags: List[str]):
    try:
        with conn:
            cursor = conn.cursor()

            cursor.execute("""
                INSERT INTO recipes (title, image_url, description, author)
                VALUES (?, ?, ?, ?)
            """, (title, image_url, description, author))
            recipe_id = cursor.lastrowid

            for tag in tags:
                tag = tag.strip().lower()
                cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (tag,))
                cursor.execute("SELECT id FROM tags WHERE name = ?", (tag,))
                tag_id = cursor.fetchone()[0]

                cursor.execute("""
                    INSERT OR IGNORE INTO recipe_tags (recipe_id, tag_id)
                    VALUES (?, ?)
                """, (recipe_id, tag_id))

            cursor.close()

    except sqlite3.IntegrityError:
        print("Recipe with same title and author already exists.")
    except sqlite3.Error as e:
        print(f"Database error: {e}")


def get_all_recipes():
    try:
        cursor = conn.cursor()

        cursor.execute("SELECT id, title, image_url, description, author FROM recipes")
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

            tags = [tag_row[0] for tag_row in cursor.fetchall()]

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
    
def create_recipes_bulk(recipes: List[dict]):
    try:
        with conn:
            cursor = conn.cursor()

            for recipe in recipes:
                cursor.execute("""
                    INSERT INTO recipes (title, image_url, description, author)
                    VALUES (?, ?, ?, ?)
                """, (
                    recipe["title"],
                    recipe["image_url"],
                    recipe["description"],
                    recipe["author"]
                ))
                recipe_id = cursor.lastrowid

                for tag in recipe["tags"]:
                    tag = tag.strip().lower()
                    cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (tag,))
                    cursor.execute("SELECT id FROM tags WHERE name = ?", (tag,))
                    tag_id = cursor.fetchone()[0]

                    cursor.execute("""
                        INSERT OR IGNORE INTO recipe_tags (recipe_id, tag_id)
                        VALUES (?, ?)
                    """, (recipe_id, tag_id))

            cursor.close()

    except sqlite3.Error as e:
        print(f"Bulk insert DB error: {e}")
        raise

