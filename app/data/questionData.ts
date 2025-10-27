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

    "Komunitas": [
        {
            id: "aktifKomunitas",
            label: "Dimana anda aktif dalam sebuah komunitas UMKM?",
            type: "radio",
            options: [
                "Tidak Ikut Komunitas",
                "Hanya di tingkat daerah (Desa/Kecamatan/Kabupaten)",
                "Sudah sampai tingkat provinsi"
            ]
        }
    ],

    "SDM": [
        {
            id: "tenagaKerja",
            label: "Berapa jumlah tenaga di usaha anda?",
            type: "radio",
            options: [
                "Saya bekerja sendiri",
                "Memiliki 1-5 pekerja",
                "Memiliki lebih dari 5 pekerja"
            ]
        }
    ],

    "Produksi": [
        {
            id: "pemasaranOffline",
            label: "Pemasaran Offline",
            type: "radio",
            options: [
                "Hanya di Desa/Lingkungan tempat tinggal",
                "Sudah sampai Kabupaten/Kota",
                "Sudah sampai Kecamatan",
                "Sudah sampai Provinsi"
            ]
        },
        {
            id: "pemasaranOnline",
            label: "Pemasaran Online",
            type: "radio",
            options: [
                "Belum Online",
                "Baru di 1 Marketplace",
                "Sudah 2-3 Marketplace"
            ]
        }
    ],

    "Operasional": [
        {
            id: "profileUsaha",
            label: "Apakah memiliki Profile Usaha?",
            type: "radio",
            options: [
                "Tidak Punya",
                "Punya"
            ]
        },
        {
            id: "katalogProduk",
            label: "Apakah memiliki Katalog Produk?",
            type: "radio",
            options: [
                "Tidak Punya",
                "Punya"
            ]
        },
        {
            id: "polaProduksi",
            label: "Bagaimana pola produksi anda?",
            type: "radio",
            options: [
                "Produksi jika ada pesanan",
                "Produksi rutin/harian"
            ]
        },
        {
            id: "sop",
            label: "Apakah memiliiki SOP (Standar Operasional Produksi)?",
            type: "radio",
            options: [
                "Tidak Punya",
                "Punya"
            ]
        },
        {
            id: "tempatProduksi",
            label: "Dimana tempat produksi anda?",
            type: "radio",
            options: [
                "Di Rumah Sendiri",
                "Produksi di Mitra/Vendor",
                "Di Toko/Outlet Usaha"
            ]
        },
    ],

    "Lifecycle": [
        {
            id: "usiaUsaha",
            label: "Sudah berapa lama usaha ini dijalankan?",
            type: "radio",
            options: [
                "Kurang dari 1 Tahun",
                "1-3 Tahun",
                "Lebih dari 3 Tahun"
            ]
        }
    ],

    "Profile": [
        {
            id: "kelengkapanProfile",
            label: "Apakah usaha anda memiliki?",
            type: "checkbox",
            options: [
                "Nama Merk",
                "Logo Usaha",
                "Banner/Spanduk/Plang Usaha"
            ]
        }
    ],

    "Keuangan": [
        {
            id: "catatanKeuangan",
            label: "Apakah keuangan usaha tercatat?",
            type: "radio",
            options: [
                "Tidak Tercatat",
                "Ada Pencatatan Tertulis"
            ]
        },
        {
            id: "transaksiKeuangan",
            label: "Bagaimana transaksi jual belinya?",
            type: "radio",
            options: [
                "Manual",
                "Digital",
                "Manual & Digital"
            ]
        },
        {
            id: "sumberKeuangan",
            label: "Apakah usaha anda memiliki sumber pembiayaan?",
            type: "radio",
            options: [
                "Tidak ada",
                "dari Non-Bank",
                "dari Bank"
            ]
        },
    ],

    "Omzet": [
        {
            id: "nilaiOmzet",
            label: "Berapa omzet usaha anda dalam kurun waktu 1 tahun?",
            type: "radio",
            options: [
                "0 - 50 Juta",
                "51 - 100 Juta",
                "101 - 200 Juta",
                "Di atas 200 Juta"
            ]
        }
    ],

    "Aset": [
        {
            id: "nilaiAset",
            label: "Berapa nilai aset tetap usaha anda?",
            type: "radio",
            options: [
                "Kurang dari 10 Juta",
                "10 - 100 Juta",
                "Lebih dari 100 Juta"
            ]
        }
    ],

    "Laba": [
        {
            id: "nilaiLaba",
            label: "Berapa rata-rata pendapatan bersih per bulan?",
            type: "radio",
            options: [
                "Kurang dari 5 Juta",
                "5 - 10 Juta",
                "Lebih dari 10 Juta"
            ]
        }
    ],
};