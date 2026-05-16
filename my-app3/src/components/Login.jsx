import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Mail,
  Lock,
  LogIn,
  Sparkles,
} from "lucide-react";

function Login({ setIsAuthenticated }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const handleLogin = async () => {

    let newErrors = {};

    // Validation
    if (!email.trim())
      newErrors.email = "Email is required";

    if (!password.trim())
      newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {

      setErrors(newErrors);

      return;

    }

    try {

      const response =
        await axios.get(API);

      const user =
        response.data.find(
          (u) =>
            u.email.trim().toLowerCase() ===
              email.trim().toLowerCase() &&
            u.password.trim() ===
              password.trim()
        );

      if (user) {

        // Save login
        localStorage.setItem(
          "isAuthenticated",
          "true"
        );

        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        setIsAuthenticated(true);

        alert("Login successful!");

        // Redirect to Dashboard
        navigate("/dashboard");

      } else {

        alert(
          "Invalid email or password"
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Login failed. Try again."
      );

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/40 shadow-2xl rounded-3xl p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

            <Sparkles size={30} />

          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">

            Welcome Back

          </h1>

          <p className="text-gray-500 mt-2">

            Login to continue your SkillSwap journey

          </p>

        </div>

        {/* EMAIL */}

        <div className="mb-4">

          <label className="text-sm font-medium text-gray-600">

            Email Address

          </label>

          <div className="flex items-center gap-3 mt-2 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <Mail
              size={18}
              className="text-gray-400"
            />

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-gray-400"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {errors.email && (

            <p className="text-red-500 text-sm mt-1 ml-1">

              {errors.email}

            </p>

          )}

        </div>

        {/* PASSWORD */}

        <div className="mb-5">

          <label className="text-sm font-medium text-gray-600">

            Password

          </label>

          <div className="flex items-center gap-3 mt-2 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <Lock
              size={18}
              className="text-gray-400"
            />

            <input
              type="password"
              placeholder="Enter your password"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-gray-400"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {errors.password && (

            <p className="text-red-500 text-sm mt-1 ml-1">

              {errors.password}

            </p>

          )}

        </div>

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        >

          <LogIn size={18} />

          Login

        </button>

        {/* REGISTER LINK */}

        <p className="text-center text-sm text-gray-600 mt-6">

          Don’t have an account?{" "}

          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:text-purple-600 transition"
          >

            Register here

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;