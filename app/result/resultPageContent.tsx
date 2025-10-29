'use client'
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "motion/react";
import { ScoreResult } from "../utils/calculateScores";
import { OpeningContainer, TransitionWrapper } from "../components";
import { useState } from "react";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const namaPemilik = searchParams.get("namaPemilik");
    const rawScoreData = searchParams.get("scoreData");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    let scoreData: ScoreResult = { totalScore: 0, sectionScores: {} };
    try {
        const parsed = JSON.parse(rawScoreData || '{}');
        if (
        parsed &&
        typeof parsed === 'object' &&
        'totalScore' in parsed &&
        'sectionScores' in parsed
        ) {
        scoreData = parsed as ScoreResult;
        }
    } catch (e) {
        console.error('❌ Failed to parse scoreData:', e);
    }

    const flatScores: Record<string, number> = scoreData.sectionScores;
    const totalScore = scoreData.totalScore;

    const handleTransition = (route: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
        router.push(route);
        }, 1300); // Control the transition timing
    };


    return (
        <div>
            <OpeningContainer title={"Menghitung Score UMKM"} />
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
                    <div className="flex flex-col w-full h-full justify-between md:justify-center items-center gap-10">
                        <motion.h1
                            className="text-3xl font-bold mb-4"
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            >
                            Hasil Penilaian Usaha
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
                            >
                            <p className="text-lg mb-4">
                            <strong>Nama Pemilik:</strong> {namaPemilik || "-"}
                            </p>

                            <div className="space-y-2">
                            {Object.entries(flatScores).map(([section, score]) => (
                                <div key={section} className="flex justify-between border-b pb-1">
                                <span className="font-medium">{section}</span>
                                <span>{score}</span>
                                </div>
                            ))}
                            </div>

                            <div className="mt-6 border-t pt-4 text-center">
                            <p className="font-semibold text-xl">
                                Total Skor: {totalScore}
                            </p>
                            </div>
                        </motion.div>
                    </div>  
                </div>
            </TransitionWrapper>
        </div>
    );
}
