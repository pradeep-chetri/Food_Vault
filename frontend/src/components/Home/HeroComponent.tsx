import AuthButtons from "./AuthCTA";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function HeroComponent({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  return (
    <section className="relative w-full flex flex-col items-center gap-10 mt-24 px-4 text-black">
      {/* Floating Auth Buttons */}
      <div className="">
        <AuthButtons />
      </div>

      {/* Title & Description */}
      <div className="text-center max-w-2xl space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-800 leading-tight">
          Welcome to{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded-xl shadow-md">
              Food
            </span>{" "}
            Vault
          </span>
        </h1>
        <p className="text-zinc-500 text-base md:text-lg">
          Discover and save your favorite recipes — from quick meals to gourmet
          delights. All in one elegant place.
        </p>
      </div>

      {/* Search Input */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="🔍 Search your recipe..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-5 py-3 rounded-full border border-zinc-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition placeholder:text-zinc-400 text-zinc-800"
        />
      </div>
    </section>
  );
}
