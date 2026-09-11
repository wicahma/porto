"use client";

import { useLoadingStore } from "@/store/loadingStore";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef } from "react";

function WaterFillAnimation({ progress }: Readonly<{ progress: number }>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const currentWaterLevelRef = useRef<number | null>(null);
  const targetWaterLevelRef = useRef(0);
  const progressRef = useRef(progress);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    timeRef.current = 0;
    currentWaterLevelRef.current = null;
    targetWaterLevelRef.current = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waveCount = 6;
    const waveAmplitude = 22;
    const waveFrequency = 0.016;
    const waveSpeed = 0.11;
    const pixelStep = 1;
    const screenOffset = 40;

    let lastFrameTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastFrameTime) / 16.67;
      lastFrameTime = currentTime;

      timeRef.current += waveSpeed * deltaTime;

      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;

      currentWaterLevelRef.current ??= height + screenOffset;

      targetWaterLevelRef.current =
        height - ((height + screenOffset) * progressRef.current) / 100;
      currentWaterLevelRef.current +=
        (targetWaterLevelRef.current - currentWaterLevelRef.current) * 0.1;

      const waterLevel = currentWaterLevelRef.current;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, waterLevel, 0, height);
      gradient.addColorStop(0, "#3b82f6");
      gradient.addColorStop(1, "#0C4DB8");
      ctx.fillStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let x = 0; x <= width; x += pixelStep) {
        let y = waterLevel;

        for (let i = 0; i < waveCount; i++) {
          const phase = timeRef.current + i * Math.PI * 0.7;
          const frequency = waveFrequency * (1 + i * 0.2);
          const amplitude = waveAmplitude * (1 - i * 0.2);

          y += Math.sin(x * frequency + phase) * amplitude;
        }

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, waterLevel);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      const shineGradient = ctx.createLinearGradient(
        0,
        waterLevel - 50,
        0,
        waterLevel + 50,
      );
      shineGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      shineGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.15)");
      shineGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.fillStyle = shineGradient;
      ctx.beginPath();
      ctx.moveTo(0, waterLevel - 50);

      for (let x = 0; x <= width; x += pixelStep) {
        let y = waterLevel;
        for (let i = 0; i < waveCount; i++) {
          const phase = timeRef.current + i * Math.PI * 0.7;
          const frequency = waveFrequency * (1 + i * 0.2);
          const amplitude = waveAmplitude * (1 - i * 0.2);
          y += Math.sin(x * frequency + phase) * amplitude;
        }
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, waterLevel + 50);
      ctx.lineTo(0, waterLevel + 50);
      ctx.closePath();
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function LoadingScreen() {
  const { isLoading, message, progress } = useLoadingStore();

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {isLoading && (
        <m.div
          initial={{
            clipPath: "circle(150% at 50% 50%)",
          }}
          animate={{
            clipPath: "circle(150% at 50% 50%)",
          }}
          exit={{
            clipPath: "circle(0% at 50% 50%)",
          }}
          transition={{
            duration: 2,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="fixed inset-0 z-9999 will-change-transform w-screen h-screen"
        >
          <div className="absolute z-9999 backdrop-blur-xl w-screen h-screen bg-black/40 flex items-center justify-center">
            <div className="md:hidden absolute inset-0 overflow-hidden">
              <WaterFillAnimation progress={progress} />
            </div>

            <div className="text-center space-y-6 px-4 max-w-xl w-full relative">
              <div className="space-y-3 hidden md:block">
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <m.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Loading...</span>
                  <span className="text-white font-mono font-bold text-lg">
                    {progress}%
                  </span>
                </div>
              </div>

              <div className="md:hidden">
                <span className="text-white font-mono font-bold text-3xl drop-shadow-lg">
                  {progress}%
                </span>
              </div>

              <m.p
                key={message}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-gray-300 text-base font-medium drop-shadow-md"
              >
                {message}
              </m.p>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
