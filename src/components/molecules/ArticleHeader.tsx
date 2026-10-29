"use client";

import Breadcrumb from "@/components/molecules/header/Breadcrumb";
import Infographic from "@/components/molecules/header/Infograpnic";
import { m } from "motion/react";
import React from "react";

export default function ArticleHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#131313]/60 py-3 mb-4 transition-colors">
      <m.div
        layoutId="page-top-header"
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="max-w-270 mx-auto px-6 w-full flex flex-col-reverse gap-2.5"
      >
        <Breadcrumb />
        <Infographic showToggle={false} />
      </m.div>
    </header>
  );
}
