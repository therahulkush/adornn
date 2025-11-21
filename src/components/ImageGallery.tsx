import { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LazyImage from "@/components/LazyImage";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  
  const currentImage = images[selectedImageIndex] || images[0] || "/placeholder.svg";

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX.current || !touchStartY.current) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX.current - touchEndX;
      const diffY = touchStartY.current - touchEndY;

      // Pinch to zoom gesture detection
      if (Math.abs(diffX) < 10 && Math.abs(diffY) < 10) {
        setIsModalOpen(true);
      }
    };

    if (isModalOpen) {
      document.addEventListener('touchstart', handleTouchStart);
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative group bg-card rounded-lg overflow-hidden aspect-square">
          <LazyImage
            src={currentImage}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Zoom Button */}
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          {/* Click to zoom overlay */}
          <div
            className="absolute inset-0 cursor-zoom-in opacity-0 hover:opacity-100 transition-opacity duration-300"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        {/* Thumbnail row */}
        <div className="flex gap-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded overflow-hidden cursor-pointer transition-all ${
                selectedImageIndex === index
                  ? "border-2 border-primary"
                  : "border border-border opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            >
              <LazyImage
                src={img}
                alt={`${name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-background">
          <div className="relative">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 shadow-medium"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="relative flex items-center justify-center min-h-[50vh] max-h-[85vh] overflow-hidden">
              <LazyImage
                src={currentImage}
                alt={name}
                className={`transition-all duration-300 cursor-zoom-${isZoomed ? 'out' : 'in'} ${
                  isZoomed 
                    ? 'max-w-[95vw] max-h-[80vh] w-auto h-auto object-contain' 
                    : 'max-w-[90vw] max-h-[75vh] w-auto h-auto object-contain'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsZoomed(!isZoomed)}
                className="shadow-medium"
              >
                {isZoomed ? (
                  <>
                    <ZoomOut className="mr-2 h-4 w-4" />
                    Zoom Out
                  </>
                ) : (
                  <>
                    <ZoomIn className="mr-2 h-4 w-4" />
                    Zoom In
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;