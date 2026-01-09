"use client";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import Globe from "@/components/atoms/Globe";
import Tooltip from "@/components/atoms/Tooltip";

export default function Infographic() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Jakarta",
    });
  };

  const getDayName = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "Asia/Jakarta",
    });
  };

  return (
    <div className="flex justify-between w-full">
      <div>
        <h3 className="text-xl font-semibold text-[#02C380]">{getDayName()}</h3>
        <p className="text-sm font-semibold">{formatTime()} GMT+7</p>
      </div>
      <Tooltip
        position="bottom"
        content={
          <div className="p-4 w-[400px] h-[400px]">
            <Globe />
          </div>
        }
      >
        <div className="flex gap-1 items-center justify-center cursor-pointer">
          <MapPin className="text-[#FF8FC0]" size={20} />
          <span className="text-lg font-semibold">Indonesia</span>
        </div>
      </Tooltip>
    </div>
  );
}
