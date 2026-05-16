
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../src/utils/auth";

export default function Protected({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}