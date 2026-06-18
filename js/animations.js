/**
 * BOAB Investments – Animations Module
 * Scroll reveal, animated counters, and project gallery interactions
 */

(function () {
  'use strict';

  /**
   * Scroll Reveal using Intersection Observer
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

    if (!revealElements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(function (el) {
      observer.observe(el);
    });

    // Immediately reveal hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      setTimeout(function () {
        heroContent.classList.add('revealed');
      }, 300);
    }
  }

  /**
   * Animated Counter
   */
  function animateCounter(element, target, duration) {
    duration = duration || 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * target);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Initialize counters when stats section is visible
   */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const counted = new Set();

    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !counted.has(entry.target)) {
          counted.add(entry.target);
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          if (!isNaN(target)) {
            animateCounter(entry.target, target);
          }
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /**
   * Project Gallery Filter
   */
  function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (!filterBtns.length || !projectItems.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
        });
        this.classList.add('active');

        projectItems.forEach(function (item) {
          const category = item.getAttribute('data-category');

          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden', 'filtering-out');
            item.classList.add('filtering-in');
            item.style.display = '';
          } else {
            item.classList.add('filtering-out');
            setTimeout(function () {
              item.classList.add('hidden');
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /**
   * Project Modal Population
   */
  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    if (!modal) return;

    const viewBtns = document.querySelectorAll('.project-view-btn');

    viewBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const title = this.getAttribute('data-title');
        const category = this.getAttribute('data-category');
        const description = this.getAttribute('data-description');
        const image = this.getAttribute('data-image');

        document.getElementById('projectModalLabel').textContent = title;
        document.getElementById('modalCategory').textContent = category;
        document.getElementById('modalDescription').textContent = description;

        const modalImage = document.getElementById('modalImage');
        modalImage.src = image;
        modalImage.alt = title;
      });
    });
  }

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initCounters();
    initProjectFilter();
    initProjectModal();
  });
})();
