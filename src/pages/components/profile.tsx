import { useState, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaCode } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";
import ExperienceSection from "./experience";

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

  const experienceData = [
    {
      company: "Microsoft",
      role: "Software Engineer",
      duration: "2022 - Present",
    },
    {
      company: "Google Developer Student Clubs",
      role: "Tech Lead",
      duration: "2021 - 2022",
    },
  ];

  const skills = [
    "C/C++",
    "Data Structures",
    "Algorithms",
    "React.js",
    "Node.js",
    "MongoDB",
    "Express.js",
    "TypeScript",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="container mx-auto px-4 pt-32 pb-16 relative"
      >
        {/* Mouse gradient follower */}
        <motion.div
          className="pointer-events-none fixed inset-0"
          // animate={{
          //   background: isHovered
          //     ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 255, 218, 0.15), transparent 40%)`
          //     : "none",
          // }}
        />
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

          <Card className="bg-[#112240]/50 backdrop-blur-sm border-gray-800 hover:border-[#64ffda]/50 transition-colors">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#ccd6f6]">
                Skills & Achievements
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Badge className="bg-[#233554] text-[#64ffda] hover:bg-[#64ffda]/10">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-[#64ffda]">
                <FaCode />
                <span>650+ LeetCode problems solved</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="fixed left-6 bottom-0 flex flex-col items-center gap-6 z-50"
        >
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://twitter.com/yourusername"
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
