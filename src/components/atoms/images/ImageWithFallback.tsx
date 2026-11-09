"use client";

/* eslint-disable @next/next/no-img-element */
import { cn } from "@/utils/helper/cn";
import { ImageOff } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { useEffect, useState } from "react";

/**
 * Shared image fallback layer.
 *
 * Every image surface renders a plate-style placeholder instead of a broken
 * image when the source is empty, null, or fails to load. The placeholder uses
 * the same tokens as the rest of the public shell, so it reads as part of the
 * design rather than as a missing asset.
 */

/** Stable per-image variant so two placeholders never animate in lockstep. */
const hashSeed = (seed: string): number => {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const fallbackVars = (seed: string): React.CSSProperties => {
  const hash = hashSeed(seed);
  return {
    "--fb-duration": `${8 + (hash % 6)}s`,
    "--fb-level": `${34 + ((hash >>> 3) % 16)}%`,
  } as React.CSSProperties;
};

/**
 * Water plate used in place of a missing or broken image.
 * Mirrors the 404 fill: two drifting wave bands behind a signal-off glyph.
 */
export const ImagePlaceholder: React.FC<{
  className?: string;
  label?: string;
  style?: React.CSSProperties;
}> = ({ className, label, style }) => (
  <span
    {...(label
      ? { role: "img", "aria-label": label }
      : { "aria-hidden": true as const })}
    data-image-placeholder="true"
    style={{ ...fallbackVars(label ?? "image"), ...style }}
    className={cn("image-fallback", className)}
  >
    <span aria-hidden="true" className="image-fallback__tank">
      <svg
        aria-hidden="true"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
        className="image-fallback__waves image-fallback__waves--slow"
      >
        <path
          d="M0 18 Q25 34 50 18 T100 18 T150 18 T200 18 V40 H0 Z"
          fill="var(--blue-strong)"
          fillOpacity="0.6"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 200 40"
        preserveAspectRatio="none"
        className="image-fallback__waves"
      >
        <path
          d="M0 18 Q25 2 50 18 T100 18 T150 18 T200 18 V40 H0 Z"
          fill="var(--blue)"
          fillOpacity="0.3"
        />
      </svg>
    </span>

    <ImageOff
      aria-hidden="true"
      strokeWidth={1.5}
      className="image-fallback__icon relative z-10 h-1/4 max-h-8 min-h-4 w-1/4 min-w-4 max-w-8"
    />
  </span>
);

export interface SmartImageProps extends Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  src?: string | null;
  alt: string;
  fallbackLabel?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className,
  fallbackLabel,
  onError,
  ...props
}) => {
  const [failed, setFailed] = useState(false);
  const url = typeof src === "string" ? src.trim() : "";

  useEffect(() => {
    setFailed(false);
  }, [url]);

  if (!url || failed) {
    return (
      <ImagePlaceholder
        label={fallbackLabel ?? (alt || undefined)}
        className={className}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...props}
    />
  );
};

export interface SmartNextImageProps extends Omit<
  ImageProps,
  "src" | "alt" | "onError"
> {
  src?: ImageProps["src"] | null;
  alt: string;
  fallbackLabel?: string;
}

export const SmartNextImage: React.FC<SmartNextImageProps> = ({
  src,
  alt,
  className,
  fill,
  width,
  height,
  fallbackLabel,
  ...props
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    const size =
      !fill && typeof width === "number" && typeof height === "number"
        ? { width, height }
        : undefined;

    return (
      <ImagePlaceholder
        label={fallbackLabel ?? (alt || undefined)}
        style={size}
        className={cn(
          fill ? "absolute inset-0 h-full w-full" : undefined,
          className,
        )}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill={fill}
      width={width}
      height={height}
      onError={() => setFailed(true)}
      {...props}
    />
  );
};

export default SmartNextImage;
