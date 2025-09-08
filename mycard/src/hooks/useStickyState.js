import { useEffect, useState } from "react";

export function useStickyState(defaultValue, key, overrideLocalStorage = false) {
    const [value, setValue] = useState(() => {
        if (overrideLocalStorage) {
            return defaultValue;
        } else {
            const stickyValue = window.localStorage.getItem(key);
            return stickyValue !== null
                ? JSON.parse(stickyValue)
                : defaultValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export function useSessionStickyState(defaultValue, key, overrideSessionState = false) {
    const [value, setValue] = useState(() => {
        if (overrideSessionState) {
            return defaultValue;
        } else {
            const stickyValue = window.sessionStorage.getItem(key);
            return stickyValue !== null
                ? JSON.parse(stickyValue)
                : defaultValue;
        }
    });

    useEffect(() => {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
