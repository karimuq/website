// Featured artwork rotation configuration
const ARTWORK_CONFIG = {
  rotationInterval: 7000,
  fadeOutDuration: 300,
  artworks: [
    {
      src: 'pixel-art/Mimi1_run.gif',
      title: 'Mimi',
      description: 'A cheerful pixel art animation of Mimi, showing her dynamic running movement.'
    },
    {
      src: 'pixel-art/Kamilaaaaaa.png',
      title: 'Kamila',
      description: 'A delightful pixel art portrait of Kamila, showcasing detailed character design.'
    },
    {
      src: 'pixel-art/Ice cream.gif',
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
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  if (!header) return;
  const scrollPosition = window.scrollY;

  if (scrollPosition > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Navigation and Active Link Handling
document.addEventListener('DOMContentLoaded', function () {
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
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
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
  }

  // Handle development bar visibility
  const devBar = document.getElementById('development-bar');
  const closeDevBarBtn = document.getElementById('close-dev-bar');
  const header = document.querySelector('header');

  if (devBar && closeDevBarBtn) {
    // Check if the user has previously closed the bar
    if (localStorage.getItem('devBarClosed') === 'true') {
      devBar.style.display = 'none';
      body.classList.remove('has-dev-bar');
    } else {
      body.classList.add('has-dev-bar');
    }

    // Add event listener to close button
    closeDevBarBtn.addEventListener('click', function () {
      devBar.style.display = 'none';
      body.classList.remove('has-dev-bar');
      localStorage.setItem('devBarClosed', 'true');
    });
  }

  // Add loading state to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (img.complete) {
      img.classList.remove('loading');
    } else {
      img.classList.add('loading');
      img.addEventListener('load', function () {
        this.classList.remove('loading');
      });
    }
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
document.addEventListener('dragstart', (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    e.preventDefault();
  }
});


// Gallery Filter Functionality
document.addEventListener('DOMContentLoaded', function () {
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

// ─── Liquid Glass Cursor Glow ─────────────────────────────────────────────────
// Single fixed orb clipped to the section between the nearest visible border lines.
// The orb never crosses a visible line — it presses against it and brightens it.

(function initLiquidGlass() {
  // Disable Liquid Glass cursor glow on mobile/touch devices for smooth scrolling & performance
  if (window.matchMedia('(pointer: coarse)').matches || ('ontouchstart' in window && navigator.maxTouchPoints > 0)) {
    return;
  }

  const COLORS = {
    light: { header: [108, 99, 255], footer: [234, 170, 8], card: [26, 188, 156], hero: [52, 152, 219], section: [79, 140, 219] },
    dark: { header: [160, 150, 255], footer: [250, 204, 21], card: [52, 211, 153], hero: [93, 173, 226], section: [100, 170, 240] }
  };

  const ORB_R = 240;   // volumetric ambient spread
  const LERP = 0.10;  // smooth tracking speed
  const LINE_DIST = 120;   // px from line where it starts glowing
  const BLUR = 90;    // heavy volumetric feathering

  // One fixed orb
  const orb = document.createElement('div');
  orb.id = 'lg-orb';
  orb.style.cssText = [
    'position:fixed', 'top:0', 'left:0',
    'width:' + (ORB_R * 2) + 'px', 'height:' + (ORB_R * 2) + 'px',
    'border-radius:50%', 'pointer-events:none', 'z-index:0',
    'transform:translate(-50%,-50%)',
    'filter:blur(' + BLUR + 'px)',
    'transition:opacity 0.35s ease',
    'will-change:transform'
  ].join(';');
  document.body.appendChild(orb);

  // One line-glow bar that slides to nearest visible border
  const lineGlow = document.createElement('div');
  lineGlow.id = 'lg-line';
  lineGlow.style.cssText = [
    'position:fixed', 'left:0', 'width:100%', 'height:3px',
    'pointer-events:none', 'z-index:0', 'opacity:0',
    'transition:opacity 0.2s ease', 'filter:blur(3px)'
  ].join(';');
  document.body.appendChild(lineGlow);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let orbX = mouseX, orbY = mouseY;

  function isDark() { return document.documentElement.dataset.theme === 'dark'; }
  function rgb(zone) { return (isDark() ? COLORS.dark : COLORS.light)[zone] || COLORS.light.section; }
  function rgba(zone, a) { const c = rgb(zone); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }

  // Gather all visible separator lines (Y position in viewport coords)
  function getVisibleLines() {
    const lines = [];

    // 1. Always include header bottom and footer top as hard lines
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) {
      const r = header.getBoundingClientRect();
      if (r.bottom > -10 && r.bottom < window.innerHeight + 10) {
        lines.push({ y: r.bottom, zone: 'header' });
      }
    }
    if (footer) {
      const r = footer.getBoundingClientRect();
      if (r.top > -10 && r.top < window.innerHeight + 10) {
        lines.push({ y: r.top, zone: 'footer' });
      }
    }

    // 2. Elements with actual CSS borders / separators
    const sel = 'section,.projects,.character-section,hr';
    document.querySelectorAll(sel).forEach(function (el) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
      const s = window.getComputedStyle(el);

      const bw = parseFloat(s.borderBottomWidth) || 0;
      if (bw >= 0.5 && s.borderBottomStyle !== 'none') {
        lines.push({ y: r.bottom, zone: 'section' });
      }
      const tw = parseFloat(s.borderTopWidth) || 0;
      if (tw >= 0.5 && s.borderTopStyle !== 'none') {
        lines.push({ y: r.top, zone: 'section' });
      }
      if (el.tagName === 'HR') {
        lines.push({ y: r.top + r.height / 2, zone: 'section' });
      }
    });

    // Deduplicate lines closer than 4px
    lines.sort(function (a, b) { return a.y - b.y; });
    const deduped = [];
    for (let i = 0; i < lines.length; i++) {
      if (!deduped.length || lines[i].y - deduped[deduped.length - 1].y > 4) {
        deduped.push(lines[i]);
      }
    }
    return deduped;
  }

  function getZone(x, y) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    if (header) { const r = header.getBoundingClientRect(); if (y >= r.top && y <= r.bottom) return 'header'; }
    if (footer) { const r = footer.getBoundingClientRect(); if (y >= r.top && y <= r.bottom) return 'footer'; }
    for (const c of document.querySelectorAll('.card')) {
      const r = c.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return 'card';
    }
    const hero = document.querySelector('.home-hero,.hero');
    if (hero) { const r = hero.getBoundingClientRect(); if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return 'hero'; }
    return 'section';
  }

  function animate() {
    orbX += (mouseX - orbX) * LERP;
    orbY += (mouseY - orbY) * LERP;

    orb.style.left = orbX + 'px';
    orb.style.top = orbY + 'px';

    const zone = getZone(orbX, orbY);
    const lines = getVisibleLines();
    lines.sort(function (a, b) { return a.y - b.y; });

    // Find the line immediately above and below the orb centre
    let topY = 0, bottomY = window.innerHeight;
    for (const ln of lines) {
      if (ln.y <= orbY) topY = Math.max(topY, ln.y);
      if (ln.y > orbY) bottomY = Math.min(bottomY, ln.y);
    }
    topY = Math.max(topY, 0);
    bottomY = Math.min(bottomY, window.innerHeight);

    // Clip the orb so it never crosses the nearest lines
    // Using negative padding (-150px) so blur is NEVER cut off unless crossing a border line
    const orbTop = orbY - ORB_R;
    const orbBottom = orbY + ORB_R;

    const cT = Math.max(-150, topY - orbTop);
    const cB = Math.max(-150, orbBottom - bottomY);

    orb.style.clipPath = 'inset(' + cT + 'px -100px ' + cB + 'px -100px)';
    orb.style.mixBlendMode = isDark() ? 'screen' : 'normal';
    orb.style.background = 'radial-gradient(circle at center,' + rgba(zone, 0.38) + ' 0%,' + rgba(zone, 0.20) + ' 35%,' + rgba(zone, 0.07) + ' 65%,transparent 90%)';

    // Brighten the nearest visible line directly around the cursor's X coordinate
    let nearDist = Infinity, nearY = null, nearZone = zone;
    for (const ln of lines) {
      const d = Math.abs(ln.y - orbY);
      if (d < LINE_DIST && d < nearDist) { nearDist = d; nearY = ln.y; nearZone = ln.zone; }
    }

    if (nearY !== null && orb.style.opacity !== '0') {
      const a = 1 - nearDist / LINE_DIST;
      const pct = Math.max(0, Math.min(100, (orbX / window.innerWidth) * 100)).toFixed(1);
      lineGlow.style.opacity = (a * 0.75).toFixed(3);
      lineGlow.style.top = (nearY - 1) + 'px';
      lineGlow.style.height = Math.round(2 + 2 * a) + 'px';
      lineGlow.style.background = 'radial-gradient(ellipse 350px 8px at ' + pct + '% 50%,' + rgba(nearZone, a * 0.85) + ' 0%,' + rgba(nearZone, a * 0.35) + ' 50%,transparent 100%)';
      lineGlow.style.boxShadow = '0 0 ' + Math.round(8 * a) + 'px ' + Math.round(3 * a) + 'px ' + rgba(nearZone, a * 0.4);
    } else {
      lineGlow.style.opacity = '0';
    }

    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Hide cursor glow when hovering over or interacting with any card element or card grid
    if (e.target && e.target.closest && e.target.closest('.card, .dynamic-showcase-card, .skill-card, .cert-card, .category-card, .featured-card, .stat-item, .skills-grid, .certs-grid')) {
      orb.style.opacity = '0';
      lineGlow.style.opacity = '0';
      return;
    }
    orb.style.opacity = '1';

    // Card spotlight custom props
    document.querySelectorAll('.card').forEach(function (card) {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  document.addEventListener('mouseleave', function () { orb.style.opacity = '0'; lineGlow.style.opacity = '0'; });
  document.addEventListener('mouseenter', function () { orb.style.opacity = '1'; });

})();

// Dynamic Showcase Rotation for Home Screen
const SHOWCASE_ITEMS = [
  { 
    type: 'Mechanical Design', 
    title: 'CAD & Mechanical Design', 
    desc: 'Precision 3D modeling, parametric mechanical assemblies, and technical engineering drawings in SOLIDWORKS.', 
    icon: 'fa-solid fa-compass-drafting', 
    color: '#f39c12',
    link: 'projects-cad.html',
    linkText: 'Explore CAD Portfolio'
  },
  { 
    type: 'Hardware & Control', 
    title: 'Embedded Systems & Robotics', 
    desc: 'Microcontroller programming, sensor/actuator interfacing, and C++ logic for automated hardware systems.', 
    icon: 'fa-solid fa-microchip', 
    color: '#008184',
    link: 'projects-arduino.html',
    linkText: 'Explore Electronics'
  },
  { 
    type: 'Software & Simulation', 
    title: 'C# & Unity Interactive Dev', 
    desc: 'Developing interactive real-time physics, algorithmic logic, and custom systems architecture using Unity & C#.', 
    icon: 'fa-brands fa-unity', 
    color: '#2ecc71',
    link: 'projects-games.html',
    linkText: 'Explore Interactive Work'
  },
  { 
    type: 'Profile', 
    title: 'Mechatronics Engineer', 
    desc: 'First-year Mechatronics Engineering student integrating mechanical design, robotics, and software systems.', 
    icon: 'fa-solid fa-user-gear', 
    color: '#3498db',
    link: 'about.html',
    linkText: 'View About Me',
    secondaryLink: 'https://www.linkedin.com/in/karimabdelnour26/',
    secondaryText: 'LinkedIn'
  },
  { 
    type: 'Credential', 
    title: 'SOLIDWORKS CAD Certified', 
    desc: '3D CAD for Education Specialization earned from Dassault Systèmes & Coursera.', 
    icon: 'fa-solid fa-certificate', 
    color: '#f1c40f',
    link: 'about.html#certifications',
    linkText: 'View Credentials'
  }
];

class DynamicShowcase {
  constructor() {
    this.container = document.getElementById('dynamic-showcase');
    if (!this.container) return;
    
    this.content = this.container.querySelector('.showcase-content');
    this.icon = document.getElementById('showcase-icon');
    this.title = document.getElementById('showcase-title');
    this.desc = document.getElementById('showcase-desc');
    this.badge = document.getElementById('showcase-badge');
    this.link = document.getElementById('showcase-link');
    this.linkText = document.getElementById('showcase-link-text');
    this.secondaryLink = document.getElementById('showcase-secondary-link');
    this.secondaryText = document.getElementById('showcase-secondary-text');
    this.glow = document.getElementById('showcase-glow');
    this.dotsContainer = document.getElementById('showcase-dots');
    this.progress = document.getElementById('showcase-progress');
    
    this.prevBtn = document.getElementById('showcase-prev');
    this.nextBtn = document.getElementById('showcase-next');
    
    this.currentIndex = 0;
    this.timer = null;
    this.progressTimer = null;
    this.duration = 5000;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    // Build dots
    if (this.dotsContainer) {
      this.dotsContainer.innerHTML = '';
      SHOWCASE_ITEMS.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'showcase-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => this.goTo(idx));
        this.dotsContainer.appendChild(dot);
      });
    }
    
    // Control events
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        const nextIdx = (this.currentIndex - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length;
        this.goTo(nextIdx);
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        const nextIdx = (this.currentIndex + 1) % SHOWCASE_ITEMS.length;
        this.goTo(nextIdx);
      });
    }
    
    // Pause on hover
    this.container.addEventListener('mouseenter', () => {
      this.isPaused = true;
      if (this.progress) this.progress.style.transition = 'none';
    });
    this.container.addEventListener('mouseleave', () => {
      this.isPaused = false;
      if (this.progress) {
        this.progress.style.transition = `width ${this.duration}ms linear`;
        this.progress.style.width = '100%';
      }
    });
    
    this.renderCurrent(false);
    this.startCycle();
  }
  
  goTo(index) {
    if (index === this.currentIndex) return;
    this.currentIndex = index;
    this.renderCurrent(true);
    this.resetTimer();
  }
  
  renderCurrent(animate = true) {
    const item = SHOWCASE_ITEMS[this.currentIndex];
    
    const applyContent = () => {
      if (this.icon) {
        this.icon.innerHTML = `<i class="${item.icon}"></i>`;
        this.icon.style.color = item.color;
        this.icon.style.background = `${item.color}22`;
      }
      if (this.title) this.title.textContent = item.title;
      if (this.desc) this.desc.textContent = item.desc;
      if (this.badge) {
        this.badge.textContent = item.type;
        this.badge.style.color = item.color;
        this.badge.style.background = `${item.color}18`;
        this.badge.style.borderColor = `${item.color}40`;
      }
      if (this.link && this.linkText) {
        this.link.href = item.link || '#';
        this.linkText.textContent = item.linkText || 'Explore';
        if (item.target) {
          this.link.setAttribute('target', item.target);
          this.link.setAttribute('rel', 'noopener noreferrer');
        } else {
          this.link.removeAttribute('target');
          this.link.removeAttribute('rel');
        }
      }
      if (this.secondaryLink) {
        if (item.secondaryLink) {
          this.secondaryLink.href = item.secondaryLink;
          if (this.secondaryText) this.secondaryText.textContent = item.secondaryText || 'LinkedIn';
          this.secondaryLink.style.display = 'inline-flex';
        } else {
          this.secondaryLink.style.display = 'none';
        }
      }
      if (this.glow) {
        this.glow.style.background = `radial-gradient(circle, ${item.color}33 0%, transparent 70%)`;
      }
      
      // Update dots
      if (this.dotsContainer) {
        Array.from(this.dotsContainer.children).forEach((dot, idx) => {
          dot.classList.toggle('active', idx === this.currentIndex);
          dot.style.background = idx === this.currentIndex ? item.color : '';
        });
      }
    };

    if (animate && this.content) {
      this.content.style.opacity = '0';
      this.content.style.transform = 'scale(0.96)';
      setTimeout(() => {
        applyContent();
        this.content.style.opacity = '1';
        this.content.style.transform = 'scale(1)';
      }, 240);
    } else {
      applyContent();
    }
  }
  
  startProgress() {
    if (!this.progress) return;
    this.progress.style.transition = 'none';
    this.progress.style.width = '0%';
    setTimeout(() => {
      if (!this.progress) return;
      this.progress.style.transition = `width ${this.duration}ms linear`;
      this.progress.style.width = '100%';
    }, 50);
  }
  
  startCycle() {
    this.startProgress();
    this.timer = setInterval(() => {
      if (this.isPaused) return;
      this.currentIndex = (this.currentIndex + 1) % SHOWCASE_ITEMS.length;
      this.renderCurrent(true);
      this.startProgress();
    }, this.duration);
  }
  
  resetTimer() {
    clearInterval(this.timer);
    this.startCycle();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new DynamicShowcase();
});
