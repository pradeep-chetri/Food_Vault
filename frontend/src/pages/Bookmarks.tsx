import { BookmarkCheck, ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import RecipeGrid from "../components/RecipeGrid";
import { useBookmarks } from "../hooks/useBookmarks";

export default function Bookmarks() {
  const { bookmarkedRecipes, loading, error } = useBookmarks();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "name">("recent");

  const filteredAndSortedRecipes = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return bookmarkedRecipes
      .filter((recipe) =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.tags.some((tag) => tag.name.toLowerCase().includes(query))
      )
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
  }, [bookmarkedRecipes, searchQuery, sortBy]);

  const isEmpty = bookmarkedRecipes.length === 0;
  const hasResults = filteredAndSortedRecipes.length > 0;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all group"
            >
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-0.5 transition-transform"
              />
              <span className="font-medium">Back</span>
            </button>
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
              <BookmarkCheck size={16} />
              <span>{bookmarkedRecipes.length} saved</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/30">
              <BookmarkCheck className="text-white" size={24} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Bookmarks
            </h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-base">
            Your curated collection of favorite recipes
          </p>
        </div>

        {/* Show search/sort only when there are any bookmarks */}
        {!isEmpty && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div className="relative w-full sm:max-w-md">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search your bookmarks..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent placeholder-slate-400"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "recent" | "name")}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-700"
            >
              <option value="recent">Recently Added</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-red-500 flex justify-center items-center font-bold min-h-[30vh]">
            <h1>Error: {error}</h1>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-blue-500 flex justify-center items-center font-bold min-h-[30vh]">
            <h1>Loading recipes...</h1>
          </div>
        ) : isEmpty ? (
          <EmptyState
            icon={<BookmarkCheck size={32} className="text-slate-400" />}
            title="No bookmarks yet"
            description="Start exploring recipes and bookmark your favorites to build your personal collection. They'll appear here for quick access anytime."
          />
        ) : !hasResults ? (
          <EmptyState
            icon={<Search size={32} className="text-slate-400" />}
            title="No recipes found"
            description="No bookmarked recipes match your current search. Try adjusting your search term."
          />
        ) : (
          <RecipeGrid recipes={filteredAndSortedRecipes} />
        )}
      </main>
    </div>
  );
}

// ⬇️ Helper Component for Empty States
function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
          {icon}
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-3">
          {title}
        </h2>
        <p className="text-slate-600 mb-8 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
