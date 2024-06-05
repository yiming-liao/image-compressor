import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MegneticButton = ({ children, maxDistance = 100 }: { children: React.ReactNode, maxDistance?: number }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    // const maxDistance = 100; // 設定最大拖移距離，預設為100

    useGSAP(() => {
        if (ref.current === null) return;

        const mouseMove = (e: MouseEvent) => {
            if (ref.current === null) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = ref.current.getBoundingClientRect();
            let x = clientX - (left + width / 2);
            let y = clientY - (top + height / 2);

            // 計算距離並限制最大範圍
            const distance = Math.sqrt(x * x + y * y);
            if (distance > maxDistance) {
                const ratio = maxDistance / distance;
                x *= ratio;
                y *= ratio;
            }

            gsap.to(ref.current, { y: y, duration: 0.5, ease: "elastic.out(0.1, 0.3)" });
            gsap.to(ref.current, { x: x, duration: 0.5, ease: "elastic.out(0.1, 0.3)" });
        }

        const mouseLeave = () => {
            gsap.to(ref.current, { x: 0, duration: 0.5, ease: "elastic.out(0.5, 0.3)" });
            gsap.to(ref.current, { y: 0, duration: 0.5, ease: "elastic.out(0.5, 0.3)" });
        }

        ref.current.addEventListener("mousemove", mouseMove);
        ref.current.addEventListener("mouseleave", mouseLeave);

        return () => {
            if (ref.current === null) return;
            ref.current.removeEventListener("mousemove", mouseMove);
            ref.current.removeEventListener("mouseleave", mouseLeave);
        }
    }, { scope: ref });

    return (
        <div ref={ref}>{children}</div>
    );
}
export default MegneticButton;
