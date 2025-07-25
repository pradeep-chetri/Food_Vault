import { Bookmark, Eye, Upload } from "lucide-react";

const stats = [
  { icon: Eye, label: "Total Views", value: "1,284",valuecolor: "text-amber-500" , iconcolor: "bg-amber-100 text-amber-600" },
  { icon: Bookmark, label: "Bookmarked", value: "356",valuecolor: "text-lime-500", iconcolor: "bg-lime-100 text-lime-600" },
  { icon: Upload, label: "Your Recipes", value: "12",valuecolor: "text-blue-500", iconcolor: "bg-blue-100 text-blue-600" },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map(({ icon: Icon, label, value, iconcolor, valuecolor}) => (
        <div key={label} className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className={`p-2 ${iconcolor} rounded-full`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className={`text-xl font-bold ${valuecolor}`}>{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
