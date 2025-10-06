
// Character data
const characters = {
    mimi: {
        name: 'Mimi',
        description: 'A cheerful and energetic character with multiple versions. Features both static designs and fluid animations.',
        animations: {
            'Static Design': 'Mimi1.png',
            'Idle Animation': 'Mimi_idel2.gif',
            'Run Animation': 'Mimi_run2.gif',
            'Run Animation 2': 'Mimi1_run.gif'
        }
    },
    kamila: {
        name: 'Kamila',
        description: 'A mysterious character with a distinctive design. Showcases elegant pixel art styling with attention to detail.',
        animations: {
            'Character Design': 'Kamilaaaaaa.png'
        }
    },
    unnamed: {
        name: 'Unnamed Characters',
        description: 'A collection of unique character designs and animations in development.',
        animations: {
            'Character Design': '1_Character .gif',
            'Run Animation': '1_run.gif',
            'Mar': 'Mar.png',
            'Wdr': 'Wdr.png'
        }
    }
};

// DOM Elements
const modal = document.getElementById('characterModal');
const closeBtn = document.querySelector('.close-modal');
const showcaseImage = document.getElementById('showcaseMainImage');
const characterName = document.getElementById('characterName');
const characterDescription = document.getElementById('characterDescription');
const animationGrid = document.getElementById('animationGrid');
const characterCards = document.querySelectorAll('.character-card');

// Image loading and error handling
function handleImageLoading(img) {
    const spinner = img.closest('.card-preview')?.querySelector('.loading-spinner');
    
    img.onload = function() {
        if (spinner) spinner.style.display = 'none';
        img.style.opacity = '1';
    };

    img.onerror = function() {
        if (spinner) spinner.style.display = 'none';
        this.onerror = null; // Prevent infinite loop
        this.src = 'data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><text x="50%" y="50%" font-size="12" text-anchor="middle" alignment-baseline="middle" fill="%23fff">Image not found</text></svg>';
        this.style.opacity = '0.5';
    };

    // Start with image hidden
    img.style.opacity = '0';
    if (spinner) spinner.style.display = 'block';
}

// Initialize loading handlers for all gallery images
function initializeGalleryImages() {
    document.querySelectorAll('.card-preview img').forEach(img => {
        handleImageLoading(img);
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryImages();
    
    // Character card click handlers
    document.querySelectorAll('.character-card').forEach(card => {
        card.addEventListener('click', () => {
            const characterId = card.dataset.character || 'unnamed';
            const animationType = card.dataset.animationType;
            showCharacterDetails(characterId, animationType);
        });
    });

    // Modal close handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.style.display === 'block') {
            closeModal();
        }
    });
});

// Functions
function showCharacterDetails(characterId, animationType) {
    const character = characters[characterId];
    if (!character || !modal) return;

    try {
        // Update modal content
        if (characterName) characterName.textContent = character.name;
        if (characterDescription) characterDescription.textContent = character.description;
        
        // Clear previous animations
        if (animationGrid) animationGrid.innerHTML = '';
        
        // Add animation thumbnails
        if (animationGrid) {
            Object.entries(character.animations).forEach(([name, path]) => {
                const thumbnail = createAnimationThumbnail(name, path, characterId);
                if (animationType && name.toLowerCase().includes(animationType)) {
                    thumbnail.classList.add('active');
                    if (showcaseImage) {
                        showcaseImage.src = path;
                        showcaseImage.alt = `${character.name} - ${name}`;
                    }
                }
                animationGrid.appendChild(thumbnail);
            });
        }

        // Set initial showcase image if no specific animation type
        if (!animationType && showcaseImage) {
            const firstAnimation = Object.values(character.animations)[0];
            const firstName = Object.keys(character.animations)[0];
            showcaseImage.src = firstAnimation;
            showcaseImage.alt = `${character.name} - ${firstName}`;
        }

        // Apply loading handlers to showcase image
        if (showcaseImage) handleImageLoading(showcaseImage);

        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error showing character details:', error);
    }
}

function createAnimationThumbnail(name, path, characterId) {
    const div = document.createElement('div');
    div.className = 'animation-thumbnail';
    
    const img = document.createElement('img');
    img.src = path;
    img.alt = `${characters[characterId].name} - ${name}`;
    handleImageLoading(img);
    
    const label = document.createElement('span');
    label.className = 'animation-label';
    label.textContent = name;
    
    div.appendChild(img);
    div.appendChild(label);
    
    div.addEventListener('click', () => {
        if (!showcaseImage) return;
        
        try {
            // Update main showcase image
            showcaseImage.src = path;
            showcaseImage.alt = `${characters[characterId].name} - ${name}`;
            handleImageLoading(showcaseImage);
            
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
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset showcase image
    if (showcaseImage) {
        showcaseImage.src = '';
        showcaseImage.alt = '';
    }
    
    // Clear animation grid
    if (animationGrid) {
        animationGrid.innerHTML = '';
    }
}

// Preload character images
function preloadCharacterImages() {
    Object.values(characters).forEach(character => {
        Object.values(character.animations).forEach(path => {
            const img = new Image();
            img.src = path;
        });
    });
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCharacterImages);
} else {
    preloadCharacterImages();
}
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
>>>>>>> 6062643ecfc88484d2adc90fd6f265831b2d97ed
