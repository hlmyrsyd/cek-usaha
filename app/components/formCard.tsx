'use client';

import { motion } from "framer-motion";
import { FormQuestion } from ".";
import { useEffect, useRef, useState } from "react";

export interface FormCardProps {
    title: string;
    desc: string;
    color: string;
    isActive: boolean;
    isPrev?: boolean;
    onNext: () => void;
    onPrev: () => void;
}

export const FormCard = ({
    title,
    desc,
    color,
    isActive,
    isPrev,
    onNext,
    onPrev,
}: FormCardProps) => {
    const handleClick = () => {
        if (isPrev) onPrev();
    };

    const isScrollableCard = ["Operasional", "Keuangan"].includes(title);

    const contentRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        if (!isScrollableCard) {
            setIsScrollable(false);
            return;
        }
        const el = contentRef.current;
        if (!el) return;

        const checkScrollable = () => {
            if (!el) return;
            setIsScrollable(el.scrollHeight > el.clientHeight);
        };

        checkScrollable();
        
        window.addEventListener("resize", checkScrollable);
        return () => window.removeEventListener("resize", checkScrollable);
    }, [title, isScrollableCard]);


    useEffect(() => {
        if (!isScrollableCard) return;

        const el = contentRef.current;
        if (!el) return;

        const handleScroll = () => {
        const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
        setIsBottom(atBottom);
        };

        el.addEventListener("scroll", handleScroll);
        return () => el.removeEventListener("scroll", handleScroll);
    }, [isScrollableCard]);

    return (
        <motion.div
            onClick={handleClick}
            className="rounded-3xl p-8 w-[420px] h-[700px] flex flex-col justify-between items-center text-[#1E1E1E] font-bold cursor-pointer shadow-lg"
            style={{
                backgroundColor: color,
                cursor: isPrev ? "pointer" : isActive ? "default" : "not-allowed",
                opacity: isActive || isPrev ? 1 : 0.5,
            }}
            initial={{ y: 600, opacity: 0 }}
            animate={{
                y: isActive ? 0 : isPrev ? 0 : 700,
                scale: isActive ? 1.05 : 1,
                opacity: 1,
            }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
            }}
        >
            {/* Overlay for non-active cards */}
            {!isActive && (
                <div
                    className={`absolute inset-0 bg-white/70 flex items-center justify-center text-center text-[#1E1E1E] font-semibold text-lg transition-all group duration-200 z-10`}
                >
                    {isPrev && (
                        <span className="bg-white rounded-2xl p-4 backdrop-blur-2xl opacity-0 group-hover:opacity-100 transition-opacity text-[#1E1E1E] z-50">
                            Masih belum yakin dengan jawabanmu? <br/><span className="italic font-bold text-xl">Click Here</span>
                        </span>
                    )}
                </div>
            )}

            {/* Main content */}
            <div className="relative w-full h-full overflow-hidden font-normal flex flex-col gap-4">
                <div>
                <h2 className="text-2xl font-black uppercase">{title}</h2>
                <p className="text-sm">{desc}</p>
                </div>

                {/* Scrollable area only for Operasional */}
                {isScrollableCard ? (
                <div ref={contentRef} className="relative h-full overflow-y-auto pr-2">
                    <FormQuestion color={color} title={title} onNext={onNext} />

                    {/* "Scroll for more" text above gradient */}
                    {isScrollable && !isBottom && (
                    <div className="absolute bottom-10 left-0 w-full flex justify-center text-lg font-medium text-[#1E1E1E]/70 animate-pulse z-20">
                        Scroll for more ↓
                    </div>
                    )}

                    {/* Fade masks only if scrollable */}
                    {isScrollable && (
                    <div
                        className={`absolute bottom-0 left-0 w-full h-40 pointer-events-none transition-opacity duration-300 z-10 ${
                            isBottom ? "opacity-0" : "opacity-100"
                        }`}
                        style={{
                            background: `linear-gradient(to top, ${color}, ${color}CC, transparent)`,
                        }}
                    />
                    )}
                </div>
                ) : (
                // Non-operasional cards: no scroll
                <div className="relative h-full">
                    <FormQuestion color={color} title={title} onNext={onNext} />
                </div>
                )}
            </div>
        </motion.div>
    );
};
