import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface GalleryImage {
  _id: string;
  url: string;
  title: string;
}

interface ProjectGallerySwiperProps {
  images: GalleryImage[];
}

export default function ProjectGallerySwiper({ images }: ProjectGallerySwiperProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const closePreviewDialog = () => setSelectedImageIndex(null);

  if (!images?.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-white/60 backdrop-blur-md">
        No gallery screenshots available.
      </div>
    );
  }

  return (
    <div className="project-gallery-swiper">
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={2}
        loop={images.length > 2}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        speed={700}
        coverflowEffect={{
          rotate: 0,
          stretch: -28,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        className="details-gallery-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image._id || `${image.url}-${index}`}>
            <article
              role="button"
              tabIndex={0}
              onClick={() => setSelectedImageIndex(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelectedImageIndex(index);
                }
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md transition-all duration-500 hover:border-primary/40 hover:bg-white/[0.06] cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={image.url}
                  alt={image.title || `Gallery screenshot ${index + 1}`}
                  className="h-[320px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  Shot {String(index + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="truncate text-sm font-semibold text-white">{image.title || `Project Screen ${index + 1}`}</h3>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closePreviewDialog()}>
        <DialogContent className="max-w-5xl border-white/10 bg-black/80 p-3 backdrop-blur-2xl">
          {selectedImageIndex !== null && (
            <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-md">
              <DialogTitle className="sr-only">
                {images[selectedImageIndex]?.title || `Project screenshot ${selectedImageIndex + 1}`}
              </DialogTitle>
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                <img
                  src={images[selectedImageIndex]?.url}
                  alt={images[selectedImageIndex]?.title || `Project screenshot ${selectedImageIndex + 1}`}
                  className="max-h-[78vh] w-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent pointer-events-none" />
                <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  Shot {String(selectedImageIndex + 1).padStart(2, "0")}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="truncate text-base font-semibold text-white">
                    {images[selectedImageIndex]?.title || `Project Screen ${selectedImageIndex + 1}`}
                  </h3>
                </div>
              </div>
            </article>
          )}
        </DialogContent>
      </Dialog>

      <style>{`
        .project-gallery-swiper .details-gallery-swiper {
          padding: 28px 8px 56px;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-slide {
          opacity: 0.55;
          transition: transform 0.45s ease, opacity 0.45s ease;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-slide-active {
          opacity: 1;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-button-next,
        .project-gallery-swiper .details-gallery-swiper .swiper-button-prev {
          width: 38px;
          height: 38px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.18);
          background: rgba(20, 20, 20, 0.7);
          backdrop-filter: blur(10px);
          color: #ffffff;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-button-next::after,
        .project-gallery-swiper .details-gallery-swiper .swiper-button-prev::after {
          font-size: 13px;
          font-weight: 700;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.32);
          opacity: 1;
        }

        .project-gallery-swiper .details-gallery-swiper .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          transform: scale(1.15);
        }

        @media (max-width: 1024px) {
          .project-gallery-swiper .details-gallery-swiper .swiper-slide img {
            height: 260px;
          }
        }
      `}</style>
    </div>
  );
}
