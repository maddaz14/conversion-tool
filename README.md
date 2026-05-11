<!-- prettier-ignore -->
# Gondrong STIES — Tools Online 🚀

**60+ tools gratis** yang berjalan **100% di browser**.  
✅ Tanpa upload ke server  
✅ Privasi aman  
✅ Cepat & gratis buat kebutuhan produktivitas & akademik

---

## ✨ Demo / Live

Buka tools langsung di Vercel:  
**https://conversion-tool-puce.vercel.app/**

> Semua konversi & proses dilakukan di sisi klien (browser).

---

## 🧰 Kategori Tools (8 Kelompok)

- 🔄 **Konversi File** (PDF↔Word, PDF↔Image, PDF↔TXT, Excel↔CSV/JSON/HTML/PDF, dll.)
- 🖼️ **Gambar Tools** (Upscale, Resize, Compress, Crop, Rotate/Flip, Filter, Watermark)
- 📄 **PDF Tools** (Merge, Split range, Rotate halaman, Watermark, Reorder, Compress)
- 📝 **Teks Tools** (Word/character counter, Case converter, Sort lines, Remove duplicates, Regex Find/Replace, Reverse text, Slugify, Lorem Ipsum)
- 🔐 **Encoder/Decoder** (Base64, URL Encode, HTML entity, Hex↔Text, Binary↔Text, Morse code, ROT13/Caesar, Hash MD5/SHA-1/SHA-256/SHA-512, JWT decoder, ASCII codes)
- 🎲 **Generator** (QR Code, Password, UUID v4, Random number, Color palette, Fake data)
- 📐 **Unit Converter** (Panjang, Berat, Suhu, Luas, Volume, Waktu, Kecepatan, Data Storage, BMI calculator, Age calculator)
- 💻 **Developer Tools** (JSON formatter/minifier/validator, XML formatter, Regex tester, CSS/HTML/JS minifier, Color converter, URL parser, Text diff)

---

## 🚀 Cara Pakai

1. Masuk ke **link Vercel** (lihat bagian *Live*).
2. Pilih kategori → pilih tool.
3. Semua input diproses di browser, lalu file hasil bisa langsung diunduh.

---

## 🔒 Privasi

**Semua proses berjalan di browser pengguna** — tidak ada data yang dikirim ke server. File yang Anda pilih tetap berada di perangkat Anda.

---

## 🧠 Teknologi (Client-side)

- **PDF.js** — membaca dan merender PDF
- **pdf-lib** — modifikasi PDF (merge, split, rotate, watermark)
- **XLSX (SheetJS)** — membaca/menulis Excel dan CSV
- **Mammoth.js** — konversi Word ke HTML/teks
- **jsPDF + html2canvas** — membuat file PDF
- **crypto-js** — hashing MD5
- **QRCode.js** — generator QR
- **Web Crypto API** — hashing SHA-1/256/512
- **Canvas API** — pemrosesan gambar

---

## 📦 Struktur File

```txt
conversion-tool/
├── index.html
├── assets/
│   ├── style.css
│   └── common.js
├── pages/
│   ├── file-converter.html
│   ├── image.html
│   ├── pdf.html
│   ├── text.html
│   ├── encoder.html
│   ├── generator.html
│   ├── unit.html
│   └── developer.html
├── vercel.json
├── package.json
└── README.md
```

---

## 🚀 Deploy ke Vercel

### Via GitHub
1. Push perubahan ke GitHub
2. Buka https://vercel.com
3. Klik **New Project** → **Import** dari GitHub
4. Deploy

---

## 📄 License

Dikembangkan untuk kebutuhan produktivitas & akademik oleh **Gondrong STIES | MaddazXD**.
