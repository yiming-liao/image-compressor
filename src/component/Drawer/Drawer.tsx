"use client"

import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react";
import { Menu, X } from 'lucide-react';
import useLocaleCode from "@/hooks/useLocaleCode";


const Drawer: React.FC<{
    children: React.ReactNode,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
    children,
    isOpen,
    setIsOpen
}) => {
        const ref = useRef<HTMLDivElement | null>(null);
        const drawerRef = useRef<HTMLDivElement | null>(null);
        const maskRef = useRef<HTMLDivElement | null>(null);
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        // const [isOpen, setIsOpen] = useState<boolean>(false);
        const [isAnimating, setIsAnimating] = useState<boolean>(false);
        const elementRef = useRef<Array<HTMLDivElement | null>>([]);


        const animateDrawer = async (isOpen: boolean) => {
            setIsAnimating(true);
            // Mask 動畫
            gsap.to(maskRef.current, {
                opacity: isOpen ? 1 : 0, duration: 0.2,
                onStart: () => { isOpen && gsap.set(maskRef.current, { display: "block" }) },
                onComplete: () => { !isOpen && gsap.set(maskRef.current, { display: "none" }) }
            });
            // Drawer 動畫
            gsap.to(drawerRef.current, {
                x: isOpen ? 0 : "105%", duration: 0.2, ease: "power1.out",
            });
            // Elements 動畫
            gsap.set(elementRef.current, { opacity: 0, x: 50, });
            gsap.to(elementRef.current, {
                opacity: 1, x: 0, ease: "back.out(1.5)", duration: .2, delay: .1, stagger: 0.05,
                onComplete: () => setIsAnimating(false)
            });
        };

        const handleClick = (el: string) => {
            if (isAnimating) return;
            if (el === "button") setIsOpen(prev => !prev);
            else setIsOpen(false);
        }

        useEffect(() => {
            animateDrawer(isOpen);
        }, [isOpen]);

        // 點擊其他部分立即關閉
        useGSAP(() => {
            const handleOutsideClick = (event: MouseEvent) => {
                if (!drawerRef.current || !buttonRef.current) return;
                if (!drawerRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) setIsOpen(false);
            };
            document.addEventListener("click", handleOutsideClick);
            return () => document.removeEventListener("click", handleOutsideClick);
        }, { scope: ref });

        const { localeCode } = useLocaleCode();

        return (
            <div ref={ref}>
                <div
                    ref={maskRef}
                    className="fixed w-full h-full top-0 left-0 bg-black/60 z-[60] hidden opacity-0"
                />

                {/* 主要按鈕 */}
                <button
                    ref={buttonRef}
                    className="w-20 h-12 flex-center z-[50] absolute max-sm:right-4 max-sm:top-2 right-[max(64px,6vw)] top-8
                     sm:hover:shadow-md active:scale-75 btn-primary-full "
                    onClick={() => handleClick("button")}
                >
                    <Menu className=" scale-125" />
                </button>

                <div
                    ref={drawerRef}
                    className="fixed top-0 right-0 translate-x-[105%] max-w-[50%] w-[500px] h-full z-[70] 
                    bg-gradient-to-r from-slate-100 to-slate-200 
                    dark:from-gray-500 dark:to-gray-600 
                    flex flex-col justify-between items-center py-12"
                >
                    <button
                        onClick={() => handleClick("element")}
                        className="w-20 h-10 rounded-md font-semibold flex-center mb-12 active:scale-90 duration-300 
                                   bg-slate-500 text-slate-100 shadow-[0px_0px_6px_2px_rgba(175,175,175)]
                                 dark:bg-gray-100 dark:text-gray-600 dark:shadow-[0px_0px_5px_1px_rgba(220,220,220)]"
                    >
                        <X className="scale-[85%]" />
                        <div className="mr-1">{localeCode === "en" ? "Close" : "關 閉"}</div>
                        {/* <X /> */}
                    </button>
                    {React.Children.map(children, (child, i) => (
                        <div
                            key={i}
                            ref={el => { elementRef.current[i] = el }}
                            className="w-[90%]"
                        >
                            {child}
                        </div>
                    ))}
                </div>


            </div>
        )
    }
export default Drawer