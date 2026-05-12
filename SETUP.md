# 🚀 APK Builder Setup Guide

Panduan lengkap untuk setup APK Builder dengan Vercel + GitHub Actions + Supabase.

## 📋 Prerequisites

- ✅ GitHub Account
- ✅ Vercel Account
- ✅ Supabase Account (gratis)

## 🗄️ Step 1: Setup Supabase Database

1. **Buat project baru** di [Supabase](https://supabase.com)
2. **Buka SQL Editor** dan jalankan query berikut:

```sql
-- Create apk_builds table
CREATE TABLE apk_builds (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'url', 'html', 'zip'
  content TEXT NOT NULL, -- URL or base64 encoded content
  package_name TEXT NOT NULL,
  app_name TEXT NOT NULL,
  version_code INTEGER NOT NULL,
  version_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued', -- 'queued', 'building', 'completed', 'failed'
  apk_url TEXT,
  apk_size BIGINT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_apk_builds_status ON apk_builds(status);
CREATE INDEX idx_apk_builds_created_at ON apk_builds(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE apk_builds ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (adjust as needed for security)
CREATE POLICY "Allow all operations" ON apk_builds FOR ALL USING (true);
```

3. **Dapatkan credentials:**
   - **SUPABASE_URL**: `https://your-project.supabase.co`
   - **SUPABASE_ANON_KEY**: Dari Settings > API

## 🔑 Step 2: Setup GitHub Repository

1. **Buat repository baru** di GitHub (atau gunakan yang existing)
2. **Clone repository** ini dan push ke GitHub Anda
3. **Generate GitHub Personal Access Token:**
   - Buka [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Buat token baru dengan scope: `repo`, `workflow`
   - **Simpan token** ini (akan digunakan di Vercel)

## ⚙️ Step 3: Setup Vercel Environment Variables

1. **Deploy ke Vercel** dari GitHub repository
2. **Buka Project Settings > Environment Variables**
3. **Tambahkan variables berikut:**

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# GitHub
GITHUB_REPO=your-username/your-repo-name
GITHUB_TOKEN=your-github-token-here
```

## 🔄 Step 4: Setup GitHub Repository Secrets

1. **Buka repository GitHub > Settings > Secrets and variables > Actions**
2. **Tambahkan secrets berikut:**

```env
# Supabase (untuk GitHub Actions update status)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## 🚀 Step 5: Test Setup

1. **Buka website Vercel**
2. **Buka APK Builder > HTML/URL to APK**
3. **Test dengan URL sederhana** (contoh: `https://example.com`)
4. **Klik "Build APK"**
5. **Monitor progress** sampai selesai
6. **Download APK**

## 🐛 Troubleshooting

### Build gagal di GitHub Actions:
- Cek GitHub Actions logs
- Pastikan semua secrets sudah benar
- Cek quota GitHub Actions (free tier: 2000 min/bulan)

### Vercel API error:
- Cek Vercel function logs
- Pastikan environment variables benar
- Cek Supabase connection

### APK tidak bisa install:
- Cek Android version target
- Pastikan package name valid
- Cek permissions yang dibutuhkan

## 💰 Cost Estimation

- **Vercel**: Gratis (hobby plan)
- **GitHub Actions**: Gratis (2000 min/bulan)
- **Supabase**: Gratis (500MB database)
- **Total**: **$0/bulan** ✅

## 🔒 Security Notes

- **Jangan commit secrets** ke repository
- **Gunakan HTTPS** untuk semua connections
- **Monitor usage** di Supabase dashboard
- **Backup database** secara berkala

## 📞 Support

Jika ada masalah, cek:
1. Vercel function logs
2. GitHub Actions logs
3. Supabase logs
4. Browser console errors