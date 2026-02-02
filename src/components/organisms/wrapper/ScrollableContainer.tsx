"use client";
import { SmoothScrollOptions, useSmoothScroll } from "@/hooks/useSmoothScroll";

const ScrollableContainer = ({
  scrollOptions,
  ...props
}: {
  scrollOptions?: SmoothScrollOptions;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = useSmoothScroll(scrollOptions);
  return (
    <div {...props} ref={scrollRef}>
      {props.children}
    </div>
  );
};

export default ScrollableContainer;
