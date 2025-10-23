'use client';

import { motion } from "framer-motion";
import { FormCard } from "./formCard";

interface FormCarouselProps {
    cards: { title: string; color: string }[];
    activeIndex: number;
    handleNext: () => void;
}

export const FormCarousel = ({ cards, activeIndex, handleNext }: FormCarouselProps) => {
    return (
        <div className="relative flex justify-center items-center w-full max-w-[420px] h-[500px] mt-10">
            {cards.map((card, index) => (
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
                            color={card.color}
                            isActive={index === activeIndex}
                            onClick={handleNext}
                        />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};
