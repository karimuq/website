<<<<<<< HEAD
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
=======
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
>>>>>>> b7c607f8d85ff671e11d7d038cd55fd588be8bb0
}); 