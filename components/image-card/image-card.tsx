import Image from "next/image";

type ImageCardProps = {
  src: string;
  alt: string;
};

const ImageCard = ({ src, alt }: ImageCardProps) => {
  return (
    <div className="relative h-96 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="absolute rounded-lg shadow-lg object-cover"
      />
    </div>
  );
};

export default ImageCard;
