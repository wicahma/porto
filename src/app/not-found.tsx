import NotFoundWaterAnimation from "@/components/molecules/NotFoundWaterAnimation";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/10 backdrop-blur-xl z-[9999]">
      <div className="absolute inset-0 overflow-hidden">
        <NotFoundWaterAnimation />
      </div>
      <div className="relative z-10 text-center space-y-6 px-4 max-w-xl w-full">
        <span className="text-white font-mono font-bold text-4xl drop-shadow-lg">
          404
        </span>
        <p className="text-gray-300 text-lg font-medium drop-shadow-md">
          Page Not Found
        </p>
      </div>
    </div>
  );
}
