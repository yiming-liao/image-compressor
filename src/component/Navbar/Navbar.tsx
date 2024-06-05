"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import HoverButton from "../Button/HoverButton";
import { useRouter } from "next/navigation";
import RippleButton from "../Button/RippleButton";
import { useTranslations } from "next-intl";
import { Languages } from 'lucide-react';
import useLocaleCode from "@/hooks/useLocaleCode";


const Navbar: React.FC = () => {
    const { localeCode, segments } = useLocaleCode();
    const currentPagePath = segments.slice(2).join('/'); // 獲取當前語言後面的路徑
    const router = useRouter();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = useTranslations("Navbar");

    return (
        <div className={`z-50 fixed left-[50vw] transform -translate-x-1/2 ${isScrolled ? 'top-0  w-[100vw] h-16' : 'top-4 w-[90vw] h-20 rounded-full'} 
        transition-all duration-200 bg-white shadow-md bg-opacity-60 forNavbar max-sm:h-16 max-sm:top-0 max-sm:w-[100vw] max-sm:rounded-none`}>
            <div className="w-full h-full px-7 flex justify-between items-center">
                <Link
                    href={`/${localeCode}`}
                    className="w-10 h-10 scale-125 rounded-full hover:shadow-md"
                >
                    <RippleButton buttonStyles={"w-full h-full rounded-full text-slate-600"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
                        🏠
                    </RippleButton>
                </Link>

                <div className="flex justify-center items-center gap-6">
                    <Link
                        href={`/${localeCode}/about`}
                        className="w-20 h-12  hover:shadow-md flex justify-center items-center rounded-full font-semibold"
                    >
                        <RippleButton buttonStyles={"w-full h-full rounded-full text-slate-600"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
                            {t("About")}
                        </RippleButton>
                    </Link>

                    <Dropdown
                        buttonText={< Languages />}
                        buttonClassName="w-12 h-12 bg-slate-50 hover:shadow-md rounded-full font-semibold text-slate-600 active:shadow-none"
                        divClassName="right-[50%] translate-x-[30%] top-[54px] justify-center gap-2 rounded-md py-2 px-2 shadow-xl bg-slate-200"
                    >
                        {["English", "中文"].map((el, idx) => (
                            <HoverButton
                                onClick={() => {
                                    if (el === "English") {
                                        router.push(`/en/${currentPagePath}`);
                                    } else if (el === "中文") {
                                        router.push(`/zh/${currentPagePath}`);
                                    }
                                }}
                                key={idx}
                                pClassName={"text-slate-600 group-hover:text-white duration-75 font-semibold"}
                                buttonClassName={"w-20 h-10 rounded-md bg-white active:shadow-inner"}
                                spanClassName={"bg-slate-900/80 rounded-full"}
                                scale={1.6}
                            >
                                {el}
                            </HoverButton>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}
export default Navbar