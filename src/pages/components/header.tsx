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
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-white">
          Yash Choudhary
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-gray-300 hover:text-white">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/skills" className="text-gray-300 hover:text-white">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </li>
          {isAuthenticated && ( // Show the logout button only if the user is authenticated
            <li>
              <Button
                onClick={handleLogout}
                variant={"outline"}
                className="text-black font-semibold hover:text-gray-700 focus:outline-none"
              >
                {isLoading ? "...Loading" : "Logout"}
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
