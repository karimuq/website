// Image loading functionality
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    images.forEach(img => {
        img.parentElement.classList.add('loading');
        
        img.onload = function() {
            this.classList.add('loaded');
            this.parentElement.classList.remove('loading');
        };
        
        img.onerror = function() {
            this.parentElement.classList.remove('loading');
            this.parentElement.classList.add('error');
        };
    });
}); 