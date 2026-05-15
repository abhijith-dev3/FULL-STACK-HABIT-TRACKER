import {Link,useNavigate} from "react-router-dom";
import { logout,isLoggedIn } from "../utils/auth";

export default function Navbar(){
  const navigate = useNavigate();
  const user = isLoggedIn();

  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return(
    <nav className="flex justify-between px-6 py-4 bg-gray-900 text-white items-center shadow-md">
      <h1 className="text-xl text-green-500 font-bold">Habit Tracker</h1>

      <div className="flex gap-5 items-center">
        <Link to="/dashboard"
        className="hover:text-green-400 transition"
        >Dashboard</Link>

        {!user && (
          <>
          <Link to="/register"
          className="hover:text-green-400 transition">Register</Link>

          <Link to="/login"
          className="hover:text-green-400 transition">Login</Link>
          </>
        )}

        {user && (
          <Link to="/register"
        className="hover:text-green-400">Register</Link>
        )}

        {user && (
          <button onClick={handleLogout}
          className="bg-red-500 px-4 py-1 rounded hove:bg-red-600 transition cursor-pointer">
            LogOut
          </button>
        )}
      </div>
    </nav>
  )
}