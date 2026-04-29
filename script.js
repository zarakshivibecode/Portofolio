// script.js - Enhanced Interactive JavaScript for Khadiq Zarkasy Portfolio

// Canvas Particle System for Hero
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.resize();
        this.init();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: Math.random() > 0.5 ? '#00ffff' : '#8a2be2',
                life: Math.random() * 100 + 50
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                particle.vx += dx * 0.0001;
                particle.vy += dy * 0.0001;
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.life / 150;
            this.ctx.fill();

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: Math.random() * 3 + 1,
                    color: Math.random() > 0.5 ? '#00ffff' : '#8a2be2',
                    life: Math.random() * 100 + 50
                });
            }
        });

        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }

    updateMouse(x, y) {
        this.mouse.x = x;
        this.mouse.y = y;
    }
}

// Magnetic Hover Effect for Project Cards
class MagneticHover {
    constructor(element) {
        this.element = element;
        this.strength = 0.3;
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }

    handleMouseMove(e) {
        const rect = this.element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * this.strength;
        const deltaY = (e.clientY - centerY) * this.strength;

        this.element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
    }

    handleMouseLeave() {
        this.element.style.transform = 'translate(0, 0) scale(1)';
    }
}

// Creative Section Transitions
class SectionTransitions {
    constructor() {
        this.transitions = document.querySelectorAll('.section-transition');
        this.init();
    }

    init() {
        this.transitions.forEach((transition, index) => {
            this.createTransition(transition, index);
        });
    }

    createTransition(transition, index) {
        // Add scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    transition.classList.add('active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(transition);
    }
}

// Enhanced Scroll Reveal with Creative Effects
class CreativeScrollReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        this.revealSection(entry.target, index);
                    }, index * 200);
                }
            });
        }, { threshold: 0.1 });

        this.sections.forEach(section => observer.observe(section));
    }

    revealSection(section, index) {
        const direction = index % 2 === 0 ? 'left' : 'right';
        section.style.transform = `translateX(${direction === 'left' ? '-100px' : '100px'})`;
        section.style.opacity = '0';

        setTimeout(() => {
            section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            section.style.transform = 'translateX(0)';
            section.style.opacity = '1';
        }, 100);
    }
}

// Mouse Tracker for Interactive Effects
class MouseTracker {
    constructor() {
        this.tracker = document.querySelector('.hero-mouse-tracker');
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-glow';
        this.tracker.appendChild(this.cursor);
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => this.updatePosition(e));
    }

    updatePosition(e) {
        this.cursor.style.left = e.clientX + 'px';
        this.cursor.style.top = e.clientY + 'px';
    }
}

// Typing Animation for Hero
class TypeWriter {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }
}

// Initialize all systems
let particleSystem;
let mouseTracker;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typing Animation
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        typedElement.textContent = ''; // Clear existing text
        new TypeWriter(typedElement, 'Khadiq Zarkasy');
    }
    // Initialize Particle System
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        particleSystem = new ParticleSystem(canvas);

        // Mouse tracking for particles
        document.addEventListener('mousemove', (e) => {
            if (particleSystem) {
                particleSystem.updateMouse(e.clientX, e.clientY);
            }
        });
    }

    // Initialize Magnetic Hover for Project Cards
    document.querySelectorAll('.project-card').forEach(card => {
        new MagneticHover(card);
    });

    // Initialize Mouse Tracker
    mouseTracker = new MouseTracker();

    // Initialize Creative Transitions
    new SectionTransitions();

    // Initialize Enhanced Scroll Reveal
    new CreativeScrollReveal();

    // Add ripple effect to all buttons
    document.querySelectorAll('.ripple').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Enhanced navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                navbar.style.transform = 'translateY(0)';
            }, 200);
        }
    });

    console.log('🚀 Khadiq Zarkasy Portfolio - Unique Experience Loaded!');
});

// Enhanced loading screen hide with wow effect
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.style.transform = 'scale(1.1)';
            setTimeout(() => {
                loading.classList.add('hidden');
                // Trigger entrance animations
                document.body.style.overflow = 'auto';
                triggerWowEntrance();
            }, 500);
        }, 1500);
    }
});

// Wow entrance effect
function triggerWowEntrance() {
    const hero = document.getElementById('hero');
    hero.style.transform = 'scale(0.8) rotate(-5deg)';
    hero.style.opacity = '0';

    setTimeout(() => {
        hero.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        hero.style.transform = 'scale(1) rotate(0deg)';
        hero.style.opacity = '1';
    }, 200);
}

// Resize handler for canvas
window.addEventListener('resize', () => {
    if (particleSystem) {
        particleSystem.resize();
    }
});

// Add cursor glow styles dynamically
const cursorStyles = `
    .cursor-glow {
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        transition: transform 0.1s ease;
    }

    .cursor-glow:hover {
        transform: scale(1.5);
    }

    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${cursorStyles}</style>`);

// Navbar scroll effect with enhanced styling
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 15, 0.8)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.1)';
    }
});

// Smooth scrolling for navigation links with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Progress bar animation for skills
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        }, index * 200);
    });
}

// Trigger progress bar animation when about section is revealed
const aboutSection = document.getElementById('about');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

progressObserver.observe(aboutSection);

// Contact form handling with validation and animation
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();

    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields.', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Simulate form submission
    showFormMessage('Sending message...', 'info');

    setTimeout(() => {
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
    }, 2000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;

    // Style based on type
    if (type === 'error') {
        messageEl.style.color = '#ff6b6b';
    } else if (type === 'success') {
        messageEl.style.color = '#00ffff';
    } else {
        messageEl.style.color = '#b0b0b0';
    }

    // Add to form
    const form = document.getElementById('contactForm');
    form.appendChild(messageEl);

    // Animate in
    messageEl.style.opacity = '0';
    messageEl.style.transform = 'translateY(10px)';
    setTimeout(() => {
        messageEl.style.transition = 'all 0.3s ease';
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
    }, 10);

    // Auto remove after 5 seconds for success/error
    if (type !== 'info') {
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateY(-10px)';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Add form event listener
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});

// Performance optimization: Debounce scroll events
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

// Apply debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    // Additional scroll-based effects can be added here
}, 10));