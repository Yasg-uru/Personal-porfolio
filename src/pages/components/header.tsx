import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { isAuthenticated, logout, isLoading } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <nav className="fixed top-0 w-full z-50 px-6 py-4 backdrop-blur-sm bg-[#0a192f]/80">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-[#64ffda] text-2xl font-bold">Y</div>
          <div className="flex items-center gap-8">
            {[ 'Home',"skills", "contact", "projects", "experience"].map((item, i) => (
              <Link
                key={item}
                to={item==='Home'?'/':`${item.toLowerCase()}`}
                className="text-gray-400 hover:text-[#64ffda] transition-colors"
              >
                <span className="text-[#64ffda]"></span> {item}
              </Link>
            ))}
            <button className="border border-[#64ffda] text-[#64ffda] px-4 py-2 rounded hover:bg-[#64ffda]/10 transition-colors">
              Resume
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
