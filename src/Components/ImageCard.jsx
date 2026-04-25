import { ImageWithFallback } from "./figma/ImageWithFallback";

export function ImageCard({ src, alt, className = "" }) {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className}`}>
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}