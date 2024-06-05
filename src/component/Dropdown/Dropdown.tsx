import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React from "react";
import RippleEffect from "../RippleEffect";

const Dropdown: React.FC<{
    buttonText: React.ReactNode,
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
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const dropdownRef = useRef<HTMLDivElement | null>(null);
        const buttonRef = useRef<HTMLButtonElement | null>(null);
        const optionRef = useRef<Array<HTMLDivElement | null>>([]);
        const animatingRef = useRef<boolean>(false);

        const { contextSafe } = useGSAP({ scope: ref });

        const handleClick = contextSafe(() => {
            if (animatingRef.current) return;  // 防止在動畫進行中重複觸發
            animatingRef.current = true;
            if (isOpen) return closeDropdown();
            setIsOpen(true);

            // 選單動畫
            gsap.set(dropdownRef.current, { display: "flex" });
            gsap.fromTo(dropdownRef.current, { opacity: 0 }, {
                opacity: 1, duration: 0.2,
                onComplete: () => { animatingRef.current = false; }
            });
            // 按鈕動畫
            gsap.set(optionRef.current, { opacity: 0, x: 50, });
            gsap.to(optionRef.current, { opacity: 1, x: 0, ease: "back.out(0.9)", duration: .2, stagger: 0.05, });
        });

        const closeDropdown = contextSafe(() => {
            // 選單動畫
            gsap.to((dropdownRef.current), {
                opacity: 0, duration: 0.2, onComplete: () => {
                    gsap.set(dropdownRef.current, { display: "none" });
                    animatingRef.current = false;
                }
            });
            setIsOpen(false);
        });

        useEffect(() => {
            const handleOutsideClick = (event: MouseEvent) => {
                if (!dropdownRef.current || !buttonRef.current) return;
                if (!dropdownRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
                    closeDropdown();
                }
            };
            document.addEventListener("mousedown", handleOutsideClick);
            return () => document.removeEventListener("mousedown", handleOutsideClick);
        }, [closeDropdown]);

        return (
            <div className="relative" ref={ref}>
                <button
                    ref={buttonRef}
                    className={`${buttonClassName}`}
                    onClick={handleClick}
                >
                    <RippleEffect buttonStyles={"w-full h-full rounded-full"} rippleStyles={"bg-slate-300"} rippleScale={3} rippleDuration={1}>
                        {buttonText}
                    </RippleEffect>
                </button>

                <div ref={dropdownRef}
                    className={`absolute hidden overflow-hidden flex-col ${divClassName}`}

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

export default Dropdown;

