"use client";

import { useEffect, useRef, useState } from "react";
import { getStorageFileUrl, isStorageFile } from "@/utils/helper/storage";

/** Inline plate used when an image inside rich content fails to load. */
const CONTENT_IMAGE_FALLBACK = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="#0d0d0d"/><path d="M0 320 Q100 280 200 320 T400 320 T600 320 T800 320 V450 H0 Z" fill="#3b82f6" fill-opacity="0.28"/><path d="M0 352 Q100 392 200 352 T400 352 T600 352 T800 352 V450 H0 Z" fill="#0c4db8" fill-opacity="0.55"/><g fill="none" stroke="#8f8f8f" stroke-width="6" stroke-linecap="square"><rect x="340" y="195" width="120" height="68" rx="6"/><path d="M324 278l44-44 38 38 28-28 52 52"/><circle cx="384" cy="220" r="9" fill="#8f8f8f"/></g></svg>`,
)}`;

interface StorageHtmlContentProps {
  content: string;
  className?: string;
}

/**
 * Component to display HTML content from storage or inline
 * If content is a storage path, it fetches and displays it
 * Otherwise, it displays the content directly
 */
export const StorageHtmlContent: React.FC<StorageHtmlContentProps> = ({
  content,
  className = "",
}) => {
  const [htmlContent, setHtmlContent] = useState<string>(content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadContent = async () => {
      // If it's a storage file path, fetch it
      if (isStorageFile(content)) {
        setIsLoading(true);
        try {
          const url = getStorageFileUrl(content);
          const response = await fetch(url);

          if (!response.ok) {
            throw new Error("Failed to load content");
          }

          const html = await response.text();
          setHtmlContent(html);
        } catch (err) {
          console.error("Error loading HTML content:", err);
          if (content) {
            setHtmlContent(content);
            setError(null);
          } else {
            setError("Failed to load content");
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        // It's already HTML content
        setHtmlContent(content);
      }
    };

    loadContent();
  }, [content]);

  // Rich-content images can point at missing media; swap them for the plate.
  useEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    const images = Array.from(root.querySelectorAll("img"));
    const cleanups = images.map((image) => {
      const applyFallback = () => {
        if (image.dataset.fallback === "true") return;
        image.dataset.fallback = "true";
        image.src = CONTENT_IMAGE_FALLBACK;
      };

      const onError = () => applyFallback();
      image.addEventListener("error", onError);

      if (image.complete && image.naturalWidth === 0) applyFallback();

      return () => image.removeEventListener("error", onError);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [htmlContent, isLoading]);

  if (isLoading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="text-center py-10 text-neutral-400">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
