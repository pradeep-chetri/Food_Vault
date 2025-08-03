from .initDB import conn

def fetch_stats():
    with conn:
        cursor = conn.cursor()

        cursor.execute("SELECT COUNT(*) FROM recipes")
        total_recipes: int = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM users")
        total_users: int = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM bookmarks")
        total_bookmarks: int = cursor.fetchone()[0]

        return {
            "total_recipes": total_recipes,
            "total_users": total_users,
            "total_bookmarks": total_bookmarks,
        }