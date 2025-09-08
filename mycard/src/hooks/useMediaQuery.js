import { useState, useEffect } from "react";

const useMediaQuery = (query) => {
    const [value, setValue] = useState(false)

    useEffect(() => {
        function onChange(event) {
            setValue(event.matches)
        }

        const result = matchMedia(query)
        result.addEventListener("change", onChange)
        setValue(result.matches)

        return () => result.removeEventListener("change", onChange)
    }, [query])

    return value
}

export default useMediaQuery;

export const useIsDesktop = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)')

    return isDesktop
}

export const useIsMobile = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')

    return isMobile
}