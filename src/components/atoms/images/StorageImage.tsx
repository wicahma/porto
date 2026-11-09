import { ImageProps } from "next/image";
import { getStorageFileUrl } from "@/utils/helper/storage";
import { loadingImageDataUri } from "@/constants/loading";
import { SmartImage, SmartNextImage } from "./ImageWithFallback";

export const StorageImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  fill = false,
  preload = false,
  sizes,
  blurDataURL,
  ...props
}) => {
  const imageUrl = getStorageFileUrl(src as string);

  if (fill) {
    return (
      <SmartNextImage
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        preload={preload}
        placeholder="blur"
        blurDataURL={blurDataURL || loadingImageDataUri}
        sizes={sizes}
        {...props}
      />
    );
  }

  return (
    <SmartNextImage
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      placeholder={preload ? "empty" : "blur"}
      blurDataURL={preload ? undefined : blurDataURL || loadingImageDataUri}
      preload={preload}
      sizes={sizes}
      {...props}
    />
  );
};

export const StorageImg: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }
> = ({ src, alt, ...props }) => {
  const imageUrl = getStorageFileUrl(src);

  return <SmartImage src={imageUrl} alt={alt} {...props} />;
};
