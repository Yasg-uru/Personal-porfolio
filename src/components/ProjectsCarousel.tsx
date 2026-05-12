import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Eye,
  Github,
  ExternalLink,
  ThumbsUp,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/authContext";

const ProjectCard: React.FC<{ project: any; onLike?: (id: string) => void }> = ({
  project,
  onLike,
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const { user, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (user && isAuthenticated) {
      const hasLiked = project.likes.some(
        (like: any) => like.userId === user._id
      );
      setIsLiked(hasLiked);
    }
  }, [project, user, isAuthenticated]);

  useEffect(() => {
    if (!project.gallery || project.gallery.length <= 1) return;

    let timeout: ReturnType<typeof setTimeout>;
    timeout = setTimeout(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % project.gallery.length
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [isHovered, project.gallery]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 2000 }}
      className="relative"
    >
      <Card
        onClick={() => navigate(`/details/${project._id}`)}
       className="liquid-glass-card relative group overflow-hidden text-white transition-all duration-500 transform-gpu cursor-pointer w-[450px]"
      >
        <CardHeader className="relative z-10 p-4 overflow-hidden rounded-lg">
          <motion.div className="relative w-full h-48 overflow-hidden rounded-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12),0_10px_24px_rgba(0,0,0,0.3)]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={
                  project.gallery?.[currentImageIndex]?.url ||
                  project.gallery?.[0]?.url ||
                  "/placeholder.svg"
                }
                alt={project.title}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </motion.div>

          <motion.h2 className="mt-4 truncate text-xl font-semibold text-white">
            {project.title}
          </motion.h2>

          <motion.div className="mt-2 flex items-center gap-2">
            <Github className="w-4 h-4 text-primary" />
            <span className="truncate text-sm text-white/70">
              {project.repository.split("/").slice(-2).join("/")}
            </span>
          </motion.div>
        </CardHeader>

        <CardContent className="relative z-10 p-4 overflow-hidden rounded-lg">
          <p className="mb-4 line-clamp-3 text-sm text-white/72">
            {project.description}
          </p>
          <div className="relative w-full overflow-hidden">
            <motion.div
              className="flex gap-2"
              animate={isHovered ? { x: ["0%", "-100%"] } : { x: "0%" }}
              transition={
                isHovered
                  ? { ease: "linear", duration: 10, repeat: Infinity }
                  : {}
              }
            >
              {[...project.technologies, ...project.technologies].map(
                (tech: string, index: number) => (
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
              <span>{project.analytics?.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{project.comments?.length || 0}</span>
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
              onLike?.(project._id);
            }}
          >
            <ThumbsUp
              className="w-4 h-4"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
            />
            <span>{project.likes?.length || 0}</span>
          </Button>

          <div className="flex items-center gap-2">
            <Link
              to={project.repository}
              className="rounded-full p-2 transition-colors hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="w-5 h-5 text-white/60 hover:text-white" />
            </Link>
            <Link
              to={project.liveDemo}
              className="rounded-full p-2 transition-colors hover:bg-white/10"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-5 h-5 text-white/60 hover:text-white" />
            </Link>
          </div>
        </CardFooter>

        <Button
          variant="secondary"
          onClick={() => navigate(`/details/${project._id}`)}
          className="group relative z-10 w-full rounded-none rounded-b-2xl border-t border-white/10 bg-white/[0.03] text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/8 hover:text-white"
        >
          Get Project Details
          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </Card>
    </motion.div>
  );
};

interface ProjectsCarouselProps {
  projects: any[];
  title: string;
  onLike?: (id: string) => void;
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  projects,
  title,
  onLike,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {title && (
        <h3 className="text-2xl font-semibold mb-8 text-gray-300">{title}</h3>
      )}

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        loop={true}
        watchSlidesProgress={true}
        slideToClickedSlide={true}
        coverflowEffect={{
          rotate: 0,          // Angles side cards inward for strong 3D look
          stretch: 0,          // Let depth handle Z-spacing
          depth: 400,          // How far back side cards are pushed on Z-axis
          modifier: 1.5,       // Multiplier for all coverflow params
          slideShadows: true,  // Built-in shadow per card angle
        }}
        pagination={{ clickable: true }}
        navigation={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        speed={800}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="mySwiper"
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
      >
        {projects.map((project) => (
          <SwiperSlide key={project._id}>
            <div className="carousel-card">
              <ProjectCard project={project} onLike={onLike} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        /* ── Active Slide Rotating Border (Copilot Style) ── */
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-angle {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        .mySwiper .swiper-slide-active .carousel-card .liquid-glass-card {
          border-color: transparent !important;
          overflow: hidden;
        }

        .mySwiper .swiper-slide-active .carousel-card .liquid-glass-card::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            transparent 70%,
            hsl(var(--primary)) 90%,
            hsl(var(--primary)) 100%
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 50;
          animation: rotate-angle 3s linear infinite;
          filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.8));
        }

        /* ── Swiper container ── */
        .mySwiper {
          width: 100%;
          padding: 80px 0 !important;
          overflow: visible;
          perspective: 1200px;
        }

        /* preserve-3d lets children actually live in 3D space */
        .mySwiper .swiper-wrapper {
          align-items: center;
          transform-style: preserve-3d;
        }

        .mySwiper .swiper-slide {
          width: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: none;
          transform-style: preserve-3d;
        }

        /* ── Card states ── */

        /* Far/default cards — strongly receded, dark, blurred */
        .mySwiper .carousel-card {
          width: 100%;
          transform: scale(0.72) rotateY(0deg);
          opacity: 0.22;
          filter: blur(2.5px) brightness(0.5);
          transition:
            transform 650ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity   650ms ease,
            filter    650ms ease;
        }

        /* Previous card — angled to the right (faces center) */
        .mySwiper .swiper-slide-prev .carousel-card {
          transform: scale(0.86) rotateY(14deg);
          opacity: 0.58;
          filter: blur(0.8px) brightness(0.75);
        }

        /* Next card — angled to the left (faces center) */
        .mySwiper .swiper-slide-next .carousel-card {
          transform: scale(0.86) rotateY(-14deg);
          opacity: 0.58;
          filter: blur(0.8px) brightness(0.75);
        }

        /* Active card — pops toward viewer, full clarity */
        .mySwiper .swiper-slide-active .carousel-card {
          transform: scale(1.05) rotateY(0deg);
          opacity: 1;
          filter: blur(0px) brightness(1);
        }

        /* ── Navigation buttons ── */
        .swiper-button-next,
        .swiper-button-prev {
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 12px;
          border-radius: 50%;
          color: white;
          transition: all 0.3s ease;
          width: 50px;
          height: 50px;
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background-color: rgba(255, 255, 255, 0.28);
          border-color: rgba(255, 255, 255, 0.35);
          transform: scale(1.08);
        }

        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 18px;
        }

        /* ── Pagination ── */
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.35);
          opacity: 1;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.95);
          transform: scale(1.3);
        }

        .swiper-pagination {
          bottom: 8px !important;
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 1200px) {
          .mySwiper .swiper-slide { width: 480px; }
        }

        @media (max-width: 1024px) {
          .mySwiper .swiper-slide { width: 420px; }
        }

        @media (max-width: 768px) {
          .mySwiper {
            padding: 40px 0 !important;
            perspective: 800px;
          }

          .mySwiper .swiper-slide { width: 320px; }

          /* Flatten 3D on mobile — performance + readability */
          .mySwiper .carousel-card,
          .mySwiper .swiper-slide-prev .carousel-card,
          .mySwiper .swiper-slide-next .carousel-card,
          .mySwiper .swiper-slide-active .carousel-card {
            transform: scale(1) rotateY(0deg);
            opacity: 1;
            filter: none;
          }

          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .mySwiper .swiper-slide { width: 280px; }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectsCarousel;