// ===================================
// HyperPlanner Landing Page JavaScript
// Interactive Cursor, Modals, Animations
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // Cursor Effects
    // ===================================
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorTrail = document.querySelector('.cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update glow position immediately
        if (cursorGlow) {
            cursorGlow.style.left = `${mouseX}px`;
            cursorGlow.style.top = `${mouseY}px`;
        }
    });

    // Smooth trailing cursor
    function animateTrail() {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;

        trailX += dx * 0.2;
        trailY += dy * 0.2;

        if (cursorTrail) {
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
        }

        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Change cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .feature-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (cursorTrail) {
                cursorTrail.style.width = '40px';
                cursorTrail.style.height = '40px';
                cursorTrail.style.borderColor = 'rgba(99, 102, 241, 0.8)';
            }
        });

        el.addEventListener('mouseleave', () => {
            if (cursorTrail) {
                cursorTrail.style.width = '20px';
                cursorTrail.style.height = '20px';
                cursorTrail.style.borderColor = 'rgba(99, 102, 241, 0.5)';
            }
        });
    });

    // ===================================
    // Navigation Scroll Effect
    // ===================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===================================
    // Smooth Scroll for Navigation Links
    // ===================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Modal Functionality
    // ===================================
    const modal = document.getElementById('signInModal');
    const signInBtns = document.querySelectorAll('.sign-in-btn, .cta-signup, .cta-signup-final');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Open modal
    signInBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // ===================================
    // Auth Tabs
    // ===================================
    const authTabs = document.querySelectorAll('.auth-tab');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            authTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding form
            const tabType = tab.getAttribute('data-tab');
            if (tabType === 'signin') {
                signinForm.classList.remove('hidden');
                signupForm.classList.add('hidden');
            } else {
                signinForm.classList.add('hidden');
                signupForm.classList.remove('hidden');
            }
        });
    });

    // ===================================
    // Demo Mode Buttons
    // ===================================
    const demoBtns = document.querySelectorAll('.cta-demo, .cta-demo-main, .cta-demo-final, .demo-link');

    demoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Show demo mode notification
            showNotification('Demo mode would launch here!', 'info');

            // In a real implementation, this would redirect to the app in demo mode
            // window.location.href = '/app?mode=demo';
        });
    });

    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(99, 102, 241, 0.95);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            backdrop-filter: blur(16px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;

        if (type === 'success') {
            notification.style.background = 'rgba(16, 185, 129, 0.95)';
        } else if (type === 'error') {
            notification.style.background = 'rgba(239, 68, 68, 0.95)';
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===================================
    // Feature Cards Hover Effect
    // ===================================
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            // Add glow effect
            this.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });

        // Track mouse movement for tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===================================
    // How Cards Animation on Scroll
    // ===================================
    const howCards = document.querySelectorAll('.how-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    howCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // ===================================
    // Background Gradient Mouse Follow
    // ===================================
    const bgGradient = document.querySelector('.bg-gradient');
    let gradientX = 0;
    let gradientY = 0;

    document.addEventListener('mousemove', (e) => {
        gradientX = (e.clientX / window.innerWidth) * 10 - 5;
        gradientY = (e.clientY / window.innerHeight) * 10 - 5;
    });

    function animateBackground() {
        if (bgGradient) {
            bgGradient.style.transform = `translate(${gradientX}px, ${gradientY}px)`;
        }
        requestAnimationFrame(animateBackground);
    }
    animateBackground();

    // ===================================
    // Mobile Menu Toggle
    // ===================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');

            // Animate hamburger icon
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });
    }

    // ===================================
    // Preview Window Animation
    // ===================================
    const previewItems = document.querySelectorAll('.preview-item');

    setInterval(() => {
        const randomItem = previewItems[Math.floor(Math.random() * previewItems.length)];
        if (randomItem) {
            randomItem.style.background = 'rgba(99, 102, 241, 0.2)';
            setTimeout(() => {
                randomItem.style.background = '';
            }, 1000);
        }
    }, 2000);

    // ===================================
    // Parallax Effect on Scroll
    // ===================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        // Parallax for hero visual
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Parallax for section headers
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            const rect = header.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (window.innerHeight - rect.top) * 0.1;
                header.style.transform = `translateY(${offset}px)`;
            }
        });
    });

    // ===================================
    // Form Validation (Basic)
    // ===================================
    const authForms = document.querySelectorAll('.auth-form');

    authForms.forEach(form => {
        const submitBtn = form.querySelector('.btn-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();

                const inputs = form.querySelectorAll('input');
                let isValid = true;

                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        isValid = false;
                        input.style.borderColor = 'rgba(239, 68, 68, 0.8)';
                        setTimeout(() => {
                            input.style.borderColor = '';
                        }, 2000);
                    }
                });

                if (isValid) {
                    showNotification('Account created successfully!', 'success');
                    setTimeout(() => {
                        closeModal();
                    }, 2000);
                } else {
                    showNotification('Please fill in all fields', 'error');
                }
            });
        }
    });

    // ===================================
    // Easter Egg: Konami Code
    // ===================================
    let konamiCode = [];
    const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiPattern.join(',')) {
            activateEasterEgg();
        }
    });

    function activateEasterEgg() {
        showNotification('🎉 You found the secret! Ultra theme activated!', 'success');

        // Apply rainbow effect
        document.body.style.animation = 'rainbowShift 5s linear infinite';

        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbowShift {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        setTimeout(() => {
            document.body.style.animation = '';
            rainbowStyle.remove();
        }, 5000);
    }

    // ===================================
    // Performance Monitoring
    // ===================================
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        });
    }

    // ===================================
    // Theme Preview Interactions
    // ===================================
    const customizePreviews = document.querySelectorAll('.customize-preview');

    customizePreviews.forEach(preview => {
        preview.addEventListener('click', function() {
            // Flash effect
            this.style.opacity = '0.5';
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);

            showNotification('Theme preview clicked! Full customization in the app.', 'info');
        });
    });

    // ===================================
    // Lazy Loading Images (if any added later)
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===================================
    // Auto-hide cursor effects on touch devices
    // ===================================
    if ('ontouchstart' in window) {
        if (cursorGlow) cursorGlow.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
    }

    // ===================================
    // Console Welcome Message
    // ===================================
    console.log('%c HyperPlanner ', 'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 20px; padding: 10px; border-radius: 8px;');
    console.log('%c Built for thinkers, makers, and planners. ', 'color: #6366f1; font-size: 14px;');
    console.log('%c Try the Konami code for a surprise! ↑↑↓↓←→←→BA ', 'color: #666; font-style: italic;');

    // ===================================
    // Initialize Complete
    // ===================================
    console.log('✨ HyperPlanner landing page initialized');
});

// ===================================
// Service Worker Registration (Optional)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to register a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ===================================
// Analytics Placeholder
// ===================================
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log('Track:', category, action, label);

    // In production, this would send to your analytics service:
    // gtag('event', action, { event_category: category, event_label: label });
}

// Example usage:
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});
