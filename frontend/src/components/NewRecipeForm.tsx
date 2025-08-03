import { useState, type FormEvent } from "react";
import { useUser } from "../context/UserDataContext";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { submitNewRecipe } from "../lib/api/recipe";
import type { recipeCreateDataType } from "../types/recipeType";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeFormModal({
  isOpen,
  onClose,
}: RecipeFormModalProps) {
  const { user } = useUser();

  const [formData, setFormData] = useState<recipeCreateDataType>({
    title: "",
    image_url: "",
    description: "",
    tags: [],
    author: user?.name || "Anonymous",
  });

  const [tagInput, setTagInput] = useState<string>("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    } else if (e.key === "Backspace" && !tagInput) {
      setFormData((prev) => ({
        ...prev,
        tags: prev.tags.slice(0, -1),
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await submitNewRecipe(formData);

      setFormData({
        title: "",
        image_url: "",
        description: "",
        tags: [],
        author: user?.name || "Anonymous",
      });
      console.log("Successfully Added the Recipe to the database");
    } catch (error: any) {
      console.error(
        "Error during adding the new recipe:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative border border-zinc-200"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-zinc-800 mb-6">
          🍲 Add New Recipe
        </h2>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2.5 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2.5 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-xl px-4 py-2.5 border border-zinc-300 bg-white shadow-sm resize-none focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Tags{" "}
              <span className="text-xs text-zinc-400">
                (press Enter or comma)
              </span>
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Add a tag and press Enter..."
              className="w-full rounded-xl px-4 py-2.5 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-amber-500 focus:outline-none text-sm"
            />
          </div>

          {/* Author (Read Only) */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              readOnly
              className="w-full rounded-xl px-4 py-2.5 border border-zinc-300 bg-zinc-100 text-zinc-500 cursor-not-allowed text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition text-sm"
            >
              Save Recipe
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
