export interface AnswerMap {
  [section: string]: Record<string, string | string[]>; // string[] for checkbox questions
}

export interface ScoreResult {
    totalScore: number;
    sectionScores: Record<string, number>;
}

/**
 * Calculate total and section scores based on user's answers
 */
export function calculateScores(allAnswers: AnswerMap): ScoreResult {
    const sectionScores: Record<string, number> = {};

    // --- LEGALITAS ---
    if (allAnswers["Legalitas"]) {
        const answers = allAnswers["Legalitas"];
        let score = 0;

        if (answers["npwp"] === "Sudah") score += 4;
        if (answers["nib"] === "Sudah") score += 6;
        if (answers["hki"] === "Sudah") score += 10;

        sectionScores["Legalitas"] = score;
    }

    // --- KOMUNITAS ---
    if (allAnswers["Komunitas"]) {
        const answers = allAnswers["Komunitas"];
        let score = 0;

        switch (answers["aktifKomunitas"]) {
        case "Tidak Ikut Komunitas":
            score = 0;
            break;
        case "Hanya di tingkat daerah (Desa/Kecamatan/Kabupaten)":
            score = 4;
            break;
        case "Sudah sampai tingkat provinsi":
            score = 6;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["Komunitas"] = score;
    }

    // --- SDM ---
    if (allAnswers["SDM"]) {
        const answers = allAnswers["SDM"];
        let score = 0;

        switch (answers["tenagaKerja"]) {
        case "Saya bekerja sendiri":
            score = 0;
            break;
        case "Memiliki 1-5 pekerja":
            score = 3;
            break;
        case "Memiliki lebih dari 5 pekerja":
            score = 5;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["SDM"] = score;
    }

    // --- PRODUKSI ---
    if (allAnswers["Produksi"]) {
    const answers = allAnswers["Produksi"];
    let score = 0;

        // --- Pemasaran Offline ---
        switch (answers["pemasaranOffline"]) {
            case "Hanya di Desa/Lingkungan tempat tinggal":
                score += 2;
                break;
            case "Sudah sampai Kecamatan":
                score += 3;
                break;
            case "Sudah sampai Kabupaten/Kota":
                score += 4;
                break;
            case "Sudah sampai Provinsi":
                score += 5;
                break;
            default:
                score += 0;
                break;
        };

        // --- Pemasaran Online ---
        switch (answers["pemasaranOnline"]) {
            case "Belum Online":
                score += 0;
                break;
            case "Baru di 1 Marketplace":
                score += 5;
                break;
            case "Sudah 2-3 Marketplace":
                score += 10;
                break;
            default:
                score += 0;
                break;
        };

        sectionScores["Produksi"] = score;
    }

    // --- OPERASIONAL ---
    if (allAnswers["Operasional"]) {
    const answers = allAnswers["Operasional"];
    let score = 0;

        // --- Profile Usaha ---
        if (answers["profileUsaha"] === "Punya") score += 2;
        
        // --- Katalog Produk ---
        if (answers["katalogProduk"] === "Punya") score += 2;
        
        // --- Pola Produksi ---
        switch (answers["polaProduksi"]) {
            case "Produksi jika ada pesanan":
                score += 1;
                break;
            case "Produksi rutin/harian":
                score += 2;
                break;
            default:
                score += 0;
                break;
        };

        // --- SOP ---
        if (answers["sop"] === "Punya") score += 2;
        
        // --- Tempat Produksi ---
        switch (answers["tempatProduksi"]) {
            case "Di Rumah Sendiri":
                score += 0;
                break;
            case "Produksi di Mitra/Vendor":
                score += 1;
                break;
            case "Di Toko/Outlet Usaha":
                score += 2;
                break;
            default:
                score += 0;
                break;
        };

        sectionScores["Operasional"] = score;
    }

    // --- LIFECYCLE ---
    if (allAnswers["Lifecycle"]) {
        const answers = allAnswers["Lifecycle"];
        let score = 0;

        switch (answers["usiaUsaha"]) {
        case "Kurang dari 1 Tahun":
            score = 1;
            break;
        case "1-3 Tahun":
            score = 2;
            break;
        case "Lebih dari 3 Tahun":
            score = 3;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["Lifecycle"] = score;
    }

    // --- PROFILE ---
    if (allAnswers["Profile"]) {
        const answers = allAnswers["Profile"];
        let score = 0;
        const value = answers["kelengkapanProfile"];

        if (Array.isArray(value)) {
            // Multiple checkbox values already in array form
            score = value.length * 2;
        } else if (typeof value === "string") {
            // Handle comma-separated values (e.g. "Nama Merk, Banner/Spanduk/Plang Usaha")
            const items = value.split(",").map(v => v.trim()).filter(v => v.length > 0);
            score = items.length * 2;
        }

        sectionScores["Profile"] = score;
    }

    // --- KEUANGAN ---
    if (allAnswers["Keuangan"]) {
        const answers = allAnswers["Keuangan"];
        let score = 0;

        // --- Catatan Keuangan ---
        switch (answers["catatanKeuangan"]) {
        case "Tidak Tercatat":
            score += 0;
            break;
        case "Ada Pencatatan Tertulis":
            score += 2;
            break;
        default:
            score += 0;
            break;
        };

        // --- Transaksi Keuangan ---
        switch (answers["transaksiKeuangan"]) {
        case "Manual":
            score += 0;
            break;
        case "Digital":
            score += 1;
            break;
        case "Manual & Digital":
            score += 2;
            break;
        default:
            score += 0;
            break;
        };

        // --- Sumber Keuangan ---
        switch (answers["sumberKeuangan"]) {
        case "Tidak ada":
            score += 0;
            break;
        case "dari Non-Bank":
            score += 3;
            break;
        case "dari Bank":
            score += 5;
            break;
        default:
            score += 0;
            break;
        }

        sectionScores["Keuangan"] = score;
    }

    // --- OMZET ---
    if (allAnswers["Omzet"]) {
        const answers = allAnswers["Omzet"];
        let score = 0;

        // --- Nilai Omzet ---
        switch (answers["nilaiOmzet"]) {
        case "0 - 50 Juta":
            score = 0;
            break;
        case "51 - 100 Juta":
            score = 1;
            break;
        case "101 - 200 Juta":
            score = 3;
            break;
        case "Di atas 200 Juta":
            score = 6;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["Omzet"] = score;
    }

    // --- ASET ---
    if (allAnswers["Aset"]) {
        const answers = allAnswers["Aset"];
        let score = 0;

        // --- Nilai Aset ---
        switch (answers["nilaiAset"]) {
        case "Kurang dari 10 Juta":
            score = 1;
            break;
        case "10 - 100 Juta":
            score = 3;
            break;
        case "Lebih dari 100 Juta":
            score = 6;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["Aset"] = score;
    }

    // --- LABA ---
    if (allAnswers["Laba"]) {
        const answers = allAnswers["Laba"];
        let score = 0;

        // --- Nilai Laba ---
        switch (answers["nilaiLaba"]) {
        case "Kurang dari 5 Juta":
            score = 3;
            break;
        case "5 - 10 Juta":
            score = 6;
            break;
        case "Lebih dari 10 Juta":
            score = 9;
            break;
        default:
            score = 0;
            break;
        }

        sectionScores["Laba"] = score;
    }

    // --- DEFAULT SCORING FALLBACK ---
    Object.entries(allAnswers).forEach(([section, answers]) => {
        if (!(section in sectionScores)) {
        let score = 0;
        Object.values(answers).forEach((answer) => {
            if (typeof answer === "string" && answer.toLowerCase().includes("ya")) score += 5;
        });
        sectionScores[section] = score;
        }
    });

    const totalScore = Object.values(sectionScores).reduce((sum, val) => sum + val, 0);

    return { totalScore, sectionScores };
}