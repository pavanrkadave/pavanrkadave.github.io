// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Page Progress Indicator and Section Navigation
function updatePageProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Cache DOM elements and section positions for better performance
let cachedSections = [];
let cachedSectionDots = [];
let ticking = false;

function updateSectionNavigation() {
    // Initialize cache if needed
    if (cachedSections.length === 0) {
        const sections = document.querySelectorAll('section');
        cachedSections = Array.from(sections).map(section => ({
            element: section,
            top: section.offsetTop,
            height: section.offsetHeight
        }));
        cachedSectionDots = Array.from(document.querySelectorAll('.section-dot'));
    }

    // Use requestAnimationFrame for better performance
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollPosition = window.scrollY + window.innerHeight / 2;
            let activeIndex = -1;
            
            // Find the current section
            for (let i = 0; i < cachedSections.length; i++) {
                const section = cachedSections[i];
                const sectionTop = section.top;
                const sectionBottom = sectionTop + section.height;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    activeIndex = i;
                    break;
                }
            }
            
            // Update active dot only if needed
            if (activeIndex >= 0) {
                cachedSectionDots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        if (!dot.classList.contains('active')) {
                            dot.classList.add('active');
                        }
                    } else if (dot.classList.contains('active')) {
                        dot.classList.remove('active');
                    }
                });
            }
            
            ticking = false;
        });
        
        ticking = true;
    }
}

// Enhanced scroll effect for navbar and progress with throttling
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update progress and section navigation
            updatePageProgress();
            updateSectionNavigation();
            
            scrollTimeout = null;
        }, 10); // Small timeout for throttling
    }
});

// Section navigation dot clicks
document.addEventListener('DOMContentLoaded', function () {
    const sectionDots = document.querySelectorAll('.section-dot');

    sectionDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.getAttribute('data-target');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize progress and navigation on load
    updatePageProgress();
    updateSectionNavigation();
});

// Simple fade-in animation for sections - optimized for performance
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve after animation to save resources
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to sections
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS classes instead of inline styles for better performance
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});

// Experience Timeline Functionality - Scroll-based reveal (optimized)
document.addEventListener('DOMContentLoaded', function () {
    const timelineDots = document.querySelectorAll('.timeline-dot');
    const experienceItems = document.querySelectorAll('.experience-item');
    
    if (!timelineDots.length || !experienceItems.length) return;

    // Handle timeline dot clicks for navigation
    timelineDots.forEach((dot, index) => {
        if (index < experienceItems.length) {
            dot.addEventListener('click', () => {
                // Smooth scroll to the experience item
                experienceItems[index].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        }
    });

    // Intersection Observer for scroll-based content reveal
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const index = Array.from(experienceItems).indexOf(entry.target);
            
            if (entry.isIntersecting) {
                // Show the experience item
                entry.target.classList.add('active');

                // Activate corresponding timeline dot
                if (timelineDots[index]) {
                    timelineDots[index].classList.add('active');
                }
            } else {
                // Only deactivate if it's really out of view (improve performance)
                const rect = entry.boundingClientRect;
                const windowHeight = window.innerHeight;
                
                if (rect.top > windowHeight || rect.bottom < 0) {
                    // Hide the experience item when completely out of view
                    entry.target.classList.remove('active');

                    // Deactivate corresponding timeline dot
                    if (timelineDots[index]) {
                        timelineDots[index].classList.remove('active');
                    }
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-5% 0px -5% 0px'
    });

    // Observe all experience items
    experienceItems.forEach(item => {
        experienceObserver.observe(item);
    });

    // Add staggered animation delay for experience items using classes instead of inline styles
    experienceItems.forEach((item, index) => {
        item.classList.add(`delay-${Math.min(index, 5)}`);
    });
});