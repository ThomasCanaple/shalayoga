    // -------------------------------------------------------
    // Mobile menu toggle
    // -------------------------------------------------------
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu   = document.getElementById('mobile-menu');

    function closeMobileMenu() {
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburgerBtn.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeModal();
      }
    });

    // -------------------------------------------------------
    // Mentions Légales modal
    // -------------------------------------------------------
    const modalOverlay   = document.getElementById('mentions-legales-modal');
    const modalCloseBtn  = document.getElementById('modal-close-btn');
    const mlBtn1         = document.getElementById('mentions-legales-btn');
    const mlBtn2         = document.getElementById('mentions-legales-btn-2');

    function openModal() {
      modalOverlay.classList.add('open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      // Move focus to modal
      const modal = modalOverlay.querySelector('.modal');
      modal.focus();
    }

    function closeModal() {
      modalOverlay.classList.remove('open');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }

    mlBtn1.addEventListener('click', openModal);
    mlBtn2.addEventListener('click', openModal);
    modalCloseBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    // -------------------------------------------------------
    // Active nav link on scroll (IntersectionObserver)
    // -------------------------------------------------------
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav__link[href^="#"]');

    const observerOptions = {
      root: null,
      rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-height').trim()} 0px -60% 0px`,
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // -------------------------------------------------------
    // Scroll-reveal animation
    // -------------------------------------------------------
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      revealEls.forEach(el => revealObserver.observe(el));
    } else {
      // Fallback: show all immediately
      revealEls.forEach(el => el.classList.add('visible'));
    }
