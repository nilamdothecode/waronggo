# WarungGo 🍜

Ordering app + live kitchen dashboard untuk warung / restoran kecil.
Customer order dari telefon, dapur terima order tu **live** — tanpa
telefon, tanpa WhatsApp bersepah.

Built with **React + Vite** (frontend sahaja). Order disimpan dalam
browser (`localStorage`) dan disync antara tab guna `BroadcastChannel`,
jadi ia berfungsi sebagai demo tanpa perlukan server.

---

## ✨ Apa yang ia buat

- **Customer** — browse menu (Makanan / Minuman), tambah ke cart, isi no.
  meja, hantar pesanan. Status pesanan update secara live.
- **Dapur / Kitchen** — semua order masuk sebagai "ticket". Staff tekan
  satu butang untuk gerakkan order: Baru masuk → Tengah masak → Siap →
  Selesai.
- **Real-time** — buka site dalam dua tab. Order kat tab Customer terus
  muncul kat tab Kitchen.

> ⚠️ Nota: Ni versi demo frontend. Takde database/server sebenar dan takde
> payment betul. Data disimpan dalam browser kau je. Cukup untuk portfolio
> & live demo.

---

## 🛠️ Run kat laptop sendiri

Pastikan ada [Node.js](https://nodejs.org) (versi 18 ke atas).

```bash
npm install      # download dependencies (sekali je)
npm run dev      # start dev server
```

Buka link yang keluar (biasanya http://localhost:5173).

Untuk build versi production:

```bash
npm run build    # hasilkan folder dist/
npm run preview  # preview hasil build
```

---

## 🚀 Cara deploy (untuk dapat LIVE DEMO link)

Cara paling senang — guna **Vercel**, percuma:

1. Push projek ni ke GitHub (lihat bawah).
2. Pergi ke [vercel.com](https://vercel.com), sign up guna akaun GitHub.
3. Klik **Add New → Project**, pilih repo `warunggo`.
4. Vercel auto-detect Vite. Tak payah tukar apa-apa — klik **Deploy**.
5. Tunggu seminit. Siap! Kau dapat link macam
   `https://warunggo.vercel.app` — itu **Live Demo** link kau.

---

## 📦 Cara push ke GitHub (untuk dapat VIEW CODE link)

1. Buat akaun di [github.com](https://github.com) kalau belum ada.
2. Buat repo baru (kosong) bernama `warunggo`.
3. Dalam folder projek ni, jalankan:

```bash
git init
git add .
git commit -m "WarungGo: ordering app + kitchen dashboard"
git branch -M main
git remote add origin https://github.com/USERNAME-KAU/warunggo.git
git push -u origin main
```

(Tukar `USERNAME-KAU` dengan username GitHub kau.)

4. Link repo tu (`https://github.com/USERNAME-KAU/warunggo`) ialah
   **View Code** link kau.

---

## 📁 Struktur projek

```
warunggo/
├── index.html              # entry HTML
├── package.json            # dependencies & scripts
├── vite.config.js          # config Vite
└── src/
    ├── main.jsx            # mount React ke page
    ├── App.jsx             # shell + switcher Customer/Kitchen
    ├── store.js            # "backend palsu" — order + sync antara tab
    ├── styles.css          # semua styling
    ├── data/
    │   └── menu.js         # senarai menu (edit harga/makanan di sini)
    └── components/
        ├── CustomerApp.jsx # skrin order customer
        └── KitchenApp.jsx  # dashboard dapur
```

Nak tukar menu? Edit `src/data/menu.js` sahaja.
