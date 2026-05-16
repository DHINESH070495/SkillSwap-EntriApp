import { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Plus,
  Save,
  Sparkles,
  X,
  Brain,
  Target,
} from "lucide-react";

function Profile() {

  // 🔹 User Details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔹 Skills
  const [haveSkill, setHaveSkill] = useState("");
  const [wantSkill, setWantSkill] = useState("");

  const [skillsHave, setSkillsHave] = useState([]);
  const [skillsWant, setSkillsWant] = useState([]);

  // 🔹 Get logged user
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const API =
    "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";

  // 🔹 Load Data
  useEffect(() => {

    if (user) {

      setName(user.name || "");
      setEmail(user.email || "");
      setPassword(user.password || "");

      setSkillsHave(user.skillsHave || []);
      setSkillsWant(user.skillsWant || []);

    }

  }, []);

  // 🔹 Save Profile
  const updateProfile = async () => {

    try {

      const updatedUser = {

        ...user,
        name,
        email,
        password,
        skillsHave,
        skillsWant

      };

      await axios.put(
        `${API}/${user.id}`,
        updatedUser
      );

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      alert(
        "Profile updated successfully"
      );

    }
    catch (error) {

      console.error(error);

      alert("Update failed");

    }

  };

  // 🔹 Add Skill Have
  const addHaveSkill = () => {

    if (haveSkill.trim() === "")
      return;

    const updated = [
      ...skillsHave,
      haveSkill
    ];

    setSkillsHave(updated);

    setHaveSkill("");

  };

  // 🔹 Add Skill Want
  const addWantSkill = () => {

    if (wantSkill.trim() === "")
      return;

    const updated = [
      ...skillsWant,
      wantSkill
    ];

    setSkillsWant(updated);

    setWantSkill("");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="bg-white/70 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-8 mb-8">

          <div className="flex items-center gap-4">

            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

              <Sparkles size={30} />

            </div>

            <div>

              <h1 className="text-4xl font-bold text-gray-800">

                My Profile

              </h1>

              <p className="text-gray-500 mt-1">

                Manage your details and showcase your skills

              </p>

            </div>

          </div>

        </div>

        {/* PROFILE DETAILS */}

        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8 mb-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6">

            Personal Information

          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            {/* NAME */}

            <div>

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
                  placeholder="Enter Name"
                  className="bg-transparent outline-none flex-1 text-gray-700"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

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
                  placeholder="Enter Email"
                  className="bg-transparent outline-none flex-1 text-gray-700"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>

          </div>

          {/* PASSWORD */}

          <div className="mt-5">

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
                placeholder="Enter Password"
                className="bg-transparent outline-none flex-1 text-gray-700"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

            </div>

          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={updateProfile}
            className="mt-6 flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
          >

            <Save size={18} />

            Save Profile

          </button>

        </div>

        {/* SKILLS SECTION */}

        <div className="grid md:grid-cols-2 gap-8">

          {/* SKILLS HAVE */}

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">

                <Brain size={22} />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Skills I Have

                </h2>

                <p className="text-sm text-gray-500">

                  Share your expertise

                </p>

              </div>

            </div>

            <div className="flex gap-3 mb-5">

              <input
                placeholder="Add a skill"
                className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-400"
                value={haveSkill}
                onChange={(e) =>
                  setHaveSkill(
                    e.target.value
                  )
                }
              />

              <button
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-5 rounded-2xl shadow-lg hover:scale-105 transition"
                onClick={addHaveSkill}
              >

                <Plus size={20} />

              </button>

            </div>

            <div className="flex flex-wrap gap-3">

              {skillsHave.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full shadow-sm"
                  >

                    <span className="text-sm font-medium">

                      {skill}

                    </span>

                    <button
                      onClick={() => {

                        const updated =
                          skillsHave.filter(
                            (_, i) =>
                              i !== index
                          );

                        setSkillsHave(
                          updated
                        );

                      }}
                      className="text-red-500 hover:scale-110 transition"
                    >

                      <X size={14} />

                    </button>

                  </div>

                )
              )}

            </div>

          </div>

          {/* SKILLS WANT */}

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-6">

            <div className="flex items-center gap-3 mb-5">

              <div className="h-12 w-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">

                <Target size={22} />

              </div>

              <div>

                <h2 className="text-2xl font-bold text-gray-800">

                  Skills I Want

                </h2>

                <p className="text-sm text-gray-500">

                  Learn something new

                </p>

              </div>

            </div>

            <div className="flex gap-3 mb-5">

              <input
                placeholder="Add a skill"
                className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                value={wantSkill}
                onChange={(e) =>
                  setWantSkill(
                    e.target.value
                  )
                }
              />

              <button
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 rounded-2xl shadow-lg hover:scale-105 transition"
                onClick={addWantSkill}
              >

                <Plus size={20} />

              </button>

            </div>

            <div className="flex flex-wrap gap-3">

              {skillsWant.map(
                (skill, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full shadow-sm"
                  >

                    <span className="text-sm font-medium">

                      {skill}

                    </span>

                    <button
                      onClick={() => {

                        const updated =
                          skillsWant.filter(
                            (_, i) =>
                              i !== index
                          );

                        setSkillsWant(
                          updated
                        );

                      }}
                      className="text-red-500 hover:scale-110 transition"
                    >

                      <X size={14} />

                    </button>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Profile;