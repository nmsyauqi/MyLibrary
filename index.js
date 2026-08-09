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

const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = '/'
})

async function loadPage(pageName, hash = '') {
    try {
        
        if (!pageName) pageName = 'main';
        
        
        const fileUrl = `/pages/${pageName}.html`;
        
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Halaman tidak ditemukan atau gagal dimuat');
        
        const html = await response.text();
        
        
        document.getElementById('app-content').innerHTML = html;

        
        if (hash) {
            const targetElement = document.getElementById(hash.substring(1)); 
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else {
            
            window.scrollTo(0, 0);
        }
    } catch (error) {
        console.error("Kesalahan Routing:", error);
        document.getElementById('app-content').innerHTML = `
            <div style="text-align:center; padding: 5rem 1rem;">
                <h2>404 - Halaman Gagal Dimuat</h2>
                <p>Modul yang Anda cari tidak ditemukan.</p>
                <a href="?p=main" style="color: blue; text-decoration: underline;">Kembali ke Beranda</a>
            </div>
        `;
    }
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    
    
    if (link && link.origin === window.location.origin && link.getAttribute('target') !== '_blank') {
        e.preventDefault(); 
        
        
        const fullUrl = link.href; 
        const urlObj = new URL(fullUrl);
        
        
        const page = urlObj.searchParams.get('p') || 'main';
        const hash = urlObj.hash;

        
        window.history.pushState({ page, hash }, '', fullUrl);
        
        
        loadPage(page, hash);
    }
});

window.addEventListener('popstate', (e) => {
    const urlObj = new URL(window.location.href);
    const page = urlObj.searchParams.get('p') || 'main';
    const hash = urlObj.hash;
    loadPage(page, hash);
});

const initialUrl = new URL(window.location.href);
const initialPage = initialUrl.searchParams.get('p') || 'main';
const initialHash = initialUrl.hash;

loadPage(initialPage, initialHash);
