import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, LogOut } from "lucide-react";
import { useUser } from "../../context/UserDataContext";

export default function AuthButtons() {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`absolute bottom-80 right-6 z-50`}>
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Image */}
          <motion.img
            src="/profile_pic.jpg"
            alt="Profile"
            onClick={() => setDropdownOpen((prev) => !prev)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-amber-500 cursor-pointer transition-all duration-200"
          />

          {/* Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute top-14 right-0 w-64 bg-white rounded-xl shadow-xl border border-zinc-200 p-4 z-50"
              >
                {/* Arrow */}
                <div className="absolute -top-2 right-6 w-4 h-4 bg-white rotate-45 border-t border-l border-zinc-200 z-[-1]" />

                {/* User Info */}
                <div className="mb-3">
                  <p className="text-zinc-800 font-semibold text-base">
                    👋 Hello, <span className="text-lime-600">{user?.name}</span>
                  </p>
                  <p className="text-sm text-zinc-400 mt-1">Welcome back!</p>
                </div>

                <div className="border-t border-dashed border-zinc-300 mb-3" />

                {/* Menu */}
                <div className="flex flex-col gap-2">
                  <Link to="/dashboard">
                    <button className="flex items-center gap-2 text-zinc-700 hover:text-amber-500 transition-colors w-full text-left">
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setUser(null);
                      setDropdownOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors w-full text-left"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Logged out state
        <div className="flex gap-3">
          <Link to="/auth/login">
            <button className="py-2 px-4 border border-zinc-300 rounded-xl bg-white hover:bg-zinc-100 shadow-sm transition duration-200 relative overflow-hidden group">
              <span className="z-10 relative">Login</span>
              <span className="absolute inset-0 bg-zinc-200 opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-xl" />
            </button>
          </Link>
          <Link to="/auth/signup">
            <button className="py-2 px-4 rounded-xl bg-amber-500 text-white hover:bg-amber-600 shadow-md transition duration-200 relative overflow-hidden group">
              <span className="z-10 relative">Sign Up</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-all duration-300 rounded-xl" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
