import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export const useMainPageHooks = () => {
  const pathname = usePathname();
  const lastDetailPageRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  const isInitialLoad = isFirstRender.current;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }

    if (lastDetailPageRef.current && pathname === "/") {
      setTimeout(() => {
        const id = `mainpage-card-${lastDetailPageRef.current}`;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start",
          });
        }
      }, 1500);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        lastDetailPageRef.current = pathname;
      }, 300);
    }
  }, [pathname]);

  return {
    pathname,
    isInitialLoad,
  };
};
