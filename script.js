document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const body = document.body;

    // Set initial states
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });

    // Toggle Menu Function
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') &&
            !navLinks.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });

    // Handle resize events
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        }, 250);
    });

    // Touch swipe handling
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        const edgeThreshold = 30; // Allow swipes only from the edge

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && !navLinks.classList.contains('active') && touchStartX < edgeThreshold) {
                // Swipe right from the edge
                toggleMenu();
            } else if (swipeDistance < 0 && navLinks.classList.contains('active')) {
                // Swipe left
                toggleMenu();
            }
        }
    }

    // Smooth scroll implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Performance optimization
window.addEventListener('load', () => {
    if ('performance' in window && 'timing' in window.performance) {
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 0);
    }
});

// Gallery Category Click Handler
const categories = document.querySelectorAll('.category');
const modal = document.querySelector('.gallery-modal');
const closeModal = document.querySelector('.close-modal');