import { useState } from "react";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Briefcase,
  UserPlus,
  Sparkles,
} from "lucide-react";

function Register() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("");

  const navigate = useNavigate();

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const handleRegister =
    async () => {

      try {

        // Get all users
        const res =
          await axios.get(API);

        // Check email exists
        const exist =
          res.data.find(
            (user) =>
              user.email === email
          );

        if (exist) {

          alert(
            "User already exists"
          );

          return;

        }

        await axios.post(
          API,
          {

            name,
            role,
            email,
            password,

            skillsHave: [],
            skillsWant: [],
            requests: [],
            connections: [],
            ratings: [],
            messages: []

          }
        );

        alert(
          "Registered successfully"
        );

        navigate("/login");

      }
      catch (error) {

        console.error(error);

        alert(
          "Registration failed"
        );

      }

    };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

            <Sparkles size={30} />

          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">

            Create Account

          </h1>

          <p className="text-gray-500 mt-2">

            Join SkillSwap and start learning together

          </p>

        </div>

        {/* NAME */}

        <div className="mb-4">

          <label className="text-sm font-medium text-gray-600">

            Full Name

          </label>

          <div className="flex items-center gap-3 mt-2 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <User
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Enter your name"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-gray-400"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* ROLE */}

        <div className="mb-4">

          <label className="text-sm font-medium text-gray-600">

            Role

          </label>

          <div className="flex items-center gap-3 mt-2 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <Briefcase
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Learner / Teacher"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-gray-400"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            />

          </div>

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
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* PASSWORD */}

        <div className="mb-6">

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
                setPassword(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* REGISTER BUTTON */}

        <button
          onClick={handleRegister}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
        >

          <UserPlus size={18} />

          Register

        </button>

        {/* LOGIN LINK */}

        <p className="text-center text-sm text-gray-600 mt-6">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:text-purple-600 transition"
          >

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Register;