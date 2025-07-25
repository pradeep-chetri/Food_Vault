import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserDataContext";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-800">
          Welcome back, <span className="text-lime-600">Chef {user?.name || "Unknown"}</span> 👨‍🍳
        </h1>
        <p className="text-gray-600 mt-1 text-sm">
          Here’s your personalized dashboard.
        </p>
      </div>

      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-900 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <ChevronLeft size={18} />
        <span>Go Back</span>
      </button>
    </div>
  );
}
