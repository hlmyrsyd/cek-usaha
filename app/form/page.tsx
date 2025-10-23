'use client'
import { motion } from "motion/react";
import Image from "next/image";
import { FormCarousel, OpeningContainer, TransitionWrapper } from "../components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormPage() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const cards = [
        { title: "Info Awal", color: "#FCB040" },
        { title: "Legalitas", color: "#FE6131" },
        { title: "Komunitas", color: "#3D7FFD" },
        { title: "SDM", color: "#6F6DFF" },
        { title: "Produksi", color: "#029B48" },
        { title: "Operasional", color: "#FCB040" },
        { title: "Lifecycle", color: "#FE6131" },
        { title: "Profile", color: "#3D7FFD" },
        { title: "Keuangan", color: "#6F6DFF" },
        { title: "Omzet", color: "#029B48" },
        { title: "Aset", color: "#FCB040" },
        { title: "Laba", color: "#FE6131" },
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
                <div className="flex flex-col w-full h-[100vh] overflow-hidden justify-center items-center px-6 pt-12 md:px-10 md:pt-10">
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
                        <FormCarousel 
                            cards={cards} 
                            activeIndex={activeIndex} 
                            handleNext={handleNext} 
                        />
                    </div>
                </div>
            </TransitionWrapper>
        </div>
    )
        
};