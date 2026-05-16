import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import UserCards from "./components/UserCards";
import Requests from "./components/Requests";
import Chat from "./components/Chat";
import Dashboard from "./components/Dashboard";

import bgImage from "./assets/E-learning.png";

import {
  Sparkles,
  Users,
  BookOpen,
  MessageCircle,
} from "lucide-react";

function App() {

  const [isAuthenticated,
    setIsAuthenticated] =
    useState(
      localStorage.getItem(
        "isAuthenticated"
      ) === "true"
    );

  return (

    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND IMAGE */}

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            `url(${bgImage})`
        }}
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-900/70 to-pink-900/70 backdrop-blur-sm" />

      {/* FLOATING BLUR EFFECTS */}

      <div className="absolute top-10 left-10 h-72 w-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-10 right-10 h-80 w-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

      {/* MAIN CONTENT */}

      <div className="relative z-10 min-h-screen flex flex-col">

        {/* NAVBAR */}

        <Navbar
          isAuthenticated={
            isAuthenticated
          }
          setIsAuthenticated={
            setIsAuthenticated
          }
        />

        {/* PAGE CONTENT */}

        <div
          className={`flex-1 px-4 md:px-8 py-10 ${
            isAuthenticated
              ? "flex justify-center"
              : "grid lg:grid-cols-2 gap-12 items-center"
          }`}
        >

          {/* LEFT SIDE */}

          {!isAuthenticated && (

            <div className="text-white max-w-2xl">

              {/* BADGE */}

              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-full text-sm font-medium shadow-lg">

                <Sparkles
                  size={18}
                />

                Next Generation Learning Platform

              </div>

              {/* HERO */}

              <h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight">

                Learn.
                <br />

                Share.
                <br />

                <span className="bg-gradient-to-r from-pink-300 to-indigo-300 bg-clip-text text-transparent">

                  Grow Together.

                </span>

              </h1>

              <p className="mt-6 text-lg text-gray-200 leading-relaxed max-w-xl">

                SkillSwap connects passionate learners and experts
                around the world. Exchange skills, collaborate,
                chat in real-time, and grow your knowledge together.

              </p>

              {/* FEATURES */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-xl">

                  <div className="h-12 w-12 rounded-2xl bg-indigo-500 flex items-center justify-center mb-4">

                    <Users
                      size={22}
                      className="text-white"
                    />

                  </div>

                  <h3 className="text-lg font-semibold">

                    Smart Matching

                  </h3>

                  <p className="text-sm text-gray-300 mt-2">

                    Find people with matching skills
                    and interests instantly.

                  </p>

                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-xl">

                  <div className="h-12 w-12 rounded-2xl bg-pink-500 flex items-center justify-center mb-4">

                    <BookOpen
                      size={22}
                      className="text-white"
                    />

                  </div>

                  <h3 className="text-lg font-semibold">

                    Skill Exchange

                  </h3>

                  <p className="text-sm text-gray-300 mt-2">

                    Teach what you know and
                    learn what you love.

                  </p>

                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 shadow-xl sm:col-span-2">

                  <div className="h-12 w-12 rounded-2xl bg-green-500 flex items-center justify-center mb-4">

                    <MessageCircle
                      size={22}
                      className="text-white"
                    />

                  </div>

                  <h3 className="text-lg font-semibold">

                    Real-Time Collaboration

                  </h3>

                  <p className="text-sm text-gray-300 mt-2">

                    Chat, connect, and collaborate with
                    learners and mentors from anywhere.

                  </p>

                </div>

              </div>

            </div>

          )}

          {/* RIGHT SIDE */}

          <div
            className={`flex justify-center items-center ${
              isAuthenticated
                ? "w-full"
                : ""
            }`}
          >

            <div
              className={`relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_80px_rgba(0,0,0,0.35)] rounded-[2rem] overflow-hidden ${
                isAuthenticated
                  ? "w-full max-w-7xl"
                  : "w-full max-w-md"
              }`}
            >

              {/* TOP GLOW */}

              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500" />

              {/* WELCOME */}

              {isAuthenticated && (

                <div className="px-8 pt-8">

                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-3xl p-6 shadow-xl">

                    <h2 className="text-3xl font-bold">

                      Welcome back to SkillSwap

                    </h2>

                    <p className="mt-2 text-indigo-100">

                      Continue learning, connecting,
                      and growing with the community.

                    </p>

                  </div>

                </div>

              )}

              {/* ROUTES */}

              <div
                className={`${
                  isAuthenticated
                    ? "p-6"
                    : "p-8"
                }`}
              >

                <Routes>

                  {/* DEFAULT */}

                  <Route
                    path="/"
                    element={
                      <Navigate
                        to="/login"
                      />
                    }
                  />

                  {/* LOGIN */}

                  <Route
                    path="/login"
                    element={
                      <Login
                        setIsAuthenticated={
                          setIsAuthenticated
                        }
                      />
                    }
                  />

                  {/* REGISTER */}

                  <Route
                    path="/register"
                    element={
                      <Register />
                    }
                  />

                  {/* DASHBOARD */}

                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute
                        isAuthenticated={
                          isAuthenticated
                        }
                      >

                        <Dashboard />

                      </ProtectedRoute>
                    }
                  />

                  {/* USERS */}

                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute
                        isAuthenticated={
                          isAuthenticated
                        }
                      >

                        <UserCards />

                      </ProtectedRoute>
                    }
                  />

                  {/* PROFILE */}

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute
                        isAuthenticated={
                          isAuthenticated
                        }
                      >

                        <Profile />

                      </ProtectedRoute>
                    }
                  />

                  {/* REQUESTS */}

                  <Route
                    path="/requests"
                    element={
                      <ProtectedRoute
                        isAuthenticated={
                          isAuthenticated
                        }
                      >

                        <Requests />

                      </ProtectedRoute>
                    }
                  />

                  {/* CHAT */}

                  <Route
                    path="/chat/:id"
                    element={
                      <ProtectedRoute
                        isAuthenticated={
                          isAuthenticated
                        }
                      >

                        <Chat />

                      </ProtectedRoute>
                    }
                  />

                </Routes>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default App;