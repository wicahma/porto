export interface ICarouselProps {
    images: string[];
    contentWidth?: `${number}px`;
    contentSpace?: `${number}px`;
    speed?: number;
    direction?: "left" | "right";
    containerClassName?: string;
    debug?: boolean;
}
