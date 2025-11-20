import { useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/data/products';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  onToggleWishlist?: (productId: string) => void;
  wishlistItems?: string[];
}

const ProductCarousel = ({ 
  products, 
  title,
  onToggleWishlist,
  wishlistItems = []
}: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });
  
  const touchStartX = useRef<number>(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const containerNode = emblaApi.containerNode();
      
      const handleTouchStart = (e: TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
      };

      const handleTouchEnd = (e: TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX.current - touchEndX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollPrev();
          }
        }
      };

      containerNode.addEventListener('touchstart', handleTouchStart);
      containerNode.addEventListener('touchend', handleTouchEnd);

      return () => {
        containerNode.removeEventListener('touchstart', handleTouchStart);
        containerNode.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [emblaApi]);

  if (!products.length) return null;

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="font-playfair text-2xl font-semibold text-foreground">
            {title}
          </h2>
          <div className="hidden md:flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4 touch-pan-y">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_280px] md:flex-[0_0_300px]"
            >
              <ProductCard
                product={product}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistItems.includes(product.id)}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile scroll indicator */}
      <div className="md:hidden text-center text-sm text-muted-foreground">
        Swipe to browse more products
      </div>
    </div>
  );
};

export default ProductCarousel;