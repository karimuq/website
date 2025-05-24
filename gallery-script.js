<<<<<<< HEAD
// Character data
const characters = {
    mimi: {
        name: 'Mimi',
        description: 'A cheerful and energetic character with multiple versions.',
        animations: {
            'Version 1': './characters/Mimi/mimi_1/Mimi1.png',
            'Idle Animation': './characters/Mimi/mimi_2/Mimi_idel2.gif',
            'Run Animation': './characters/Mimi/mimi_2/Mimi_run2.gif'
        }
    },
    kamila: {
        name: 'Kamila',
        description: 'A mysterious character with a distinctive design.',
        animations: {
            'Character Design': './characters/Kamilaaaaa/Kamilaaaaaa.png'
        }
    },
    cat: {
        name: 'Cat',
        description: 'A cute pixel art cat.',
        animations: {
            'Character Design': './Cat.png'
        }
    },
    sakura: {
        name: 'Sakura Tree',
        description: 'A beautiful pixel art sakura tree.',
        animations: {
            'Character Design': './Sakara tree.png'
        }
    }
    // Add more characters as needed
};

// DOM Elements
const modal = document.getElementById('characterModal');
const closeBtn = document.querySelector('.close-modal');
const showcaseImage = document.getElementById('showcaseMainImage');
const characterName = document.getElementById('characterName');
const characterDescription = document.getElementById('characterDescription');
const animationGrid = document.getElementById('animationGrid');
const characterCards = document.querySelectorAll('.character-card');

// Error handling for image loading
function handleImageError(img) {
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop
        this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="gray">Image not found</text></svg>';
        this.style.background = '#f8f9fa';
        this.style.padding = '1rem';
    };
}

// Add error handling to all character preview images
document.querySelectorAll('.character-preview img').forEach(img => {
    handleImageError(img);
});

// Event Listeners
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        const characterId = card.dataset.character;
        showCharacterDetails(characterId);
    });
});

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Functions
function showCharacterDetails(characterId) {
    const character = characters[characterId];
    if (!character) {
        return;
    }

    try {
        // Update modal content
        characterName.textContent = character.name;
        characterDescription.textContent = character.description;
        
        // Clear previous animations
        animationGrid.innerHTML = '';
        
        // Add animation thumbnails
        Object.entries(character.animations).forEach(([name, path]) => {
            const thumbnail = createAnimationThumbnail(name, path);
            animationGrid.appendChild(thumbnail);
        });

        // Set initial showcase image
        const firstAnimation = Object.values(character.animations)[0];
        showcaseImage.src = firstAnimation;
        showcaseImage.alt = `${character.name} - ${Object.keys(character.animations)[0]}`;
        handleImageError(showcaseImage);

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error showing character details:', error);
    }
}

function createAnimationThumbnail(name, path) {
    const div = document.createElement('div');
    div.className = 'animation-thumbnail';
    
    const img = document.createElement('img');
    img.src = path;
    img.alt = name;
    img.addEventListener('load', () => console.log('Thumbnail loaded:', path));
    img.addEventListener('error', (e) => console.error('Thumbnail failed to load:', path, e));
    
    const label = document.createElement('span');
    label.className = 'animation-label';
    label.textContent = name;
    
    div.appendChild(img);
    div.appendChild(label);
    
    div.addEventListener('click', () => {
        try {
            // Update main showcase image
            console.log('Switching to animation:', path);
            showcaseImage.src = path;
            showcaseImage.alt = name;
            
            // Update active state
            document.querySelectorAll('.animation-thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            div.classList.add('active');
        } catch (error) {
            console.error('Error switching animation:', error);
        }
    });
    
    return div;
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Preload images
window.addEventListener('load', () => {
    Object.values(characters).forEach(character => {
        Object.values(character.animations).forEach(path => {
            const img = new Image();
            img.src = path;
        });
    });
});
=======
// Character data
const characters = {
    mimi: {
        name: 'Mimi',
        description: 'A cheerful and energetic character with multiple versions. Mimi features both static designs and fluid animations that showcase her evolution and personality.',
        animations: {
            'Version 1': './characters/Mimi/mimi_1/Mimi1.png',
            'Idle Animation': './characters/Mimi/mimi_2/Mimi_idel2.gif',
            'Run Animation': './characters/Mimi/mimi_2/Mimi_run2.gif'
        }
    },
    kamila: {
        name: 'Kamila',
        description: 'A mysterious character with a distinctive design. Kamila\'s artwork showcases elegant pixel art styling with attention to detail.',
        animations: {
            'Character Design': './characters/Kamilaaaaa/Kamilaaaaaa.png'
        }
    }
    // Add more characters as needed
};

// DOM Elements
const modal = document.getElementById('characterModal');
const closeBtn = document.querySelector('.close-modal');
const showcaseImage = document.getElementById('showcaseMainImage');
const characterName = document.getElementById('characterName');
const characterDescription = document.getElementById('characterDescription');
const animationGrid = document.getElementById('animationGrid');
const characterCards = document.querySelectorAll('.character-card');

// Error handling for image loading
function handleImageError(img) {
    img.onerror = function() {
        this.onerror = null; // Prevent infinite loop
        this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="gray">Image not found</text></svg>';
        this.style.background = '#f8f9fa';
        this.style.padding = '1rem';
    };
}

// Add error handling to all character preview images
document.querySelectorAll('.character-preview img').forEach(img => {
    handleImageError(img);
});

// Event Listeners
characterCards.forEach(card => {
    card.addEventListener('click', () => {
        const characterId = card.dataset.character;
        showCharacterDetails(characterId);
    });
});

closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Functions
function showCharacterDetails(characterId) {
    const character = characters[characterId];
    if (!character) {
        return;
    }

    try {
        // Update modal content
        characterName.textContent = character.name;
        characterDescription.textContent = character.description;
        
        // Clear previous animations
        animationGrid.innerHTML = '';
        
        // Add animation thumbnails
        Object.entries(character.animations).forEach(([name, path]) => {
            const thumbnail = createAnimationThumbnail(name, path);
            animationGrid.appendChild(thumbnail);
        });

        // Set initial showcase image
        const firstAnimation = Object.values(character.animations)[0];
        showcaseImage.src = firstAnimation;
        showcaseImage.alt = `${character.name} - ${Object.keys(character.animations)[0]}`;
        handleImageError(showcaseImage);

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error showing character details:', error);
    }
}

function createAnimationThumbnail(name, path) {
    const div = document.createElement('div');
    div.className = 'animation-thumbnail';
    
    const img = document.createElement('img');
    img.src = path;
    img.alt = name;
    img.addEventListener('load', () => console.log('Thumbnail loaded:', path));
    img.addEventListener('error', (e) => console.error('Thumbnail failed to load:', path, e));
    
    const label = document.createElement('span');
    label.className = 'animation-label';
    label.textContent = name;
    
    div.appendChild(img);
    div.appendChild(label);
    
    div.addEventListener('click', () => {
        try {
            // Update main showcase image
            console.log('Switching to animation:', path);
            showcaseImage.src = path;
            showcaseImage.alt = name;
            
            // Update active state
            document.querySelectorAll('.animation-thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            div.classList.add('active');
        } catch (error) {
            console.error('Error switching animation:', error);
        }
    });
    
    return div;
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

// Preload images
window.addEventListener('load', () => {
    Object.values(characters).forEach(character => {
        Object.values(character.animations).forEach(path => {
            const img = new Image();
            img.src = path;
        });
    });
}); 
>>>>>>> b7c607f8d85ff671e11d7d038cd55fd588be8bb0
