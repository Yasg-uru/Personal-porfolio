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
}

const ProjectCard: React.FC<ProjectProps> = ({
  project,
  index,
  onLike,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [currProject, setCurrProject] = useState<Project>(project);

  const { user, isAuthenticated } = useAuthContext();
  const { toast } = useToast();
  
    useEffect(() => {
        socket.on("project-like-update", ({ projectId, likes, action }) => {
          if (currProject._id === projectId) {
            setCurrProject((prev) => ({ ...prev, likes }));
      
            toast({
              title: action === "liked" ? "Project Liked!" : "Project Unliked!",
              description: action === "liked" 
                ? "You have liked this project. Thanks for your support! 🎉" 
                : "You have unliked this project. Maybe next time! 🤔",
              variant: action === "liked" ? "default" : "destructive", // Change style based on action
              duration: 3000, // 3 seconds
              className:'bg-black text-white'
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
  const scale = useSpring(isHovered ? 1.02 : 1, {
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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = event.clientX - rect.left;
    const relativeY = event.clientY - rect.top;

    setMousePosition({ x: relativeX, y: relativeY });
    x.set(relativeX / rect.width - 0.5);
    y.set(relativeY / rect.height - 0.5);
  };

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
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 2000 }}
      className="relative"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `
                radial-gradient(
                  800px circle at ${mousePosition.x}px ${mousePosition.y}px,
                  rgba(29, 78, 216, 0.15),
                  transparent 40%
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
        <Card onClick={() => onClick(currProject._id)} className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
          <CardHeader className="p-4 relative">
            <motion.div className="relative w-full h-48 overflow-hidden rounded-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={
                    currProject.gallery[currentImageIndex]?.url ||
                    "/placeholder.svg"
                  }
                  alt={currProject.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            </motion.div>

            <motion.h2
              className="text-white text-xl font-semibold truncate mt-4"
              style={{ transform: "translateZ(30px)" }}
            >
              {currProject.title}
            </motion.h2>

            <motion.div
              className="flex items-center gap-2 mt-2"
              style={{ transform: "translateZ(20px)" }}
            >
              <Github className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300 truncate">
                {currProject.repository.split("/").slice(-2).join("/")}
              </span>
            </motion.div>
          </CardHeader>

          <CardContent className="p-4">
            <p className="text-gray-300 text-sm line-clamp-3 mb-4">
              {currProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {currProject.technologies
                .slice(0, 3)
                .map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-800/50 text-blue-400 border border-blue-500/20 hover:bg-blue-500/10 transition-colors"
                  >
                    {tech}
                  </Badge>
                ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400">
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

          <CardFooter className="p-4 flex items-center justify-between border-t border-gray-800/50">
            <Button
              variant={null}
              size="sm"
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-blue-500" : "text-gray-400"
              } hover:text-blue-400`}
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
                className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </Link>
              <Link
                to={currProject.liveDemo}
                className="p-2 hover:bg-gray-800/50 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-400" />
              </Link>
            </div>
          </CardFooter>

          <Button
            variant="secondary"
            onClick={() => onClick(currProject._id)}
            className="w-full bg-gray-800/50 hover:bg-blue-500/20 text-white hover:text-blue-400 border-t border-gray-800/50 rounded-none rounded-b-lg relative group transform-gpu"
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
