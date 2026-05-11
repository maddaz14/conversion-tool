# Gondrong STIES — Tools Online 🚀

Kumpulan **60+ tools gratis** dari Gondrong STIES yang berjalan 100% di browser. Tanpa upload ke server, privasi terjamin.

## 🧰 Daftar Fitur (8 Kategori)

| Kategori | Sub-Tools |
|----------|-----------|
| 🔄 **Konversi File** | PDF↔Word, PDF↔Image, PDF↔TXT, Excel↔CSV/JSON/HTML/PDF, Image format, CSV→XLSX, JSON→CSV/XLSX, Word↔TXT, TXT→PDF, Image→PDF |
| 🖼️ **Gambar Tools** | Upscale (2x/3x/4x), Resize, Compress, Crop, Rotate & Flip, Filter (brightness/contrast/saturate/grayscale/sepia/blur), Watermark teks, Format converter |
| 📄 **PDF Tools** | Merge PDF, Split PDF (custom range), Rotate halaman, Watermark teks, Reorder halaman, Compress PDF |
| 📝 **Teks Tools** | Word/character counter, Case converter (10 mode), Sort lines (7 mode), Remove duplicates, Find & Replace (regex), Reverse text, Slugify, Lorem Ipsum |
| 🔐 **Encoder/Decoder** | Base64, URL encode, HTML entity, Hex↔Text, Binary↔Text, Morse code, ROT13/Caesar, Hash (MD5/SHA-1/SHA-256/SHA-512), JWT decoder, ASCII codes |
| 🎲 **Generator** | QR Code (Text/WiFi/Email/SMS/Phone), Password (custom rules), UUID v4, Random number, Color palette (5 mode), Fake data (Indonesian) |
| 📐 **Unit Converter** | Panjang, Berat, Suhu, Luas, Volume, Waktu, Kecepatan, Data Storage, BMI calculator, Age calculator |
| 💻 **Developer Tools** | JSON formatter/minifier/validator, XML formatter, Regex tester (live highlight), CSS/HTML/JS minifier, Color converter (HEX/RGB/HSL), URL parser, Text diff |

## 🚀 Cara Pakai

Buka [https://your-vercel-domain.vercel.app](https://your-vercel-domain.vercel.app) — semua tools tersedia langsung di browser.

## 🛠️ Teknologi

Semua proses berjalan di sisi klien:
- **PDF.js** — Membaca dan merender PDF
- **pdf-lib** — Modifikasi PDF (merge, split, rotate, watermark)
- **XLSX (SheetJS)** — Membaca/menulis Excel dan CSV
- **Mammoth.js** — Konversi Word ke HTML/teks
- **jsPDF + html2canvas** — Membuat file PDF
- **crypto-js** — MD5 hashing
- **QRCode.js** — QR Code generator
- **Web Crypto API** — SHA-1/256/512 hashing
- **Canvas API** — Image processing (resize, filter, watermark, crop, rotate)

## 📦 Struktur File

```
conversion-tool/
├── index.html              # Landing page (kategori)
├── assets/
│   ├── style.css           # Shared design tokens & components
│   └── common.js           # Shared utilities
├── pages/
│   ├── file-converter.html # 12 konverter format
│   ├── image.html          # 8 image tools
│   ├── pdf.html            # 6 PDF tools
│   ├── text.html           # 8 text tools
│   ├── encoder.html        # 10 encoder/decoder
│   ├── generator.html      # 6 generators
│   ├── unit.html           # 10 unit converters
│   └── developer.html      # 7 developer tools
├── vercel.json
├── package.json
└── README.md
```

## 🚀 Deploy ke Vercel

### Cara 1: Via GitHub
1. Push folder ini ke repository GitHub
2. Buka [vercel.com](https://vercel.com)
3. Klik "New Project" → Import dari GitHub
4. Pilih repo → Deploy

### Cara 2: Drag & Drop
1. Buka [vercel.com/new](https://vercel.com/new)
2. Drag & drop folder ke halaman tersebut
3. Deploy

### Cara 3: Lokal Dev
```bash
npm run dev
# atau
npx serve .
```

## 🔒 Privasi

**Semua proses berjalan di browser pengguna** — tidak ada data yang dikirim ke server. File yang Anda pilih tetap di komputer Anda.

## 📄 License

Dikembangkan untuk kebutuhan produktivitas & akademik oleh **Gondrong STIES | MaddazXD**.
