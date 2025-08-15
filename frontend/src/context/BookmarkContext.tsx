import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserDataContext";
import { fetchBookmarks } from "../lib/api/bookmark";

type BookmarkContextType = {
  bookmarkedIds: Set<number>;
  toggleBookmark: (id: number) => void;
  refreshBookmarks: () => Promise<void>;
};

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<number>>(new Set());

  const refreshBookmarks = async () => {
    if (user?.email) {
      try {
        const data = await fetchBookmarks();
        const ids = new Set(data.map((r) => r.id));
        setBookmarkedIds(ids);
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    }
  };

  const toggleBookmark = (id: number) => {
    setBookmarkedIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  useEffect(() => {
    refreshBookmarks();
  }, [user?.email]);

  return (
    <BookmarkContext.Provider value={{ bookmarkedIds, toggleBookmark, refreshBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarksContext = () => {
  const ctx = useContext(BookmarkContext);
  if (!ctx) throw new Error("useBookmarksContext must be used within a BookmarkProvider");
  return ctx;
};
