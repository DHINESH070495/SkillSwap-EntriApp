import { useState, useEffect } from "react";
import axios from "axios";

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

      alert("Profile updated successfully");

    }
    catch (error) {

      console.error(error);
      alert("Update failed");

    }

  };

  // 🔹 Add Skill Have
  const addHaveSkill = () => {

    if (haveSkill.trim() === "") return;

    const updated =
      [...skillsHave, haveSkill];

    setSkillsHave(updated);
    setHaveSkill("");

  };

  // 🔹 Add Skill Want
  const addWantSkill = () => {

    if (wantSkill.trim() === "") return;

    const updated =
      [...skillsWant, wantSkill];

    setSkillsWant(updated);
    setWantSkill("");

  };

  return (

    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-xl shadow mb-6">

        <h1 className="text-center text-3xl font-bold text-indigo-700">
          My Profile 
        </h1>

        <p className="text-center text-gray-600 mt-2">
          Update your personal details and manage your skills
          to find better matches.
        </p>

      </div>

      {/* USER DETAILS */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="text-lg font-semibold mb-4 text-indigo-600">
          Edit Profile Details
        </h2>

        {/* Name */}
        <input
          type="text"
          placeholder="Enter Name"
          className="border p-2 w-full mb-3 rounded-lg"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Enter Email"
          className="border p-2 w-full mb-3 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter Password"
          className="border p-2 w-full mb-4 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={updateProfile}
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600"
        >
          Save Profile
        </button>

      </div>

      {/* SKILLS HAVE */}
      <div className="bg-white p-5 rounded-xl shadow mb-6">

        <h2 className="font-semibold text-lg text-green-600 mb-3">
          Skills I Have
        </h2>

        <div className="flex gap-2 mb-3">

          <input
            placeholder="Enter a skill"
            className="border p-2 flex-1 rounded-lg"
            value={haveSkill}
            onChange={(e) =>
              setHaveSkill(e.target.value)
            }
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={addHaveSkill}
          >
            Add
          </button>

        </div>

        <div className="flex flex-wrap gap-2">

          {skillsHave.map((skill, index) => (

            <span
              key={index}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >

              {skill}

              <button
                onClick={() => {

                  const updated =
                    skillsHave.filter(
                      (_, i) => i !== index
                    );

                  setSkillsHave(updated);

                }}
                className="text-red-500 text-xs"
              >
                ✕
              </button>

            </span>

          ))}

        </div>

      </div>

      {/* SKILLS WANT */}
      <div className="bg-white p-5 rounded-xl shadow">

        <h2 className="font-semibold text-lg text-blue-600 mb-3">
          Skills I Want
        </h2>

        <div className="flex gap-2 mb-3">

          <input
            placeholder="Enter a skill"
            className="border p-2 flex-1 rounded-lg"
            value={wantSkill}
            onChange={(e) =>
              setWantSkill(e.target.value)
            }
          />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            onClick={addWantSkill}
          >
            Add
          </button>

        </div>

        <div className="flex flex-wrap gap-2">

          {skillsWant.map((skill, index) => (

            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >

              {skill}

              <button
                onClick={() => {

                  const updated =
                    skillsWant.filter(
                      (_, i) => i !== index
                    );

                  setSkillsWant(updated);

                }}
                className="text-red-500 text-xs"
              >
                ✕
              </button>

            </span>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Profile;