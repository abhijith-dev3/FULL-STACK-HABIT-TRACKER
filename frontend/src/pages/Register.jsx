import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
        await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully 🚀");

      // 🔥 AUTO LOGIN STEP
      const loginRes = await API.post("/auth/login", {
        email,
        password,
      });//after login usr login immediately

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user))

      // 🔥 REDIRECT TO DASHBOARD
      navigate("/dashboard");

    } catch (err) {
      console.log(err.response?.data);
      alert("Error registering user");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">

        <h2 className="text-2xl text-green-400 mb-4 font-semibold uppercase">register</h2>

        <input
          className="w-full p-2 mb-3 bg-gray-800"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 mb-3 bg-gray-800"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 bg-gray-800"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 p-2 rounded"
        >
          Register
        </button>

      </div>
    </div>
  );
}