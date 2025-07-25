import { Bookmark } from "lucide-react";
import { useState } from "react";

interface RecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  tagsColor?: string[];
  bookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

export default function RecipeCard({ title, description, imageUrl, tags, tagsColor, bookmarked, onBookmarkToggle }: RecipeCardProps) {
    const [isBookmarked, setIsBookmarked] = useState(bookmarked || false);

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        if (onBookmarkToggle) {
            onBookmarkToggle();
        }
    };

  return (
    <div className="bg-white rounded-xl cursor-pointer border border-transparent hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm w-full">

      {/* Image */}
      <div className="h-40 bg-zinc-200 flex justify-center items-center overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2">
        
        {/* Title + Bookmark */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-zinc-800 truncate">
            {title}
          </h3>
          <button
            className="text-lime-600 transition-colors"
            aria-label="Bookmark recipe"
          >
            <Bookmark onClick={toggleBookmark} size={20} className={`${isBookmarked ? "fill-lime-600" : "fill-none"}`} />
          </button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2 text-xs">
          {tags.map((tag, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded-full ${tagsColor?.[i]}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
