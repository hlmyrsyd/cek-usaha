// app/utils/formHandlers.ts
"use client";

import { FormQuestionRef } from "../components/formQuestion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { calculateScores } from "./calculateScores";

export function handleNext(
    activeIndex: number,
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
    cards: { title: string }[],
    formRefs: React.MutableRefObject<Record<string, FormQuestionRef | null>>,
    allAnswers: Record<string, Record<string, string>>,
    setAllAnswers: React.Dispatch<
        React.SetStateAction<Record<string, Record<string, string>>>
    >
) {
    const currentCard = cards[activeIndex];
    const formRef = formRefs.current[currentCard.title];

    console.log(`➡️ Next button clicked on: ${currentCard.title}`);

    if (formRef) {
        const currentAnswers = formRef.getAnswers();

        // Merge immediately (not async)
        const updatedAllAnswers = {
            ...allAnswers,
            [currentCard.title]: currentAnswers,
        };

        setAllAnswers(updatedAllAnswers);

        console.log("📩 Current answers from this card:", currentAnswers);
        console.log("📚 All answers so far:");
        console.table(updatedAllAnswers);
    } else {
        console.warn(`⚠️ No formRef found for ${currentCard.title}`);
    }

    // Move to next card
    if (activeIndex < cards.length - 1) {
        setActiveIndex((prev) => prev + 1);
        console.log(`🎯 Moved to next card: ${cards[activeIndex + 1].title}`);
    } else {
        console.log("🚫 Already at the last card");
    }
}

export function handlePrev(
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>
) {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
}

export function handleSubmit(
    activeIndex: number,
    cards: { title: string }[],
    formRefs: React.MutableRefObject<Record<string, FormQuestionRef | null>>,
    allAnswers: Record<string, Record<string, string>>,
    setAllAnswers: React.Dispatch<
        React.SetStateAction<Record<string, Record<string, string>>>
    >,
    router: AppRouterInstance
) {
    const currentCard = cards[activeIndex];
    const formRef = formRefs.current[currentCard.title];

    console.log(`🧾 Submit button clicked on: ${currentCard.title}`);

    if (!formRef) {
        console.warn("⚠️ No formRef found for the current card!");
        return;
    }

    const latestAnswers = formRef.getAnswers();

    const mergedAnswers = {
        ...allAnswers,
        [currentCard.title]: latestAnswers,
    };

    setAllAnswers(mergedAnswers);

    console.log("✅ Final merged answers:", mergedAnswers);

    const scoreData = calculateScores(mergedAnswers);

    // 👉 Push to result page
    const encodedScores = encodeURIComponent(JSON.stringify(scoreData));
    const namaPemilik = mergedAnswers["Info Awal"]?.namaPemilik || "";
    router.push(
        `/result?namaPemilik=${encodeURIComponent(namaPemilik)}&scoreData=${encodedScores}`
    );
}
