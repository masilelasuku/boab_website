/**
 * BOAB Investments – Forms Module
 * Client-side form validation and submission handling
 */

(function () {
  'use strict';

  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  /**
   * Validation rules
   */
  const validators = {
    fullName: function (value) {
      return value.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(value.trim());
    },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    },
    phone: function (value) {
      const cleaned = value.replace(/[\s\-()]/g, '');
      return cleaned.length >= 8 && /^\+?[\d]+$/.test(cleaned);
    },
    service: function (value) {
      return value !== '';
    },
    message: function (value) {
      return value.trim().length >= 20;
    },
    consent: function (checked) {
      return checked === true;
    }
  };

  /**
   * Validate a single field
   */
  function validateField(field) {
    const name = field.name || field.id;
    const validator = validators[name];

    if (!validator) return true;

    let isValid;
    if (field.type === 'checkbox') {
      isValid = validator(field.checked);
    } else {
      isValid = validator(field.value);
    }

    if (isValid) {
      field.classList.remove('is-invalid');
      field.classList.add('is-valid');
    } else {
      field.classList.remove('is-valid');
      field.classList.add('is-invalid');
    }

    return isValid;
  }

  /**
   * Validate entire form
   */
  function validateForm() {
    const fields = contactForm.querySelectorAll('input, select, textarea');
    let isFormValid = true;

    fields.forEach(function (field) {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  /**
   * Real-time validation on blur
   */
  function initRealtimeValidation() {
    const fields = contactForm.querySelectorAll('input, select, textarea');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        if (this.value || this.type === 'checkbox') {
          validateField(this);
        }
      });

      field.addEventListener('input', function () {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });

      if (field.tagName === 'SELECT') {
        field.addEventListener('change', function () {
          validateField(this);
        });
      }
    });
  }

  /**
   * Show/hide loading state on submit button
   */
  function setLoadingState(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    if (loading) {
      submitBtn.disabled = true;
      btnText.classList.add('d-none');
      btnLoading.classList.remove('d-none');
    } else {
      submitBtn.disabled = false;
      btnText.classList.remove('d-none');
      btnLoading.classList.add('d-none');
    }
  }

  /**
   * Hide alert messages
   */
  function hideAlerts() {
    formSuccess.classList.add('d-none');
    formError.classList.add('d-none');
  }

  /**
   * Handle form submission
   */
  function handleSubmit(e) {
    e.preventDefault();
    hideAlerts();

    if (!validateForm()) {
      const firstInvalid = contactForm.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setLoadingState(true);

    // Simulate form submission (replace with actual backend endpoint)
    setTimeout(function () {
      setLoadingState(false);
      formSuccess.classList.remove('d-none');
      contactForm.reset();

      contactForm.querySelectorAll('.is-valid').forEach(function (field) {
        field.classList.remove('is-valid');
      });

      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
  }

  // Initialize
  contactForm.addEventListener('submit', handleSubmit);
  initRealtimeValidation();
})();
