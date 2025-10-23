'use client';

import React, { useState, useMemo, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { Question, questionsData } from "../data/questionData";

interface FormQuestionProps {
    title: string;
    onNext?: () => void;
    color: string;
}

export interface FormQuestionRef {
    getAnswers: () => Record<string, string>;
}

type AnswerValue = string | { option: string; otherText?: string } | string[];
type AnswerState = Record<string, AnswerValue>;

export const FormQuestion = forwardRef<FormQuestionRef, FormQuestionProps>(
    ({ title, onNext, color }, ref) => {
        const [answers, setAnswers] = useState<AnswerState>({});
        const questions = useMemo<Question[]>(() => questionsData[title] || [], [title]);

        const handleChange = (id: string, value: AnswerValue) => {
        setAnswers((prev) => ({ ...prev, [id]: value }));
        };

        const getFinalValue = (val: AnswerValue): string => {
        if (typeof val === "string") return val.trim();
        if (Array.isArray(val)) return val.join(", ");
        if ("option" in val) {
            if (val.option === "Lainnya" && val.otherText)
                return `Lainnya: ${val.otherText.trim()}`;
            return val.option;
        }
        return ""
        };

        useImperativeHandle(ref, () => ({
            getAnswers: () =>
                Object.fromEntries(
                Object.entries(answers).map(([key, val]) => [key, getFinalValue(val)])
                ),
            })
            );


        const allFilled = useMemo(() => {
            return questions.every((q) => {
                const answer = answers[q.id];
                if (!answer) return false;
                if (typeof answer === "string") return answer.trim().length > 0
                if (Array.isArray(answer)) return answer.length > 0;
                if (answer.option === "Lainnya")
                    return (answer.otherText || "").trim().length > 0;
                return true;
            });
        }, [answers, questions]);

        const handleNext = () => {
        if (!allFilled) return;
        console.log({
            [title]: Object.fromEntries(
            Object.entries(answers).map(([key, val]) => [key, getFinalValue(val)])
            ),
        });
        if (onNext) onNext();
        };

        return (
        <div className="flex flex-col w-full gap-2 mt-2 relative">
            {questions.map((q) => (
            <div key={q.id} className="flex flex-col gap-1">
                <label className="text-lg font-black">{q.label}</label>

                {/* 📝 Text Input */}
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

                {/* 🔘 Radio Options */}
                {q.type === "radio" && (
                <div className="flex flex-col gap-2">
                    {q.options.map((opt, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx);
                    const isSelected =
                        typeof answers[q.id] === "object"
                        ? (answers[q.id] as { option: string }).option === opt
                        : answers[q.id] === opt;

                    return (
                        <label
                        key={opt}
                        className={`flex items-center gap-2 text-sm font-semibold rounded-lg px-2 py-2 border cursor-pointer transition-all
                            ${
                                isSelected
                                    ? "bg-white border-white text-black"
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
                                ? "text-[#1E1E1E]"
                                : "bg-gray-400 text-white"
                            }`}
                            style={isSelected ? { backgroundColor: color } : undefined}
                        >
                            {optionLetter}
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                        </label>
                    );
                    })}

                    {/* 🧾 “Lainnya” text input */}
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

                {q.type === "checkbox" && (
                <div className="flex flex-col gap-3">
                    {q.options.map((opt) => {
                    const isSelected =
                        Array.isArray(answers[q.id]) &&
                        (answers[q.id] as string[]).includes(opt);

                    return (
                        <label
                        key={opt}
                        className={`flex items-center gap-3 text-sm font-semibold rounded-lg px-3 py-2 border cursor-pointer transition-all
                            ${
                            isSelected
                                ? "bg-white border-[#FCB040] text-black"
                                : "bg-white/70 border-white/70 text-gray-500 hover:bg-gray-100"
                            }`}
                        onClick={() => {
                            setAnswers((prev) => {
                            const current = Array.isArray(prev[q.id]) ? [...(prev[q.id] as string[])] : [];
                            const newSelection = current.includes(opt)
                                ? current.filter((v) => v !== opt)
                                : [...current, opt];
                            return { ...prev, [q.id]: newSelection };
                            });
                        }}
                        >
                        <div
                            className={`flex justify-center items-center w-6 h-6 rounded-sm font-bold 
                            ${
                                isSelected
                                ? "text-[#1E1E1E]"
                                : "bg-gray-400 text-white"
                            }`}
                            style={isSelected ? { backgroundColor: color } : undefined}
                        >
                            ✓
                        </div>
                        <span className="text-sm font-medium">{opt}</span>
                        </label>
                    );
                    })}
                </div>
                )}
            </div>
            ))}

            {/* 🚀 Next Button */}
            {onNext && (
            <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handleNext}
                disabled={!allFilled}
                className={`mt-4 py-2 rounded-lg font-bold border-1 border-[#1e1e1e] transition-all ${
                allFilled
                    ? "opacity-100 text-white cursor-pointer"
                    : "opacity-50 text-[#1e1e1e] cursor-not-allowed"
                }`}
                style={allFilled ? 
                    { backgroundColor: "#1E1E1E" } :
                    { backgroundColor: color }
                }
                whileHover={allFilled ?
                    { backgroundColor: "#2E2E2E", scale: 1.02 } : undefined 
                }
                transition={{
                    ease: 'circInOut',
                    duration: 0.2
                }}
            >
                Next
            </motion.button>
            )}
        </div>
        );
    }
);

FormQuestion.displayName = "FormQuestion";
