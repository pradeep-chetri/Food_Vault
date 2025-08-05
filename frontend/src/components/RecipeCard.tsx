import { Bookmark } from "lucide-react";
import { capitalize } from "../utils/format";
import { useUser } from "../context/UserDataContext";
import { useBookmarksContext } from "../context/BookmarkContext";
import { toggleBookmark as toggleBookmarkAPI } from "../lib/api/bookmark";
import { getTagColor } from "../utils/generateTagColor";

interface RecipeCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export default function RecipeCard({
  id,
  title,
  description,
  imageUrl,
  tags,
}: RecipeCardProps) {
  const { bookmarkedIds, toggleBookmark } = useBookmarksContext();
  const { user } = useUser();
  const isBookmarked = bookmarkedIds.has(id);

  const handleClick = async () => {
    if (!user) return;
    toggleBookmark(id);
    await toggleBookmarkAPI( id, isBookmarked);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-100 hover:border-amber-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden max-w-sm w-full flex flex-col group relative">
      {/* Image */}
      <div className="h-40 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Bookmark */}
        {user && (
          <button
            onClick={handleClick}
            aria-label="Bookmark recipe"
            className="absolute top-3 right-3 bg-white rounded-full p-1.5 shadow-sm hover:scale-105 transition"
          >
            <Bookmark
              size={18}
              className={`transition-colors ${
                isBookmarked
                  ? "text-lime-600 fill-lime-600"
                  : "text-gray-400 fill-none"
              }`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-zinc-800">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed font-[cursive]">
            {description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-zinc-100">
          {tags.map((tag) => {
            const formatted = capitalize(tag);
            const style = getTagColor(formatted);
            return (
              <span
                key={tag}
                className={`px-2 py-0.5 text-xs rounded-full font-medium ${style}`}
              >
                {formatted}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
