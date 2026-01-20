import React from "react";

export const RenderIf = ({
  children,
  condition = true,
}: Readonly<{
  condition?: boolean;
  children: React.ReactNode;
}>) => {
  if (!condition) return undefined;
  return children;
};

export const handleTernary = <T, F>(cond: boolean, t: T, f: F) =>
  cond ? t : f;
