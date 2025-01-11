import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiGit,
} from "react-icons/si";
import { SkillCard } from "../components/skillcard";

export const skills = [
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-500" />,
    description: "NoSQL database for storing and retrieving data",
  },
  {
    name: "Express.js",
    icon: <SiExpress className="text-gray-500" />,
    description: "Web application framework for Node.js",
  },
  {
    name: "React",
    icon: <SiReact className="text-blue-400" />,
    description: "JavaScript library for building user interfaces",
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-600" />,
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-600" />,
    description:
      "Typed superset of JavaScript that compiles to plain JavaScript",
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    description: "React framework for production-grade applications",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-teal-500" />,
    description: "Utility-first CSS framework for rapid UI development",
  },
  {
    name: "Git",
    icon: <SiGit className="text-orange-500" />,
    description: "Distributed version control system",
  },
];

export default function SkillsPage() {
  return (
    <div className="min-h-screen justify-center items-center p-12 bg-black">
      <h1 className="text-3xl font-bold text-center mb-12 text-white">
        My Skills
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {skills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </div>
  );
}
