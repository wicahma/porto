"use client";

import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import SimpleArticlePage from "@/components/organisms/SimpleArticlePage";
import { m } from "motion/react";
import React from "react";

export default function ArticleListPage() {
  return (
    <div className="w-full min-h-screen pb-16">
      {/* Top Bar Header with morphing layoutId */}
      <m.div
        layoutId="page-top-header"
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="w-full flex flex-col-reverse gap-3 pb-6 border-b border-neutral-800/40 mb-6"
      >
        <Breadcrumb />
        <Infographic showToggle={false} />
      </m.div>

      {/* Top-Down Content: Header -> Search & Filter -> 3-Column Article Grid */}
      <SimpleArticlePage />
    </div>
  );
}
