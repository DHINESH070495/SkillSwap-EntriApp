import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  Search,
  MessageCircle,
  UserPlus,
  Star,
  Sparkles,
  Trophy,
} from "lucide-react";

function UserCards() {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const navigate =
    useNavigate();

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    axios.get(API)
      .then((res) =>
        setUsers(res.data)
      );

  }, []);

  // Normalize skill
  const normalize = (skill) =>
    skill.toLowerCase().trim();

  // Convert skills → array
  const convertToArray = (
    skills
  ) => {

    if (Array.isArray(skills))
      return skills;

    if (
      typeof skills === "string"
    )
      return skills.split(",");

    return [];

  };

  // Match %
  const calculateMatchPercentage =
    (otherUser) => {

      const userHave =
        convertToArray(
          currentUser.skillsHave
        ).map(normalize);

      const userWant =
        convertToArray(
          currentUser.skillsWant
        ).map(normalize);

      const otherHave =
        convertToArray(
          otherUser.skillsHave
        ).map(normalize);

      const otherWant =
        convertToArray(
          otherUser.skillsWant
        ).map(normalize);

      let matches = 0;

      let total =
        userHave.length +
        userWant.length;

      otherHave.forEach(
        (skill) => {

          if (
            userWant.includes(skill)
          )
            matches++;

        }
      );

      otherWant.forEach(
        (skill) => {

          if (
            userHave.includes(skill)
          )
            matches++;

        }
      );

      if (total === 0)
        return 0;

      return Math.round(
        (matches / total) * 100
      );

    };

  // All users except current
  const allUsers =
    users.filter(
      (u) =>
        currentUser &&
        u.id !== currentUser.id
    );

  // Split users
  const topMatches =
    allUsers
      .filter(
        (u) =>
          calculateMatchPercentage(
            u
          ) > 0
      )
      .sort(
        (a, b) =>
          calculateMatchPercentage(
            b
          ) -
          calculateMatchPercentage(
            a
          )
      );

  const otherUsers =
    allUsers.filter(
      (u) =>
        calculateMatchPercentage(
          u
        ) === 0
    );

  // Search filter
  const filterBySearch = (
    list
  ) => {

    return list.filter(
      (user) => {

        if (!search)
          return true;

        const allSkills = [
          ...convertToArray(
            user.skillsHave
          ),

          ...convertToArray(
            user.skillsWant
          ),
        ].map(normalize);

        return allSkills.some(
          (skill) =>
            skill.includes(
              search.toLowerCase()
            )
        );

      }
    );

  };

  const filteredTopMatches =
    filterBySearch(topMatches);

  const filteredOtherUsers =
    filterBySearch(otherUsers);

  // Send Request
  const sendRequest =
    async (targetUser) => {

      try {

        const res =
          await axios.get(
            `${API}/${targetUser.id}`
          );

        const existingRequests =
          res.data.requests || [];

        if (
          existingRequests.includes(
            currentUser.id
          )
        ) {

          alert(
            "Request already sent"
          );

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
            requests:
              updatedRequests,
          }
        );

        alert("Request sent");

      }
      catch (error) {

        console.error(error);

      }

    };

  // Rating
  const rateUser =
    async (
      targetUser,
      rating
    ) => {

      try {

        const res =
          await axios.get(
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
            ratings:
              updatedRatings,
          }
        );

        alert(
          "Rating submitted"
        );

        setUsers((prev) =>
          prev.map((u) =>
            u.id ===
            targetUser.id
              ? {
                  ...u,
                  ratings:
                    updatedRatings,
                }
              : u
          )
        );

      }
      catch (error) {

        console.error(error);

      }

    };

  const getAverageRating = (
    ratings = []
  ) => {

    if (ratings.length === 0)
      return 0;

    return (
      ratings.reduce(
        (a, b) => a + b,
        0
      ) / ratings.length
    ).toFixed(1);

  };

  // USER CARD
  const renderCard = (
    user,
    isTopMatch
  ) => {

    const matchPercent =
      calculateMatchPercentage(
        user
      );

    return (

      <div
        key={user.id}
        className={`bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-6 hover:scale-[1.02] transition duration-300 ${
          isTopMatch
            ? "ring-2 ring-indigo-400"
            : ""
        }`}
      >

        {/* HEADER */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">

              {user.name
                ?.charAt(0)
                ?.toUpperCase()}

            </div>

            <div>

              <h2 className="text-xl font-bold text-gray-800">

                {user.name ||
                  user.email}

              </h2>

              <p className="text-sm text-gray-500">

                {user.role ||
                  "SkillSwap User"}

              </p>

            </div>

          </div>

          {isTopMatch && (

            <div className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">

              <Trophy size={14} />

              Best Match

            </div>

          )}

        </div>

        {/* MATCH */}

        <div className="mt-5">

          <div className="flex justify-between text-sm mb-2">

            <span className="font-medium text-gray-600">

              Match Score

            </span>

            <span className="font-bold text-indigo-600">

              {matchPercent}%

            </span>

          </div>

          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              style={{
                width: `${matchPercent}%`
              }}
            />

          </div>

        </div>

        {/* SKILLS HAVE */}

        <div className="mt-5">

          <p className="text-sm font-semibold text-green-600 mb-2">

            Skills Have

          </p>

          <div className="flex flex-wrap gap-2">

            {convertToArray(
              user.skillsHave
            ).map(
              (
                skill,
                i
              ) => (

                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                >

                  {skill}

                </span>

              )
            )}

          </div>

        </div>

        {/* SKILLS WANT */}

        <div className="mt-4">

          <p className="text-sm font-semibold text-indigo-600 mb-2">

            Skills Want

          </p>

          <div className="flex flex-wrap gap-2">

            {convertToArray(
              user.skillsWant
            ).map(
              (
                skill,
                i
              ) => (

                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                >

                  {skill}

                </span>

              )
            )}

          </div>

        </div>

        {/* RATING */}

        <div className="mt-5">

          <div className="flex items-center gap-2 text-yellow-500">

            <Star
              size={18}
              fill="currentColor"
            />

            <span className="font-semibold text-gray-700">

              {getAverageRating(
                user.ratings
              )}

            </span>

            <span className="text-sm text-gray-400">

              (
              {user.ratings
                ?.length || 0}{" "}
              reviews)

            </span>

          </div>

          <div className="flex gap-2 mt-3">

            {[1, 2, 3, 4, 5].map(
              (star) => (

                <button
                  key={star}
                  onClick={() =>
                    rateUser(
                      user,
                      star
                    )
                  }
                  className="h-8 w-8 rounded-xl bg-yellow-100 text-yellow-600 hover:bg-yellow-400 hover:text-white transition text-sm font-bold"
                >

                  {star}

                </button>

              )
            )}

          </div>

        </div>

        {/* ACTION BUTTONS */}

        <div className="flex gap-3 mt-6">

          <button
            onClick={() =>
              navigate(
                `/chat/${user.id}`
              )
            }
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >

            <MessageCircle
              size={18}
            />

            Chat

          </button>

          <button
            onClick={() =>
              sendRequest(user)
            }
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition"
          >

            <UserPlus
              size={18}
            />

            Request

          </button>

        </div>

      </div>

    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

              <Sparkles size={30} />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-800">

                Discover Users

              </h1>

              <p className="text-gray-500 mt-1">

                Find your best skill-sharing partners

              </p>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="bg-white/80 backdrop-blur-lg border border-white/30 shadow-xl rounded-3xl p-5 mb-10">

          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-400 transition">

            <Search
              size={20}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search users by skills..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder:text-gray-400"
            />

          </div>

        </div>

        {/* TOP MATCHES */}

        <div className="mb-12">

          <h2 className="text-3xl font-bold text-indigo-700 mb-6">

            Top Matches

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredTopMatches
              .length === 0 && (

              <div className="col-span-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 text-center text-gray-500">

                No top matches found

              </div>

            )}

            {filteredTopMatches.map(
              (user) =>
                renderCard(
                  user,
                  true
                )
            )}

          </div>

        </div>

        {/* OTHER USERS */}

        <div>

          <h2 className="text-3xl font-bold text-gray-700 mb-6">

            Other Users

          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

            {filteredOtherUsers
              .length === 0 && (

              <div className="col-span-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-10 text-center text-gray-500">

                No users found

              </div>

            )}

            {filteredOtherUsers.map(
              (user) =>
                renderCard(
                  user,
                  false
                )
            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default UserCards;