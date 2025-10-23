// app/data/questionsData.ts

export type QuestionType = "text" | "radio" | "checkbox";

export interface BaseQuestion {
    id: string;
    label: string;
    type: QuestionType;
}

export interface TextQuestion extends BaseQuestion {
    type: "text";
    placeholder?: string;
}

export interface RadioQuestion extends BaseQuestion {
    type: "radio";
    options: string[];
}

export interface CheckboxQuestion extends BaseQuestion {
    type: "checkbox";
    options: string[];
}

export type Question = TextQuestion | RadioQuestion | CheckboxQuestion;

// 🧩 All form question sets here
export const questionsData: Record<string, Question[]> = {
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
            options: [
                "F&B (Makanan & Minuman)",
                "Kriya (Kerajinan/Tas/Pakaian, dll)",
                "Jasa (Service, Edukasi, dll)",
                "Lainnya",
            ],
        },
    ],

    "Legalitas": [
        {
            id: "npwp",
            label: "Apakah sudah memiliki NPWP?",
            type: "radio",
            options: [
                "Sudah",
                "Belum"
            ]
        },
        {
            id: "nib",
            label: "Apakah usaha Anda sudah memiliki NIB?",
            type: "radio",
            options: [
                "Sudah",
                "Belum"
            ]
        },
        {
            id: "hki",
            label: "Apakah sudah mendaftarkan HKI (Hak Kekayaan Intelektual) Merk?",
            type: "radio",
            options: [
                "Sudah",
                "Belum"
            ]
        },
    ],
};
