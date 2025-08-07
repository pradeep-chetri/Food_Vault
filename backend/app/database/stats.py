from .initDB import conn

def _fetch_single_count(query: str) -> int:
    """Executes a COUNT(*) query and returns the result or 0 if empty."""
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        row = cursor.fetchone()
        return row[0] if row and isinstance(row[0], int) else 0
    except Exception as e:
        print(f"Error executing query: {query}\n{e}")
        return 0
    finally:
        cursor.close()

def fetch_stats() -> dict:
    return {
        "total_recipes": _fetch_single_count("SELECT COUNT(*) FROM recipes"),
        "total_users": _fetch_single_count("SELECT COUNT(*) FROM users"),
        "total_bookmarks": _fetch_single_count("SELECT COUNT(*) FROM bookmarks"),
    }
