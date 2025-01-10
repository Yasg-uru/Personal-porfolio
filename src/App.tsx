import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar from "./pages/Navbar";
import Projects from "./pages/projects/main";
import Details from "./pages/projects/details";
import RegisterUser from "./pages/auth/registerUser";
// import Projects from "./pages/projects";
const App: React.FC = () => {
  return (
   <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/details/:id" element={<Details/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
      </Routes>
  </>
  );
};

export default App;
