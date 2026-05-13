import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Eye,
  Github,
  ExternalLink,
  ThumbsUp,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/context/authContext";
import { socket } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/state/slices/projectSlice/type";

interface ProjectProps {
  project: Project;
  index: number;
  onLike: (id: string) => void;
  onClick: (id: string) => void;
  mousePosition: {
    x: number;
    y: number;
    active: boolean;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({
  project,
  index,
  onLike,
  onClick,
  mousePosition,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currProject, setCurrProject] = useState<Project>(project);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const { user, isAuthenticated } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    socket.on("project-like-update", ({ projectId, likes, action }) => {
      if (currProject._id === projectId) {
        setCurrProject((prev) => ({ ...prev, likes }));

        toast({
          title: action === "liked" ? "Project Liked!" : "Project Unliked!",
          description:
            action === "liked"
              ? "You have liked this project. Thanks for your support! 🎉"
              : "You have unliked this project. Maybe next time! 🤔",
          variant: action === "liked" ? "default" : "destructive", // Change style based on action
          duration: 3000, // 3 seconds
          className: "bg-black text-white",
        });
      }
    });

    return () => {
      socket.off("project-like-update");
    };
  }, []);

  useEffect(() => {
    if (user && isAuthenticated) {
      const hasLiked = currProject.likes.some(
        (like) => like.userId === user._id
      );
      setIsLiked(hasLiked);
    }
  }, [currProject]);
  // Enhanced motion values for smoother animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 400,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 400,
    damping: 25,
  });
  const scale = useSpring(mousePosition.active ? 1.02 : 1, {
    stiffness: 400,
    damping: 25,
  });

  useEffect(() => {
    if (!currProject.gallery || currProject.gallery.length <= 1) return;

    let timeout: NodeJS.Timeout;
    // if (isHovered) {
    timeout = setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % currProject.gallery.length
      );
    }, 500);
    // }

    return () => clearTimeout(timeout);
  }, [isHovered, currProject.gallery]);

  useEffect(() => {
    if (!cardRef.current || !mousePosition.active) {
      x.set(0);
      y.set(0);
      setSpotlightPos({ x: 0, y: 0 });
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = mousePosition.x - rect.left;
    const relativeY = mousePosition.y - rect.top;

    x.set(relativeX / rect.width - 0.5);
    y.set(relativeY / rect.height - 0.5);
    setSpotlightPos({ x: relativeX, y: relativeY });
  }, [mousePosition, x, y]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 2000 }}
      className="relative"
    >
      <AnimatePresence>
        {isHovered && mousePosition.active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute pointer-events-none"
            style={{
              left: "-200px",
              top: "-200px",
              right: "-200px",
              bottom: "-200px",
              background: `
                radial-gradient(
                  1200px circle at ${spotlightPos.x}px ${spotlightPos.y}px,
                  hsl(var(--primary) / 0.28),
                  hsl(var(--primary) / 0.12) 30%,
                  transparent 70%
                )
              `,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative will-change-transform"
      >
        <Card
          onClick={() => onClick(currProject._id)}
          className="liquid-glass-card relative group overflow-visible border border-white/10 bg-white/[0.022] text-white transition-all duration-500 transform-gpu"
        >
          <CardHeader className="relative z-10 p-4 overflow-hidden rounded-lg">
            <motion.div className="relative w-full h-48 overflow-hidden rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.3)]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  alt={currProject.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </motion.div>

            <motion.h2
              className="mt-4 truncate text-xl font-semibold text-white"
              style={{ transform: "translateZ(30px)" }}
            >
              {currProject.title}
            </motion.h2>

            <motion.div
              className="mt-2 flex items-center gap-2"
              style={{ transform: "translateZ(20px)" }}
            >
              <Github className="w-4 h-4 text-primary" />
              <span className="truncate text-sm text-white/70">
                {currProject.repository.split("/").slice(-2).join("/")}
              </span>
            </motion.div>
          </CardHeader>

          <CardContent className="relative z-10 p-4 overflow-hidden rounded-lg">
            <p className="mb-4 line-clamp-3 text-sm text-white/72">
              {currProject.description}
            </p>
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-2"
                animate={isHovered ? { x: ["0%", "-100%"] } : { x: "0%" }} // Moves only on hover
                transition={
                  isHovered
                    ? { ease: "linear", duration: 10, repeat: Infinity }
                    : {}
                } // Stops when not hovered
              >
                {[...currProject.technologies, ...currProject.technologies].map(
                  (tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                        className="whitespace-nowrap border border-white/12 bg-white/6 text-white/80 backdrop-blur-md transition-colors hover:bg-white/12"
                    >
                      {tech}
                    </Badge>
                  )
                )}
              </motion.div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-white/55">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{currProject.analytics?.views || 0}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                <span>{currProject.comments?.length || 0}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="relative z-10 flex items-center justify-between border-t border-white/10 p-4 overflow-hidden rounded-lg">
            <Button
              variant={null}
              size="sm"
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-primary" : "text-white/55"
              } hover:text-white`}
              onClick={(e) => {
                e.stopPropagation();
                onLike(currProject._id);
              }}
            >
              <ThumbsUp
                className="w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
              />
              <span>{currProject.likes?.length || 0}</span>
            </Button>

            <div className="flex items-center gap-2">
              <Link
                to={currProject.repository}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-white/60 hover:text-white" />
              </Link>
              <Link
                to={currProject.liveDemo}
                className="rounded-full p-2 transition-colors hover:bg-white/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 text-white/60 hover:text-white" />
              </Link>
            </div>
          </CardFooter>

          <Button
            variant="secondary"
            onClick={() => onClick(currProject._id)}
            className="group relative z-10 w-full rounded-none rounded-b-2xl border-t border-white/10 bg-white/[0.03] text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:text-white"
          >
            Get Project Details
            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
