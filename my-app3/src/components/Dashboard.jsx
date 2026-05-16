import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Mail,
  Briefcase,
  Sparkles,
  ArrowRight,
  Handshake,
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState(0);

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser =
    JSON.parse(localStorage.getItem("user"));

  // Normalize skills
  const normalize = (skill) =>
    skill.toLowerCase().trim();

  const convertToArray = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === "string")
      return skills.split(",");
    return [];
  };

  useEffect(() => {

    if (!currentUser) return;

    axios.get(API)
      .then((res) => {

        const users = res.data;

        // Find logged-in user
        const me = users.find(
          (u) => u.id === currentUser.id
        );

        setUser(me);

        // Calculate matches
        const matchedUsers = users.filter((u) => {

          if (u.id === currentUser.id)
            return false;

          const myHave =
            convertToArray(me.skillsHave)
              .map(normalize);

          const myWant =
            convertToArray(me.skillsWant)
              .map(normalize);

          const otherHave =
            convertToArray(u.skillsHave)
              .map(normalize);

          const otherWant =
            convertToArray(u.skillsWant)
              .map(normalize);

          return (
            otherHave.some((s) =>
              myWant.includes(s)
            ) ||
            otherWant.some((s) =>
              myHave.includes(s)
            )
          );

        });

        setMatches(matchedUsers.length);

      })
      .catch((error) => {

        console.error(
          "API Error:",
          error
        );

      });

  }, []);

  // Loading state
  if (!user) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="animate-pulse bg-white p-8 rounded-2xl shadow-lg w-80">

          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>

          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

          <div className="h-4 bg-gray-200 rounded w-2/4"></div>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 p-6">

      {/* HERO SECTION */}

      <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-3xl p-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>

            <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-2">

              <Sparkles size={18} />

              SkillSwap Dashboard

            </div>

            <h1 className="text-4xl font-bold text-gray-800 leading-tight">

              Welcome back,
              <span className="text-indigo-600">
                {" "} {user.name}
              </span>

            </h1>

            <p className="text-gray-600 mt-3 max-w-xl">

              Discover talented learners, exchange skills,
              and grow together through collaboration.

            </p>

          </div>

          <div className="hidden md:flex">

            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg">

              <Handshake size={42} />

            </div>

          </div>

        </div>

      </div>

      {/* USER PROFILE CARD */}

      <div className="mt-8 bg-white rounded-3xl shadow-lg p-6 border border-gray-100">

        <div className="flex items-start justify-between flex-wrap gap-4">

          <div>

            <div className="flex items-center gap-3">

              <div className="h-14 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">

                {user.name?.charAt(0)}

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  {user.name || "User"}

                </h2>

                <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">

                  <Mail size={15} />

                  {user.email}

                </div>

              </div>

            </div>

            <div className="flex items-center gap-2 mt-4 text-gray-600">

              <Briefcase size={18} />

              <span>
                {user.role || "Learner"}
              </span>

            </div>

          </div>

        </div>

        {/* SKILLS */}

        <div className="mt-6">

          <h3 className="font-semibold text-gray-700 mb-3">

            Your Skills

          </h3>

          <div className="flex flex-wrap gap-3">

            {convertToArray(user.skillsHave).map(
              (skill, i) => (

                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-sm font-medium shadow-sm"
                >

                  {skill.trim()}

                </span>

              )
            )}

          </div>

        </div>

      </div>

      {/* STATS CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* MATCHES */}

        <div
          onClick={() =>
            navigate("/users")
          }
          className="group cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-7 rounded-3xl shadow-lg hover:scale-[1.02] transition-all duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-indigo-100">
                Skill Matches
              </p>

              <h2 className="text-5xl font-bold mt-2">

                {matches}

              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <Users size={32} />

            </div>

          </div>

          <div className="flex items-center gap-2 mt-6 text-indigo-100 group-hover:translate-x-1 transition">

            Explore Matches

            <ArrowRight size={18} />

          </div>

        </div>

        {/* REQUESTS */}

        <div
          onClick={() =>
            navigate("/requests")
          }
          className="group cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 text-white p-7 rounded-3xl shadow-lg hover:scale-[1.02] transition-all duration-300"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-green-100">
                Collaboration Requests
              </p>

              <h2 className="text-5xl font-bold mt-2">

                {user.requests?.length || 0}

              </h2>

            </div>

            <div className="bg-white/20 p-4 rounded-2xl">

              <Handshake size={32} />

            </div>

          </div>

          <div className="flex items-center gap-2 mt-6 text-green-100 group-hover:translate-x-1 transition">

            View Requests

            <ArrowRight size={18} />

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;