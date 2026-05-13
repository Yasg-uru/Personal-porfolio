import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-background py-12 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Copyright Text */}
        <p className="text-muted-foreground text-sm md:text-base mb-6 md:mb-0">
          &copy; 2024 Yash Choudhary. All rights reserved.
        </p>

        {/* Social Media Icons */}
        <div className="flex space-x-8">
          <a
            href="https://github.com/Yasg-uru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-primary"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-choudhary-28766a259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://x.com/yashc442"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transform transition-all duration-300 ease-in-out hover:scale-125 hover:text-primary"
          >
            <Twitter size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
