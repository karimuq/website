// Featured artwork rotation configuration
const ARTWORK_CONFIG = {
  rotationInterval: 7000,
  fadeOutDuration: 300,
  artworks: [
    {
      src: 'Mimi1_run.gif',
      title: 'Mimi',
      description: 'A cheerful pixel art animation of Mimi, showing her dynamic running movement.'
    },
    {
      src: 'Kamilaaaaaa.png',
      title: 'Kamila',
      description: 'A delightful pixel art portrait of Kamila, showcasing detailed character design.'
    },
    {
      src: 'Ice cream.gif',
      title: 'Ice Cream',
      description: 'A sweet pixel art animation featuring a delicious ice cream design.'
    }
  ]
};

// Featured artwork rotation functionality
class FeaturedArtwork {
  constructor(config) {
    this.config = config;
    this.currentIndex = 0;
    this.elements = {
      img: document.getElementById('featured-pixel-art'),
      title: document.getElementById('featured-title'),
      description: document.getElementById('featured-description')
    };
    this.isTransitioning = false;
  }

  validateElements() {
    return Object.values(this.elements).every(element => element !== null);
  }

  async updateArtwork() {
    if (!this.validateElements() || this.isTransitioning) return;

    this.isTransitioning = true;
    const artwork = this.config.artworks[this.currentIndex];

    // Fade out
    this.elements.img.style.opacity = '0';

    // Wait for fade out
    await new Promise(resolve => setTimeout(resolve, this.config.fadeOutDuration));

    // Update content
    this.elements.img.src = artwork.src;
    this.elements.title.textContent = artwork.title;
    this.elements.description.textContent = artwork.description;

    // Fade in
    this.elements.img.style.opacity = '1';

    // Update index
    this.currentIndex = (this.currentIndex + 1) % this.config.artworks.length;
    this.isTransitioning = false;
  }

  startRotation() {
    if (!this.validateElements()) {
      console.warn('Featured artwork elements not found');
      return;
    }

    // Initial update
    this.updateArtwork();

    // Start rotation interval
    setInterval(() => this.updateArtwork(), this.config.rotationInterval);
  }
}

// Initialize featured artwork rotation
document.addEventListener('DOMContentLoaded', () => {
  const featuredArtwork = new FeaturedArtwork(ARTWORK_CONFIG);
  featuredArtwork.startRotation();
});

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

// Mobile Navigation and Active Link Handling
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const body = document.body;

  // Set animation delay for nav items
  navLinks.forEach((link, index) => {
    link.style.setProperty('--item-index', index + 1);
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Toggle mobile menu
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && 
        !nav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });

  // Handle development bar visibility
  const devBar = document.getElementById('development-bar');
  const closeDevBarBtn = document.getElementById('close-dev-bar');
  const header = document.querySelector('header');
  
  if (devBar && closeDevBarBtn) {
    // Check if the user has previously closed the bar
    if (localStorage.getItem('devBarClosed') === 'true') {
      devBar.style.display = 'none';
      header.style.marginTop = '0';
    }
    
    // Add event listener to close button
    closeDevBarBtn.addEventListener('click', function() {
      devBar.style.display = 'none';
      header.style.marginTop = '0';
      localStorage.setItem('devBarClosed', 'true');
    });
  }

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