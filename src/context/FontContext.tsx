"use client"

import { createContext, useContext, ReactNode } from 'react';
import { Gloock } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from "@/context/ThemeContext";

const gloock = Gloock({ subsets: ['latin'], weight: '400' });
const zhFont = localFont({ src: '../../public/fonts/NotoSerifJP-VariableFont_wght.ttf', });

const FontContext = createContext({
    gloock,
    zhFont,
});

export const FontProvider = ({ children }: { children: ReactNode }) => {
    return (
        <FontContext.Provider value={{ gloock, zhFont }}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </FontContext.Provider>
    );
};

export const useFont = () => useContext(FontContext);
