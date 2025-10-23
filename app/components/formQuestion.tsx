'use client';

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

type QuestionType = "text" | "radio";

interface BaseQuestion {
    id: string;
    label: string;
    type: QuestionType;
}

interface TextQuestion extends BaseQuestion {
    type: "text";
    placeholder?: string;
}

interface RadioQuestion extends BaseQuestion {
    type: "radio";
    options: string[];
}

type Question = TextQuestion | RadioQuestion;

interface FormQuestionProps {
    title: string;
    onNext?: () => void; // optional next callback
}

// ✅ Form answers can be either string or structured (for “Lainnya”)
type AnswerValue = string | { option: string; otherText?: string };
type AnswerState = Record<string, AnswerValue>;

export const FormQuestion = ({ title, onNext }: FormQuestionProps) => {
    const [answers, setAnswers] = useState<AnswerState>({});
    const [showDevPanel, setShowDevPanel] = useState(false);

    const questionsData: Record<string, Question[]> = {
        "Info Awal": [
        {
            id: "namaPemilik",
            label: "Nama Pemilik Usaha",
            type: "text",
            placeholder: "e.g. Peter Parker",
        },
        {
            id: "lokasiUsaha",
            label: "Lokasi Usaha",
            type: "text",
            placeholder: "e.g. Kab. Sumedang",
        },
        {
            id: "jenisUsaha",
            label: "Jenis Usaha",
            type: "radio",
            options: ["F&B (Makanan & Minuman)", "Kriya (Kerajinan/Tas/Pakaian, dll)", "Jasa (Service, Edukasi, dll)", "Lainnya"],
        },
        ],
        "Legalitas": [
        {
            id: "nib",
            label: "Apakah usaha Anda sudah memiliki NIB?",
            type: "text",
            placeholder: "Ya / Tidak",
        },
        {
            id: "izin",
            label: "Apakah sudah memiliki izin usaha (SIUP/OSS)?",
            type: "text",
            placeholder: "Ya / Tidak",
        },
        {
            id: "npwp",
            label: "Apakah sudah memiliki NPWP atas nama usaha?",
            type: "text",
            placeholder: "Ya / Tidak",
        },
        ],
    };

    const questions = questionsData[title] || [];

    // Unified answer setter
    const handleChange = (id: string, value: AnswerValue) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
    };

    // ✅ Get clean readable values
    const getFinalValue = (val: AnswerValue): string => {
        if (typeof val === "string") return val.trim();
        if (val.option === "Lainnya" && val.otherText)
        return `Lainnya: ${val.otherText.trim()}`;
        return val.option;
    };

    // ✅ Check if all questions filled
    const allFilled = useMemo(() => {
        return questions.every((q) => {
        const answer = answers[q.id];
        if (!answer) return false;
        if (typeof answer === "string") return answer.trim().length > 0;
        if (answer.option === "Lainnya")
            return (answer.otherText || "").trim().length > 0;
        return true;
        });
    }, [answers, questions]);

    return (
        <div className="flex flex-col w-full gap-4 mt-6 relative">

        {/* 💻 Hidden Dev Button */}
        <button
            className="fixed top-0 left-0 opacity-0 hover:opacity-100 text-xs bg-black text-white px-2 py-1 rounded-md transition-all"
            onClick={() => setShowDevPanel((prev) => !prev)}
        >
            Dev
        </button>

        {/* 🧾 Dev Dropdown Summary */}
        {showDevPanel && (
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed top-8 left-0 z-50 bg-white text-black shadow-lg rounded-md w-64 max-h-64 overflow-y-auto border border-gray-300"
            >
                <h3 className="text-sm font-bold p-2 border-b border-gray-200 bg-gray-100">
                    Developer Summary
                </h3>
                <div className="p-2 text-xs space-y-1">
                    {Object.entries(answers).length === 0 ? (
                    <p className="text-gray-400">No data yet.</p>
                    ) : (
                    Object.entries(answers).map(([id, val]) => (
                        <div key={id} className="flex justify-between">
                        <span className="font-semibold">{id}</span>
                        <span className="text-gray-600">{getFinalValue(val)}</span>
                        </div>
                    ))
                    )}
                </div>
            </motion.div>
        )}

        {/* 🧩 Questions */}
        {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-1">
            <label className="text-lg font-black">{q.label}</label>

            {/* Text Input */}
            {q.type === "text" && (
                <input
                type="text"
                placeholder={q.placeholder}
                className="w-full p-2 rounded-md text-[#1E1E1E] bg-white outline-none"
                value={
                    typeof answers[q.id] === "string"
                    ? (answers[q.id] as string)
                    : ""
                }
                onChange={(e) => handleChange(q.id, e.target.value)}
                />
            )}

            {/* Radio Options */}
            {q.type === "radio" && (
                <div className="flex flex-col gap-3">
                {q.options.map((opt, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx);
                    const isSelected =
                    typeof answers[q.id] === "object"
                        ? (answers[q.id] as { option: string }).option === opt
                        : answers[q.id] === opt;

                    return (
                    <label
                        key={opt}
                        className={`flex items-center gap-3 text-sm font-semibold rounded-lg px-3 py-2 border cursor-pointer transition-all
                        ${
                            isSelected
                            ? "bg-[#FCB040] border-[#FCB040] text-black"
                            : "bg-white/70 border-white/70 text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={() =>
                        handleChange(q.id, { option: opt, otherText: "" })
                        }
                    >
                        <div
                        className={`flex justify-center items-center w-6 h-6 rounded-sm font-bold 
                            ${
                            isSelected
                                ? "bg-black text-[#FCB040]"
                                : "bg-gray-400 text-white"
                            }`}
                        >
                        {optionLetter}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                    </label>
                    );
                })}

                {/* “Lainnya” text input */}
                {typeof answers[q.id] === "object" &&
                    (answers[q.id] as { option: string }).option === "Lainnya" && (
                    <motion.input
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        type="text"
                        placeholder="e.g. IT"
                        className="w-full p-2 rounded-md text-black outline-none"
                        value={
                        (answers[q.id] as { otherText?: string }).otherText || ""
                        }
                        onChange={(e) =>
                        handleChange(q.id, {
                            option: "Lainnya",
                            otherText: e.target.value,
                        })
                        }
                    />
                    )}
                </div>
            )}
            </div>
        ))}

        {/* 🚀 Next Button (only active if all questions filled) */}
        {onNext && (
            <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            disabled={!allFilled}
            className={`mt-4 py-2 rounded-lg font-bold text-white transition-all ${
                allFilled
                ? "bg-black hover:bg-neutral-800 cursor-pointer"
                : "bg-gray-500 cursor-not-allowed"
            }`}
            >
            Next
            </motion.button>
        )}
        </div>
    );
};
