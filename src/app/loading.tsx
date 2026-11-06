/**
 * No blocking curtain: the previous fallback rendered a full-screen canvas
 * animation that pinned LCP to its removal. Route content streams in directly.
 */
export default function Loading() {
  return null;
}
