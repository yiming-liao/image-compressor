"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useLocaleCode from "@/hooks/useLocaleCode";
import { useFont } from "@/context/FontContext";
import Image from "next/image";
import RippleButton from "../Button/RippleButton";

const Navbar: React.FC = () => {
    const { localeCode } = useLocaleCode();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const { gloock, zhFont } = useFont();
    const fontClassName = localeCode === "en" ? gloock.className : zhFont.className;

    const tTitle = useTranslations("Home");

    return (
        <div className={`z-50 fixed left-[50vw] -translate-x-1/2 ${isScrolled ? 'top-0  w-[100vw] h-16' : 'top-4 w-[90vw] h-20 rounded-full px-8 max-sm:px-4'} 
       bg-opacity-60 forNavbar max-sm:h-16 max-sm:top-0 max-sm:w-[100vw] max-sm:rounded-none
         bg-primary sm:shadow-[0px_0px_8px_1px_rgba(220,220,220)] max-sm:shadow-md
        `}>
            <div className="w-full h-full flex justify-between items-center">

                <Link
                    href={`/${localeCode}`}
                    className="w-16 mr-auto h-10 scale-125 rounded-full sm:hover:shadow-md flex-center ml-2 duration-300"
                >
                    <RippleButton buttonStyles={"w-full h-full rounded-full text-slate-600 flex-center"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
                        <Image src="/1.png" alt="logo" width={24} height={24} className=" rounded-md drop-shadow-md" />
                    </RippleButton>
                </Link>

                <Link href={`/${localeCode}`} className="w-3/5 flex-center">
                    <h1 className={`${fontClassName} font-semibold max-sm:text-xl text-2xl text-slate-700 dark:text-gray-100 
                        flex-center max-w-max min-w-60 h-[54px] rounded-full sm:hover:shadow-md active:scale-90 duration-300`}>
                        <RippleButton buttonStyles={"w-64 h-[54px] rounded-full flex-center"} rippleStyles={"sm:bg-slate-300"} rippleScale={3} rippleDuration={1}>
                            {tTitle('title')}
                        </RippleButton>
                    </h1>
                </Link>


                <div className="flex w-1/5 justify-center items-center gap-6">
                </div>
            </div>
        </div>
    )
}
export default Navbar





// "use client"
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import Dropdown from "../Dropdown/Dropdown";
// import HoverButton from "../Button/HoverButton";
// import { useRouter } from "next/navigation";
// import RippleButton from "../Button/RippleButton";
// import { useTranslations } from "next-intl";
// import { Eclipse, Languages } from 'lucide-react';
// import useLocaleCode from "@/hooks/useLocaleCode";
// import Drawer from "../Drawer/Drawer";
// import { useTheme } from "@/context/ThemeContext";
// import { useFont } from "@/context/FontContext";





// return (
//     <div className={`z-50 fixed left-[50vw] transform -translate-x-1/2 ${isScrolled ? 'top-0  w-[100vw] h-16' : 'top-4 w-[90vw] h-20 rounded-full'}
//     transition-all duration-200 bg-white shadow-md bg-opacity-60 forNavbar max-sm:h-16 max-sm:top-0 max-sm:w-[100vw] max-sm:rounded-none`}>
//         <div className="w-full h-full px-7 flex justify-between items-center">
//             <Link
//                 href={`/${localeCode}`}
//                 className="w-10 h-10 scale-125 rounded-full hover:shadow-md"
//             >
//                 <RippleButton buttonStyles={"w-full h-full rounded-full text-slate-600"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
//                     🏠
//                 </RippleButton>
//             </Link>

//             <div className="flex justify-center items-center gap-6">
//                 <Link
//                     href={`/${localeCode}/about`}
//                     className="w-20 h-12  hover:shadow-md flex justify-center items-center rounded-full font-semibold"
//                 >
//                     <RippleButton buttonStyles={"w-full h-full rounded-full text-slate-600"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
//                         {t("About")}
//                     </RippleButton>
//                 </Link>

//                 <Dropdown
//                     buttonText={< Languages />}
//                     buttonClassName="w-12 h-12 bg-slate-50 hover:shadow-md rounded-full font-semibold text-slate-600 active:shadow-none"
//                     divClassName="right-[50%] translate-x-[30%] top-[54px] justify-center gap-2 rounded-md py-2 px-2 shadow-xl bg-slate-200"
//                 >
//                     {["English", "中文"].map((el, idx) => (
//                         <HoverButton
//                             onClick={() => {
//                                 if (el === "English") {
//                                     router.push(`/en/${currentPagePath}`);
//                                 } else if (el === "中文") {
//                                     router.push(`/zh/${currentPagePath}`);
//                                 }
//                             }}
//                             key={idx}
//                             pClassName={"text-slate-600 group-hover:text-white duration-75 font-semibold"}
//                             buttonClassName={"w-20 h-10 rounded-md bg-white active:shadow-inner"}
//                             spanClassName={"bg-slate-900/80 rounded-full"}
//                             scale={1.6}
//                         >
//                             {el}
//                         </HoverButton>
//                     ))}
//                 </Dropdown>
//             </div>
//         </div>
//     </div>
// )