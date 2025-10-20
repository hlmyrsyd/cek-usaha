'use client'
import { motion } from "motion/react";
import Image from "next/image";
import { OpeningContainer, TransitionWrapper } from "../components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormPage() {
        const [isTransitioning, setIsTransitioning] = useState(false);
        const router = useRouter();
    
        const handleTransition = (route: string) => {
            setIsTransitioning(true);
            setTimeout(() => {
            router.push(route);
            }, 1300); // Control the transition timing
        };
    
    return (    
        <div>
            <OpeningContainer title={"Sudah siap isi Formnya?"} />
            <TransitionWrapper isTransitioning={isTransitioning}>
                <div className="flex flex-col w-full h-[100vh] justify-center items-center px-6 py-12 md:p-10">
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
                        <div>
                            Test
                        </div>
                    </div>
                </div>
            </TransitionWrapper>
        </div>
    )
        
};
