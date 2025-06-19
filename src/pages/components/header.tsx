import { useAuthContext } from "@/context/authContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Pen } from "lucide-react";

import YashChoudharyResume from "../../assets/YashChoudharyResume.pdf";
const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  

  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-sm bg-[#0a192f]/80">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-[#64ffda] text-2xl font-bold flex items-center">
            <Typewriter
              words={["Yash", "Choudhary"]}
              loop={false}
              typeSpeed={30}
              deleteSpeed={10}
              cursor
              cursorStyle="_" // Keep a string cursor, remove the Pen from here
            />
            <span className="ml-1">
              <Pen className="h-4 w-4 text-[#64ffda] animate-pulse" />
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {["Home","about", "skills", "contact", "projects", ].map(
              (item) => (
                <Link
                  key={item}
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-[#64ffda] transition-colors"
                >
                  {item}
                </Link>
              )
            )}
            {/* Resume Button */}
            <a
              href={YashChoudharyResume} // Use the imported PDF file directly
              download="YashChoudharyResume.pdf" // Correct filename for download
              className="border border-[#64ffda] text-[#64ffda] px-4 py-2 rounded hover:bg-[#64ffda]/10 transition-colors"
            >
              Resume
            </a>

            {/* Auth Buttons (Login/Logout) */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="border border-[#b71c16]  text-[#b71c16] px-4 py-2 rounded hover:bg-[#b71c16]/10 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="border border-[#64ffda] text-[#64ffda] px-4 py-2 rounded hover:bg-[#64ffda]/10 transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
