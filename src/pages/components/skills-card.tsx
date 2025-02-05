import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  const [currentAchievementIndex, setCurrentAchievementIndex] = useState(0);
  const [visibleAchievements, setVisibleAchievements] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // When we reach the end of the achievements, restart from the first one
      const nextIndex = (currentAchievementIndex + 1) % achievements.length;

      // Add new achievement to the visible achievements
      setVisibleAchievements((prev) => {
        // Adding the new achievement to the queue and removing the oldest one
        const updatedAchievements = [...prev, achievements[nextIndex]];

        // Keep only the last 3 achievements in the queue (Circular Queue behavior)
        return updatedAchievements.slice(-3);
      });

      // Update the index for the next achievement to be added
      setCurrentAchievementIndex(nextIndex);
    }, 4000); // Update every 4 seconds

    return () => clearInterval(interval);
  }, [currentAchievementIndex]);

  return (
    <>
      {/* Single Card with Skills and Achievements */}
      <Card className="bg-[#112240]/50 backdrop-blur-sm border-gray-800 hover:border-[#64ffda]/50 transition-colors">
        <CardContent className="p-6">
          <h3 className="text-2xl font-semibold mb-4 text-[#ccd6f6]">Skills</h3>

          {/* Horizontal scrollable skills with hover animation */}
          <div className="h-16 overflow-hidden relative mb-8">
            <motion.div
              className="flex gap-4 items-center"
              animate={{ x: ["0%", "-100%"] }} // Moves continuously
              transition={{
                ease: "linear",
                duration: 10,
                repeat: Infinity,
              }}
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

          {/* Achievements Section */}
          <div className="mb-4">
            <div className="text-[#64ffda]">
              {/* Display the last 2 achievements normally */}
              {visibleAchievements.slice(0, 2).map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-2"
                >
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCode className="text-[#64ffda]" />
                    <span>{achievement}</span>
                  </div>
                </motion.div>
              ))}

              {/* Display the third achievement with a typewriter effect */}
              {visibleAchievements.length > 2 && (
                <motion.div
                  key={visibleAchievements[2]}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 text-gray-300">
                    <FaCode className="text-[#64ffda]" />
                    <Typewriter
                      words={[visibleAchievements[2]]}
                      loop={false}
                      typeSpeed={40}
                      deleteSpeed={0}
                      cursor
                      cursorStyle="_"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
