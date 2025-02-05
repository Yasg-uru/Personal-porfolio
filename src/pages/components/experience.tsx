import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Pen } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";

const experienceData = [
  {
    company: "RABLO.IN",
    role: "Backend Developer Team Lead Intern",
    duration: "Oct 2024 – Dec 2024 | Lucknow, India",
    description: [
      "Led a backend development team to design, implement, and optimize RESTful APIs using Node.js and Express for scalable applications.",
      "Coordinated the integration of a microservices architecture, resulting in improved system scalability and performance.",
      "Worked with the frontend team to integrate APIs with ReactJS, ensuring seamless data flow between the backend and user interface.",
      "Implemented database models and queries using MongoDB to ensure data consistency and optimize performance for high-traffic applications.",
      "Acted as a mentor for junior developers, providing code reviews, technical guidance, and best practices.",
    ],
  },
  {
    company: "CrushSphere (Startup)",
    role: "Founder & Full Stack Developer",
    duration: "Jan 2024 – Present | Remote",
    description: [
      "Built CrushSphere, a social platform enabling real-time messaging, location-based features, and dynamic engagement scores.",
      "Developed a microservices backend (Node.js, Express, TypeScript, Redis, RabbitMQ) with real-time communication via Socket.IO.",
      "Created a React + TypeScript frontend with ShadCN UI, Redux, and Hook Form for a seamless UI/UX.",
      "Integrated Razorpay for premium subscriptions and webhook-based payment handling.",
      "Added Mapbox-powered location-based venue suggestions and real-time check-ins.",
      "Implemented privacy controls, file sharing, and voice/video calls for user interactions.",
      "Designed a referral system and engagement scoring model to boost user activity.",
    ],
  },
];

const ExperienceSection = () => {
  const [currentExpIndex, setCurrentExpIndex] = useState(0);
  const [currentDescIndex, setCurrentDescIndex] = useState(0);
  const [typing, setTyping] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll animation when content overflows
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [currentExpIndex, currentDescIndex]);

  useEffect(() => {
    // Loop through each experience description step by step
    if (currentExpIndex < experienceData.length) {
      const descLength = experienceData[currentExpIndex].description.length;
      const timeout = setTimeout(() => {
        if (currentDescIndex < descLength - 1) {
          setCurrentDescIndex((prev) => prev + 1);
        } else {
          setCurrentExpIndex((prev) => prev + 1);
          setCurrentDescIndex(0);
        }
      }, 4000); // Adjust time between descriptions

      return () => clearTimeout(timeout);
    }
  }, [currentExpIndex, currentDescIndex]);

  return (
    <Card className="bg-[#112240]/50 backdrop-blur-sm border-gray-800 hover:border-[#64ffda]/50 transition-colors">
      <CardContent className="p-6">
        <h3 className="text-2xl font-semibold mb-4 text-[#ccd6f6]">
          Experience
        </h3>
        <div ref={listRef} className="h-64 overflow-hidden relative">
          <AnimatePresence>
            {experienceData.map((exp, index) =>
              index <= currentExpIndex ? (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="mb-6"
                >
                  <h4 className="text-xl font-medium text-[#64ffda] flex items-center gap-2">
                    {exp.company}
                    {index === currentExpIndex && typing && (
                      <Pen className="w-4 h-4 text-blue-400 animate-bounce" />
                    )}
                  </h4>
                  <p className="text-gray-400">{exp.role}</p>
                  <p className="text-sm text-gray-500">{exp.duration}</p>
                  <div className="mt-2 text-gray-300">
                    {index === currentExpIndex && (
                      <Typewriter
                        words={[exp.description[currentDescIndex]]}
                        loop={false}
                        typeSpeed={30}
                        deleteSpeed={0}
                        cursor
                        cursorStyle="_"
                        onType={() => setTyping(true)}
                        onDelete={() => setTyping(false)}
                      />
                    )}
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;
