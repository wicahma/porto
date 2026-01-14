import NotFoundWaterAnimation from "@/components/molecules/NotFoundWaterAnimation";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xl z-[9999]">
      <div className="absolute inset-0 overflow-hidden">
        <NotFoundWaterAnimation />
      </div>
      <div className="relative z-10 text-center space-y-2 px-4 max-w-xl w-full">
        <div>
          <span className="text-white font-mono font-bold text-4xl drop-shadow-lg">
            How did you end here?
          </span>
        </div>
        <Link
          href="/"
          className="transition-colors hover:underline hover:text-sky-700"
        >
          go to home.
        </Link>
      </div>
    </div>
  );
}
