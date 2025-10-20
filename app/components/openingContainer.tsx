'use client';

import { motion } from "framer-motion";

interface OpeningContainerProps {
    title: string;
    children?: React.ReactNode;
}

export const OpeningContainer = ({ 
    title, 
    children }: OpeningContainerProps) => (
    <motion.div
        className="fixed top-0 left-0 w-full h-full z-50"
        style={{ backgroundColor: "#FCB040" }}
        initial={{ 
            y: 0,
            borderBottomLeftRadius: "0%", 
            borderBottomRightRadius: "0%",
        }}
        animate={{ 
            y: "-100%",            
            borderBottomLeftRadius: "100% 100%",
            borderBottomRightRadius: "100% 100%", 
        }}
        transition={{ duration: 0.8, delay: 0.8, ease: "circInOut" }}
    >
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            className="flex h-full w-full justify-center items-center text-6xl font-bold"
        >
            <h1>{title}</h1>
        </motion.div>
        {children}
    </motion.div>
);