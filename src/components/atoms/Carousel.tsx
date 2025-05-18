import { ICarouselProps } from "@/interface/atoms/carousel";
import { cn } from "@/utils/helper/cn";
import React, { useEffect, useRef, useState } from "react";

const Carousel: React.FC<ICarouselProps> = ({
    images,
    containerClassName,
    direction = "right",
    contentSpace = "8px",
    contentWidth = "200px",
    speed = "2000ms",
    debug = false,
}) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);

    const [renderedImages, setRenderedImages] = useState<string[]>([]);

    useEffect(() => {
        if (images.length < 2 || !containerRef.current || !trackRef.current)
            return;

        const containerWidth = containerRef.current.clientWidth;
        const tempImage = new Image();
        const tempTrack = document.createElement("div");
        tempTrack.classList.add(
            "carousel-content",
            "fixed",
            "pointer-events-none",
            "bottom-full",
            "right-full"
        );
        tempImage.src = images[0];
        document.body.appendChild(tempTrack);
        const tempTrackRect = tempTrack.getBoundingClientRect();
        tempImage.onload = () => {
            console.log("tempTrackRect", tempTrackRect);
            const allImageWidth =
                (tempTrackRect.width + Math.abs(tempTrackRect.right) * 2) *
                images.length;
            console.log("all image width", allImageWidth);
            const repeatCount = Math.ceil((containerWidth * 2) / allImageWidth);

            console.log("repeatCount", repeatCount);
            const repeatedImages: string[] = [];
            for (let i = 0; i < repeatCount; i++) {
                repeatedImages.push(...images);
            }

            setRenderedImages(repeatedImages);
            document.body.removeChild(tempTrack);
        };

        return () => {
            if (document.body.contains(tempTrack))
                document.body.removeChild(tempTrack);
        };
    }, [images]);

    return (
        <div
            className={cn(
                "carousel-container",
                containerClassName,
                debug && "relative"
            )}
            style={{
                "--carousel-content-width": contentWidth,
                "--carousel-content-space-x": contentSpace,
                "--carousel-slide":
                    direction === "right" ? "slide-right" : "slide-left",
                "--carousel-speed": speed,
                "--content-total": images.length,
            }}
            ref={containerRef}
        >
            {debug && (
                <div className="bg-black rounded absolute z-50 text-[11px] px-2 opacity-80 m-1">
                    Rendered Images: {renderedImages.length}
                </div>
            )}
            <div ref={trackRef} className="carousel-track">
                {renderedImages.map((img, i) => (
                    <div key={i} className="carousel-content">
                        <img
                            src={img}
                            alt={`carousel-${i}`}
                            className="w-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
