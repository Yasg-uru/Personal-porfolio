import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ZoomIn } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; // Importing ScrollArea component

interface GalleryImage {
  _id: string;
  url: string;
  title: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export function Gallery({ images }: GalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Open the dialog and set the selected image
  const openDialog = (index: number) => {
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  // Close the dialog
  const closeDialog = () => setDialogOpen(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative"
    >
      {/* Horizontal ScrollArea for Thumbnail Previews */}
      <ScrollArea className="w-[80vw] whitespace-nowrap rounded-md border border-[#64ffda] bg-black p-4">
        <div className="flex gap-6">
          {images.map((image, index) => (
            <figure
              onClick={() => openDialog(index)}
              key={index}
              className="w-56 h-56 p-5"
            >
              <img
                src={image.url}
                alt={`Photo by `}
                className=" h-full w-full object-cover transform transition-transform duration-300"
              />

              <figcaption className="pt-2 text-xs text-muted-foreground text-white">
                <span className="font-semibold text-foreground text-white">
                  {image.title}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Modal Dialog with ShadCN */}
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="p-0 m-0 bg-transparent max-w-3xl"
          style={{ overflow: "hidden" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full bg-black bg-opacity-90"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].title}
              className="w-full h-full object-contain"
            />
            <motion.button
              onClick={closeDialog}
              whileHover={{ scale: 1.1 }}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2"
            >
              <ZoomIn size={24} />
            </motion.button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
