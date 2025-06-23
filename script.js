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
            'images/headshot1-hero.jpg',
            'images/headshot2-hero.jpg',
            'images/headshot3-hero.jpg',
            'images/headshot4-hero.jpg',
            'images/headshot5-hero.jpg',
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

// Performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Use Intersection Observer for lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                observer.unobserve(img);
            }
        });
    });

    // Observe all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll handling
    const handleScroll = debounce(() => {
        // Your scroll handling code here
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimize gallery scrolling
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
    }

    // Optimize form submission
    const form = document.getElementById('booking-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    mode: 'no-cors'
                });

                if (response.ok) {
                    window.location.href = form.querySelector('input[name="_next"]').value;
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Error:', error);
                submitButton.textContent = 'Try Again';
            } finally {
                submitButton.disabled = false;
            }
        });
    }
}); 