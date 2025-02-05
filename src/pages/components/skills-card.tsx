import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { FaCode } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Badge } from "@/components/ui/badge"; // Assuming you're using a Badge component

// Skills and Achievements arrays to display
const skills = [
  "C/C++",
  "Data Structures",
  "Algorithms",
  "React.js",
  "Node.js",
  "MongoDB",
  "Express.js",
  "TypeScript",
  "Graph Theory",
  "Dynamic Programming",
  "Binary Search",
  "Stack/Queue",
];

const achievements = [
  "650+ LeetCode problems solved",
  "365+ days LeetCode streak",
  "Advanced problem solving in TypeScript & C++",
  "Expert in Data Structures & Algorithms",
  "Built scalable backend systems using Node.js",
];

export default function AdvancedSkills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // Track hover state for animation
  const [currentAchievementText, setCurrentAchievementText] = useState(""); // Store the current achievement text

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentIndex < skills.length + achievements.length) {
      timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 4000);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Update achievement text when currentIndex changes
    if (currentIndex >= skills.length && currentIndex < skills.length + achievements.length) {
      const achievementIndex = currentIndex - skills.length;
      setCurrentAchievementText(achievements[achievementIndex]);
    }
  }, [currentIndex]);

  return (
    <>
      {/* Single Card with Skills and Achievements */}
      <Card className="bg-[#112240]/50 backdrop-blur-sm border-gray-800 hover:border-[#64ffda]/50 transition-colors">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-[#ccd6f6]">
            {currentIndex < skills.length ? "Skills" : "Achievements"}
          </h3>

          {/* Horizontal scrollable skills with hover animation */}
          <div
            className="h-16 overflow-hidden relative mb-8"
            onMouseEnter={() => setIsHovered(true)} // Trigger hover effect
            onMouseLeave={() => setIsHovered(false)} // Remove hover effect
          >
            <motion.div
              className="flex gap-4 items-center"
              animate={isHovered ? { x: ["0%", "-100%"] } : { x: "0%" }} // Moves on hover
              transition={{
                ease: "linear",
                duration: 10,
                repeat: Infinity,
              }} // Stops when not hovered
            >
              {[...skills, ...skills].map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-gray-800/50 text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-colors whitespace-nowrap"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </div>

          <AnimatePresence>
            {/* Achievements Section */}
            {currentIndex >= skills.length && currentIndex < skills.length + achievements.length ? (
              <motion.div
                key={currentIndex - skills.length} // Use a key based on the achievement index
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
              >
                <div className="flex items-center gap-2 text-[#64ffda]">
                  <FaCode className="invisible" />
                  <div className="text-gray-300">
                    <Typewriter
                      key={currentAchievementText} // Key added to force re-render
                      words={[currentAchievementText]}
                      loop={false}
                      typeSpeed={40}
                      deleteSpeed={0}
                      cursor
                      cursorStyle="_"
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </CardContent>
      </Card>
    </>
  );
}
