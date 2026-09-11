"use client";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Globe from "@/components/atoms/animations/Globe";
import Tooltip from "@/components/atoms/popups/Tooltip";
import ViewModeToggle from "@/components/atoms/buttons/ViewModeToggle";
import { isMdUp } from "@/utils/helper/responsive";
import { useViewModeStore } from "@/store/viewModeStore";
import { m } from "motion/react";

export default function Infographic() {
  const isSimpleMode = useViewModeStore((state) => state.isSimpleMode);
  const [currentTime, setCurrentTime] = useState<Date | undefined>(undefined);
  const [isMd, setIsMd] = useState(false);

  useEffect(() => {
    if (window === undefined) return;
    const check = () => setIsMd(isMdUp());
    check();
    window.addEventListener("resize", check);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.removeEventListener("resize", check);
      clearInterval(timer);
    };
  }, []);

  const formatTime = () => {
    return (
      currentTime?.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Jakarta",
      }) || "00:00:00 AM"
    );
  };

  const getDayName = () => {
    return (
      currentTime?.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "Asia/Jakarta",
      }) || "Is this windows?"
    );
  };

  const targetWidth = isSimpleMode ? "100%" : isMd ? "50%" : "100%";

  return (
    <m.div
      layout="position"
      initial={{ width: "100%", opacity: 0 }}
      animate={{ width: targetWidth, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-between items-center overflow-hidden"
    >
      <div className="flex gap-2">
        <ViewModeToggle />
        <div>
          <h3 className="text-nowrap truncate max-w-50 text-xl font-semibold text-[#02C380]">
            {getDayName()}
          </h3>
          <p className="text-sm font-semibold text-nowrap">
            {formatTime()} GMT+7
          </p>
        </div>
      </div>
      <Tooltip
        position="bottom"
        content={
          <div className="p-4 w-100 h-100">
            <Globe />
          </div>
        }
      >
        <div className="flex gap-1 items-center justify-center cursor-pointer">
          <MapPin className="text-[#FF8FC0]" size={20} />
          <span className="text-lg font-semibold">Indonesia</span>
        </div>
      </Tooltip>
    </m.div>
  );
}
