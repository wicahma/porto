import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-shimmer bg-linear-to-r from-neutral-800/50 via-neutral-700/50 to-neutral-800/50 bg-size-[200%_100%] rounded-2xl",
        className
      )}
    />
  );
};

export default Skeleton;
