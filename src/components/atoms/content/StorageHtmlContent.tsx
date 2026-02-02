"use client";

import { useEffect, useState } from "react";
import { getStorageFileUrl, isStorageFile } from "@/utils/helper/storage";

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
          setError("Failed to load content");
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
      className={className}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
