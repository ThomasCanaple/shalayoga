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

    // Close mobile menu and all modals on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMobileMenu();
        closeAllModals();
      }
    });

    // -------------------------------------------------------
    // Modal generique (Mentions légales, CGV, Règlement)
    // -------------------------------------------------------
    function setupModal(overlayId, closeBtnId, openBtnIds) {
      const overlay = document.getElementById(overlayId);
      if (!overlay) return null;
      const closeBtn = document.getElementById(closeBtnId);

      function open() {
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        const inner = overlay.querySelector('.modal');
        if (inner) inner.focus();
      }

      function close() {
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
      }

      openBtnIds.forEach(id => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', open);
      });

      if (closeBtn) closeBtn.addEventListener('click', close);

      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });

      return close;
    }

    const closeML  = setupModal('mentions-legales-modal', 'modal-close-btn',    ['mentions-legales-btn', 'mentions-legales-btn-2']);
    const closeCGV = setupModal('cgv-modal',              'cgv-close-btn',       ['cgv-btn', 'cgv-btn-2']);
    const closeRI  = setupModal('reglement-modal',        'reglement-close-btn', ['reglement-btn', 'reglement-btn-2']);

    function closeAllModals() {
      if (closeML)  closeML();
      if (closeCGV) closeCGV();
      if (closeRI)  closeRI();
    }

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
      revealEls.forEach(el => el.classList.add('visible'));
    }

    // -------------------------------------------------------
    // Back to top button
    // -------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
      const toggleBackToTop = () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 320);
      };

      toggleBackToTop();
      window.addEventListener('scroll', toggleBackToTop, { passive: true });
    }
