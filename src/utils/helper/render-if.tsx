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
