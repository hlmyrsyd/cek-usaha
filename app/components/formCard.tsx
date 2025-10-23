'use client';

import { motion } from "framer-motion";
import { FormQuestion } from ".";

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
            <div className="w-full font-normal flex flex-col gap-4">
                <div>
                    <h2 className="text-2xl font-black uppercase">{title}</h2>
                    <p className="text-sm">{desc}</p>
                </div>
                <FormQuestion title={title} onNext={onNext} />
            </div>
            

            {/* Only show Next button on the active card */}
            {/* {isActive && (
                

                <div className="w-full flex justify-end">
                    <motion.button
                        className=" bg-[#1E1E1E] px-10 py-2 rounded-lg font-bold cursor-pointer"
                        style={{
                            color: color
                        }}
                        initial={{y: 10, opacity: 0}}
                        animate={{ y: 0, opacity: 1}}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                    >
                        Next
                    </motion.button>
                </div>
            )} */}
        </motion.div>
    );
};
