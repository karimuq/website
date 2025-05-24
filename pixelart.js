document.addEventListener('DOMContentLoaded', () => {
    // Handle image loading
    const images = document.querySelectorAll('.card-preview img');
    const modal = document.querySelector('.fullscreen-modal');
    const modalImg = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    const characterShowcase = document.querySelector('.character-showcase');

    // Image loading and error handling
    images.forEach(img => {
        const spinner = img.parentElement.querySelector('.loading-spinner');
        
        img.addEventListener('load', () => {
            spinner.style.display = 'none';
            img.style.opacity = '1';
        });

        img.addEventListener('error', () => {
            spinner.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            spinner.style.color = '#ff4444';
            console.error(`Failed to load image: ${img.src}`);
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Modal handling
    function openModal(imgSrc, altText) {
        modalImg.src = imgSrc;
        modalImg.alt = altText;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModalHandler() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalImg.src = '';
            modalImg.alt = '';
        }, 300);
    }

    // Add click handlers for images
    document.querySelectorAll('.character-card').forEach(card => {
        const img = card.querySelector('img');
        card.addEventListener('click', () => {
            openModal(img.src, img.alt);
        });
    });

    // Close modal with button or outside click
    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });

    // View switching functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            
            // Update active button
            viewButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Update view
            characterShowcase.className = 'character-showcase ' + view + '-view';

            // Save preference
            localStorage.setItem('preferred-view', view);
        });
    });

    // Load preferred view
    const preferredView = localStorage.getItem('preferred-view');
    if (preferredView) {
        const preferredButton = document.querySelector(`[data-view="${preferredView}"]`);
        if (preferredButton) {
            preferredButton.click();
        }
    }

    // Lazy loading for images
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };

    // Initialize lazy loading if supported
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add touch support for modal
    let touchStartY;

    modal.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    modal.addEventListener('touchmove', (e) => {
        if (!touchStartY) return;

        const touchEndY = e.touches[0].clientY;
        const diff = touchStartY - touchEndY;

        if (Math.abs(diff) > 50) { // Minimum swipe distance
            closeModalHandler();
            touchStartY = null;
        }
    });

    modal.addEventListener('touchend', () => {
        touchStartY = null;
    });
}); 