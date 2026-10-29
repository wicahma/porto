/**
 * Company logos live on the `experiences.logo` row (inline SVG data URI or a
 * plain URL), so the mark travels with the company instead of the bundle.
 */
export const isLogoSource = (value?: string | null): value is string => {
  if (!value) return false;

  const trimmed = value.trim();
  return (
    trimmed.startsWith("data:image/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://")
  );
};

/** Deterministic placeholder for companies that have neither logo nor photo. */
export const companyPhotoFallback = (company?: string | null): string =>
  `https://picsum.photos/seed/${encodeURIComponent(company?.trim() || "company")}/200/200`;
