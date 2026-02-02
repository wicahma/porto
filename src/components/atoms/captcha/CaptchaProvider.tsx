"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface CaptchaContextType {
  captchaToken: string | null;
  setCaptchaToken: (token: string | null) => void;
  resetCaptcha: () => void;
}

const CaptchaContext = createContext<CaptchaContextType | undefined>(undefined);

export const useCaptcha = () => {
  const context = useContext(CaptchaContext);
  if (!context) {
    throw new Error("useCaptcha must be used within a CaptchaProvider");
  }
  return context;
};

interface CaptchaProviderProps {
  children: ReactNode;
  siteKey: string;
  enabled?: boolean;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
  className?: string;
}

export const CaptchaProvider: React.FC<CaptchaProviderProps> = ({
  children,
  siteKey,
  enabled = true,
  theme = "dark",
  size = "normal",
  className = "",
}) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [key, setKey] = useState(0);

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setKey((prev) => prev + 1);
  };

  const contextValue: CaptchaContextType = useMemo(
    () => ({
      captchaToken,
      setCaptchaToken,
      resetCaptcha,
    }),
    [captchaToken],
  );

  return (
    <CaptchaContext.Provider value={contextValue}>
      {children}
      {enabled && siteKey && (
        <div className={`flex justify-center mt-4 ${className}`}>
          <Turnstile
            key={key}
            siteKey={siteKey}
            onSuccess={(token) => setCaptchaToken(token)}
            onError={() => setCaptchaToken(null)}
            onExpire={() => setCaptchaToken(null)}
            options={{
              theme,
              size,
            }}
          />
        </div>
      )}
    </CaptchaContext.Provider>
  );
};
