"use client"

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";

const HoverDropdown: React.FC<{
    buttonText: string,
    buttonClassName: string,
    divClassName: string,
    children: React.ReactNode,
}> = ({
    buttonText,
    buttonClassName,
    divClassName,
    children,
}) => {
        const ref = useRef<HTMLDivElement | null>(null);
        const dropdownRef = useRef<HTMLDivElement | null>(null);
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const optionRef = useRef<Array<HTMLDivElement | null>>([]);
        const [isOutside, setIsOutside] = useState<{ button: boolean, dropdown: boolean }>({ button: true, dropdown: true });

        const { contextSafe } = useGSAP({ scope: ref });

        const tl = useRef(gsap.timeline({ paused: true, reversed: true }));

        // 設置時間軸動畫
        useGSAP(() => {
            tl.current
                .set(dropdownRef.current, { display: "flex" })
                .fromTo(dropdownRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
                .fromTo(optionRef.current, { opacity: 0, y: -20, skewX: 30 }, { opacity: 1, skewX: 0, y: 0, ease: "back.out(0.9)", duration: .2, stagger: 0.05 }, 0)
                .pause(0);
        }, { scope: ref });

        // 滑鼠移進按鈕
        const handleMouseEnter = contextSafe(() => {
            setIsOutside(prev => ({ ...prev, button: false }));
            tl.current.play(); // 正向播放動畫
        });

        // 關閉選單
        const closeDropdown = contextSafe(() => {
            tl.current.reverse(); // 反向播放動畫
        });

        // 判斷滑鼠是否在按鈕與選單之外
        useEffect(() => {
            if (isOutside.button && isOutside.dropdown) closeDropdown();
        }, [isOutside]);

        return (
            <div className="relative" ref={ref}>
                <button
                    ref={buttonRef}
                    className={`${buttonClassName}`}
                    onClick={() => closeDropdown()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setIsOutside(prev => ({ ...prev, button: true }))}
                >
                    {buttonText}
                </button>

                <div ref={dropdownRef}
                    className={`absolute hidden overflow-hidden ${divClassName}`}
                    onMouseEnter={() => setIsOutside(prev => ({ ...prev, dropdown: false }))}
                    onMouseLeave={() => setIsOutside(prev => ({ ...prev, dropdown: true }))}
                >
                    {React.Children.map(children, (child, i) => (
                        <div
                            key={i}
                            ref={el => { optionRef.current[i] = el }}
                            onClick={closeDropdown} // 當選擇選項時也關閉菜單
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

export default HoverDropdown;
