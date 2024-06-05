import React, { useState, useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const RippleButton: React.FC<RippleButtonProps> = ({
    children,
    onClick,
    buttonStyles,
    rippleStyles,
    rippleScale = 3,
    rippleDuration = 1,
    disabled
}) => {
    const [ripples, setRipples] = useState<Ripple[]>([]); // 狀態：存儲所有水波紋效果的數據
    const rippleRefs = useRef<Map<number, HTMLSpanElement>>(new Map()); // 使用 Map 存儲每個水波紋的 ref

    // 這個函數負責創建一個水波紋效果
    const createRipple = (event: MouseEvent<HTMLButtonElement>) => {
        const button = event.currentTarget; // 獲取事件源元素，即按鈕
        const rect = button.getBoundingClientRect(); // 獲取按鈕的位置和尺寸
        const size = Math.max(rect.width, rect.height); // 計算水波紋的尺寸（取寬和高的最大值）
        const x = event.clientX - rect.left - size / 2; // 計算水波紋的橫坐標
        const y = event.clientY - rect.top - size / 2; // 計算水波紋的縱坐標

        const newRipple: Ripple = { // 創建一個新的水波紋對象
            id: Date.now(), // 使用當前時間戳作為唯一標識
            x,
            y,
            size
        };

        // 更新狀態，添加新的水波紋
        setRipples((oldRipples) => [...oldRipples, newRipple]);
    };

    // 監聽 ripples 狀態的變化，執行動畫效果
    useGSAP(() => {
        ripples.forEach((ripple) => {
            const rippleElement = rippleRefs.current.get(ripple.id); // 獲取當前水波紋的 DOM 元素
            if (!rippleElement || rippleElement.getAttribute('data-animated')) return; // 確保動畫只執行一次
            rippleElement.setAttribute('data-animated', 'true'); // 標記已執行動畫
            gsap.fromTo(rippleElement,
                { opacity: 1, scale: 0 }, // 初始透明度和縮放
                {
                    opacity: 0,
                    scale: rippleScale,
                    duration: rippleDuration, // 動畫持續時間
                    onComplete: () => {
                        setRipples((oldRipples) => oldRipples.filter((r) => r.id !== ripple.id)); // 動畫完成後移除水波紋
                    }
                }
            );
        });
    }, [ripples]); // 依賴 ripples 狀態

    return (
        <button
            className={`relative overflow-hidden ${buttonStyles}`}
            onClick={(e) => { createRipple(e); onClick && onClick(e); }}
            disabled={disabled}
        >
            <div className="absolute inset-0">
                {ripples.map(({ id, x, y, size }) => (
                    <span
                        key={id}
                        ref={(el) => {
                            if (el) {
                                rippleRefs.current.set(id, el); // 新增水波紋到 Map 中
                            } else {
                                rippleRefs.current.delete(id); // 移除已完成動畫的水波紋
                            }
                        }}
                        className={`absolute rounded-full ${rippleStyles}`}
                        style={{
                            top: y,
                            left: x,
                            width: size,
                            height: size,
                        }}
                    />
                ))}
            </div>
            <div className='relative'>
                {children}
            </div>
        </button>
    );
};

export default RippleButton;

interface Ripple {
    id: number; // 標識 ID
    x: number;  // 水波紋的 x 坐標
    y: number;  // 水波紋的 y 坐標
    size: number; // 水波紋的大小
}

interface RippleButtonProps {
    children: React.ReactNode; // 子元素
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void; // 點擊事件
    buttonStyles: string; // 按鈕的樣式
    rippleStyles: string; // 水波紋的樣式
    rippleScale: number;
    rippleDuration: number;
    disabled?: boolean;
}
