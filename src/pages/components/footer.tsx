import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-[#3896b9] via-[#122f28] to-black py-12">
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <p className="text-gray-300 text-sm md:text-base mb-6 md:mb-0">
          &copy; 2024 Yash Choudhary. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-8">
          <a
            href="https://github.com/Yasg-uru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400  transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-[#64ffda]"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-choudhary-28766a259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400  transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-[#64ffda]"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://x.com/yashc442"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400  transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-[#64ffda]"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
