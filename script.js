// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    // Form is now handled by FormSubmit service
    
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const body = document.body;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !hamburger.contains(e.target) && 
                !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Gallery functionality - only run if gallery exists
    const gallery = document.querySelector('#headshots-gallery');
    if (gallery) {
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
            // Don't open lightbox if mobile menu is active
            if (document.querySelector('.nav-links.active')) {
                return;
            }
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
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Only apply to internal anchor links
        if (!anchor.getAttribute('href').startsWith('http')) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        }
    });

    // Background rotation - only run if hero section exists
    const heroSection = document.querySelector('.headshots-hero');
    if (heroSection) {
        const images = [
            'images/headshot1.jpg',
            'images/headshot2.jpg',
            'images/headshot3.jpg',
            'images/headshot4.jpg',
            'images/headshot6.jpg'
        ];
        let currentImageIndex = 0;

        function rotateBackground() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            const newBackground = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${images[currentImageIndex]}')`;
            
            heroSection.style.backgroundImage = newBackground;
            heroSection.style.backgroundPosition = 'center 33%';
            heroSection.style.backgroundRepeat = 'no-repeat';
            heroSection.style.backgroundSize = 'cover';
            
            // Add fade effect
            heroSection.classList.remove('fade-bg');
            void heroSection.offsetWidth; // Trigger reflow
            heroSection.classList.add('fade-bg');
        }

        // Rotate background every 10 seconds
        setInterval(rotateBackground, 10000);

        // Preload images
        images.forEach(imagePath => {
            const img = new Image();
            img.src = imagePath;
        });
    }
}); 