export default function ResetPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Reset{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded">
              Your
            </span>{" "}
            Password
          </span>
        </h2>

        <form className="space-y-5" action={"/forgotpassword/success"}>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 
            rounded-full transition duration-300"
          >
            Reset
          </button>
        </form>
      </div>
    </div>
  );
}
