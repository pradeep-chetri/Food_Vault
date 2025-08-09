import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { useUser } from "../context/UserDataContext";
import { capitalize } from "../utils/format";
import { PREDEFINED_TAGS } from "../constant/Tags_Info";
import { submitNewRecipe } from "../lib/api/recipe";
import type { recipeCreate } from "../types/recipeType";

interface RecipeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecipeFormModal({
  isOpen,
  onClose,
}: RecipeFormModalProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState<recipeCreate>({
    title: "",
    image_url: "",
    description: "",
    tags: [], // Tag[]: array of objects with { name: string }
    author: user?.username || "Anonymous",
    ingredients: [{ ingredient: "" }], // Ingredient[]: array of objects
    instructions: [{ instruction: "" }], // Instruction[]: array of objects
    prep_time: 15,
    cook_time: 45,
    servings: 4,
    difficulty: "Medium",
    chef_note: "",
  });

  if (!isOpen) return null;
  if (!user) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "prepTime" || name === "cookTime" || name === "servings"
          ? parseInt(value) || 0
          : value,
    }));
  };

  const toggleTag = (tagName: string) => {
    setFormData((prev) => {
      const exists = prev.tags.find((tag) => tag.name === tagName);
      return {
        ...prev,
        tags: exists
          ? prev.tags.filter((tag) => tag.name !== tagName)
          : [...prev.tags, { name: tagName }],
      };
    });
  };

  const getTagColor = (tagName: string) => {
    const predefinedTag = PREDEFINED_TAGS.find((tag) => tag.name === tagName);
    return predefinedTag?.color || "bg-gray-100 text-gray-700 border-gray-200";
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag.name !== tagToRemove),
    }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { ingredient: "" }],
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) =>
        i === index ? { ingredient: value } : ing
      ),
    }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, { instruction: "" }],
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) =>
        i === index ? { instruction: value } : inst
      ),
    }));
  };

  const handleSubmit = async () => {
    // Filter out empty ingredients and instructions
    const cleanedData = {
      ...formData,
      ingredients: formData.ingredients.filter(
        (ing) => ing.ingredient.trim() !== ""
      ),
      instructions: formData.instructions.filter(
        (inst) => inst.instruction.trim() !== ""
      ),
    };

    try {
      console.log("Submitting recipe:");
      const res = await submitNewRecipe(cleanedData);

      console.log(res);

      // Reset form
      setFormData({
        title: "",
        image_url: "",
        description: "",
        tags: [], // Tag[]: array of objects with { name: string }
        author: user?.username || "Anonymous",
        ingredients: [{ ingredient: "" }], // Ingredient[]: array of objects
        instructions: [{ instruction: "" }], // Instruction[]: array of objects
        prep_time: 15,
        cook_time: 45,
        servings: 4,
        difficulty: "Medium",
        chef_note: "",
      });

      onClose();
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white no-scrollbar rounded-2xl shadow-2xl relative border border-zinc-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 transition z-10 bg-white/80 backdrop-blur-sm rounded-full p-2"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header */}
          <h2 className="text-3xl font-bold text-zinc-800 mb-8 text-center">
            🍲 Add New Recipe
          </h2>

          {/* Form */}
          <div className="space-y-8">
            {/* Basic Info Section */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-zinc-700 mb-4">
                Basic Information
              </h3>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Recipe Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  placeholder="Enter recipe title..."
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm resize-none focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  placeholder="Describe your recipe..."
                />
              </div>

              {/* Author (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  readOnly
                  className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-zinc-100 text-zinc-500 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            {/* Recipe Details Section */}
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-zinc-700 mb-4">
                Recipe Details
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Prep Time */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Prep Time (min)
                  </label>
                  <input
                    type="number"
                    name="prepTime"
                    value={formData.prep_time}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Cook Time (min)
                  </label>
                  <input
                    type="number"
                    name="cookTime"
                    value={formData.cook_time}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  />
                </div>

                {/* Servings */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Servings
                  </label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    min="1"
                    required
                    className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  />
                </div>

                {/* Difficulty */}
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-zinc-700">
                  Ingredients
                </h3>
                <button
                  type="button"
                  onClick={addIngredient}
                  className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition text-sm"
                >
                  <Plus size={16} />
                  Add Ingredient
                </button>
              </div>

              <div className="space-y-3">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={ingredient.ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={`Ingredient ${index + 1}...`}
                      className="flex-1 rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-zinc-700">
                  Instructions
                </h3>
                <button
                  type="button"
                  onClick={addInstruction}
                  className="flex items-center gap-2 px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition text-sm"
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>

              <div className="space-y-3">
                {formData.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white text-sm font-bold rounded-full flex items-center justify-center mt-2">
                      {index + 1}
                    </div>
                    <textarea
                      value={instruction.instruction}
                      onChange={(e) => updateInstruction(index, e.target.value)}
                      placeholder={`Step ${index + 1} instructions...`}
                      rows={3}
                      className="flex-1 rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm resize-none focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                    />
                    {formData.instructions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeInstruction(index)}
                        className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition mt-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-zinc-700 mb-4">Tags</h3>

              {/* Selected Tags Display */}
              {formData.tags.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-zinc-700 mb-2">
                    Selected Tags
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-zinc-200">
                    {formData.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`${getTagColor(
                          tag.name
                        )} text-xs px-3 py-1.5 rounded-full border cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
                        onClick={() => removeTag(tag.name)}
                      >
                        {tag.name}
                        <X size={12} className="opacity-60 hover:opacity-100" />
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tag Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Choose Tags{" "}
                  <span className="text-xs text-zinc-400">
                    (click to select/deselect)
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-white rounded-xl border border-zinc-200 max-h-48 overflow-y-auto">
                  {PREDEFINED_TAGS.map((tag) => (
                    <button
                      key={tag.name}
                      type="button"
                      onClick={() => toggleTag(tag.name)}
                      className={`${
                        tag.color
                      } text-xs px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                        formData.tags.some(tagObj => tagObj.name === tag.name)
                          ? "ring-2 ring-lime-400 ring-offset-1 shadow-md"
                          : "hover:shadow-sm"
                      }`}
                    >
                      {capitalize(tag.name)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Chef's Insites (Optional)
              </label>
              <textarea
                name="chef_note"
                rows={4}
                value={formData.chef_note}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-4 py-3 border border-zinc-300 bg-white shadow-sm resize-none focus:ring-2 focus:ring-lime-500 focus:outline-none text-sm"
                placeholder="Chef or Author suggestions regarding the recipe or any suggestions..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-xl bg-lime-500 hover:bg-lime-600 text-white transition text-sm font-medium shadow-lg hover:shadow-xl"
              >
                Save Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
