import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  return (
    <div className="relative min-h-screen">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Main */}
      <div className="relative z-10 min-h-screen bg-gradient-to-br from-indigo-100/80 via-purple-100/80 to-pink-100/80">

        {/* Navbar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        {/* Layout */}
        <div
          className={`m-6 p-6 min-h-[85vh] ${
            isAuthenticated
              ? "flex justify-center items-start"
              : "flex items-center justify-center gap-10"
          }`}
        >

          {/* Left Side (Before Login Only) */}
          {!isAuthenticated && (
            <div className="flex-1 text-center">

              <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                SkillSwap
                <br />

                <span className="text-indigo-600">
                  E-Learning Platform
                </span>

              </h1>

              <p className="mt-4 text-gray-600">
                Learn, share and grow your skills with others.
                <br />
                Join our community today!
              </p>

            </div>
          )}

          {/* Right Side */}
          <div
            className={`flex justify-center ${
              isAuthenticated ? "w-full" : "flex-1"
            }`}
          >

            <div
              className={`bg-white shadow-2xl rounded-3xl p-6 ${
                isAuthenticated
                  ? "w-full max-w-6xl"
                  : "w-full max-w-md"
              }`}
            >

              {/* Welcome */}
              {isAuthenticated && (
                <h2 className="text-2xl font-semibold text-center mb-4">
                  Welcome to SkillSwap 
                </h2>
              )}

              <Routes>

                {/* Default */}
                <Route
                  path="/"
                  element={<Navigate to="/login" />}
                />

                {/* Login */}
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

                {/* Register */}
                <Route
                  path="/register"
                  element={<Register />}
                />

                {/* Dashboard */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Users */}
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      <UserCards />
                    </ProtectedRoute>
                  }
                />

                {/* Profile */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Requests */}
                <Route
                  path="/requests"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      <Requests />
                    </ProtectedRoute>
                  }
                />

                {/* Chat */}
                <Route
                  path="/chat/:id"
                  element={
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
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
  );
}

export default App;