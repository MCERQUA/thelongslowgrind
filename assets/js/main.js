/**
 * THE LONG SLOW GRIND - Main JavaScript
 * Mobile menu, smooth scroll, form handlers
 */

(function () {
  'use strict';

  // ──────────────────────────────────────────────
  // Mobile Menu Toggle
  // ──────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // ──────────────────────────────────────────────
  // Smooth Scroll for anchor links
  // ──────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var navHeight = document.querySelector('nav') ? document.querySelector('nav').offsetHeight : 0;
        var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ──────────────────────────────────────────────
  // Newsletter Form Handler
  // ──────────────────────────────────────────────
  var newsletterForms = document.querySelectorAll('[data-form="newsletter"]');
  newsletterForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailInput = form.querySelector('input[type="email"]');
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      if (!emailInput || !emailInput.value.trim()) return;

      // Disable while processing
      submitBtn.disabled = true;
      submitBtn.textContent = 'JOINING...';

      // Simulate async submission
      setTimeout(function () {
        emailInput.value = '';
        submitBtn.textContent = 'SUBSCRIBED';
        submitBtn.classList.add('bg-green-600');

        // Show success message
        var msg = document.createElement('p');
        msg.className = 'text-green-400 text-sm mt-2 font-bold uppercase tracking-wider';
        msg.textContent = 'Welcome to the grind. Check your inbox.';
        if (!form.querySelector('.text-green-400')) {
          form.appendChild(msg);
        }

        // Reset after delay
        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-green-600');
          var successMsg = form.querySelector('.text-green-400');
          if (successMsg) successMsg.remove();
        }, 4000);
      }, 800);
    });
  });

  // ──────────────────────────────────────────────
  // Contact Form Handler
  // ──────────────────────────────────────────────
  var contactForms = document.querySelectorAll('[data-form="contact"]');
  contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'SENDING...';

      setTimeout(function () {
        // Clear all inputs
        form.querySelectorAll('input, textarea, select').forEach(function (field) {
          if (field.type !== 'submit' && field.type !== 'button') {
            field.value = '';
          }
        });

        submitBtn.textContent = 'SENT';
        submitBtn.classList.add('bg-green-600');

        var msg = document.createElement('p');
        msg.className = 'text-green-400 text-sm mt-4 font-bold uppercase tracking-wider';
        msg.textContent = 'Message received. We will be in touch.';
        if (!form.querySelector('.text-green-400')) {
          form.appendChild(msg);
        }

        setTimeout(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('bg-green-600');
          var successMsg = form.querySelector('.text-green-400');
          if (successMsg) successMsg.remove();
        }, 4000);
      }, 800);
    });
  });

  // ──────────────────────────────────────────────
  // Nav scroll effect (add bg opacity on scroll)
  // ──────────────────────────────────────────────
  var nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        nav.classList.add('shadow-lg');
        nav.classList.remove('bg-[#131313]/80');
        nav.classList.add('bg-[#131313]/95');
      } else {
        nav.classList.remove('shadow-lg');
        nav.classList.remove('bg-[#131313]/95');
        nav.classList.add('bg-[#131313]/80');
      }
    });
  }
})();
