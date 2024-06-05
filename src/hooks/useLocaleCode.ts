// hooks/useLocaleCode.ts

"use client";

import { usePathname } from "next/navigation";

const useLocaleCode = () => {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const localeCode = segments[1];
    return { localeCode, segments };
};

export default useLocaleCode;
