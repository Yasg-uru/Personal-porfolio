import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiApachekafka,
  SiMongoose,
  SiGithubactions,
  SiReactquery,
  SiRedux,
  SiDaisyui,
  SiJavascript,
  SiExpo,
  SiVercel,
  SiRender,
  SiCplusplus,
  SiPython,
  SiLeetcode,
  SiGeeksforgeeks,
  SiReacthookform,
  SiGraphql,
} from "react-icons/si";

import {
  Code2, Server, Wrench, Blocks, Type, Paintbrush, Box, Database, Terminal, ChevronLeft, ChevronRight, Star, Briefcase, Layers, Zap, Shield, Smartphone, Brain, Cpu
} from "lucide-react";

import { Card } from "@/components/ui/card";

const categorizedSkills = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Technologies for building interactive user interfaces.",
    icon: Code2,
    color: "#ff0066",
    subCategories: [
      {
        id: "frameworks",
        title: "Frameworks",
        description: "Popular frontend frameworks.",
        icon: Blocks,
        technologies: [
          { id: "react", title: "React", description: "JavaScript library for building user interfaces", icon: SiReact, color: "#61DAFB", details: [ {title: "Experience", desc: "3 Years", icon: Briefcase}, {title: "Projects", desc: "25+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "nextjs", title: "Next.js", description: "React framework for production-grade applications", icon: SiNextdotjs, color: "#FFFFFF", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "15+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] }
        ]
      },
      {
        id: "languages",
        title: "Programming Languages",
        description: "Languages I use for frontend, backend, and problem solving.",
        icon: Type,
        technologies: [
          { id: "javascript", title: "JavaScript", description: "Versatile programming language for web", icon: SiJavascript, color: "#F7DF1E", details: [ {title: "Experience", desc: "3 Years", icon: Briefcase}, {title: "Projects", desc: "30+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "typescript", title: "TypeScript", description: "Typed superset of JavaScript", icon: SiTypescript, color: "#3178C6", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "20+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "cplusplus", title: "C++", description: "High-performance programming language for DSA and systems", icon: SiCplusplus, color: "#00599C", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "10+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "java", title: "Java", description: "Object-oriented programming language", icon: Terminal, color: "#ED8B00", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "70%", icon: Star} ] },
          { id: "python", title: "Python", description: "Readable language used for scripting and problem solving", icon: SiPython, color: "#3776AB", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "70%", icon: Star} ] }
        ]
      },
      {
        id: "styling",
        title: "Styling & UI",
        description: "Tools for beautiful designs.",
        icon: Paintbrush,
        technologies: [
          { id: "tailwind", title: "Tailwind CSS", description: "Utility-first CSS framework", icon: SiTailwindcss, color: "#06B6D4", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "30+", icon: Box}, {title: "Proficiency", desc: "95%", icon: Star} ] },
          { id: "shadcn", title: "ShadCN UI", description: "Component library for modern UI", icon: Box, color: "#FFFFFF", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "70%", icon: Star} ] },
          { id: "daisyui", title: "Daisy UI", description: "Beautiful Tailwind CSS component library", icon: SiDaisyui, color: "#1FB494", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "5+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "state-management",
        title: "State Management & Data Fetching",
        description: "Tools for managing app state and fetching data.",
        icon: Layers,
        technologies: [
          { id: "tanstackquery", title: "TanStack Query", description: "Powerful asynchronous state management library", icon: SiReactquery, color: "#EF4444", details: [ {title: "Experience", desc: "1.5 Years", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "redux", title: "Redux", description: "Predictable state management library", icon: SiRedux, color: "#764ABC", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
          { id: "zustand", title: "Zustand", description: "Small, fast, and scalable state management", icon: Box, color: "#3C3C07", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "forms",
        title: "Forms & Input Handling",
        description: "Form libraries and input handling for React, Next.js, and React Native apps.",
        icon: SiReacthookform,
        technologies: [
          { id: "react-hook-form", title: "React Hook Form", description: "Performant and flexible form management for React and React Native", icon: SiReacthookform, color: "#EC4899", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "10+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] }
        ]
      },
      {
        id: "mobile",
        title: "Mobile Development",
        description: "Tools for building cross-platform mobile apps.",
        icon: Smartphone,
        subCategories: [
          {
            id: "mobile-tooling",
            title: "Frameworks & Tooling",
            description: "Core frameworks and setup for mobile app development.",
            icon: Terminal,
            technologies: [
              { id: "reactnative", title: "React Native", description: "JavaScript framework for mobile apps with native feel", icon: SiReact, color: "#61DAFB", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
              { id: "expo", title: "Expo", description: "Framework and platform for universal React apps", icon: SiExpo, color: "#000000", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
              { id: "nativecli", title: "React Native CLI", description: "Native CLI for building and managing React Native projects", icon: Terminal, color: "#CCCCCC", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
            ]
          },
          {
            id: "mobile-ui",
            title: "UI Libraries",
            description: "Component libraries and styling systems for React Native.",
            icon: Paintbrush,
            technologies: [
              { id: "nativewind", title: "NativeWind", description: "Tailwind CSS for React Native apps", icon: SiTailwindcss, color: "#38BDF8", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
              { id: "react-native-paper", title: "React Native Paper", description: "Material design UI library for React Native", icon: Box, color: "#6200EE", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "shared",
    title: "Shared & Validation",
    description: "Tools commonly used across frontend and backend.",
    icon: Shield,
    color: "#3B82F6",
    subCategories: [
      {
        id: "validation",
        title: "Schema Validation",
        description: "Type-safe schema validation for both client and server.",
        icon: Shield,
        technologies: [
          { id: "zod", title: "Zod", description: "TypeScript-first schema validation with static type inference", icon: Shield, color: "#3B82F6", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "8+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "joi", title: "Joi", description: "Schema validation library for object validation and rules", icon: Shield, color: "#F59E0B", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      }
    ]
  },
  {
    id: "dsa",
    title: "DSA & Problem Solving",
    description: "Coding practice, interviews, and algorithmic problem solving.",
    icon: Brain,
    color: "#14B8A6",
    subCategories: [
      {
        id: "practice-platforms",
        title: "Practice Platforms",
        description: "Platforms I use to practice DSA regularly.",
        icon: Terminal,
        technologies: [
          { id: "leetcode", title: "LeetCode", description: "Platform for coding interview and problem solving practice", icon: SiLeetcode, color: "#FFA116", details: [ {title: "Experience", desc: "2+ Years", icon: Briefcase}, {title: "Problems", desc: "650+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "geeksforgeeks", title: "GeeksforGeeks", description: "Practice platform for algorithms and data structures", icon: SiGeeksforgeeks, color: "#2F8D46", details: [ {title: "Experience", desc: "2+ Years", icon: Briefcase}, {title: "Problems", desc: "300+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] }
        ]
      },
      {
        id: "dsa-languages",
        title: "DSA Languages",
        description: "Languages I use for problem solving and interview prep.",
        icon: Type,
        technologies: [
          { id: "dsa-cpp", title: "C++", description: "Primary language for competitive programming and DSA", icon: SiCplusplus, color: "#00599C", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Problems", desc: "400+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "dsa-typescript", title: "TypeScript", description: "Used for DSA practice and application logic", icon: SiTypescript, color: "#3178C6", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Problems", desc: "200+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      }
    ]
  },
  {
    id: "backend",
    title: "Backend",
    description: "Technologies for building robust server-side applications.",
    icon: Server,
    color: "#3b82f6",
    subCategories: [
      {
        id: "core",
        title: "Core & Frameworks",
        description: "Server runtime and frameworks.",
        icon: Terminal,
        technologies: [
          { id: "nodejs", title: "Node.js", description: "JavaScript runtime", icon: SiNodedotjs, color: "#339933", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "18+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "express", title: "Express.js", description: "Web application framework", icon: SiExpress, color: "#808080", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "nestjs", title: "NestJS", description: "Progressive Node.js framework for scalable applications", icon: SiNestjs, color: "#E0234E", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "8+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "databases",
        title: "Databases",
        description: "Data storage solutions.",
        icon: Database,
        technologies: [
          { id: "mongodb", title: "MongoDB", description: "NoSQL database", icon: SiMongodb, color: "#47A248", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "15+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "mongoose", title: "Mongoose", description: "MongoDB object modeling tool", icon: SiMongoose, color: "#880000", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "postgresql", title: "PostgreSQL", description: "Advanced relational database", icon: SiPostgresql, color: "#336791", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "redis", title: "Redis", description: "In-memory data structure store", icon: SiRedis, color: "#DC382D", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "orms",
        title: "ORMs & ODMs",
        description: "Database abstraction and object modeling layers.",
        icon: Database,
        technologies: [
          { id: "mongoose", title: "Mongoose", description: "MongoDB object modeling tool", icon: SiMongoose, color: "#880000", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "prisma", title: "Prisma", description: "Modern ORM for Node.js and TypeScript", icon: SiPrisma, color: "#2D3748", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "5+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "typeorm", title: "TypeORM", description: "ORM that runs in TypeScript and JavaScript", icon: Box, color: "#E13C3C", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
        ]
      },
      {
        id: "architecture",
        title: "Architecture & Messaging",
        description: "System design and message queue tools.",
        icon: Layers,
        technologies: [
          { id: "rabbitmq", title: "RabbitMQ", description: "Message broker for reliable communication", icon: SiRabbitmq, color: "#FF6600", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "5+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
          { id: "kafka", title: "Kafka", description: "Distributed event streaming platform", icon: SiApachekafka, color: "#231F20", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
          { id: "bullmq", title: "Bull MQ", description: "Fast and reliable job queue for Node.js", icon: Zap, color: "#F59E0B", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "socketio", title: "Socket.IO", description: "Real-time communication protocol", icon: SiSocketdotio, color: "#010101", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "api",
        title: "API & Communication",
        description: "API styles and communication protocols.",
        icon: Layers,
        technologies: [
          { id: "graphql", title: "GraphQL", description: "Query language and runtime for APIs", icon: SiGraphql, color: "#E10098", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
          { id: "grpc", title: "gRPC", description: "High-performance RPC framework for microservices", icon: Terminal, color: "#6C63FF", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
        ]
      }
    ]
  },
  {
    id: "devops",
    title: "DevOps & Tools",
    description: "Tools for deployment and version control.",
    icon: Wrench,
    color: "#f59e0b",
    subCategories: [
      {
        id: "tools",
        title: "Development Tools",
        description: "Essential workflow tools.",
        icon: Zap,
        technologies: [
          { id: "git", title: "Git", description: "Version control system", icon: SiGit, color: "#F05032", details: [ {title: "Experience", desc: "3 Years", icon: Briefcase}, {title: "Projects", desc: "40+", icon: Box}, {title: "Proficiency", desc: "88%", icon: Star} ] },
          { id: "github-actions", title: "GitHub Actions", description: "CI/CD automation and workflow automation", icon: SiGithubactions, color: "#2088FF", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "6+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "docker", title: "Docker", description: "Containerization platform", icon: SiDocker, color: "#2496ED", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      },
      {
        id: "deployment",
        title: "Deployment Platforms",
        description: "Platforms I use to deploy frontend and backend apps.",
        icon: Terminal,
        technologies: [
          { id: "vercel", title: "Vercel", description: "Frontend deployment platform with edge and serverless support", icon: SiVercel, color: "#000000", details: [ {title: "Experience", desc: "2 Years", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "render", title: "Render", description: "Cloud platform for deploying services and web applications", icon: SiRender, color: "#46E3B7", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "5+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] }
        ]
      }
    ]
  },
  {
    id: "ai",
    title: "AI & Agentic Tools",
    description: "AI-powered development tools and frameworks.",
    icon: Brain,
    color: "#8B5CF6",
    subCategories: [
      {
        id: "agentic-ais",
        title: "Agentic AI Platforms",
        description: "AI-powered coding assistants and agents.",
        icon: Brain,
        technologies: [
          { id: "claude-code", title: "Claude Code (Codebase)", description: "Advanced AI coding assistant with deep context understanding", icon: Brain, color: "#9333EA", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "15+", icon: Box}, {title: "Proficiency", desc: "90%", icon: Star} ] },
          { id: "cursor", title: "Cursor IDE", description: "AI-native IDE with code understanding and generation", icon: Code2, color: "#06B6D4", details: [ {title: "Experience", desc: "1 Year", icon: Briefcase}, {title: "Projects", desc: "10+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "github-copilot", title: "GitHub Copilot", description: "AI pair programming assistant powered by models", icon: Brain, color: "#2088FF", details: [ {title: "Experience", desc: "1+ Year", icon: Briefcase}, {title: "Projects", desc: "12+", icon: Box}, {title: "Proficiency", desc: "85%", icon: Star} ] },
          { id: "antigravity", title: "Antigravity", description: "AI-powered code generation and automation platform", icon: Zap, color: "#FBBF24", details: [ {title: "Experience", desc: "6 Months", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
        ]
      },
      {
        id: "mcps",
        title: "Model Context Protocol (MCPs)",
        description: "Protocols for connecting AI models to tools and data.",
        icon: Cpu,
        technologies: [
          { id: "mcp", title: "MCP Framework", description: "Open protocol for connecting AI models to external tools and services", icon: Cpu, color: "#10B981", details: [ {title: "Experience", desc: "6 Months", icon: Briefcase}, {title: "Projects", desc: "5+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "figma-mcp", title: "Figma MCP", description: "MCP integration for Figma design workflows", icon: Box, color: "#F24E1E", details: [ {title: "Experience", desc: "6 Months", icon: Briefcase}, {title: "Projects", desc: "4+", icon: Box}, {title: "Proficiency", desc: "80%", icon: Star} ] },
          { id: "shadcn-ui-mcp", title: "Shadcn UI MCP", description: "MCP for component-driven UI workflows", icon: Box, color: "#FFFFFF", details: [ {title: "Experience", desc: "6 Months", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] },
          { id: "swiper-mcp", title: "Swiper MCP", description: "MCP for slider and carousel workflows", icon: Box, color: "#6332F6", details: [ {title: "Experience", desc: "6 Months", icon: Briefcase}, {title: "Projects", desc: "3+", icon: Box}, {title: "Proficiency", desc: "75%", icon: Star} ] }
        ]
      }
    ]
  }
];

function InteractiveSkillsCard() {
  const [path, setPath] = useState<string[]>([]);
  const [direction, setDirection] = useState(1);

  const navigateTo = (newPath: string[]) => {
    setDirection(newPath.length > path.length ? 1 : -1);
    setPath(newPath);
  };

  const goBack = () => {
    if (path.length > 0) {
      navigateTo(path.slice(0, -1));
    }
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [];
    let currentLevel: any = categorizedSkills;
    for (let i = 0; i < path.length; i++) {
      const item = currentLevel.find((c: any) => c.id === path[i]);
      if (item) {
        breadcrumbs.push(item);
        currentLevel = item.subCategories || item.technologies || item.details || [];
      }
    }
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const currentLevelData = path.length === 0
    ? categorizedSkills
    : breadcrumbs[breadcrumbs.length - 1]?.subCategories || breadcrumbs[breadcrumbs.length - 1]?.technologies || breadcrumbs[breadcrumbs.length - 1]?.details || [];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  return (
    <Card className="group relative overflow-hidden border border-white/10 bg-white/[0.022] backdrop-blur-md transition-all duration-500 w-full max-w-5xl mx-auto min-h-[450px] flex flex-col hover:border-white/20 shadow-2xl shadow-primary/5">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(800px circle at 50% 0%, hsl(var(--primary) / 0.08), transparent 40%)" }} />
      
      {/* Header: Breadcrumbs & Back Button */}
      <div className="p-4 sm:p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.01] relative z-10">
        <AnimatePresence mode="popLayout">
          {path.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={goBack}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center group/btn border border-white/5"
            >
              <ChevronLeft size={18} className="group-hover/btn:-translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-2 text-sm sm:text-base overflow-x-auto hide-scrollbar py-1">
          <span
            onClick={() => navigateTo([])}
            className={`cursor-pointer transition-colors whitespace-nowrap px-2 py-1 rounded-md ${path.length === 0 ? 'text-primary font-bold bg-primary/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
          >
            All Skills
          </span>
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.id}>
              <ChevronRight size={14} className="text-gray-600 flex-shrink-0" />
              <span
                onClick={() => navigateTo(path.slice(0, index + 1))}
                className={`cursor-pointer transition-colors flex items-center gap-2 whitespace-nowrap px-2 py-1 rounded-md ${index === path.length - 1 ? 'text-white font-bold bg-white/5 border border-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                {crumb.icon && React.createElement(crumb.icon, { size: 14, color: crumb.color })}
                {crumb.title}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 flex-1 relative overflow-hidden flex flex-col z-10">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={path.join('-')}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            className="w-full flex-1 flex flex-col"
          >
            {path.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentLevelData.map((category: any) => (
                  <div
                    key={category.id}
                    onClick={() => navigateTo([category.id])}
                    className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary/40 transition-all cursor-pointer group/card flex flex-col gap-4 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <div className="p-4 rounded-xl bg-white/5 w-fit group-hover/card:scale-110 group-hover/card:bg-primary/10 transition-all">
                      {React.createElement(category.icon, { size: 28, color: category.color })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover/card:text-primary transition-colors flex items-center justify-between">
                        {category.title}
                        <ChevronRight size={18} className="text-gray-500 group-hover/card:text-primary group-hover/card:translate-x-1 transition-all" />
                      </h3>
                      <p className="text-sm text-gray-400 mt-2">{category.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {path.length === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentLevelData.map((sub: any) => (
                  <div
                    key={sub.id}
                    onClick={() => navigateTo([...path, sub.id])}
                    className="p-5 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-primary/40 transition-all cursor-pointer flex items-center gap-5 group/card"
                  >
                    <div className="p-3 rounded-xl bg-white/5 group-hover/card:scale-110 group-hover/card:bg-primary/10 transition-all">
                      {React.createElement(sub.icon, { size: 24, color: breadcrumbs[0].color })}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold group-hover/card:text-primary transition-colors">{sub.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{sub.technologies?.length || 0} Technologies</p>
                    </div>
                    <ChevronRight size={18} className="text-gray-600 group-hover/card:text-primary group-hover/card:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            )}

            {path.length === 2 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentLevelData.map((tech: any) => (
                  <div
                    key={tech.id}
                    onClick={() => navigateTo([...path, tech.id])}
                    className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-primary/50 transition-all cursor-pointer flex flex-col items-center text-center gap-4 group/card relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity" />
                    <div className="group-hover/card:scale-110 transition-transform relative z-10 drop-shadow-md">
                      {React.createElement(tech.icon, { size: 48, color: tech.color || breadcrumbs[0].color })}
                    </div>
                    <div className="relative z-10 w-full">
                      <h4 className="text-white font-bold">{tech.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover/card:opacity-100 transition-opacity">View Details</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {path.length === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentLevelData.map((detail: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] hover:border-primary/30 transition-all flex items-center gap-4 group/card">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover/card:scale-110 transition-transform">
                      {detail.icon && React.createElement(detail.icon, { size: 22 })}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{detail.title}</p>
                      <p className="text-white font-bold text-lg mt-0.5">{detail.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </Card>
  );
}

export default function Skills() {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen py-24 relative overflow-hidden flex items-center justify-center">
      {/* Background blurs */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container px-4 relative z-10 w-full">
        <div className="text-center space-y-6 mb-16">
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
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <InteractiveSkillsCard />
        </motion.div>
      </div>
    </section>
  );
}
