import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const HoverButton: React.FC<{
    children: React.ReactNode,
    pClassName: string,
    buttonClassName: string,
    spanClassName: string,
    scale: number,
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // 點擊事件
}> = ({
    children,
    pClassName,
    buttonClassName,
    spanClassName,
    scale = 1.6,
    onClick,
    disabled
}) => {
        const heverButtonRef = useRef<HTMLButtonElement>(null);
        const circleRef = useRef<HTMLSpanElement>(null);

        // 統一的位置和尺寸計算函數
        const calculatePositionSize = (event: React.MouseEvent<HTMLButtonElement>) => {
            const button = event.currentTarget;
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            return { x, y, size };
        };

        const { contextSafe } = useGSAP({ scope: heverButtonRef });

        const handleMouseEnter = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {
            const { x, y, size } = calculatePositionSize(event);
            if (circleRef.current) {
                gsap.set(circleRef.current, {
                    width: size,
                    height: size,
                    top: y,
                    left: x,
                    opacity: 0,
                });
                gsap.to(circleRef.current, {
                    opacity: 1,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            }
        });

        const handleMouseLeave = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {
            const { x, y, size } = calculatePositionSize(event);
            const rect = event.currentTarget.getBoundingClientRect();
            const targetX = event.clientX < rect.left ? -size : event.clientX > rect.right ? rect.width : x;
            const targetY = event.clientY < rect.top ? -size : event.clientY > rect.bottom ? rect.height : y;
            if (circleRef.current) {
                gsap.to(circleRef.current, {
                    top: targetY,
                    left: targetX,
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power1.out',
                });
            }
        });

        const handleMouseMove = contextSafe((event: React.MouseEvent<HTMLButtonElement>) => {
            const { x, y } = calculatePositionSize(event);
            if (circleRef.current) {
                gsap.to(circleRef.current, {
                    top: y,
                    left: x,
                    scale: scale,
                    duration: 0.2,
                    ease: 'power1.out'
                });
            }
        });

        return (
            <button
                onClick={onClick}
                ref={heverButtonRef}
                className={`relative overflow-hidden group ${buttonClassName}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                disabled={disabled}
            >
                <span
                    ref={circleRef}
                    className={`absolute ${spanClassName}`}
                    style={{ pointerEvents: 'none' }}
                />
                <div className={`relative z-10 ${pClassName}`}>
                    {children}
                </div>
            </button>
        );
    };

export default HoverButton;
