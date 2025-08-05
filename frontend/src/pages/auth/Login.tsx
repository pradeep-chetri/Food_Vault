import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserDataContext";
import type { Login } from "../../types/usersType";
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

export default function Login() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Login>({
    email: "",
    password: "",
  });

  const API = axios.create({
  baseURL: "http://localhost:8000/api/auth",
});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await API.post(
        "/login",
        formData
      );

      localStorage.setItem("token", response.data.access_token);

      const me = await axios.get("/me", {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });

      setUser(me.data);

      navigate("/"); // redirect to dashboard or home page after login
    } catch (error: any) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Welcome Back to{" "}
          <span className="text-lime-600">
            <span className="bg-amber-500 text-white px-2 py-1 rounded">
              Food
            </span>{" "}
            Vault
          </span>
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
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
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

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
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgotpassword"
              className="text-sm text-lime-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 rounded-full transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don`t have an account?{" "}
          <Link
            to="/auth/signup"
            className="text-lime-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
