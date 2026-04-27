import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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

      const response = await axios.get(API);

      const user = response.data.find(
        (u) =>
          u.email.trim().toLowerCase() ===
            email.trim().toLowerCase() &&
          u.password.trim() === password.trim()
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

        alert("Invalid email or password");

      }

    } catch (error) {

      console.error(error);

      alert("Login failed. Try again.");

    }
  };

  return (

    <div className="flex items-center justify-center">

      <div className="bg-gradient-to-br from-blue-100 to-blue-300 p-8 rounded-2xl shadow-xl w-80">

        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {errors.email && (
          <p className="text-red-500 text-sm mb-2">
            {errors.email}
          </p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {errors.password && (
          <p className="text-red-500 text-sm mb-2">
            {errors.password}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Register here
          </Link>
        </p>

      </div>

    </div>

  );
}

export default Login;