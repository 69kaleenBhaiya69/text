// FlexFive Home Care - Main JavaScript File

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeBackToTop();
    initializeHeroAnimations();
});

// Hero Section Animations
function initializeHeroAnimations() {
    const heroTimeline = gsap.timeline();
    
    // Animate hero content on page load
    heroTimeline
        .from('.hero-title', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-tagline', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-description', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-buttons .btn', {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.3')
        .from('.hero-img', {
            opacity: 0,
            scale: 0.8,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8');
    
    // Floating elements animation
    gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });
}

// Scroll-triggered animations
function initializeAnimations() {
    // Fade in animations
    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
    
    // Slide in from left
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            x: -50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
    
    // Slide in from right
    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.fromTo(element, {
            opacity: 0,
            x: 50
        }, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
    
    // Scale in animations
    gsap.utils.toArray('.scale-in').forEach((element, index) => {
        gsap.fromTo(element, {
            opacity: 0,
            scale: 0.8
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
    
    // Product card hover animations
    gsap.utils.toArray('.product-card').forEach(card => {
        const icon = card.querySelector('.product-icon');
        const button = card.querySelector('.btn');
        
        card.addEventListener('mouseenter', () => {
            gsap.to(icon, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (button) {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(icon, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            if (button) {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

// Navigation functionality
function initializeNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
}

// Scroll effects and parallax
function initializeScrollEffects() {
    // Smooth scroll for anchor links
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
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2;
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: duration,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.innerHTML).toLocaleString();
                    }
                });
            }
        });
    });
}

// Back to top button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: 0 },
                ease: 'power2.out'
            });
        });
    }
}

// Button hover effects
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Form animations
function initializeFormAnimations() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach((group, index) => {
        gsap.fromTo(group, {
            opacity: 0,
            y: 30
        }, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: group,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
    
    // Input focus animations
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Initialize form animations if forms exist
if (document.querySelector('.contact-form')) {
    initializeFormAnimations();
}

// Page transition effects
function initializePageTransitions() {
    // Fade in page content on load
    gsap.fromTo('body', {
        opacity: 0
    }, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
    });
}

// Initialize page transitions
initializePageTransitions();

// Utility function for staggered animations
function staggerAnimation(selector, animation, stagger = 0.1) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element, index) => {
        gsap.fromTo(element, animation.from, {
            ...animation.to,
            delay: index * stagger,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none resume'
            }
        });
    });
}

// Custom cursor effect (optional)
function initializeCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Intersection Observer for performance optimization
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out',
            onComplete: () => {
                loader.style.display = 'none';
            }
        });
    }
});

// Error handling for GSAP animations
window.addEventListener('error', (e) => {
    console.warn('Animation error:', e.message);
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});



// ====================================

  document.querySelector('.btn-primary').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.stats').scrollIntoView({ behavior: 'smooth' });
  });
  