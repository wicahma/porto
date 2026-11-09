"use client";
import Globe from "@/components/atoms/animations/Globe";
import Tooltip from "@/components/atoms/popups/Tooltip";
import { isMdUp } from "@/utils/helper/responsive";
import { MapPin } from "lucide-react";
import { m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Infographic() {
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

  const pathname = usePathname();
  const isArticlePage = pathname.startsWith("/article");
  const targetWidth = "100%";
  return (
    <m.div
      layout="position"
      initial={{ width: "100%", opacity: 0 }}
      animate={{ width: targetWidth, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-between items-center"
    >
      <div className="flex gap-2 items-center">
        <div>
          <h3 className="text-nowrap truncate max-w-50 text-xl font-semibold text-[var(--signal)]">
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
          <MapPin className="text-[var(--pink)]" size={20} />
          <span className="text-lg font-semibold">Indonesia</span>
        </div>
      </Tooltip>
    </m.div>
  );
}
