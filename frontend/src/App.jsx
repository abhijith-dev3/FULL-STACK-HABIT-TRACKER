import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

import { isLoggedIn } from "./utils/auth";

export default function App(){
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={ isLoggedIn() ? <Dashboard/> :<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}