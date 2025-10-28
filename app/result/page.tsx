'use client';
import { Suspense } from "react";
import ResultPageContent from "./resultPageContent"

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="p-6 text-center">Loading result...</div>}>
            <ResultPageContent />
        </Suspense>
    );
}
