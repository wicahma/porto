"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArticleHeader() {
  // border-b border-neutral-800/50 bg-neutral-950/80
  return (
    <header className="sticky top-0 z-50  backdrop-blur-md">
      <div className="max-w-350 mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="text-lg font-bold text-white">Portfolio</div>
        </div>
      </div>
    </header>
  );
}
