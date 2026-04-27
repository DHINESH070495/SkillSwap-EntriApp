import { Link, useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-green-500 shadow-md px-6 py-3 flex justify-between items-center">
      
      <h1 className="text-2xl font-bold text-white">
        Skill Swap
      </h1>

      <div className="space-x-4">

        {/* Before Login */}
        {!isAuthenticated && (
          <>
            <Link to="/login" className="text-white hover:text-yellow-300">
              Login
            </Link>
            <Link to="/register" className="text-white hover:text-yellow-300">
              Register
            </Link>
          </>
        )}

        {/* After Login */}
        {isAuthenticated && (
          <>
            <Link to="/dashboard" className="text-white hover:text-yellow-300">
              Dashboard
            </Link>

            <Link to="/users" className="text-white hover:text-yellow-300">
              Users
            </Link>

            <Link to="/profile" className="text-white hover:text-yellow-300">
              Profile
            </Link>

            <Link to="/requests" className="text-white hover:text-yellow-300">
              Requests
            </Link>

            <button
              onClick={() => {
              localStorage.removeItem("isAuthenticated");
              localStorage.removeItem("user");
              setIsAuthenticated(false);
              navigate("/login");
            }}
              className="bg-white text-green-600 px-4 py-1 rounded-lg hover:bg-yellow-500"
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;