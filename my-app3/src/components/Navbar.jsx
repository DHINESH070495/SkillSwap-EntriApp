import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Bell,
  LogOut,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";

function Navbar({
  isAuthenticated,
  setIsAuthenticated,
}) {

  const navigate = useNavigate();

  return (

    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/30 shadow-sm px-6 py-4">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* LOGO */}

        <div
          onClick={() =>
            navigate("/")
          }
          className="flex items-center gap-3 cursor-pointer"
        >

          <div className="h-11 w-11 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

            <Sparkles size={22} />

          </div>

          <div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">

              SkillSwap

            </h1>

            <p className="text-xs text-gray-500 -mt-1">

              Learn • Connect • Grow

            </p>

          </div>

        </div>

        {/* NAV LINKS */}

        <div className="flex items-center gap-3 flex-wrap">

          {/* BEFORE LOGIN */}

          {!isAuthenticated && (

            <>

              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium"
              >

                <LogIn size={18} />

                Login

              </Link>

              <Link
                to="/register"
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-2xl shadow-md hover:scale-105 transition duration-300"
              >

                <UserPlus size={18} />

                Register

              </Link>

            </>

          )}

          {/* AFTER LOGIN */}

          {isAuthenticated && (

            <>

              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >

                <LayoutDashboard size={18} />

                Dashboard

              </Link>

              <Link
                to="/users"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >

                <Users size={18} />

                Users

              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >

                <UserCircle size={18} />

                Profile

              </Link>

              <Link
                to="/requests"
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
              >

                <Bell size={18} />

                Requests

              </Link>

              {/* LOGOUT */}

              <button
                onClick={() => {

                  localStorage.removeItem(
                    "isAuthenticated"
                  );

                  localStorage.removeItem(
                    "user"
                  );

                  setIsAuthenticated(false);

                  navigate("/login");

                }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-2xl shadow-md hover:scale-105 transition duration-300"
              >

                <LogOut size={18} />

                Logout

              </button>

            </>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;