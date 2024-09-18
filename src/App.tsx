import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Navbar from "./pages/Navbar";
// import Projects from "./pages/projects";
const App: React.FC = () => {
  return (
   <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/projects" element={<Projects />} /> */}
      </Routes>
  </>
  );
};

export default App;
