from .initDB import conn

def fetch_stats():
    with conn:
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM recipes")
        row_recipes = cursor.fetchone()[0]
        total_recipes: int = row_recipes if row_recipes is not None else 0

        cursor.execute("SELECT COUNT(*) FROM users")
        row_users = cursor.fetchone()[0]
        total_users: int = row_users if row_users is not None else 0

        cursor.execute("SELECT COUNT(*) FROM bookmarks")
        row_bookmarks = cursor.fetchone()[0]
        total_bookmarks: int = row_bookmarks if row_bookmarks is not None else 0

        return {
            "total_recipes": total_recipes,
            "total_users": total_users,
            "total_bookmarks": total_bookmarks,
        }