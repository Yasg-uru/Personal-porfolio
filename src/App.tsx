import React from "react";
import { Route, Routes } from "react-router-dom";

// import Navbar from "./pages/Navbar";
import Projects from "./pages/projects/main";
import Details from "./pages/projects/details";
import RegisterUser from "./pages/auth/registerUser";
import LoginUser from "./pages/auth/login";
import { io } from "socket.io-client";
import HomePage from "./pages/HomePage";
// import Projects from "./pages/projects";
export const socket = io("http://localhost:8000");
const App: React.FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </>
  );
};

export default App;
