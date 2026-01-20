import { useEffect, useRef } from "react";

export interface UseSecretHotkeysOptions {
  timeout?: number;
  ignoreInput?: boolean;
}

function isInputElement(target: EventTarget | null) {
  if (!target || typeof (target as HTMLElement).tagName !== "string")
    return false;
  const tag = (target as HTMLElement).tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    (target as HTMLElement).isContentEditable
  );
}

export function useSecretHotkeys(
  hotkeys: string,
  onTrigger: (hotkey: string) => void,
  options?: UseSecretHotkeysOptions
) {
  const inputBufferRef = useRef<string[]>([]);
  const hotkeysLower = hotkeys.toLowerCase();
  const bufferLength = hotkeys.length;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (options?.ignoreInput && isInputElement(event.target)) {
      return;
    }

    const buffer = inputBufferRef.current;
    buffer.push(event.key);
    if (buffer.length > bufferLength) buffer.shift();

    if (buffer.join("").toLowerCase() === hotkeysLower) {
      onTrigger(hotkeys);
      buffer.length = 0;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hotkeysLower, bufferLength, onTrigger, options]);
}
