import {useState} from "react";

import API from "../api/axios";

export default function Login(){
 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async() => {
    try{
      const res= await API.post("/auth/login",{
        email,
        password
      })

      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",JSON.stringify(res.data.user));

      window.location.href="/dashboard"
    }catch(error){
      console.error(error.response?.data||error.message)
      alert("Invalid credentials")
    }
  }
  return(
    <div className="flex justify-center items-center h-screen bg-gray-950 text-white">
      <div className="bg-gray-900 p-8 rounded-xl w-96">
        <h2 className="text-green-400 text-2xl mb-3">Login</h2>

        <input type="email"
        className="w-full bg-gray-800 p-2 mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}/>

        <input type="password"
        className="p-2 bg-gray-800 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}/>

        <button onClick={handleLogin}
        className="w-full bg-green-500 rounded p-2 cursor-pointer">
          Login
        </button>
      </div>
    </div>
  )
}