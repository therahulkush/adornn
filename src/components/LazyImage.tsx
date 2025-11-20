import { useLazyImage } from '@/hooks/useLazyImage';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
}

const LazyImage = ({ 
  src, 
  alt, 
  className, 
  placeholder = '/placeholder.svg',
  threshold = 0.1,
  ...props 
}: LazyImageProps) => {
  const { imgRef, isLoaded, isInView } = useLazyImage({ src, threshold });

  return (
    <img
      ref={imgRef}
      src={isInView ? (isLoaded ? src : placeholder) : placeholder}
      alt={alt}
      className={cn(
        'transition-opacity duration-300',
        isLoaded ? 'opacity-100' : 'opacity-70',
        className
      )}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;