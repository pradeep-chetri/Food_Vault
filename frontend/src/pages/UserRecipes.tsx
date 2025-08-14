import { LayoutDashboard, ArrowLeft, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";
import { useUser } from "../context/UserDataContext";
import { useRecipes } from "../hooks/useRecipes";
import { useState } from "react";
import RecipeFormModal from "../components/NewRecipeForm";

export default function UserRecipes() {
  const { user } = useUser();
  const { recipes } = useRecipes();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const userRecipes = recipes.filter((r) => r.author === user?.username);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200 group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span className="font-medium">Back</span>
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-lime-600 hover:bg-lime-700 rounded-lg transition-all duration-200 text-sm font-medium shadow shadow-lime-500/30"
            >
              <PlusCircle size={18} />
              Add Recipe
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Title */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <LayoutDashboard className="text-lime-600" size={28} />
            Your Recipes
          </h1>
          <p className="text-slate-600 mt-2">
            {user?.username
              ? `Hey ${user.username}, here's your personal cookbook.`
              : "Here's your personal recipe collection."}
          </p>
        </div>

        {/* Recipes List */}
        {userRecipes.length === 0 ? (
          <div className="text-center text-slate-400 mt-20">
            <p className="text-xl">🧁 No recipes created yet.</p>
            <p className="text-sm mt-2">Start sharing your amazing food ideas!</p>
          </div>
        ) : (
          <RecipeGrid recipes={userRecipes} />
        )}
      </main>

      {/* Modal for Adding Recipe */}
      <RecipeFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
