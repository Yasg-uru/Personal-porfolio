import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {  useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

import { useAuthContext } from "@/context/authContext";
import ExperienceSection from "./experience";
import AdvancedSkills from "./skills-card";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated, user, isLoading, logout } = useAuthContext();
  // Mouse movement animation values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 400,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 400,
    damping: 25,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    setMousePosition({ x: relativeX, y: relativeY });
    x.set(relativeX / rect.width - 0.5);
    y.set(relativeY / rect.height - 0.5);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28">
      {/* Hero Section */}

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="container mx-auto px-4 pt-32 pb-16 relative"
      >
        {/* Mouse gradient follower */}
        <motion.div className="pointer-events-none fixed inset-0" />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background: `
                radial-gradient(
                  800px circle at ${mousePosition.x}px ${mousePosition.y}px,
                  rgba(29, 78, 216, 0.15),
                  transparent 40%
                )
              `,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 max-w-4xl"
        >
          <p className="text-[#64ffda]">Hello World! My name is</p>
          <h1 className="text-7xl font-bold text-gray-200">Yash Choudhary.</h1>
          <h2 className="text-6xl font-bold text-gray-400">
            I love to explore & code!
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            An aspiring software engineer with the ability to grow as an
            individual and learn in the surrounding of talented people.
            Specialized in building exceptional digital experiences.
          </p>
        </motion.div>

        {/* Experience Card */}
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="mt-16 grid gap-8 lg:grid-cols-2"
        >
          <ExperienceSection />

          <AdvancedSkills />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="fixed left-6 bottom-20 flex flex-col items-center gap-6 z-50"
        >
          <a
            href="https://github.com/Yasg-uru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-choudhary-28766a259"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://x.com/yashc442"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <FaTwitter size={20} />
          </a>
          <div className="h-24 w-[1px] bg-gray-400" />
        </motion.div>
      </section>
    </div>
  );
};

export default Hero;
