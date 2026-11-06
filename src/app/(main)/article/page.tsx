"use client";

import SimpleArticlePage from "@/components/organisms/SimpleArticlePage";
import PublicPageShell from "@/components/organisms/wrapper/PublicPageShell";
import React from "react";

export default function ArticleListPage() {
  return (
    <PublicPageShell code="SEC / 05 — JOURNAL">
      <SimpleArticlePage />
    </PublicPageShell>
  );
}
