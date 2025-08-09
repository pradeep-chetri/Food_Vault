import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookmarkPlus,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ChevronDown,
  Crown,
} from "lucide-react";
import { useUser } from "../context/UserDataContext";

interface UserMenuProps {
  ModelOpen: () => void;
}

export default function UserMenu({ ModelOpen }: UserMenuProps) {
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Simulate API call delay
    setTimeout(() => {
      setUser(null);
      setDropdownOpen(false);
      setIsLoggingOut(false);
    }, 500);
  };

  const menuItems = [
    {
      icon: BookmarkPlus,
      label: "Saved Recipes",
      path: "/bookmarks",
      color: "hover:text-emerald-600 hover:bg-emerald-50",
      description: "View your bookmarked recipes"
    },
    {
      icon: LayoutDashboard,
      label: "My Recipes",
      path: "/me/recipes",
      color: "hover:text-blue-600 hover:bg-blue-50",
      description: "Manage your created recipes"
    },
  ];

  return (
    <div className="flex items-center justify-end gap-3">
      {user ? (
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <motion.button
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-3 px-4 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            <div className="relative">
              <img
                src="/profile_pic.jpg"
                alt={`${user?.username}'s profile`}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900 truncate max-w-24">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500">Online</p>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </motion.button>

          {/* Dropdown menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                role="menu"
                aria-label="User dropdown menu"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
              >
                {/* User Info Header */}
                <div className="px-6 py-5 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src="/profile_pic.jpg"
                        alt={`${user?.username}'s profile`}
                        className="w-12 h-12 rounded-full object-cover ring-3 ring-white shadow-sm"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-orange-500 text-white rounded-full p-1">
                        <Crown className="w-3 h-3" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {user?.username}
                      </h3>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                      <div className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-xs text-green-600 font-medium">Active now</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <div className="py-2">
                  {menuItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className="block"
                    >
                      <motion.div
                        whileHover={{ x: 4 }}
                        className={`flex items-center px-6 py-3 mx-2 rounded-xl transition-all duration-150 ${item.color} group`}
                      >
                        <item.icon className="w-5 h-5 mr-4 text-gray-400 group-hover:text-current transition-colors" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-current">
                            {item.label}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}

                  <div className="border-t border-gray-100 my-2 mx-4"></div>

                  {/* Add Recipe Button */}
                  <motion.button
                    onClick={() => {
                      ModelOpen();
                      setDropdownOpen(false);
                    }}
                    whileHover={{ x: 4 }}
                    className="flex items-center w-full px-6 py-3 mx-2 rounded-xl transition-all duration-150 hover:text-orange-600 hover:bg-orange-50 group"
                  >
                    <PlusCircle className="w-5 h-5 mr-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-orange-600">
                        Create New Recipe
                      </p>
                      <p className="text-xs text-gray-500">
                        Share your culinary creation
                      </p>
                    </div>
                  </motion.button>

                  <div className="border-t border-gray-100 my-2 mx-4"></div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    whileHover={{ x: 4 }}
                    className="flex items-center w-full px-6 py-3 mx-2 rounded-xl transition-all duration-150 hover:text-red-600 hover:bg-red-50 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoggingOut ? (
                      <div className="w-5 h-5 mr-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                    ) : (
                      <LogOut className="w-5 h-5 mr-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                    )}
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                        {isLoggingOut ? "Signing out..." : "Sign Out"}
                      </p>
                      <p className="text-xs text-gray-500">
                        See you next time!
                      </p>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Not logged in view
        <div className="flex items-center gap-3">
          <Link to="/auth/login">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </motion.button>
          </Link>
          <Link to="/auth/signup">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      )}
    </div>
  );
}
