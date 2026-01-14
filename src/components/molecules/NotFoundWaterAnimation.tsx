"use client";
import { useEffect, useRef } from "react";

export default function NotFoundWaterAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const waterLevelRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    timeRef.current = 0;
    waterLevelRef.current = null;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waveSpeed = 0.07;
    const pixelStep = 2;
    let lastFrameTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastFrameTime) / 16.67;
      lastFrameTime = currentTime;
      timeRef.current += waveSpeed * deltaTime;
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      waterLevelRef.current ??= height * 0.6;
      const waterLevel = waterLevelRef.current;
      ctx.clearRect(0, 0, width, height);
      // Draw water with more dynamic waves
      const gradient = ctx.createLinearGradient(0, waterLevel, 0, height);
      gradient.addColorStop(0, "#3b82f6");
      gradient.addColorStop(1, "#0C4DB8");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += pixelStep) {
        let y = waterLevel;
        // Dynamic multi-layered wave
        y += Math.sin(x * 0.012 + timeRef.current * 1.2) * 18;
        y += Math.sin(x * 0.022 - timeRef.current * 0.7) * 8;
        y += Math.sin(x * 0.008 + timeRef.current * 0.4) * 6;
        y += Math.cos(x * 0.018 - timeRef.current * 0.9) * 5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
      // Draw boat (more boat-like)
      const boatWidth = 90;
      const boatHeight = 34;
      const boatX = width / 2 - boatWidth / 2;
      // Boat follows the main wave
      let boatY = waterLevel;
      boatY += Math.sin(boatX * 0.012 + timeRef.current * 1.2) * 18;
      boatY += Math.sin(boatX * 0.022 - timeRef.current * 0.7) * 8;
      boatY += Math.sin(boatX * 0.008 + timeRef.current * 0.4) * 6;
      boatY += Math.cos(boatX * 0.018 - timeRef.current * 0.9) * 5;
      boatY -= boatHeight / 2;
      ctx.save();
      ctx.translate(boatX + boatWidth / 2, boatY + boatHeight / 2);
      ctx.rotate(Math.sin(timeRef.current * 0.5) * 0.04);
      // Hull (rounded)
      ctx.beginPath();
      ctx.moveTo(-boatWidth / 2, 0);
      ctx.quadraticCurveTo(
        -boatWidth / 2 + 10,
        boatHeight / 2,
        0,
        boatHeight / 2
      );
      ctx.quadraticCurveTo(
        boatWidth / 2 - 10,
        boatHeight / 2,
        boatWidth / 2,
        0
      );
      ctx.quadraticCurveTo(
        boatWidth / 2,
        -boatHeight / 2 + 8,
        0,
        -boatHeight / 2 + 8
      );
      ctx.quadraticCurveTo(
        -boatWidth / 2,
        -boatHeight / 2 + 8,
        -boatWidth / 2,
        0
      );
      ctx.closePath();
      ctx.fillStyle = "#eab308";
      ctx.fill();
      // Mast
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -boatHeight / 2 - 18);
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#fff";
      ctx.stroke();
      // Sail (triangle, with slight curve)
      ctx.beginPath();
      ctx.moveTo(0, -boatHeight / 2 - 18);
      ctx.quadraticCurveTo(22, -boatHeight / 2, 0, 0);
      ctx.lineTo(0, -boatHeight / 2 - 18);
      ctx.closePath();
      ctx.fillStyle = "#e0e7ff";
      ctx.globalAlpha = 0.95;
      ctx.fill();
      ctx.globalAlpha = 1;
      // Flag
      ctx.beginPath();
      ctx.moveTo(0, -boatHeight / 2 - 18);
      ctx.lineTo(-12, -boatHeight / 2 - 14);
      ctx.lineTo(0, -boatHeight / 2 - 10);
      ctx.closePath();
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.restore();
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
