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
const headerLogoText = document.querySelector('.header__logo-sub')

// Klik pada teks logo -> routing SPA ke beranda
if (headerLogoText) {
  headerLogoText.addEventListener('click', (e) => {
    e.stopPropagation()
    location.href = '/'
  })
}

async function loadPage(pageName, hash = '') {
    try {
        
        if (!pageName) pageName = 'main';
        
        
        const fileUrl = `/pages/${pageName}.html`;
        
        const response = await fetch(fileUrl);
        if (!response.ok) throw new Error('Halaman tidak ditemukan atau gagal dimuat');
        
        const html = await response.text();
        
        
        document.getElementById('app-content').innerHTML = html;
        initCertificatesCarousel();

        
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
  if (!link) return;

  // Ignore external links or links that open in new tab
  if (link.getAttribute('target') === '_blank' || link.origin !== window.location.origin) return;

  // Only intercept links that carry the `p` parameter (SPA routes)
  let urlObj;
  try {
    urlObj = new URL(link.href);
  } catch (err) {
    return;
  }
  if (!urlObj.searchParams.has('p')) return;

  e.preventDefault();
  const page = urlObj.searchParams.get('p') || 'main';
  const hash = urlObj.hash;

  window.history.pushState({ page, hash }, '', link.href);
  loadPage(page, hash);
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

function initCertificatesCarousel() {
  const carousel = document.querySelector('.certificates__carousel');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('.certificates__slide'));
  if (!slides.length) return;

  let currentIndex = 0;
  const prevButton = document.querySelector('.certificates__prev');
  const nextButton = document.querySelector('.certificates__next');

  const showSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === index);
    });
    currentIndex = index;
  };

  showSlide(0);

  if (prevButton) prevButton.onclick = () => showSlide(currentIndex - 1);
  if (nextButton) nextButton.onclick = () => showSlide(currentIndex + 1);

  // Keyboard navigation: ArrowLeft / ArrowRight
  if (window._certCarouselKeyHandler) {
    document.removeEventListener('keydown', window._certCarouselKeyHandler);
  }
  window._certCarouselKeyHandler = (e) => {
    const active = document.activeElement;
    const tag = active && active.tagName && active.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea' || (active && active.isContentEditable)) return;
    if (e.key === 'ArrowLeft') {
      showSlide(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showSlide(currentIndex + 1);
    }
  };
  document.addEventListener('keydown', window._certCarouselKeyHandler);
}

loadPage(initialPage, initialHash);
