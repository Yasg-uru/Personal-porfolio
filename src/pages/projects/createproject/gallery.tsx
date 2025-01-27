
import { useState } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GalleryImage {
  _id: string
  url: string
  title: string
}

interface GalleryProps {
  images: GalleryImage[]
}

export function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-black">
        {images.map((image) => (
          <div key={image._id} className="relative group">
            <img
              src={image.url || "/placeholder.svg"}
              alt={image.title}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer transition-opacity duration-300 group-hover:opacity-75"
              onClick={() => setSelectedImage(image)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-sm font-semibold truncate">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl bg-black">
          <DialogHeader>
            <DialogTitle className='text-white'>{selectedImage?.title}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video">
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.title}
                
                className="object-contain rounded-lg "
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

