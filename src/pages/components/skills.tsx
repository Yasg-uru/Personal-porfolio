import React from "react";
// import { motion } from "framer-motion";
import { skills } from "../projects/skills";
import { SkillCard } from "./skillcard";

const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className=" mx-auto px-4 py-16 md:px-6 md:py-24 bg-black"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={index} {...skill} />
        ))}
      </div>
    </section>
  );
};

export default Skills;
