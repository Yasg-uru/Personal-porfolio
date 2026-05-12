import { motion } from "framer-motion";

import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
  SiRabbitmq,
  SiRedis,
  SiDocker,
  SiSocketdotio,
} from "react-icons/si";
import { Typewriter } from "./typwriter";
import SkillCard from "./skill-card";

// Updated skills array
const skills = [
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500" />,
    description: "NoSQL database for storing and retrieving data",
    experience: 2,
    projectCount: 15,
    proficiency: 85,
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-500" />,
    description: "Web application framework for Node.js",
    experience: 2,
    projectCount: 12,
    proficiency: 80,
  },
  {
    name: "React",
    icon: <SiReact className="text-blue-400" />,
    description: "JavaScript library for building user interfaces",
    experience: 3,
    projectCount: 25,
    proficiency: 90,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-600" />,
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    experience: 2,
    projectCount: 18,
    proficiency: 85,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-600" />,
    description:
      "Typed superset of JavaScript that compiles to plain JavaScript",
    experience: 2,
    projectCount: 20,
    proficiency: 85,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-white" />,
    description: "React framework for production-grade applications",
    experience: 2,
    projectCount: 15,
    proficiency: 90,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500" />,
    description: "Utility-first CSS framework for rapid UI development",
    experience: 2,
    projectCount: 30,
    proficiency: 95,
  },
  {
    name: "Git",
    icon: <SiGit className="text-orange-500" />,
    description: "Distributed version control system",
    experience: 3,
    projectCount: 40,
    proficiency: 88,
  },
  {
    name: "RabbitMQ",
    icon: <SiRabbitmq className="text-indigo-500" />,
    description:
      "Message broker for asynchronous communication between microservices",
    experience: 1,
    projectCount: 5,
    proficiency: 75,
  },
  {
    name: "Redis",
    icon: <SiRedis className="text-red-500" />,
    description:
      "In-memory data structure store, used as a database, cache, and message broker",
    experience: 1,
    projectCount: 4,
    proficiency: 80,
  },
  {
    name: "ShadCN UI",
    icon: <div className="text-white">S</div>, // Assuming a custom icon
    description: "Component library for modern UI development",
    experience: 1,
    projectCount: 3,
    proficiency: 70,
  },
  {
    name: "Docker",
    icon: <SiDocker className="text-blue-500" />,
    description:
      "Platform for developing, shipping, and running applications in containers",
    experience: 1,
    projectCount: 4,
    proficiency: 80,
  },
  {
    name: "Socket.IO",
    icon: <SiSocketdotio className="text-blue-600" />,
    description:
      "Real-time bidirectional event-based communication library for Node.js",
    experience: 1,
    projectCount: 3,
    proficiency: 80,
  },
];

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen  py-24 relative overflow-hidden flex items-center justify-center">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container px-4 relative z-10">
        <div className="text-center space-y-6 mb-20">
          {/* Subheading */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-primary font-bold">
              Technical Stack
            </h2>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
              Tools & <span className="text-primary">Technologies</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="mx-auto max-w-2xl text-gray-400 text-lg leading-relaxed font-light">
              I work with modern web technologies to build fast, accessible, and
              maintainable digital experiences.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} {...skill} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
