# KonversiFile 🔄

Alat konversi file gratis yang berjalan 100% di browser. Tanpa upload ke server, privasi terjamin.

## Fitur Konversi

| Dari | Ke |
|------|-----|
| PDF | Word (RTF), JPG, PNG, TXT |
| Word (DOCX) | PDF, TXT |
| Excel (XLSX/XLS) | CSV, JSON, HTML, PDF |
| CSV | Excel (XLSX) |
| JSON | CSV, Excel |
| JPG/PNG/WEBP | JPG, PNG, WEBP |
| Gambar | PDF |
| TXT/MD | PDF |

## Deploy ke Vercel

### Cara 1: Via Vercel CLI
```bash
npm install -g vercel
cd file-converter
vercel
```

### Cara 2: Via GitHub
1. Upload folder ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com)
3. Klik "New Project" → Import dari GitHub
4. Pilih repo → Deploy!

### Cara 3: Drag & Drop
1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop folder `file-converter` ke halaman tersebut
3. Deploy!

## Teknologi

- **PDF.js** — Membaca dan merender PDF
- **XLSX** — Membaca/menulis Excel dan CSV
- **Mammoth.js** — Konversi Word ke HTML/teks
- **jsPDF** — Membuat file PDF
- **html2canvas** — Render HTML ke gambar

## Struktur File

```
file-converter/
├── index.html      # Halaman utama (all-in-one)
├── vercel.json     # Konfigurasi Vercel
├── package.json    # Info proyek
└── README.md       # Dokumentasi ini
```

Semua konversi dilakukan di browser pengguna — tidak ada data yang dikirim ke server.
