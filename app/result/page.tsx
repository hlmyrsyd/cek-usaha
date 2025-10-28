'use client'
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import { ScoreResult } from "../utils/calculateScores";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const namaPemilik = searchParams.get("namaPemilik");
    const rawScoreData = searchParams.get("scoreData");

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 p-6">
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
    );
}
