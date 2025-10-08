"use client";

import React, { ReactNode } from "react";

/**
 * This component acts as a wrapper for store initialization.
 * With Next.js App Router, it helps avoid hydration mismatches
 * by ensuring stores are properly initialized on both server and client.
 */
export function StoreProvider({ children }: { readonly children: ReactNode }) {
  return <>{children}</>;
}
