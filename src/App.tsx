import React from "react";
import { Route, Routes } from "react-router-dom";

// import Navbar from "./pages/Navbar";
import Projects from "./pages/projects/main";
import Details from "./pages/projects/details";
import RegisterUser from "./pages/auth/registerUser";
import LoginUser from "./pages/auth/login";
import { io } from "socket.io-client";

import SkillsPage from "./pages/projects/skills";
import Header from "./pages/components/header";
import Contact from "./pages/projects/contact";
import MainPage from "./pages/MainPage";
import AboutMeSection from "./pages/projects/createproject/about_me";


// export const socket = io("http://localhost:8001");
export const socket = io("https://yash-choudhary-portfolio-backend.onrender.com");
const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/create" element={<CreateProject />} /> */}
        <Route path="/skills" element={<SkillsPage />} />
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/about" element={<AboutMeSection/>} />
      </Routes>
    </>
  );
};

export default App;
