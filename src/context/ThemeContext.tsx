import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from "react";

// 定義 ThemeContext 的型別
interface ThemeContextType {
    theme: "light" | "dark";
    setTheme: Dispatch<SetStateAction<"light" | "dark">>;
    toggleTheme?: () => void;
}

// 創建 ThemeContext，並提供初始值 null
const ThemeContext = createContext<ThemeContextType | null>(null);

// ThemeProvider 組件
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        // 檢查 local storage 中是否有已存的 theme 設定
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return (savedTheme === "light" || savedTheme === "dark") ? savedTheme : "light";
        }
        return "light";
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        // 將 theme 存入 local storage
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// 自訂 Hook 來使用 ThemeContext
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === null) {
        throw new Error("useTheme 必須在 ThemeProvider 內使用");
    }
    return context;
};
