'use client'
import { motion } from "motion/react";
import Image from "next/image";
import { FormCard, OpeningContainer, TransitionWrapper } from "../components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormPage() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const cards = [
        { title: "Info Awal", color: "#A36D2A" },
        { title: "Legalitas", color: "#FC4F1E" },
        { title: "Komunitas", color: "#153D8A" },
        { title: "SDM", color: "#3B2676" },
    ];

    const handleTransition = (route: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
        router.push(route);
        }, 1300); // Control the transition timing
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % cards.length);
    };

    return (    
        <div>
            <OpeningContainer title={"Sudah siap isi Formnya?"} />
            <TransitionWrapper isTransitioning={isTransitioning}>
                <div className="flex flex-col w-full h-[100vh] justify-center items-center px-6 pt-12 md:px-10 md:pt-10">
                    <motion.div
                        initial={{
                            y: -100,
                            opacity: 0
                        }}
                        animate={{
                            y: 0,
                            opacity: 1
                        }}
                        transition={{
                            delay: 1,
                            ease: 'circInOut',
                            duration: 1.2
                        }}
                        whileHover={{
                            rotate: -360,
                            transition: {
                                duration: 1.2,
                                ease: 'circInOut'
                            }
                        }}
                        onClick={() => handleTransition('/')}
                    >
                        <Image 
                            src={"/Logo.png"}
                            width={50}
                            height={50} 
                            alt={"Cek Usaha Logo"} 
                        />
                    </motion.div>
                    <div 
                        className="flex flex-col w-full h-full justify-between md:justify-center items-center gap-10"
                    >
                        {/* Carousel Section */}
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
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                <FormCard
                                    title={card.title}
                                    color={card.color}
                                    isActive={index === activeIndex}
                                    onClick={handleNext}
                                />
                            </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </TransitionWrapper>
        </div>
    )
        
};
