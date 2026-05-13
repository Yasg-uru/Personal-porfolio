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
      <Card className="liquid-glass-card group relative overflow-hidden border border-white/10 bg-white/[0.022] transition-all duration-500 hover:border-white/18">
        <div className="liquid-glass-card__sheen pointer-events-none absolute inset-0 opacity-70" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(720px circle at 50% 0%, hsl(var(--primary) / 0.12), transparent 34%)" }} />
        <CardContent className="relative z-10 p-6">
          <h3 className="mb-4 text-2xl font-semibold text-[#e7ecff]">Skills</h3>

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
                  className="whitespace-nowrap border border-white/12 bg-white/6 text-white/80 backdrop-blur-md transition-colors hover:border-primary/30 hover:bg-white/12 hover:text-white"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>
          </div>

          {/* Achievements Section */}
          <div className="mb-4">
            <div className="text-primary">
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
                    <div className="flex items-center gap-2 text-white/75">
                    <FaCode className="text-primary" />
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
                    <div className="flex items-center gap-2 text-white/75">
                    <FaCode className="text-primary" />
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
