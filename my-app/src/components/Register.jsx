import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  
import axios from "axios";  

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate(); 

  const API = "https://69c046f572ca04f3bcbae106.mockapi.io/api/v1/id";  
  const handleRegister = async () => {
    try {
      // get all users
      const res =await axios.get(API);

      // check if email already exists
      const exixt = res.data.find((user) => user.email === email);
      if (exixt) {
        alert("User already exists");
        return;
      }
      await axios.post(API,{
          name,
          role,
          email,
          password,
          skillsHave: [],
          skillsWant: [],
          requests: [],
          connections: [],
          ratings: [],
          messages: []  
        }
      );

      alert("Registered successfully");

      navigate("/login"); 

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gradient-to-br from-green-100 to-green-300 p-8 rounded-2xl shadow-xl w-80">
        
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter name"
          className="w-full mb-4 p-2 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter role (Learner/Teacher)"
          className="w-full mb-4 p-2 border rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter email"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full mb-4 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;