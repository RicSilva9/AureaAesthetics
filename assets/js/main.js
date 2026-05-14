// ============================
// Mobile Menu
// ============================
const menuToggle = document.getElementById('menu-toggle')
const menuClose = document.getElementById('menu-close')
const mobileMenu = document.getElementById('mobile-menu')
const menuOverlay = document.getElementById('menu-overlay')
const menuDrawer = document.getElementById('menu-drawer')

function openMenu() {
  mobileMenu.classList.remove('hidden')
  // Pequeno delay para a animação funcionar
  setTimeout(() => {
    menuDrawer.classList.remove('translate-x-full')
  }, 10)
  document.body.style.overflow = 'hidden'
}

function closeMenu() {
  menuDrawer.classList.add('translate-x-full')
  setTimeout(() => {
    mobileMenu.classList.add('hidden')
  }, 300)
  document.body.style.overflow = ''
}

if (menuToggle) menuToggle.addEventListener('click', openMenu)
if (menuClose) menuClose.addEventListener('click', closeMenu)
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu)

// Fecha o menu ao clicar em qualquer link
document.querySelectorAll('#mobile-menu a').forEach((link) => {
  link.addEventListener('click', closeMenu)
})

// ============================
// Smooth Scroll para links âncora
// ============================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      e.preventDefault();
      
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 800;
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  });
});

// ============================
// Toggle Treatments
// ============================
const toggleBtn = document.getElementById('toggle-treatments');
const toggleText = document.getElementById('toggle-text');
const toggleIcon = document.getElementById('toggle-icon');
const extraTreatments = document.querySelectorAll('.treatment-extra');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isHidden = extraTreatments[0].classList.contains('hidden');

    if (isHidden) {
      // MOSTRAR — remove hidden e anima entrada
      extraTreatments.forEach((card, index) => {
        card.classList.remove('hidden');
        // Pequeno delay escalonado entre cards
        setTimeout(() => {
          card.classList.add('is-visible');
        }, index * 100);
      });

      toggleText.textContent = 'Show less';
      toggleIcon.classList.add('rotate-180');

    } else {
      // ESCONDER — anima saída e depois adiciona hidden
      extraTreatments.forEach((card, index) => {
        setTimeout(() => {
          card.classList.remove('is-visible');
        }, index * 50);
      });

      // Espera a animação terminar antes de esconder
      setTimeout(() => {
        extraTreatments.forEach(card => {
          card.classList.add('hidden');
        });
      }, 500);

      toggleText.textContent = 'View more treatments';
      toggleIcon.classList.remove('rotate-180');
    }
  });
}