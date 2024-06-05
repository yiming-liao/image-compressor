"use client";

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

const FontWrapper = ({ children, gloockClass, zhFontClass }: { children: ReactNode, gloockClass: string, zhFontClass: string }) => {
    const pathname = usePathname();
    const segments = pathname.split('/');
    const localeCode = segments[1];

    return (
        <div className={localeCode === "en" ? gloockClass : zhFontClass}>
            {children}
        </div>
    );
};

export default FontWrapper;
