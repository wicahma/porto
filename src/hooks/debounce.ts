import { useEffect, useState } from "react";
import { unknown } from "zod";

interface IDebounceOpt<D = unknown> {
    delay: number;
    bypass: boolean;
    callback: (value: D) => void;
}

export const useDebounce = <T = unknown>(
    value: T,
    { bypass = false, delay = 500, callback }: Partial<IDebounceOpt<T>>
) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            callback?.(value);
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return bypass ? value : debouncedValue;
};
