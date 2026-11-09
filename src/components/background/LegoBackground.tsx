"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";

const LegoDisplacementCanvas = dynamic(
  () => import("./LegoDisplacementCanvas"),
  { ssr: false, loading: () => null },
);

/**
 * The canvas is browser-only (WebGL), so it is loaded after hydration. The HUD
 * mount is a build-time flag: production builds without the flag never ship it.
 *
 * `contentRef` is the shell's content column; the brick field spans its inner
 * width instead of the full page width.
 */
export default function LegoBackground({
  contentRef,
}: {
  contentRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <LegoDisplacementCanvas
      showControls={process.env.NEXT_PUBLIC_SHOW_BG_CONTROLS === "true"}
      contentRef={contentRef}
    />
  );
}
