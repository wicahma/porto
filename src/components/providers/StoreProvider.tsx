"use client";

import React, { ReactNode, useEffect } from "react";
import { NeatConfig, NeatGradient } from "@firecms/neat";

const config: NeatConfig = {
  colors: [
    {
      color: "#001624",
      enabled: true,
    },
    {
      color: "#012929",
      enabled: true,
    },
    {
      color: "#01131f",
      enabled: true,
    },
    {
      color: "#2e0101",
      enabled: false,
    },
    {
      color: "#121212",
      enabled: true,
    },
  ],
  speed: 4,
  horizontalPressure: 4,
  verticalPressure: 3,
  waveFrequencyX: 0,
  waveFrequencyY: 0,
  waveAmplitude: 0,
  shadows: 7,
  highlights: 4,
  colorBrightness: 0.9,
  colorSaturation: 6,
  wireframe: false,
  colorBlending: 5,
  backgroundColor: "#101010",
  backgroundAlpha: 1,
  grainScale: 3,
  grainSparsity: 0,
  grainIntensity: 0.15,
  grainSpeed: 6.2,
  resolution: 0.4,
  yOffset: 764,
};

export function StoreProvider({ children }: { readonly children: ReactNode }) {
  useEffect(() => {
    let neat: NeatGradient | null;
    // if (document) {
    //   const canvas = document.getElementById("gradient") as HTMLCanvasElement;
    //   neat = new NeatGradient({ ref: canvas, ...config });
    // }

    // return () => neat?.destroy();
  }, []);

  return (
    <>
      {children}
      {/* <canvas
        id="gradient"
        className="fixed w-screen h-screen top-0 left-0 -z-50"
      /> */}
    </>
  );
}
