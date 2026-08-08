# 🚀 Syauqi's Personal Portfolio

> Engineering scalable web applications through logical architecture and sustainable coding practices.

Sebuah situs portofolio interaktif yang dibangun menggunakan pendekatan **Client-Side Layout Injection**. Proyek ini mendemonstrasikan bagaimana membangun arsitektur *Single-Page Application* (SPA) yang cepat dan mulus murni menggunakan Native HTML, CSS, dan Vanilla JavaScript (Fetch API), tanpa bergantung pada *framework* JavaScript berukuran besar.

---

## 👨‍💻 About The Developer

Saya adalah seorang mahasiswa Rekayasa Perangkat Lunak (IT Software Engineering) dan programmer yang melihat *coding* lebih dari sekadar menulis sintaks. Berangkat dari latar belakang ilmu pengetahuan alam (IPA), saya terbiasa memecahkan masalah kompleks dengan logika terstruktur, analitis, dan perhatian pada detail. 

Saya menikmati proses memahami bagaimana sebuah sistem bekerja dari akar hingga ke rantingnya, termasuk eksplorasi taksonomi dan penyusunan struktur data relasional (seperti manajemen data farmasi). Saat ini, fokus pengembangan saya meliputi:

*   **Web Development:** Eksplorasi mendalam pada ekosistem **TALL Stack** (Tailwind, Alpine.js, Laravel, Livewire) dan Vue.js.
*   **Mobile Development:** Membangun aplikasi lintas platform menggunakan **Flutter** dan **Dart**.
*   **System Architecture:** Merancang modul *Point of Sale* (POS), sistem manajemen kesehatan, dan merancang alur *database* relasional.

## 🌟 Featured Projects

Beberapa proyek pengembangan aplikasi yang sedang atau telah saya kerjakan:

*   **[Exercisory](https://github.com/nmsyauqi/exercisory-public)**: *Health Compliance Gamification System*. Aplikasi berbasis Laravel Livewire dengan antarmuka bergaya Retro OS (Windows 98). Dilengkapi peran ganda (Admin & Partisipan), sistem *leaderboard*, dan kalender pelacakan kepatuhan harian.
*   **Melify**: Proyek aplikasi web aktif yang dikembangkan menggunakan arsitektur Laravel dan Vue.

## 🏗️ Portfolio Architecture (Under The Hood)

Situs portofolio ini sendiri merupakan eksperimen teknis pembuatan *Custom Router*.

*   **Master Layout System**: `index.html` bertindak sebagai cangkang utama (menyimpan navigasi dan *footer* tetap).
*   **Dynamic Injection**: Konten spesifik halaman (seperti `main.html` dan `exercisory.html`) dipanggil secara asinkron (Fetch API) dan disuntikkan ke dalam DOM.
*   **Smart Routing**: Skrip JS mencegat navigasi tautan internal, mengelola URL *browser* (History API), dan mendukung *smooth scrolling* pada elemen *hash* (`#`) tanpa me-muat ulang seluruh halaman.

## 🛠️ Tech Stack & Skills

*   **Languages**: HTML5, CSS3, JavaScript (Vanilla), PHP, Dart.
*   **Frameworks/Tools**: Laravel, Livewire, Flutter, TailwindCSS, SASS, Git.
*   **Environment**: Linux (Zorin OS / Alpine Linux) - *Powered by ThinkPad X270*.

## ⚙️ How to Run Locally

Karena portofolio ini menggunakan Fetch API untuk menarik file HTML, proyek ini harus dijalankan di atas *local web server* untuk menghindari masalah CORS.

1.  *Clone* repositori ini.
2.  Buka *folder* proyek menggunakan VS Code.
3.  Jalankan menggunakan ekstensi **Live Server** (Port: 5500).
4.  Akses melalui `http://127.0.0.1:5500`.

---
*© Copyright 2026. Made by [Nmsyauqi](https://nmsyauqi.my.id).*