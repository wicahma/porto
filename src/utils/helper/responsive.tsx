const isWindowDefined = () => typeof window !== "undefined";

export const isXsUp = () =>
  isWindowDefined() ? window?.innerWidth >= 480 : false;

export const isSmUp = () =>
  isWindowDefined() ? window?.innerWidth >= 640 : false;

export const isMdUp = () =>
  isWindowDefined() ? window?.innerWidth >= 768 : false;

export const isLgUp = () =>
  isWindowDefined() ? window?.innerWidth >= 1024 : false;

export const isXlUp = () =>
  isWindowDefined() ? window?.innerWidth >= 1280 : false;

export const is2xlUp = () =>
  isWindowDefined() ? window?.innerWidth >= 1536 : false;
