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
  return !path.startsWith("http://") && !path.startsWith("https://");
};
