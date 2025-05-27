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
        // Show loading spinner in modal
        modal.classList.add('loading');
        
        // Create a new image to get the natural dimensions
        const tempImg = new Image();
        tempImg.onload = function() {
            // For pixel art, we want to show it much larger
            let pixelScale = 10; // Default scale factor for most pixel art
            
            // Special handling for specific image types
            const fileName = imgSrc.toLowerCase();
            
            // Adjust scale for specific file types
            if (fileName.includes('monster') || fileName.includes('chips')) {
                pixelScale = 15; // Larger scale for smaller animations
            } else if (fileName.includes('character') || fileName.endsWith('.png')) {
                pixelScale = 12; // Medium scale for static character designs
            }
            
            // Calculate size based on natural dimensions and available space
            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            
            // Maintain original aspect ratio but scale up significantly
            let displayWidth = Math.min(tempImg.naturalWidth * pixelScale, maxWidth);
            let displayHeight = Math.min(tempImg.naturalHeight * pixelScale, maxHeight);
            
            // If the image is still too small, enforce a minimum size
            const minSize = 400; // Increased minimum size
            if (displayWidth < minSize) {
                const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;
                displayWidth = minSize;
                displayHeight = minSize / aspectRatio;
            }
            
            // Set the modal image properties
            modalImg.style.width = `${displayWidth}px`;
            modalImg.style.height = `${displayHeight}px`;
            modalImg.src = imgSrc;
            modalImg.alt = altText;
            
            // Add special class for animations
            if (fileName.endsWith('.gif')) {
                modalImg.classList.add('animation-preview');
            } else {
                modalImg.classList.remove('animation-preview');
            }
            
            // Remove loading state
            modal.classList.remove('loading');
            modal.classList.add('active');
        };
        
        tempImg.onerror = function() {
            console.error('Failed to load image for modal:', imgSrc);
            modal.classList.remove('loading');
            modal.classList.add('active');
            modalImg.src = imgSrc;
            modalImg.alt = altText;
        };
        
        tempImg.src = imgSrc;
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
    
    // Add zoom controls for modal image
    let currentScale = 1;
    modalImg.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = Math.sign(e.deltaY) * -0.1;
        currentScale = Math.max(0.5, Math.min(8, currentScale + delta)); // Allow more zoom
        modalImg.style.transform = `scale(${currentScale})`;
    });
    
    // Reset scale when opening new image
    function resetModalScale() {
        currentScale = 1;
        modalImg.style.transform = 'scale(1)';
    }
    
    // Update open modal to reset scale
    const originalOpenModal = openModal;
    openModal = function(imgSrc, altText) {
        resetModalScale();
        originalOpenModal(imgSrc, altText);
    };

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