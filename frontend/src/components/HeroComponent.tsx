import RecipeFormModal from "./NewRecipeForm";
import { useState } from "react";
import { Search } from "lucide-react";
import { useStats } from "../hooks/useStats";
import UserMenu from "./UserMenu";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroComponent({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { stats, loading } = useStats();

  const handleOpenModel = () => setIsOpen(true);

  return (
    <header className="w-full bg-gradient-to-br from-[#fdfcfb] to-[#f4f4f5] text-black px-4 pt-16 pb-10 flex flex-col items-center">
      {/* Top Right Auth Buttons */}
      <div className="w-full max-w-7xl flex justify-end mb-6">
        <UserMenu ModelOpen={handleOpenModel} />
      </div>

      {/* Hero Title */}
      <div className="text-center max-w-3xl space-y-6 relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Welcome to{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-2xl shadow-lg transform -rotate-1 inline-block font-['Dancing_Script'] text-4xl md:text-6xl">
              Food
            </span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
          </span>{" "}
          <span className="bg-gradient-to-r from-lime-600 to-green-600 bg-clip-text text-transparent">
            Vault
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Discover, create, and share mouth-watering recipes. Build your
          personal collection of culinary gems and explore the world of flavors
          with our growing community.
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
      {!loading ? (
        <div className="grid grid-cols-3 gap-8 mt-10 max-w-md w-full text-center">
          {[
            { value: stats?.total_recipes, label: "Recipes" },
            { value: stats?.total_users, label: "Users" },
            { value: stats?.total_bookmarks, label: "Bookmarks" },
          ].map((stat, i) => (
            <div key={i} className="space-y-1">
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-blue-500">Loading...</div>
      )}

      <div className="mt-8 text-center relative z-10">
        <p className="text-gray-500 text-sm">
          Join our community of food enthusiasts and start your culinary journey
          today!
        </p>
      </div>

      {/* Modal */}
      <RecipeFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
