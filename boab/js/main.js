/**
 * BOAB Investments – Main Application Module
 * Preloader, scroll-to-top, and global initialization
 */

(function () {
  'use strict';

  /**
   * Preloader
   */
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('loaded');
        document.body.style.overflow = '';
      }, 800);
    });

    document.body.style.overflow = 'hidden';
  }

  /**
   * Scroll to Top Button
   */
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (!scrollBtn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * Set current year in footer
   */
  function setCurrentYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  /**
   * Lazy load images with fade-in effect
   */
  function initLazyImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    images.forEach(function (img) {
      img.addEventListener('load', function () {
        this.style.opacity = '1';
      });

      if (!img.complete) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
      }
    });
  }

  /**
   * Prevent empty hash links from scrolling
   */
  function initEmptyHashPrevention() {
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
      });
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initPreloader();
    initScrollToTop();
    setCurrentYear();
    initLazyImages();
    initEmptyHashPrevention();
  });
})();
