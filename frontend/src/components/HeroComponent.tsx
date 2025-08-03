import AuthButtons from "./UserMenu";
import RecipeFormModal from "./NewRecipeForm";
import { useState } from "react";
import { Search } from "lucide-react";
import { useStats } from "../hooks/useStats";


interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroComponent({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { stats, loading, error } = useStats()

  const handleOpenModel = () => setIsOpen(true);

  return (
    <header className="w-full bg-gradient-to-br from-[#fdfcfb] to-[#f4f4f5] text-black px-4 pt-16 pb-10 flex flex-col items-center">
      {/* Top Right Auth Buttons */}
      <div className="w-full max-w-7xl flex justify-end mb-6">
        <AuthButtons ModelOpen={handleOpenModel} />
      </div>

      {/* Hero Title */}
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-800 leading-snug tracking-tight">
          Welcome to{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full shadow-sm text-3xl font-[Dancing Script]">
              Food
            </span>{" "}
            Vault
          </span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 mt-2 leading-relaxed tracking-wide">
          Discover, create, and share mouth-watering recipes. Build your personal collection of
          culinary gems and explore the world of flavors.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-xl mt-8 relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, or cuisines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 text-base border border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder:text-gray-400 transition"
          />
        </div>
      </div>

      {/* Stats Section */}
      {!loading? (
        <div className="grid grid-cols-3 gap-8 mt-10 max-w-md w-full text-center">
        {[
          { value: stats?.total_recipes, label: "Recipes" },
          { value: stats?.total_users, label: "Users" },
          { value: stats?.total_bookmarks, label: "Bookmarks"}
        ].map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
      ): (
        <div className="text-blue-500">Loading...</div>
      )}

      {/* Modal */}
      <RecipeFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
