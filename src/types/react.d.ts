import "react";

declare module "react" {
    interface CSSProperties {
        "--carousel-content-width"?: string;
        "--carousel-content-space-x"?: string;
        "--carousel-slide"?: "slide-left" | "slide-right";
        "--carousel-speed"?: `${number}ms`;
        "--content-total"?: number;
    }
}
