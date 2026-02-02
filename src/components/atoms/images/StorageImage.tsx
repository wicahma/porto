import Image, { ImageProps } from "next/image";
import { getStorageFileUrl } from "@/utils/helper/storage";
import { loadingImageDataUri } from "@/constants/loading";

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
      <Image
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
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      placeholder="blur"
      blurDataURL={blurDataURL || loadingImageDataUri}
      preload={preload}
      sizes={sizes}
      {...props}
    />
  );
};

export const StorageImg: React.FC<
  React.ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }
> = async ({ src, alt, ...props }) => {
  const imageUrl = getStorageFileUrl(src);

  return <img src={imageUrl} alt={alt} {...props} />;
};
