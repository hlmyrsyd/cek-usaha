'use client'
import { motion } from "motion/react";
import Image from "next/image";
import { FormCarousel, OpeningContainer, TransitionWrapper } from "../components";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormQuestionRef } from "../components/formQuestion";
import { handleNext, handlePrev, handleSubmit } from "../utils/formHandlers";

export default function FormPage() {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [allAnswers, setAllAnswers] = useState<Record<string, Record<string, string>>>({});
    const router = useRouter();
    const formRefs = useRef<Record<string, FormQuestionRef | null>>({});

    const cards = [
        { title: "Info Awal", desc: "Mari mulai dari perkenalan bisnismu!", color: "#FCB040" },
        { title: "Legalitas", desc: "Legalitas usaha itu penting! Biar lebih dipercaya pelanggan & gampang dapat akses modal!", color: "#FE6131" },
        { title: "Komunitas", desc: "Komunitas untuk saling mendapatkan info terkait bisnis umkm yang kita jalani!", color: "#3D7FFD" },
        { title: "SDM", desc: "Sumber Daya Manusia yang berperan dalam jalannya usaha anda!", color: "#6F6DFF" },
        { title: "Produksi", desc: "Seberapa luas pemasaran produk yang sudah anda lakukan?", color: "#029B48" },
        { title: "Operasional", desc: "Apa saja strategi dan operasional usaha yang sudah ada persiapan untuk bisnis anda?", color: "#FCB040" },
        { title: "Lifecycle", desc: "Lifecycle bisnis adalah perkembangan bisnis secara bertahap dari waktu ke waktu", color: "#FE6131" },
        { title: "Profile", desc: "Profile bisnis dapat memperlihatkan kualitas dari bisnis itu sendiri!", color: "#3D7FFD" },
        { title: "Keuangan", desc: "Keuangan usaha itu penting untuk dapat mengelola usaha untuk bisa terus berkembang!", color: "#6F6DFF" },
        { title: "Omzet", desc: "Omzet bisnis yang baik sangat berpengaruh dalam menarik minat investor!", color: "#029B48" },
        { title: "Aset", desc: "Aset bisnis sangat membantu dalam perkembangan bisnis seperti, alat produksi, mesin, dan lain sebagainya", color: "#FCB040" },
        { title: "Laba", desc: "Laba adalah keuntungan bersih yang didapat setelah menyisihkan seluruh budget produksi dan lainnya!", color: "#FE6131" },
    ];

    const handleTransition = (route: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
        router.push(route);
        }, 1300); // Control the transition timing
    };

    // const handleNext = () => {
    //     const currentCard = cards[activeIndex];
    //     const formRef = formRefs.current[currentCard.title];

    //     console.log(`➡️ Next button clicked on: ${currentCard.title}`);

    //     if (formRef) {
    //         const currentAnswers = formRef.getAnswers();

    //         // 🧩 Merge immediately (don’t rely on setState async timing)
    //         const updatedAllAnswers = {
    //             ...allAnswers,
    //             [currentCard.title]: currentAnswers,
    //         };

    //         // Update state for later reference
    //         setAllAnswers(updatedAllAnswers);

    //         // 🧾 Log full data before going to next
    //         console.log("📩 Current answers from this card:", currentAnswers);
    //         console.log("📚 All answers so far:");
    //         console.table(updatedAllAnswers);
    //     } else {
    //         console.warn(`⚠️ No formRef found for ${currentCard.title}`);
    //     }

    //     // Move to next card
    //     if (activeIndex < cards.length - 1) {
    //         setActiveIndex((prev) => prev + 1);
    //         console.log(`🎯 Moved to next card: ${cards[activeIndex + 1].title}`);
    //     } else {
    //         console.log("🚫 Already at the last card");
    //     }
    // };

    // const handlePrev = () => {
    //     setActiveIndex((prev) => Math.max(prev - 1, 0));
    // };

    // const handleSubmit = () => {    
    //     const currentCard = cards[activeIndex];
    //     const formRef = formRefs.current[currentCard.title];

    //     console.log(`🧾 Submit button clicked on: ${currentCard.title}`);

    //     if (!formRef) {
    //         console.warn("⚠️ No formRef found for the current card!");
    //         return;
    //     }

    //     const latestAnswers = formRef.getAnswers();

    //     const mergedAnswers = {
    //         ...allAnswers,
    //         [currentCard.title]: latestAnswers,
    //     };

    //     setAllAnswers(mergedAnswers);

    //     console.log("✅ Final merged answers:", mergedAnswers);

    //     alert("✅ Submit button clicked! Check the console for full data.");
    // };

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
                            handleNext={() => handleNext(activeIndex, setActiveIndex, cards, formRefs, allAnswers, setAllAnswers)}
                            handlePrev={() => handlePrev(setActiveIndex)}
                            handleSubmit={() => handleSubmit(activeIndex, cards, formRefs, allAnswers, setAllAnswers, router)}
                            registerFormRef={(title, ref) => (formRefs.current[title] = ref)}
                        />
                    </div>
                </div>
            </TransitionWrapper>
        </div>
    )
};