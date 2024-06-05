"use client"
import { useFont } from '@/context/FontContext';
import useLocaleCode from '@/hooks/useLocaleCode';
import { ThumbsUp } from 'lucide-react';
import React, { useRef, useState } from 'react';
import RippleButton from '../Button/RippleButton';
import { useTranslations } from 'next-intl';

export const Card3D: React.FC = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ transform: '' });
    const [isHovered, setIsHovered] = useState(false);

    // Mouse Move and Touch Move
    const handleMove = (clientX: number, clientY: number) => {
        if (!cardRef.current) return;
        setIsHovered(true);
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 15; //轉動幅度
        const y = -(clientY - top - height / 2) / 15; //轉動幅度
        setStyle({ transform: `rotateY(${x}deg) rotateX(${y}deg)` });
    };

    // Mouse Move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        handleMove(e.clientX, e.clientY);
    };

    // Touch Move
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
    };

    // Mouse Leave and Touch End
    const handleEnd = () => {
        setIsHovered(false);
        setStyle({ transform: 'rotateY(0deg) rotateX(0deg)' });
    };

    const handleMouseLeave = () => {
        handleEnd();
    };

    const handleTouchEnd = () => {
        handleEnd();
    };

    const { localeCode } = useLocaleCode();
    const { gloock, zhFont } = useFont();
    const fontClassName = localeCode === "en" ? gloock.className : zhFont.className;
    const t = useTranslations("About");

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                ...style,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
                perspective: "1000px",
            }}
            className='w-96 max-w-[90%] h-fit bg-gray-200 flex flex-col justify-center items-center gap-2 rounded-xl shadow-lg p-5'
        >
            <p
                className={`${zhFont.className} font-medium text-slate-600 my-3`}
                style={{
                    transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)', // 根據 isHovered 狀態設定 translateZ
                    transition: 'transform 0.1s ease-out', // 平滑過渡效果
                }}
            >
                {t("p1")}
            </p>
            <div
                className={`w-[99%] bg-gray-100 rounded-xl p-3 ${isHovered ? "shadow-lg" : ""}`}
                style={{
                    transform: isHovered ? 'translateZ(100px)' : 'translateZ(0px)', // 根據 isHovered 狀態設定 translateZ
                    transition: 'transform 0.1s ease-out', // 平滑過渡效果
                }}
            >
                <pre className={`${zhFont.className} font-medium text-slate-600 w-[300px] mx-auto`}>
                    <div className='text-wrap mb-6'>{t("p2")}</div>
                    <div className='text-wrap mb-6'>{t("p3")}</div>
                    <div className='text-wrap'>{t("p4")}</div>
                </pre>
            </div>
            <div className='flex justify-center items-center gap-10'>
                <div
                    className={`rounded-full w-12 h-12 grid place-content-center my-3 ${isHovered ? "shadow-md" : "opacity-[30%]"}`}
                    style={{
                        transform: isHovered ? 'translateZ(80px) rotate(16deg)' : 'translateZ(0px)', // 根據 isHovered 狀態設定 translateZ
                        transition: 'transform 0.1s ease-out', // 平滑過渡效果
                    }}
                >
                    <RippleButton buttonStyles={'w-12 h-12 grid place-content-center rounded-full'} rippleStyles={'w-12 h-12 bg-slate-300'} rippleScale={3} rippleDuration={1}>
                        <ThumbsUp className='text-slate-600' />
                    </RippleButton>
                </div>
                <div
                    className={`rounded-full w-12 h-12 grid place-content-center my-3 ${isHovered ? "shadow-md" : "opacity-[30%]"}`}
                    style={{
                        transform: isHovered ? 'translateZ(80px) rotate(-30deg)' : 'translateZ(0px)', // 根據 isHovered 狀態設定 translateZ
                        transition: 'transform 0.1s ease-out', // 平滑過渡效果
                    }}
                >
                    <RippleButton buttonStyles={'w-12 h-12 grid place-content-center rounded-full'} rippleStyles={'w-12 h-12 bg-slate-300'} rippleScale={3} rippleDuration={1}>
                        <ThumbsUp className='text-slate-600' />
                    </RippleButton>
                </div>
                <div
                    className={`rounded-full w-12 h-12 grid place-content-center my-3 ${isHovered ? "shadow-md" : "opacity-[30%]"}`}
                    style={{
                        transform: isHovered ? 'translateZ(80px) rotate(24deg)' : 'translateZ(0px)', // 根據 isHovered 狀態設定 translateZ
                        transition: 'transform 0.1s ease-out', // 平滑過渡效果
                    }}
                >
                    <RippleButton buttonStyles={'w-12 h-12 grid place-content-center rounded-full'} rippleStyles={'w-12 h-12 bg-slate-300'} rippleScale={3} rippleDuration={1}>
                        <ThumbsUp className='text-slate-600' />
                    </RippleButton>
                </div>
            </div>
        </div>
    );
};

export default Card3D;
