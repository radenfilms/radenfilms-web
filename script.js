// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Form is now handled by FormSubmit service
    
    // Get all gallery images
    const gallery = document.querySelector('#headshots-gallery');
    const galleryImages = gallery.querySelectorAll('img');
    
    // Lightbox functionality
    const lightbox = document.querySelector('.lightbox');
    const lightboxGallery = document.querySelector('.lightbox-gallery');
    const closeBtn = document.querySelector('.lightbox-close');

    // Add click events to all gallery images
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    // Open lightbox
    function openLightbox(index) {
        // Clear existing lightbox content
        lightboxGallery.innerHTML = '';
        
        // Add all images to lightbox
        galleryImages.forEach(img => {
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