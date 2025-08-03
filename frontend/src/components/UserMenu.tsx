import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookmarkPlus,
  LayoutDashboard,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { useUser } from "../context/UserDataContext";

interface UserMenuProps {
  ModelOpen: () => void;
}

export default function AuthButtons({ ModelOpen }: UserMenuProps) {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <div className="w-fit flex items-center justify-end gap-4">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
            className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow ring-amber-500 ring-2 hover:ring-4 transition-all duration-150"
          >
            <motion.img
              src="/profile_pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            />
          </button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.nav
                role="menu"
                aria-label="User dropdown menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="absolute top-14 right-0 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 p-4 z-50"
              >
                {/* Arrow */}
                <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-t border-l border-zinc-200 z-[-1]" />

                {/* User Info */}
                <div className="mb-4">
                  <p className="text-zinc-800 font-medium text-base">
                    👋 Hello,{" "}
                    <span className="text-lime-600 font-semibold">
                      {user?.name}
                    </span>
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Welcome back!</p>
                </div>

                <div className="border-t border-dashed border-zinc-300 my-3" />

                {/* Menu Options */}
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link to="/bookmarks">
                      <button className="flex items-center gap-2 text-zinc-700 hover:text-emerald-500 transition w-full text-left">
                        <BookmarkPlus size={18} />
                        Bookmarks
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/me/recipes">
                      <button className="flex items-center gap-2 text-zinc-700 hover:text-amber-500 transition w-full text-left">
                        <LayoutDashboard size={18} />
                        Your Recipes
                      </button>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={ModelOpen}
                      className="flex items-center gap-2 text-zinc-700 hover:text-blue-500 transition w-full text-left"
                    >
                      <PlusCircle size={18} />
                      Add New Recipe
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 transition w-full text-left"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </li>
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Not logged in view
        <div className="flex gap-3">
          <Link to="/auth/login">
            <button className="py-2 px-4 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-100 shadow-sm transition relative overflow-hidden group">
              <span className="relative z-10">Login</span>
              <span className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-20 transition-all rounded-xl" />
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="py-2 px-4 rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-md transition relative overflow-hidden group">
              <span className="relative z-10">Sign Up</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-all rounded-xl" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
