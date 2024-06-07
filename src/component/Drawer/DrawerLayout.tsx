"use client"

import { Eclipse, Languages } from "lucide-react"
import Drawer from "./Drawer"
import HoverButton from "../Button/HoverButton"
import { useRouter } from "next/navigation"
import useLocaleCode from "@/hooks/useLocaleCode"
import { useTranslations } from "next-intl"
import { useState } from "react"
import Link from "next/link"
import { useTheme } from "@/context/ThemeContext"

const DrawerLayout = () => {
    const { localeCode, segments } = useLocaleCode();
    const currentPagePath = segments.slice(2).join('/'); // 獲取當前語言後面的路徑
    const router = useRouter();
    const t = useTranslations("Navbar");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { setTheme } = useTheme();

    return (
        <div>
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                <div
                    className='w-[90%] h-48 py-2 px-4 gap-4 mx-auto rounded-xl flex flex-col items-center shadow-md mb-12
                 bg-primary border-2 border-gray-100/30
                 '>
                    <div className='self-start ml-3 mt-3'>
                        <Languages />
                    </div>

                    <div className='flex flex-col gap-3 w-full'>
                        {["English", "中文"].map((str) => (
                            <HoverButton
                                key={str}
                                pClassName={'font-semibold'}
                                buttonClassName={'w-full h-12 bg-gray-100 rounded-md text-gray-600 sm:hover:text-gray-100 active:text-white active:bg-gray-600 duration-300'}
                                spanClassName={'w-16 h-8 bg-gray-600 dark:bg-gray-800/90 rounded-full left-96'}
                                scale={1.6}
                                onClick={() => {
                                    setIsOpen(false);
                                    if (str === "English") {
                                        router.push(`/en/${currentPagePath}`);
                                    } else if (str === "中文") {
                                        router.push(`/zh/${currentPagePath}`);
                                    }
                                }}
                            >
                                {str}
                            </HoverButton>
                        ))}
                    </div>
                </div>

                <div className='w-[90%] h-32 py-2 px-4 gap-4 mx-auto rounded-xl flex flex-col items-center shadow-md mb-16 
                bg-primary border-2 border-gray-100/30'>
                    <div className='self-start ml-3 mt-3'>
                        <Eclipse />
                    </div>
                    <div className='w-full h-12 rounded-full flex-center text-slate-600 font-semibold text-sm'>
                        <HoverButton
                            pClassName={""}
                            buttonClassName={"w-full h-full rounded-l-full  bg-gray-100 rounded-md text-gray-600 sm:hover:text-gray-100 active:text-white active:bg-gray-600 duration-300"}
                            spanClassName={"w-full h-full rounded-full bg-gray-600 dark:bg-gray-800/90 left-96"}
                            scale={1.6}
                            onClick={() => setTheme("light")}
                        >
                            {localeCode === "en" ? "Light" : "亮色"}
                        </HoverButton>

                        <HoverButton
                            pClassName={""}
                            buttonClassName={"w-full h-full rounded-r-full  bg-gray-100 rounded-md text-gray-600 sm:hover:text-gray-100 active:text-white active:bg-gray-600 duration-300"}
                            spanClassName={"w-full h-full rounded-full bg-gray-600 dark:bg-gray-800/90 left-96"}
                            scale={1.6}
                            onClick={() => setTheme("dark")}
                        >
                            {localeCode === "en" ? "Dark" : "暗色"}
                        </HoverButton>
                    </div>
                </div>

                <Link
                    href={`/${localeCode}/about`}
                    onClick={() => setIsOpen(false)}
                    className='w-28 h-12 mx-auto font-semibold shadow-md active:scale-90
                     btn-primary-full flex-center border-2 border-gray-100/30'
                >
                    {t("About")}
                </Link>
            </Drawer>
        </div>
    )
}
export default DrawerLayout