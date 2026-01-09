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

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const [initialPhi, initialTheta] = locationToAngles(
      userLocation.lat,
      userLocation.lng
    );
    let currentPhi = initialPhi;
    let currentTheta = initialTheta;
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

    // Add wheel event listener with passive: false to allow preventDefault
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (canvas) {
        const scale = canvas.style.transform.match(/scale\(([\d.]+)\)/);
        const currentScale = scale ? parseFloat(scale[1]) : 1;
        const newScale = Math.max(
          0.8,
          Math.min(3, currentScale - e.deltaY * 0.002)
        );
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
        // Handle focus/re-center animation
        if (!pointerInteracting.current) {
          if (isFocusing.current) {
            const [focusPhi, focusTheta] = focusRef.current;
            const distPositive = (focusPhi - currentPhi + doublePi) % doublePi;
            const distNegative = (currentPhi - focusPhi + doublePi) % doublePi;

            // Control the speed - smoothly rotate to target
            if (distPositive < distNegative) {
              currentPhi += distPositive * 0.08;
            } else {
              currentPhi -= distNegative * 0.08;
            }
            currentTheta = currentTheta * 0.92 + focusTheta * 0.08;

            // Stop focusing when close enough to target
            if (Math.abs(focusPhi - currentPhi) < 0.01) {
              isFocusing.current = false;
              phi = currentPhi;
            }
          } else if (autoRotate) {
            // Auto-rotate when not focusing
            phi += 0.005;
            currentPhi = phi;
          }
        }

        state.phi = currentPhi + pointerInteractionMovement.current.x;
        state.theta = currentTheta + pointerInteractionMovement.current.y;
        state.width = width * 2;
        state.height = width * 2;

        state.markers = [
          {
            location: [userLocation.lat, userLocation.lng],
            size: 0.1,
            color: [1, 0.56, 0.75], // #FF8FC0 in RGB
          },
        ];
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
          if (canvasRef.current) {
            canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
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
