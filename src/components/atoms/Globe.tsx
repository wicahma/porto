"use client";
import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const pointerInteractionMovement = useRef({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const userLocation = { lat: -7.7956, lng: 110.3695 };

  const locationToAngles = (lat: number, long: number) => {
    return [
      Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180,
    ];
  };

  const focusRef = useRef(locationToAngles(userLocation.lat, userLocation.lng));
  const isFocusing = useRef(false);
  const currentPhiRef = useRef(0);
  const currentThetaRef = useRef(0);
  const phiRef = useRef(0);
  const currentScaleRef = useRef(1);
  const targetScaleRef = useRef(1);

  useEffect(() => {
    let width = 0;

    const initialPhi = 0;
    const initialTheta = Math.PI / 2;
    currentPhiRef.current = initialPhi;
    currentThetaRef.current = initialTheta;
    phiRef.current = initialPhi;
    const doublePi = Math.PI * 2;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const canvas = canvasRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (canvas) {
        const newScale = Math.max(
          0.8,
          Math.min(3, currentScaleRef.current - e.deltaY * 0.002)
        );
        currentScaleRef.current = newScale;
        targetScaleRef.current = newScale;
        canvas.style.transform = `scale(${newScale})`;
      }
    };
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 1.2,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [{ location: [userLocation.lat, userLocation.lng], size: 0.1 }],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          if (isFocusing.current) {
            const [focusPhi, focusTheta] = focusRef.current;
            const distPositive =
              (focusPhi - currentPhiRef.current + doublePi) % doublePi;
            const distNegative =
              (currentPhiRef.current - focusPhi + doublePi) % doublePi;

            if (distPositive < distNegative) {
              currentPhiRef.current += distPositive * 0.03;
            } else {
              currentPhiRef.current -= distNegative * 0.03;
            }
            currentThetaRef.current =
              currentThetaRef.current * 0.97 + focusTheta * 0.03;

            if (Math.abs(focusPhi - currentPhiRef.current) < 0.01) {
              isFocusing.current = false;
              phiRef.current = currentPhiRef.current;
            }

            currentScaleRef.current =
              currentScaleRef.current * 0.97 + targetScaleRef.current * 0.03;
          } else if (autoRotate) {
            phiRef.current += 0.005;
            currentPhiRef.current = phiRef.current;
          }
        }

        state.phi =
          currentPhiRef.current + pointerInteractionMovement.current.x;
        state.theta =
          currentThetaRef.current + pointerInteractionMovement.current.y;
        state.width = width * 2;
        state.height = width * 2;

        state.markers = [
          {
            location: [userLocation.lat, userLocation.lng],
            size: 0.1,
            color: [1, 0.56, 0.75],
          },
        ];

        if (canvas) {
          canvas.style.transform = `scale(${currentScaleRef.current})`;
        }
      },
    });

    setTimeout(() => {
      if (canvas) {
        canvas.style.opacity = "1";
      }
    });

    return () => {
      globe.destroy();
      canvas.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", onResize);
    };
  }, [autoRotate]);

  const handleRecenter = () => {
    pointerInteractionMovement.current = { x: 0, y: 0 };
    setAutoRotate(false);
    focusRef.current = locationToAngles(userLocation.lat, userLocation.lng);
    isFocusing.current = true;
    targetScaleRef.current = 2.5;
  };

  return (
    <div className="relative w-full h-full">
      <button
        onClick={handleRecenter}
        className="absolute cursor-pointer top-2 right-2 z-10 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition-colors"
        title="Re-center to your location"
      >
        <RotateCcw size={16} className="text-[#FF8FC0]" />
      </button>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = {
            x: e.clientX - pointerInteractionMovement.current.x,
            y: e.clientY - pointerInteractionMovement.current.y,
          };
          setAutoRotate(true);
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
          }
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;

          currentPhiRef.current += pointerInteractionMovement.current.x;
          currentThetaRef.current += pointerInteractionMovement.current.y;
          phiRef.current = currentPhiRef.current;
          pointerInteractionMovement.current = { x: 0, y: 0 };
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          currentPhiRef.current += pointerInteractionMovement.current.x;
          currentThetaRef.current += pointerInteractionMovement.current.y;
          phiRef.current = currentPhiRef.current;
          pointerInteractionMovement.current = { x: 0, y: 0 };
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const deltaX = e.clientX - pointerInteracting.current.x;
            const deltaY = e.clientY - pointerInteracting.current.y;
            pointerInteractionMovement.current = {
              x: deltaX / 100,
              y: deltaY / 100,
            };
          }
        }}
        style={{
          width: "100%",
          height: "100%",
          cursor: "grab",
          opacity: 0,
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
