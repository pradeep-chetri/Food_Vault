import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { SignUP } from "../../types/usersType";
import axios from "axios";
import { useUser } from "../../context/UserDataContext";

export default function SignUp() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignUP>({
    username: "",
    email: "",
    password: "",
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
      const api = axios.create({
        baseURL: "http://localhost:8000/api",
      });
      const response = await api.post("/auth/signup", formData);

      // ✅ Save JWT token
      localStorage.setItem("token", response.data.access_token);

      // ✅ Set default axios header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;

      // ✅ Get user info
      const me = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${response.data.access_token}` },
      });

      // ✅ Set user context
      setUser(me.data);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // ✅ Redirect
      navigate("/");
    } catch (error: any) {
      console.error(
        "Error during sign up:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-black bg-white">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-extrabold text-center mb-6">
          Join{" "}
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
              UserName
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              onChange={handleChange}
              value={formData.username}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
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
              name="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-2xl shadow-sm focus:outline-none 
              focus:ring-2 focus:ring-amber-400 transition duration-200 placeholder:text-gray-400"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-4 
            rounded-full transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-500">
          Already a member?{" "}
          <Link
            to="/auth/login"
            className="text-lime-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
