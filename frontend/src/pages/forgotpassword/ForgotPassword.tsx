import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Lets{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded">
              Reset
            </span>{" "}
            Password
          </span>
        </h2>

        <form className="space-y-5" action="/forgotpassword/otpauth">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 
            rounded-full transition duration-300"
          >
            Password Reset
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Remembered your password?{" "}
          <Link to="/login" className="text-lime-600 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
