import React from "react";
import { motion } from "framer-motion";
import YashChoudhary from "@/assets/my_images/yash_choudhary.jpg";

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto grid gap-8 px-4 py-16 md:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl">
          Yash Choudhary
        </h1>
        <h2 className="text-3xl font-semibold text-gray-400 sm:text-4xl">
          Full Stack MERN Developer
        </h2>
        <p className="text-lg text-gray-400 md:text-xl">
          I'm a passionate full stack developer specializing in building modern,
          scalable, and responsive web applications using the MERN stack. I
          focus on creating seamless user experiences and robust backend
          systems, ensuring performance, security, and scalability at every
          step.
        </p>
        <div className="flex space-x-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="rounded-full bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
          >
            Contact Me
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="rounded-full border border-white px-6 py-3 text-white hover:bg-white hover:text-black"
          >
            View Projects
          </motion.a>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30"></div>
        <img
          src={YashChoudhary}
          alt="Yash Choudhary"
          className="relative z-10 mx-auto rounded-full object-cover shadow-2xl"
          style={{ width: "400px", height: "400px", objectFit: "cover" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
