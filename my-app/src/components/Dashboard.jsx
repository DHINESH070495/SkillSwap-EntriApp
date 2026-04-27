import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <p className="text-center text-gray-500">
        Loading data...
      </p>
    );

  }

  return (

    <div className="p-6">

      <p className="text-center text-gray-600 mb-6 text-lg">
        Discover new skills, connect with talented learners, 
        and grow together in the SkillSwap community.
      </p>

      <div className="text-center bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg mb-6">
      <p className="text-indigo-700 font-medium">
        Start exploring skill matches, send requests, 
        and collaborate with others to achieve your learning goals!
      </p>
    </div>

      {/* USER INFO CARD */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg font-semibold">
          {user.name || "User"}
        </h2>

        <p className="text-gray-500">
          {user.email}
        </p>

        <p className="text-gray-500">
          Role: {user.role || "Learner"}
        </p>

        {/* Skills */}

        <div className="mt-4">

          <p className="font-semibold">
            Your Skills:
          </p>

          <div className="flex flex-wrap gap-2 mt-2">

            {convertToArray(
              user.skillsHave
            ).map((skill, i) => (

              <span
                key={i}
                className="bg-green-100 px-2 py-1 rounded text-xs"
              >
                {skill}
              </span>

            ))}

          </div>

        </div>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="grid grid-cols-2 gap-6 mt-6">

        {/* Matches */}

        <div
          onClick={() =>
            navigate("/users")
          }
          className="bg-indigo-500 text-white p-6 rounded-xl text-center cursor-pointer hover:bg-indigo-600"
        >

          <h2 className="text-3xl font-bold">
            {matches}
          </h2>

          <p className="mt-1">
            Matches
          </p>

        </div>

        {/* Requests */}

        <div
          onClick={() =>
            navigate("/requests")
          }
          className="bg-green-500 text-white p-6 rounded-xl text-center cursor-pointer hover:bg-green-600"
        >

          <h2 className="text-3xl font-bold">
            {user.requests?.length || 0}
          </h2>

          <p className="mt-1">
            Requests
          </p>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;