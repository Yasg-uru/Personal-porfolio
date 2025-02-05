import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Pen } from "lucide-react"; // Importing pen icon

const PortfolioLoader = () => {
  const words = ["Yash", "Choudhary"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let textInterval: NodeJS.Timeout;

    // Typing Effect Simulation
    textInterval = setInterval(() => {
      setCurrentText((prev) => {
        const currentWord = words[wordIndex];
        if (prev.length < currentWord.length) {
          return currentWord.slice(0, prev.length + 1);
        } else {
          clearInterval(textInterval);
          setTimeout(() => {
            setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setCurrentText(""); // Reset for next word
          }, 1000);
          return prev;
        }
      });
    }, 100);

    return () => clearInterval(textInterval);
  }, [wordIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a192f] text-white"
    >
      {/* Background Glow Animation */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[#112240] opacity-40 blur-sm"
      />

      {/* Animated Name with Typewriter Effect */}
      <div className="text-[#64ffda] text-4xl sm:text-5xl md:text-6xl font-bold flex items-center">
        <h1>{currentText}</h1>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.7, repeat: Infinity }}
          className="ml-2 text-white"
        >
          _
        </motion.span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          className="ml-2"
        >
          <Pen className="h-5 w-5 text-[#64ffda]" />
        </motion.span>
      </div>

      {/* Progress Bar with Animated Filling */}
      <div className="w-3/4 sm:w-1/2 h-2 bg-gray-700 mt-6 rounded-full overflow-hidden">
        <motion.div
          animate={{
            width: ["0%", "100%"],
            backgroundColor: ["#64ffda", "#00ffb3", "#64ffda"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-full rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default PortfolioLoader;
