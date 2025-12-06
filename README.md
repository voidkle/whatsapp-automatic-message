# LAZY AH PROJECT - WhatsApp Auto-Reply Bot

**WhatsApp Auto-Reply Bot** adalah sebuah proyek sederhana yang berfungsi sebagai bot pembalas pesan otomatis. Bot ini dirancang untuk beroperasi tanpa membalas pesan jika pengguna (pemilik akun) sedang aktif (mengirim pesan) dalam periode waktu tertentu.
Fitur *idle countdown* akan ditambahkan untuk memudahkan monitoring status bot.

Proyek ini dibangun menggunakan Node.js dan library `whatsapp-web.js` dengan Puppeteer.
terserah lu mo pake docker apa kagak

## Fitur Utama

* **Auto-Reply Berbasis Waktu:** Memberikan balasan otomatis yang berbeda berdasarkan jam (diasumsikan zona waktu UTC+7/WIB):
    * **21:00 - 04:59:** Balasan "Tidur"
    * **09:00 - 16:59:** Balasan "Bekerja"
    * **Selain itu:** Balasan "Beraktivitas di luar"
* **Aktivitas Pemilik (Owner) Tracking:** Bot tidak akan membalas pesan masuk jika pemilik akun terdeteksi aktif (mengirim pesan) dalam 5 menit terakhir.
* **Filtering Auto-Reply:** Balasan otomatis yang dikirim oleh bot **tidak** akan mereset *timeout* aktivitas 5 menit, memastikan bot tetap siap membalas setelah satu kali balasan terkirim.
* **Console Countdown:** Menampilkan hitungan mundur (*countdown*) 5 menit di konsol untuk memantau kapan status bot berubah dari "Aktif" menjadi "Siap Membalas Otomatis".
* **Health Check API:** Menyediakan endpoint `/` untuk memeriksa status bot dan aktivitas pemilik (`status: running`, `userActive: true/false`).

## Prasyarat

* Node.js (v18 ke atas, sesuai `Dockerfile` dan `package.json`)
* Docker dan Docker Compose (Opsional, untuk lingkungan produksi)

## Instalasi dan Setup

### 1. Kloning Repositori & Instalasi Dependensi

```bash
git clone https://github.com/voidkle/whatsapp-automatic-message.git
cd whatsapp-automatic-message
npm install
npm start
```
### 2. Kalo pake Docker
```bash
git clone https://github.com/voidkle/whatsapp-automatic-message.git
cd whatsapp-automatic-message
docker compose up -d
```
terus cek di log docker buat scan qr untuk lojin
npm start
