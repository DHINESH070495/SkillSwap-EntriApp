import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function UserCards() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    axios.get(API).then((res) => setUsers(res.data));
  }, []);

  // Normalize skill
  const normalize = (skill) =>
    skill.toLowerCase().trim();

  // Convert skills → array
  const convertToArray = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === "string")
      return skills.split(",");
    return [];
  };

  //  AI Match Percentage
  const calculateMatchPercentage = (otherUser) => {
    const userHave = convertToArray(
      currentUser.skillsHave
    ).map(normalize);

    const userWant = convertToArray(
      currentUser.skillsWant
    ).map(normalize);

    const otherHave = convertToArray(
      otherUser.skillsHave
    ).map(normalize);

    const otherWant = convertToArray(
      otherUser.skillsWant
    ).map(normalize);

    let matches = 0;
    let total = userHave.length + userWant.length;

    otherHave.forEach((skill) => {
      if (userWant.includes(skill)) matches++;
    });

    otherWant.forEach((skill) => {
      if (userHave.includes(skill)) matches++;
    });

    if (total === 0) return 0;

    return Math.round((matches / total) * 100);
  };

  // 🔹 Matching Logic
  const matchedUsers = users.filter((u) => {
    if (!currentUser || u.id === currentUser.id)
      return false;

    return calculateMatchPercentage(u) > 0;
  });

  // 🔍 Search + Sort by Match %
  const filteredUsers = matchedUsers
    .filter((user) => {
      const allSkills = [
        ...convertToArray(user.skillsHave),
        ...convertToArray(user.skillsWant),
      ].map(normalize);

      return allSkills.some((skill) =>
        skill.includes(search.toLowerCase())
      );
    })
    .sort(
      (a, b) =>
        calculateMatchPercentage(b) -
        calculateMatchPercentage(a)
    );

  //  Send Request
  const sendRequest = async (targetUser) => {
    try {
      const res = await axios.get(
        `${API}/${targetUser.id}`
      );

      const existingRequests =
        res.data.requests || [];

      if (
        existingRequests.includes(currentUser.id)
      ) {
        alert("Request already sent");
        return;
      }

      const updatedRequests = [
        ...existingRequests,
        currentUser.id,
      ];

      await axios.put(
        `${API}/${targetUser.id}`,
        {
          ...res.data,
          requests: updatedRequests,
        }
      );

      alert("Request sent");
    } catch (error) {
      console.error(error);
    }
  };

  //  Rating
  const rateUser = async (
    targetUser,
    rating
  ) => {
    try {
      const res = await axios.get(
        `${API}/${targetUser.id}`
      );

      const existingRatings =
        res.data.ratings || [];

      const updatedRatings = [
        ...existingRatings,
        rating,
      ];

      await axios.put(
        `${API}/${targetUser.id}`,
        {
          ...res.data,
          ratings: updatedRatings,
        }
      );

      alert("Rating submitted");

      setUsers((prev) =>
        prev.map((u) =>
          u.id === targetUser.id
            ? {
                ...u,
                ratings: updatedRatings,
              }
            : u
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getAverageRating = (
    ratings = []
  ) => {
    if (ratings.length === 0) return 0;

    return (
      ratings.reduce((a, b) => a + b, 0) /
      ratings.length
    ).toFixed(1);
  };

  return (
    <div className="p-6">

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by skill..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-6 w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* USER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredUsers.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No matching users
          </p>
        )}

        {filteredUsers.map((user) => {

          const matchPercent =
            calculateMatchPercentage(user);

          return (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition"
            >

              <h2 className="text-lg font-bold text-gray-800">
                {user.name || user.email}
              </h2>

              {/*  Match % */}
              <p className="text-indigo-600 font-semibold mt-1">
                Match: {matchPercent}%
              </p>

              {/* Skills Have */}
              <p className="mt-2 text-sm font-semibold text-green-600">
                Skills Have:
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {convertToArray(
                  user.skillsHave
                ).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Skills Want */}
              <p className="mt-3 text-sm font-semibold text-blue-600">
                Skills Want:
              </p>

              <div className="flex flex-wrap gap-2 mt-1">
                {convertToArray(
                  user.skillsWant
                ).map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/*  Rating */}
              <p className="mt-3 text-sm font-semibold text-yellow-600">
                Rating: {" "}
                {getAverageRating(user.ratings)} (
                {user.ratings?.length || 0})
              </p>

              {/* Rate Buttons */}
              <div className="flex gap-2 mt-2">
                {[1,2,3,4,5].map((star) => (
                  <button
                    key={star}
                    onClick={() =>
                      rateUser(user, star)
                    }
                    className="px-2 py-1 rounded-lg text-xs hover:bg-yellow-400"
                  >
                    {star}
                  </button>
                ))}
              </div>

              {/* Chat */}
              <button
                onClick={() =>
                  navigate(`/chat/${user.id}`)
                }
                className="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
              >
                Chat
              </button>

              {/* Request */}
              <button
                onClick={() =>
                  sendRequest(user)
                }
                className="mt-2 w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600"
              >
                Send Request
              </button>

            </div>
          );

        })}

      </div>
    </div>
  );
}

export default UserCards;