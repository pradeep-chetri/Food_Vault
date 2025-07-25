import DashboardHeader from "../components/Dashboard/DashboardHeader";
import BookmarkedRecipes from "../components/Dashboard/Bookmarked";
import YourRecipes from "../components/Dashboard/YourRecipes";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      <main className="flex-1 p-8 space-y-10 overflow-y-auto">
        <DashboardHeader />
        <div className="bg-white rounded-2xl shadow-md border border-zinc-100">
          <BookmarkedRecipes />
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-zinc-100">
          <YourRecipes />
        </div>
      </main>
    </div>
  );
}
