import sqlite3
from typing import List, Dict

from .initDB import conn


def recipetableInit():
    with conn:
        conn.execute("""
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            image_url TEXT NOT NULL,
            description TEXT NOT NULL,
            author TEXT NOT NULL    
        )""")

        conn.execute("""
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL
        )""")

        conn.execute("""
        CREATE TABLE IF NOT EXISTS recipe_tags (
            recipe_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            PRIMARY KEY (recipe_id, tag_id),
            FOREIGN KEY(recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
            FOREIGN KEY(tag_id) REFERENCES tags(id) ON DELETE CASCADE
        )""")


recipetableInit()


def _get_tag_id(cursor, tag: str) -> int | None:
    tag_clean = tag.strip().lower()
    if not tag_clean:
        return None

    cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (tag_clean,))
    cursor.execute("SELECT id FROM tags WHERE name = ?", (tag_clean,))
    result = cursor.fetchone()

    return result[0] if result else None


def create_recipe(title: str, image_url: str, description: str, author: str, tags: List[str]) -> None:
    try:
        with conn:
            cursor = conn.cursor()

            cursor.execute("""
                INSERT INTO recipes (title, image_url, description, author)
                VALUES (?, ?, ?, ?)
            """, (title.strip(), image_url.strip(), description.strip(), author.strip()))

            recipe_id = cursor.lastrowid

            for tag in tags:
                tag_id = _get_tag_id(cursor, tag)
                if tag_id:
                    cursor.execute("""
                        INSERT OR IGNORE INTO recipe_tags (recipe_id, tag_id)
                        VALUES (?, ?)
                    """, (recipe_id, tag_id))

    except sqlite3.Error as e:
        print(f"Error inserting recipe: {e}")
        raise


def get_all_recipes() -> List[Dict]:
    try:
        cursor = conn.cursor()

        cursor.execute("SELECT id, title, image_url, description, author FROM recipes")
        recipe_rows = cursor.fetchall()

        recipes = []
        for recipe in recipe_rows:
            recipe_id, title, image_url, description, author = recipe

            cursor.execute("""
                SELECT tags.name
                FROM tags
                INNER JOIN recipe_tags ON tags.id = recipe_tags.tag_id
                WHERE recipe_tags.recipe_id = ?
            """, (recipe_id,))

            tags = [
                tag for (tag,) in cursor.fetchall()
                if isinstance(tag, str) and tag.strip()
            ]

            recipes.append({
                "id": recipe_id,
                "title": title,
                "image_url": image_url,
                "description": description,
                "author": author,
                "tags": tags
            })
        
        
        return recipes

    except sqlite3.Error as e:
        print(f"Error fetching recipes: {e}")
        return []


def create_recipes_bulk(recipes: List[Dict]) -> None:
    try:
        with conn:
            cursor = conn.cursor()

            for recipe in recipes:
                cursor.execute("""
                    INSERT INTO recipes (title, image_url, description, author)
                    VALUES (?, ?, ?, ?)
                """, (
                    recipe["title"].strip(),
                    recipe["image_url"].strip(),
                    recipe["description"].strip(),
                    recipe["author"].strip()
                ))

                recipe_id = cursor.lastrowid

                for tag in recipe.get("tags", []):
                    tag_id = _get_tag_id(cursor, tag)
                    if tag_id:
                        cursor.execute("""
                            INSERT OR IGNORE INTO recipe_tags (recipe_id, tag_id)
                            VALUES (?, ?)
                        """, (recipe_id, tag_id))

    except sqlite3.Error as e:
        print(f"Bulk insert error: {e}")
        raise
