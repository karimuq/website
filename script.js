// Header scroll effect
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  const scrollPosition = window.scrollY;
  
  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Add active class to current navigation item
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Add loading state to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.classList.add('loading');
    img.addEventListener('load', function() {
      this.classList.remove('loading');
    });
  });
});

// Cookie Consent Handler
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptBtn = document.querySelector('.cookie-btn.accept');
    const declineBtn = document.querySelector('.cookie-btn.decline');

    // Check if user has already made a choice
    if (!localStorage.getItem('cookieConsent')) {
        cookieConsent.classList.add('show');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
    });

    declineBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('show');
        // Optionally redirect to a limited version of the site or show warning
        // alert('Some features may be limited without accepting cookies.');
    });
});

// Copyright Protection
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        // alert('Images are protected by copyright. Please contact for usage permissions.');
    }
});

// Disable image dragging
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Add warning on copy
document.addEventListener('copy', (e) => {
    const selection = window.getSelection();
    if (selection.toString().length > 0) {
        const copyrightNotice = "\n\n© 2025 Karim Abdelnour. All rights reserved. This content is protected by copyright and may not be used for commercial purposes without explicit permission.";
        e.clipboardData.setData('text/plain', selection.toString() + copyrightNotice);
        e.preventDefault();
    }
});

// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 0);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// Mobile Menu Functionality
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const body = document.body;

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
  body.classList.toggle('menu-open');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (nav.classList.contains('active') && 
      !nav.contains(e.target) && 
      !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
  }
}); 