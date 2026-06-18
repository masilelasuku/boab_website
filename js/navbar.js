/**
 * BOAB Investments – Navbar Module
 * Handles sticky header, mobile navigation, and active link highlighting
 */

(function () {
  'use strict';

  const navbar = document.getElementById('mainNavbar');
  const navLinks = document.querySelectorAll('#navbarNav .nav-link');
  const navbarCollapse = document.getElementById('navbarNav');
  const sections = document.querySelectorAll('section[id]');

  if (!navbar) return;

  /**
   * Toggle scrolled state on navbar
   */
  function handleNavbarScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  /**
   * Highlight active nav link based on scroll position
   */
  function highlightActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /**
   * Close mobile menu when a nav link is clicked
   */
  function closeMobileMenu() {
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) {
        bsCollapse.hide();
      } else {
        navbarCollapse.classList.remove('show');
      }
    }
  }

  /**
   * Smooth scroll for nav links
   */
  function initSmoothScroll() {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
            closeMobileMenu();
          }
        }
      });
    });

    document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
          }
        }
      });
    });
  }

  // Event listeners
  window.addEventListener('scroll', function () {
    handleNavbarScroll();
    highlightActiveLink();
  }, { passive: true });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  // Initialize
  handleNavbarScroll();
  highlightActiveLink();
  initSmoothScroll();
})();
