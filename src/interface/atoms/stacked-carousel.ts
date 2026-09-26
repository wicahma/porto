import { ReactNode } from "react";

export interface StackedCarouselProps<T = any> {
  items: T[];
  renderCard: (item: T, index: number, isCenter: boolean) => ReactNode;
  autoPlayDuration?: number;
  blurIntensity?: number;
  overlapSpace?: number;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export interface CarouselCardStyle {
  scale: number;
  blur: number;
  zIndex: number;
  opacity: number;
  x: number;
}
