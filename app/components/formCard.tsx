'use client';

import { motion } from "framer-motion";

export interface FormCardProps {
    title: string;
    color: string;
    isActive: boolean;
    onClick: () => void;
}

export const FormCard = ({ title, color, isActive, onClick }: FormCardProps) => {
    return (
        <motion.div
            onClick={onClick}
            className="rounded-3xl p-10 w-[420px] h-[500px] flex flex-col justify-start items-center px-6 text-white font-bold cursor-pointer shadow-lg"
            style={{ backgroundColor: color }}
            animate={{
                y: isActive ? 0 : 600,
                scale: isActive ? 1.05 : 1,
                opacity: 1,
            }}
            whileHover={!isActive ? { y: 550 } : {}}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
        }}
        >
            <h2 className="text-2xl">{title}</h2>
        </motion.div>
    );
};
