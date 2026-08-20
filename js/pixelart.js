document.addEventListener('DOMContentLoaded', () => {
    // Handle image loading
    const images = document.querySelectorAll('.card-preview img');
    const modal = document.querySelector('.fullscreen-modal');
    const modalImg = modal ? modal.querySelector('img') : null;
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    const viewButtons = document.querySelectorAll('.view-btn');
    const characterShowcase = document.querySelector('.character-showcase');

    // Image loading and error handling
    images.forEach(img => {
        const spinner = img.parentElement.querySelector('.loading-spinner');
        
        const handleLoad = () => {
            if (spinner) spinner.style.display = 'none';
            img.style.opacity = '1';
        };

        img.addEventListener('load', handleLoad);

        img.addEventListener('error', () => {
            if (spinner) {
                spinner.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                spinner.style.color = '#ff4444';
            }
            console.error(`Failed to load image: ${img.src}`);
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        // If the image is already cached/loaded, trigger immediately
        if (img.complete) {
            handleLoad();
        }
    });

    // Shared zoom scale for modal
    let currentScale = 1;

    // Modal handling
    function openModal(imgSrc, altText) {
        // Reset zoom scale
        currentScale = 1;
        modalImg.style.transform = 'scale(1)';

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
            
            // Calculate size based on natural dimensions
            let displayWidth = tempImg.naturalWidth * pixelScale;
            let displayHeight = tempImg.naturalHeight * pixelScale;

            const maxWidth = window.innerWidth * 0.8;
            const maxHeight = window.innerHeight * 0.8;
            
            // If the image is larger than the screen, scale it down proportionally
            if (displayWidth > maxWidth || displayHeight > maxHeight) {
                const scaleDown = Math.min(maxWidth / displayWidth, maxHeight / displayHeight);
                displayWidth *= scaleDown;
                displayHeight *= scaleDown;
            }
            
            // If the image is still too small, enforce a minimum size proportionally
            const minSize = Math.min(400, window.innerWidth * 0.9); 
            if (displayWidth < minSize && displayHeight < minSize) {
                const scaleUp = Math.max(minSize / displayWidth, minSize / displayHeight);
                displayWidth *= scaleUp;
                displayHeight *= scaleUp;
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
    if (modal && modalImg && closeModal) {
        document.querySelectorAll('.character-card').forEach(card => {
            const img = card.querySelector('img');
            if (img) {
                card.addEventListener('click', () => {
                    openModal(img.src, img.alt);
                });
            }
        });
    }

    if (modal && modalImg && closeModal) {
        // Close modal with button or outside click
        closeModal.addEventListener('click', closeModalHandler);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
        
        // Add zoom controls for modal image
        modalImg.addEventListener('wheel', (e) => {
            if (!modal.classList.contains('active')) return;
            e.preventDefault();
            const delta = Math.sign(e.deltaY) * -0.1;
            currentScale = Math.max(0.5, Math.min(8, currentScale + delta)); 
            modalImg.style.transform = `scale(${currentScale})`;
        }, { passive: false });
        
        // Close modal with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModalHandler();
            }
        });
    }

    // View switching functionality
    if (characterShowcase) {
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
    }

    // Load preferred view
    const preferredView = localStorage.getItem('preferred-view') || 'grid';
    const preferredButton = document.querySelector(`[data-view="${preferredView}"]`);
    if (preferredButton) {
        preferredButton.click();
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
    if (modal) {
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
    }

    // =========================================================
    // Artwork Protection & HTML5 Canvas Rendering Engine (A + C)
    // =========================================================

    // Create artwork protection notification toast
    const protectToast = document.createElement('div');
    protectToast.className = 'art-protection-toast';
    protectToast.innerHTML = '<i class="fas fa-shield-alt"></i> Protected Artwork &copy; Karim Abdelnour';
    document.body.appendChild(protectToast);

    let toastTimeout;
    function showProtectionNotice() {
        protectToast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            protectToast.classList.remove('show');
        }, 2200);
    }

    // Prevent right-click context menu and show toast notification
    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.card-preview, .character-card, .fullscreen-modal, .pixel-canvas-preview, .art-protect-shield, .modal-protect-shield')) {
            e.preventDefault();
            showProtectionNotice();
        }
    });

    // Prevent image dragging
    document.addEventListener('dragstart', (e) => {
        if (e.target.closest('.card-preview, .character-card, .fullscreen-modal, img, canvas, .art-protect-shield')) {
            e.preventDefault();
        }
    });

    // Option A + Option C: Transparent Protection Shields & HTML5 Canvas Rendering
    document.querySelectorAll('.card-preview').forEach(preview => {
        const img = preview.querySelector('img');
        if (!img) return;

        // Add transparent protection shield over the preview
        let shield = preview.querySelector('.art-protect-shield');
        if (!shield) {
            shield = document.createElement('div');
            shield.className = 'art-protect-shield';
            shield.title = 'Protected Artwork - All Rights Reserved';
            preview.appendChild(shield);
        }

        // Convert static PNG sprites to crisp HTML5 Canvas elements
        const convertToCanvas = () => {
            if (img.src && img.src.toLowerCase().endsWith('.png') && !preview.querySelector('canvas')) {
                const canvas = document.createElement('canvas');
                canvas.className = 'pixel-canvas-preview';
                const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth || 128;
                canvas.height = img.naturalHeight || 128;
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                preview.insertBefore(canvas, shield);
                img.style.display = 'none';
            }
        };

        if (img.complete && img.naturalWidth > 0) {
            convertToCanvas();
        } else {
            img.addEventListener('load', convertToCanvas);
        }
    });
});