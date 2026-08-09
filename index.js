// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'http://nmsyauqi.my.id'
})

// Fungsi utama untuk mengambil dan menyuntikkan HTML
async function loadPage(url, push = true) {
    try {
        const pathUrl = url.split('#')[0];
        
        // Ambil file HTML
        const response = await fetch(pathUrl);
        if (!response.ok) throw new Error('Halaman tidak ditemukan');
        
        const html = await response.text();
        
        // Suntikkan ke dalam tag <main id="app-content">
        document.getElementById('app-content').innerHTML = html;

        // Ubah URL di browser tanpa reload
        if (push) {
            window.history.pushState({ path: url }, '', url);
        }

        // Tangani smooth scroll jika URL mengandung hash (#)
        if (url.includes('#')) {
            const targetId = url.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            // Jika pindah halaman murni tanpa hash, scroll ke paling atas
            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error("Gagal memuat halaman:", error);
        document.getElementById('app-content').innerHTML = '<h2 style="text-align:center; margin-top:5rem;">Gagal memuat konten.</h2>';
    }
}

// Tangkap semua klik pada dokumen
document.addEventListener('click', (e) => {
    // Cari elemen <a> terdekat dari titik yang diklik
    const link = e.target.closest('a');
    
    // Validasi: Pastikan itu link, berasal dari origin (domain) yang sama, dan bukan open new tab
    if (link && link.origin === window.location.origin && link.getAttribute('target') !== '_blank') {
        e.preventDefault(); // Cegah reload browser bawaan
        
        const url = link.getAttribute('href');
        const currentPath = window.location.pathname;
        const targetPath = url.split('#')[0];

        // Jika mengklik hash di halaman yang sama (contoh: dari main.html klik ke #about)
        if (currentPath === targetPath || (currentPath === '/' && targetPath.includes('main.html'))) {
             if (url.includes('#')) {
                 const targetId = url.split('#')[1];
                 const targetElement = document.getElementById(targetId);
                 if (targetElement) {
                     targetElement.scrollIntoView({ behavior: 'smooth' });
                     window.history.pushState(null, '', url);
                 }
             }
        } else {
            // Jika mengklik halaman berbeda (contoh: dari main.html ke exercisory.html)
            loadPage(url);
        }
    }
});

// Tanggapi tombol back/forward di browser
window.addEventListener('popstate', () => {
    loadPage(window.location.pathname + window.location.hash, false);
});

// Muat halaman default saat web pertama kali dibuka
// Pastikan path ini sesuai dengan struktur folder Anda
loadPage('./pages/main.html', false);