// utils/generateTagColor.ts
import stringHash from "string-hash";

// Extended color list to maximize variation
const baseColors = [
  "red", "green", "blue", "yellow", "purple", "pink", "indigo", "teal",
  "orange", "lime", "cyan", "rose", "amber", "emerald", "fuchsia",
  "sky", "violet", "stone", "zinc", "neutral",
];

// Shades to create multiple combinations
const bgShades = ["100", "200"];
const textShades = ["700", "800"];

// ✅ Generate full class strings
const colorVariants: string[] = [];

baseColors.forEach((color) => {
  bgShades.forEach((bg) => {
    textShades.forEach((text) => {
      colorVariants.push(`bg-${color}-${bg} text-${color}-${text}`);
    });
  });
});

// 👇 Main utility function
export function getTagColor(tag: string): string {
  const index = stringHash(tag.toLowerCase()) % colorVariants.length;
  return colorVariants[index];
}

// Optional: export full list for safelisting
export const TAG_COLOR_CLASSES = colorVariants;
