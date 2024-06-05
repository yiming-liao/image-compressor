"use client"

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

const Template = ({ children }: { children: React.ReactNode }) => {
    const templateRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        gsap.fromTo(
            templateRef.current,
            { opacity: 0 },
            { opacity: 1, ease: "power2.inOut", duration: 0.3 }
        );
    }, { scope: templateRef });

    return (
        <div ref={templateRef}>
            {children}
        </div>
    )
}

export default Template;
