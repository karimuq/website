// Game Development Banner Management
document.addEventListener('DOMContentLoaded', function() {
  // Find all development banners on the page
  const devBanners = document.querySelectorAll('.dev-banner');
  
  // Check if the user has closed the banner before
  if (localStorage.getItem('gameBannerClosed') === 'true') {
    // Hide all development banners
    devBanners.forEach(banner => {
      banner.classList.add('hidden');
    });
  } else {
    // Add close buttons to all banners
    devBanners.forEach(banner => {
      // Create close button
      const closeButton = document.createElement('span');
      closeButton.className = 'close-dev-banner';
      closeButton.innerHTML = '<i class="fas fa-times"></i>';
      
      // Add click event to close button
      closeButton.addEventListener('click', function(e) {
        // Prevent event bubbling
        e.stopPropagation();
        
        // Hide all banners
        devBanners.forEach(b => {
          b.classList.add('hidden');
        });
        
        // Save the state in localStorage
        localStorage.setItem('gameBannerClosed', 'true');
      });
      
      // Add close button to banner
      banner.appendChild(closeButton);
    });
  }
});
