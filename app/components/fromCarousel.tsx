'use client';

import { motion } from "framer-motion";
import { FormCard } from "./formCard";

interface FormCarouselProps {
    cards: { title: string; desc: string; color: string }[];
    activeIndex: number;
    handleNext: () => void;
    handlePrev: () => void;
}

export const FormCarousel = ({ cards, activeIndex, handleNext, handlePrev }: FormCarouselProps) => {
    return (
        <div className="relative flex justify-center items-center w-full max-w-[420px] h-[500px] mt-10">
            {cards.map((card, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === activeIndex - 1;

                return (
                    <motion.div
                        key={index}
                        className="absolute"
                        animate={{
                            x: (index - activeIndex) * 450, // move left/right depending on active index
                            scale: index === activeIndex ? 1 : 0.9,
                            zIndex: index === activeIndex ? 10 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 20,
                        }}
                    >
                        <motion.div
                            initial={{ y: 800 }}
                            animate={{ y: 0 }}
                            transition={{
                                delay: 1.5,
                                ease: [0.27, 0, 0.2, 0.99],
                                duration: 1.5,
                            }}
                        >
                            <FormCard
                                title={card.title}
                                desc={card.desc}
                                color={card.color}
                                isActive={isActive}
                                isPrev={isPrev}
                                onNext={handleNext}
                                onPrev={handlePrev}
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};
