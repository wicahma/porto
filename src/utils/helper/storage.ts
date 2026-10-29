export const getStorageFileUrl = (
  filePath: string | null | undefined,
): string => {
  if (!filePath) return "";

  // If it's already a full URL, return it
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  return `${baseUrl}/api/storage?path=${encodeURIComponent(filePath)}`;
};

export const isStorageFile = (path: string | null | undefined): boolean => {
  if (!path) return false;
  const trimmed = path.trim();
  if (
    trimmed.startsWith("<") ||
    trimmed.includes("</") ||
    trimmed.includes("\n")
  ) {
    return false;
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return false;
  }
  return (
    isStorageKey(trimmed) ||
    /^[a-zA-Z0-9_\-./]+\.[a-zA-Z0-9]+$/.test(trimmed)
  );
};

// Upload keys look like `<folder>/<ts>_<nano>_<name>.<ext>` (see backend generateFilePath).
// Anchored on the folder prefix so raw HTML/inline content never matches.
const STORAGE_KEY_PATTERN = /^(images|articles|projects)\/[^/]+\.[A-Za-z0-9]+$/;

export const isStorageKey = (
  value: string | null | undefined,
): value is string =>
  typeof value === "string" && STORAGE_KEY_PATTERN.test(value);

// De-duped list of real storage keys among the given fields, skipping
// empty values, external URLs, and content that was never uploaded.
export const collectStorageKeys = (
  ...values: (string | null | undefined)[]
): string[] => Array.from(new Set(values.filter(isStorageKey)));
