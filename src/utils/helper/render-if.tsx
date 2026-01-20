import React from "react";

const RenderIf = ({
  children,
  condition = true,
}: Readonly<{
  condition?: boolean;
  children: React.ReactNode;
}>) => {
  if (!condition) return undefined;
  return children;
};

export default RenderIf;

export const handleTernary = <T, F>(cond: boolean, t: T, f: F) =>
  cond ? t : f;
