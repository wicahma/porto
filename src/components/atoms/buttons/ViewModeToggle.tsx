"use client";

import { useViewModeStore } from "@/store/viewModeStore";
import { cn } from "@/utils/helper/cn";
import { RenderIf } from "@/utils/helper/render-if";
import { LayoutList, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

export const ViewModeToggle: React.FC = () => {
  const { isSimpleMode, toggleViewMode } = useViewModeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-12 aspect-square rounded-full bg-neutral-700 animate-pulse" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleViewMode}
      title={isSimpleMode ? "Switch to Animated Mode" : "Switch to Simple Mode"}
      className={cn(
        "h-12 cursor-pointer group flex items-center justify-center aspect-square rounded-full transition-all duration-300 text-xs font-semibold select-none",
        isSimpleMode
          ? "bg-[var(--signal)]/10 text-[var(--signal)] hover:bg-[var(--signal)]/20"
          : "bg-neutral-900/80 text-neutral-300 hover:text-white",
      )}
    >
      <RenderIf condition={isSimpleMode}>
        <LayoutList className="w-3.5 h-3.5 text-[var(--signal)]" />
      </RenderIf>
      <RenderIf condition={!isSimpleMode}>
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
      </RenderIf>
    </button>
  );
};

export default ViewModeToggle;
