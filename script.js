// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Form is now handled by FormSubmit service
    
    // Gallery Population
    const gallery = document.querySelector('#headshots-gallery');
    
    // Function to add a gallery item
    function addGalleryItem(imageNumber) {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = `images/headshot${imageNumber}.jpg`;
        img.alt = 'Professional actor headshot';
        img.loading = 'lazy';
        
        // Add error handling to check if image exists
        img.onerror = () => {
            galleryItem.remove(); // Remove the item if image doesn't exist
        };
        
        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
        
        // Add click event for lightbox
        img.addEventListener('click', () => openLightbox(Array.from(gallery.querySelectorAll('img')).indexOf(img)));
    }
    
    // Populate gallery with images
    function populateGallery() {
        // Clear existing items
        gallery.innerHTML = '';
        
        // Try to add images until we find one that doesn't exist
        for (let i = 1; i <= 20; i++) { // Support up to 20 images
            addGalleryItem(i);
        }
    }
    
    // Initial population
    populateGallery();

    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxGallery = document.querySelector('.lightbox-gallery');
    const closeBtn = document.querySelector('.lightbox-close');

    // Open lightbox
    function openLightbox(index) {
        // Clear existing lightbox content
        lightboxGallery.innerHTML = '';
        
        // Get all gallery images
        const images = Array.from(gallery.querySelectorAll('img'));
        
        // Add all images to lightbox
        images.forEach(img => {
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxGallery.appendChild(lightboxImg);
        });
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Scroll to clicked image
        const targetImg = lightboxGallery.children[index];
        if (targetImg) {
            targetImg.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click events to lightbox controls
    closeBtn.addEventListener('click', closeLightbox);

    // Close lightbox when clicking outside the images
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}); 