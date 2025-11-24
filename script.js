// ===================================
// HyperPlanner Landing Page JavaScript
// Interactive Cursor, Modals, Animations, Welcome Flow
// ===================================

// Global variables for customization
let currentStep = 1;
let welcomeData = {};
const originalTitle = document.title;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user has completed welcome before
    const welcomeComplete = localStorage.getItem('hyperplanner_welcome_complete');
    if (welcomeComplete === 'true') {
        hideWelcomeScreen();
    }

    // ===================================
    // Tab Title & Favicon Change on Visibility
    // ===================================
    const originalFavicon = document.querySelector('link[rel="icon"]').href;

    document.addEventListener('visibilitychange', () => {
        const favicon = document.querySelector('link[rel="icon"]');

        if (document.hidden) {
            document.title = 'Come get ur cookie!';
            // Change favicon to cookie emoji
            favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍪</text></svg>";
        } else {
            document.title = originalTitle;
            favicon.href = originalFavicon;
        }
    });

    // ===================================
    // Cursor Effects - Background Glow & White Streak Trail
    // ===================================
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorTrailContainer = document.querySelector('.cursor-trail');
    const bgGradient = document.querySelector('.bg-gradient');
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetGradientX = 0;
    let targetGradientY = 0;
    let currentGradientX = 0;
    let currentGradientY = 0;

    if (!isMobile) {
        // Create canvas for white streak trail
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9998;';
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        const trail = [];
        const maxTrailLength = 30;

        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update cursor glow position
            if (cursorGlow) {
                cursorGlow.style.left = `${mouseX}px`;
                cursorGlow.style.top = `${mouseY}px`;
            }

            // Update background gradient reaction (larger movement range)
            targetGradientX = (mouseX / window.innerWidth) * 60 - 30;
            targetGradientY = (mouseY / window.innerHeight) * 60 - 30;

            // Add point to trail
            trail.push({
                x: mouseX,
                y: mouseY,
                time: Date.now()
            });

            // Limit trail length
            while (trail.length > maxTrailLength) {
                trail.shift();
            }
        });

        // Animate background gradient with smooth easing
        function animateBackground() {
            // Smooth interpolation for background gradient
            currentGradientX += (targetGradientX - currentGradientX) * 0.08;
            currentGradientY += (targetGradientY - currentGradientY) * 0.08;

            if (bgGradient) {
                bgGradient.style.transform = `translate(${currentGradientX}px, ${currentGradientY}px)`;
            }
            requestAnimationFrame(animateBackground);
        }
        animateBackground();

        // Draw white streak trail (Windows-style)
        function drawTrail() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (trail.length > 2) {
                // Use bezier curves for smoother trail
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);

                for (let i = 1; i < trail.length; i++) {
                    const current = trail[i];
                    const prev = trail[i - 1];
                    const age = (Date.now() - current.time) / 1000;

                    // Calculate opacity based on position and age
                    const progress = i / trail.length;
                    const opacity = Math.max(0, (1 - age / 0.4) * progress * 0.7);

                    // Calculate line width (thicker near cursor, thinner at tail)
                    const lineWidth = 12 * progress;

                    if (opacity > 0 && lineWidth > 0.5) {
                        ctx.beginPath();
                        ctx.moveTo(prev.x, prev.y);
                        ctx.lineTo(current.x, current.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                        ctx.lineWidth = lineWidth;
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        ctx.stroke();
                    }
                }

                // Remove old points
                for (let i = trail.length - 1; i >= 0; i--) {
                    const age = (Date.now() - trail[i].time) / 1000;
                    if (age > 0.4) {
                        trail.splice(i, 1);
                    }
                }
            }

            requestAnimationFrame(drawTrail);
        }
        drawTrail();

        // Resize canvas on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Interactive element hover effects
        const interactiveElements = document.querySelectorAll('a, button, .feature-card, .welcome-option, .color-swatch');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (cursorGlow) {
                    cursorGlow.style.width = '500px';
                    cursorGlow.style.height = '500px';
                }
            });

            el.addEventListener('mouseleave', () => {
                if (cursorGlow) {
                    cursorGlow.style.width = '400px';
                    cursorGlow.style.height = '400px';
                }
            });
        });
    } else {
        // Hide cursor effects on mobile
        if (cursorGlow) cursorGlow.style.display = 'none';
        if (cursorTrailContainer) cursorTrailContainer.style.display = 'none';
    }

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

    // Background gradient mouse follow is handled in the cursor effects section above

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
    // Preview Window Animation with Feature Templates
    // ===================================
    const previewItems = document.querySelectorAll('.preview-item');

    // Large list of feature templates to display
    const featureTemplates = [
        { icon: '📝', text: 'Write proposal', time: '2pm' },
        { icon: '💬', text: 'Team standup', time: '9:30am' },
        { icon: '🎯', text: 'Q4 planning', time: 'Tomorrow' },
        { icon: '📊', text: 'Review metrics', time: '4pm' },
        { icon: '🔍', text: 'User research', time: 'Mon' },
        { icon: '✨', text: 'Ship v2.0', time: 'Friday' },
        { icon: '📞', text: 'Client call', time: '3pm' },
        { icon: '🎨', text: 'Design review', time: 'Thu' },
        { icon: '💻', text: 'Code refactor', time: 'Today' },
        { icon: '📧', text: 'Send updates', time: '5pm' },
        { icon: '🚀', text: 'Launch feature', time: 'Wed' },
        { icon: '📱', text: 'Mobile testing', time: '1pm' },
        { icon: '🎓', text: 'Team training', time: 'Tue' },
        { icon: '🔧', text: 'Fix bug #234', time: 'ASAP' },
        { icon: '📈', text: 'Growth meeting', time: '11am' },
        { icon: '🎯', text: 'Set OKRs', time: 'Next week' },
        { icon: '💡', text: 'Brainstorm ideas', time: '2:30pm' },
        { icon: '🔐', text: 'Security audit', time: 'Fri' },
        { icon: '🎬', text: 'Record demo', time: '10am' },
        { icon: '📝', text: 'Draft blog post', time: 'Thu' },
        { icon: '🤝', text: 'Partner sync', time: '3:30pm' },
        { icon: '🎨', text: 'Update branding', time: 'Mon' },
        { icon: '📊', text: 'Analytics deep dive', time: 'Today' },
        { icon: '🔔', text: 'Push notifications', time: 'Tomorrow' },
        { icon: '🏆', text: 'Celebrate wins', time: '5:30pm' },
        { icon: '🔄', text: 'Sprint planning', time: 'Mon 9am' },
        { icon: '📦', text: 'Ship updates', time: 'Wed' },
        { icon: '🎪', text: 'Company all-hands', time: 'Fri 2pm' },
        { icon: '🌟', text: 'Feature polish', time: 'Today' },
        { icon: '📝', text: 'Write docs', time: '4:30pm' }
    ];

    setInterval(() => {
        const randomItem = previewItems[Math.floor(Math.random() * previewItems.length)];
        const randomFeature = featureTemplates[Math.floor(Math.random() * featureTemplates.length)];

        if (randomItem && !randomItem.classList.contains('active')) {
            // Add feature content
            randomItem.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px; flex: 1; min-width: 0;">
                    <span style="font-size: 14px;">${randomFeature.icon}</span>
                    <span style="font-size: 11px; color: rgba(255,255,255,0.9); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${randomFeature.text}</span>
                </div>
                <span style="font-size: 9px; color: rgba(255,255,255,0.6); white-space: nowrap;">${randomFeature.time}</span>
            `;

            // Add active class for styling
            randomItem.classList.add('active');

            setTimeout(() => {
                randomItem.classList.remove('active');
                // Clear content after fade out
                setTimeout(() => {
                    if (!randomItem.classList.contains('active')) {
                        randomItem.innerHTML = '';
                    }
                }, 300);
            }, 2000);
        }
    }, 2500);

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
    // Welcome Screen Option Selection
    // ===================================
    document.querySelectorAll('.welcome-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from siblings
            this.parentElement.querySelectorAll('.welcome-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            // Add selected class to this option
            this.classList.add('selected');

            // Store the selection
            const step = this.closest('.welcome-step').dataset.step;
            const value = this.dataset.value;
            welcomeData[`step${step}`] = value;

            // Apply theme if this is step 4 (theme selection)
            if (step === '4' && (value === 'glassy' || value === 'midnight' || value === 'neon')) {
                applyTheme(value);
            }
        });
    });

    // ===================================
    // Initialize Complete
    // ===================================
    console.log('✨ HyperPlanner landing page initialized with welcome flow');
});

// ===================================
// Welcome Screen Functions (Global)
// ===================================
function nextWelcomeStep() {
    const steps = document.querySelectorAll('.welcome-step');
    const progressDots = document.querySelectorAll('.progress-dot');

    if (currentStep < steps.length) {
        steps[currentStep - 1].classList.remove('active');
        progressDots[currentStep - 1].classList.remove('active');

        currentStep++;

        steps[currentStep - 1].classList.add('active');
        progressDots[currentStep - 1].classList.add('active');
    }
}

function prevWelcomeStep() {
    const steps = document.querySelectorAll('.welcome-step');
    const progressDots = document.querySelectorAll('.progress-dot');

    if (currentStep > 1) {
        steps[currentStep - 1].classList.remove('active');
        progressDots[currentStep - 1].classList.remove('active');

        currentStep--;

        steps[currentStep - 1].classList.add('active');
        progressDots[currentStep - 1].classList.add('active');
    }
}

function startDemo() {
    // Save welcome data
    localStorage.setItem('hyperplanner_welcome_data', JSON.stringify(welcomeData));
    localStorage.setItem('hyperplanner_welcome_complete', 'true');
    localStorage.setItem('hyperplanner_mode', 'demo');

    hideWelcomeScreen();
    showNotification('Demo mode activated! Explore all features (except AI, sync, and advanced automations)', 'success');
}

function openSignup() {
    // Save welcome data
    localStorage.setItem('hyperplanner_welcome_data', JSON.stringify(welcomeData));
    localStorage.setItem('hyperplanner_welcome_complete', 'true');

    hideWelcomeScreen();

    // Open signup modal
    setTimeout(() => {
        const modal = document.getElementById('signInModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Switch to signup tab
            const signupTab = document.querySelector('[data-tab="signup"]');
            if (signupTab) signupTab.click();
        }
    }, 500);
}

function hideWelcomeScreen() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    if (welcomeScreen) {
        welcomeScreen.classList.add('hidden');

        // Show customization controls after welcome
        setTimeout(() => {
            const controls = document.getElementById('customizeControls');
            if (controls) controls.classList.remove('hidden');
        }, 500);
    }
}

// ===================================
// Glass Sidebar Functions (Global)
// ===================================
function toggleSidebar() {
    const sidebar = document.getElementById('glassSidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// ===================================
// Customization Functions (Global)
// ===================================
function applyTheme(themeName, silent = false) {
    const root = document.documentElement;

    switch(themeName) {
        case 'glassy':
            root.style.setProperty('--primary', '#6366f1');
            root.style.setProperty('--secondary', '#ec4899');
            root.style.setProperty('--bg-primary', '#0f0f1a');
            break;
        case 'midnight':
            root.style.setProperty('--primary', '#3b82f6');
            root.style.setProperty('--secondary', '#8b5cf6');
            root.style.setProperty('--bg-primary', '#000000');
            break;
        case 'neon':
            root.style.setProperty('--primary', '#a855f7');
            root.style.setProperty('--secondary', '#ec4899');
            root.style.setProperty('--bg-primary', '#0a0a0f');
            break;
    }

    // Update active state on theme swatches
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        if (swatch.dataset.theme === themeName) {
            swatch.classList.add('active');
        } else {
            swatch.classList.remove('active');
        }
    });

    localStorage.setItem('hyperplanner_theme', themeName);

    if (!silent) {
        showNotification(`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme applied!`, 'success');
    }
}

function adjustBlur(value) {
    const root = document.documentElement;
    root.style.setProperty('--blur-md', `${value}px`);
    localStorage.setItem('hyperplanner_blur', value);
}

function adjustGlow(value) {
    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorTrail = document.querySelector('.cursor-trail');
    const opacity = value / 100;

    if (cursorGlow) {
        cursorGlow.style.opacity = opacity;
    }
    if (cursorTrail) {
        cursorTrail.style.opacity = opacity;
    }
    localStorage.setItem('hyperplanner_glow', value);
}

function resetCustomization() {
    const root = document.documentElement;
    root.style.setProperty('--primary', '#6366f1');
    root.style.setProperty('--secondary', '#ec4899');
    root.style.setProperty('--bg-primary', '#0f0f1a');
    root.style.setProperty('--blur-md', '16px');

    const cursorGlow = document.querySelector('.cursor-glow');
    const cursorTrail = document.querySelector('.cursor-trail');
    if (cursorGlow) cursorGlow.style.opacity = '1';
    if (cursorTrail) cursorTrail.style.opacity = '1';

    // Reset theme swatches to glassy (default)
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        if (swatch.dataset.theme === 'glassy') {
            swatch.classList.add('active');
        } else {
            swatch.classList.remove('active');
        }
    });

    // Reset sliders
    document.querySelectorAll('.slider-control input[type="range"]').forEach(slider => {
        if (slider.oninput && slider.oninput.toString().includes('adjustBlur')) {
            slider.value = 16;
        } else if (slider.oninput && slider.oninput.toString().includes('adjustGlow')) {
            slider.value = 50;
        }
    });

    localStorage.removeItem('hyperplanner_theme');
    localStorage.removeItem('hyperplanner_blur');
    localStorage.removeItem('hyperplanner_glow');

    showNotification('Customization reset to defaults', 'info');
}

// Load saved customizations
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('hyperplanner_theme');
    const savedBlur = localStorage.getItem('hyperplanner_blur');
    const savedGlow = localStorage.getItem('hyperplanner_glow');

    if (savedTheme) applyTheme(savedTheme, true);
    if (savedBlur) {
        adjustBlur(savedBlur);
        // Update blur slider value
        const blurSlider = document.querySelector('input[type="range"][oninput*="adjustBlur"]');
        if (blurSlider) blurSlider.value = savedBlur;
    }
    if (savedGlow) {
        adjustGlow(savedGlow);
        // Update glow slider value
        const glowSlider = document.querySelector('input[type="range"][oninput*="adjustGlow"]');
        if (glowSlider) glowSlider.value = savedGlow;
    }
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
// Authentication Functions
// ===================================

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.parentElement.querySelector('.password-toggle');
    const eyeIcon = toggleBtn.querySelector('.eye-icon');
    const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');

    if (input.type === 'password') {
        // Showing password - show open eye
        input.type = 'text';
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
    } else {
        // Hiding password - show closed eye
        input.type = 'password';
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
}

// Update password strength indicator
function updatePasswordStrength(password) {
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');

    if (!strengthFill || !strengthText) return;

    const strength = checkPasswordStrength(password);
    const strengthSpan = strengthText.querySelector('span');

    // Remove all strength classes
    strengthFill.classList.remove('weak', 'medium', 'strong');
    strengthText.classList.remove('weak', 'medium', 'strong');

    if (password.length === 0) {
        strengthSpan.textContent = '-';
        return;
    }

    // Add appropriate class and text
    strengthFill.classList.add(strength);
    strengthText.classList.add(strength);
    strengthSpan.textContent = strength.charAt(0).toUpperCase() + strength.slice(1);
}

// Show forgot password form
function showForgotPassword(event) {
    event.preventDefault();

    const signinForm = document.getElementById('signinForm');
    const forgotForm = document.getElementById('forgotForm');
    const authTabs = document.getElementById('authTabs');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');

    signinForm.classList.add('hidden');
    forgotForm.classList.remove('hidden');
    authTabs.style.display = 'none';

    modalTitle.textContent = 'Reset Password';
    modalSubtitle.textContent = 'Enter your email to receive a reset link';
}

// Back to sign in
function backToSignIn(event) {
    event.preventDefault();

    const signinForm = document.getElementById('signinForm');
    const forgotForm = document.getElementById('forgotForm');
    const authTabs = document.getElementById('authTabs');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');

    forgotForm.classList.add('hidden');
    signinForm.classList.remove('hidden');
    authTabs.style.display = '';

    modalTitle.textContent = 'Welcome Back';
    modalSubtitle.textContent = 'Sign in to sync across devices and unlock all features';
}

// Handle sign in
function handleSignIn(event) {
    event.preventDefault();

    const emailInput = document.getElementById('signin-email');
    const passwordInput = document.getElementById('signin-password');
    const submitBtn = document.getElementById('signin-submit');
    const emailHelp = document.getElementById('signin-email-help');

    // Validate email
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        emailHelp.classList.remove('hidden');
        emailHelp.classList.add('error');
        emailHelp.querySelector('.help-text').textContent = 'Please enter a valid email address';
        return;
    }

    // Validate password
    if (passwordInput.value.length < 6) {
        passwordInput.classList.add('error');
        showNotification('Password is too short', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    emailHelp.classList.add('hidden');

    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');

        // In production, this would make an actual API call
        // For now, show success message
        showNotification('Sign in successful! Welcome back!', 'success');

        // Close modal after a delay
        setTimeout(() => {
            const modal = document.getElementById('signInModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Clear form
            emailInput.value = '';
            passwordInput.value = '';
        }, 1500);
    }, 1500);
}

// Handle sign up
function handleSignUp(event) {
    event.preventDefault();

    const nameInput = document.getElementById('signup-name');
    const emailInput = document.getElementById('signup-email');
    const passwordInput = document.getElementById('signup-password');
    const submitBtn = document.getElementById('signup-submit');
    const emailHelp = document.getElementById('signup-email-help');

    let isValid = true;

    // Validate name
    if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('error');
        showNotification('Please enter your name', 'error');
        isValid = false;
    }

    // Validate email
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        emailHelp.classList.remove('hidden');
        emailHelp.classList.add('error');
        emailHelp.querySelector('.help-icon').textContent = '✗';
        emailHelp.querySelector('.help-text').textContent = 'Invalid email address';
        isValid = false;
    }

    // Validate password
    if (passwordInput.value.length < 8) {
        passwordInput.classList.add('error');
        showNotification('Password must be at least 8 characters', 'error');
        isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    submitBtn.classList.add('loading');
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');

    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');

        // In production, this would make an actual API call
        showNotification('Account created successfully! Welcome to HyperPlanner!', 'success');

        // Close modal and redirect
        setTimeout(() => {
            const modal = document.getElementById('signInModal');
            modal.classList.remove('active');
            document.body.style.overflow = '';

            // Clear form
            nameInput.value = '';
            emailInput.value = '';
            passwordInput.value = '';

            // Reset password strength
            updatePasswordStrength('');
        }, 1500);
    }, 1500);
}

// Handle forgot password
function handleForgotPassword(event) {
    event.preventDefault();

    const emailInput = document.getElementById('forgot-email');
    const submitBtn = document.getElementById('forgot-submit');

    // Validate email
    if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    emailInput.classList.remove('error');

    // Simulate API call
    setTimeout(() => {
        submitBtn.classList.remove('loading');

        showNotification('Password reset link sent! Check your email.', 'success');

        // Clear form and go back to sign in
        setTimeout(() => {
            emailInput.value = '';
            backToSignIn(event);
        }, 2000);
    }, 1500);
}

// Handle Google OAuth
function handleGoogleAuth(event) {
    event.preventDefault();

    const btn = event.currentTarget;
    btn.classList.add('loading');

    // In production, this would redirect to Google OAuth
    // window.location.href = '/auth/google';

    showNotification('Redirecting to Google...', 'info');

    setTimeout(() => {
        btn.classList.remove('loading');
        // Simulate OAuth redirect
        showNotification('Google OAuth integration coming soon!', 'info');
    }, 1500);
}

// Handle GitHub OAuth
function handleGitHubAuth(event) {
    event.preventDefault();

    const btn = event.currentTarget;
    btn.classList.add('loading');

    // In production, this would redirect to GitHub OAuth
    // window.location.href = '/auth/github';

    showNotification('Redirecting to GitHub...', 'info');

    setTimeout(() => {
        btn.classList.remove('loading');
        // Simulate OAuth redirect
        showNotification('GitHub OAuth integration coming soon!', 'info');
    }, 1500);
}

// Set up real-time validation
document.addEventListener('DOMContentLoaded', () => {
    // Email validation for sign-in
    const signinEmail = document.getElementById('signin-email');
    if (signinEmail) {
        signinEmail.addEventListener('input', (e) => {
            const emailHelp = document.getElementById('signin-email-help');
            if (validateEmail(e.target.value)) {
                e.target.classList.remove('error');
                e.target.classList.add('success');
                emailHelp.classList.add('hidden');
            } else {
                e.target.classList.remove('success');
            }
        });
    }

    // Email validation for sign-up
    const signupEmail = document.getElementById('signup-email');
    if (signupEmail) {
        signupEmail.addEventListener('input', (e) => {
            const emailHelp = document.getElementById('signup-email-help');
            if (validateEmail(e.target.value)) {
                e.target.classList.remove('error');
                e.target.classList.add('success');
                emailHelp.classList.remove('hidden', 'error');
                emailHelp.classList.add('success');
                emailHelp.querySelector('.help-icon').textContent = '✓';
                emailHelp.querySelector('.help-text').textContent = 'Email is valid';
            } else {
                e.target.classList.remove('success');
                emailHelp.classList.add('hidden');
            }
        });
    }

    // Password strength for sign-up
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', (e) => {
            updatePasswordStrength(e.target.value);
            e.target.classList.remove('error');
        });
    }

    // Clear error states on focus
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('focus', () => {
            input.classList.remove('error');
        });
    });
});

// ===================================
// Keyboard Shortcuts System
// ===================================
const KeyboardShortcuts = {
    enabled: true,
    shortcuts: new Map(),

    // Initialize keyboard shortcuts
    init() {
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.registerDefaultShortcuts();
        console.log('Keyboard shortcuts initialized. Press ? for help.');
    },

    // Register a shortcut
    register(keys, callback, description, category = 'General') {
        const key = this.normalizeKeys(keys);
        this.shortcuts.set(key, { callback, description, category, keys });
    },

    // Normalize key combination
    normalizeKeys(keys) {
        return keys.toLowerCase()
            .replace('cmd', 'meta')
            .replace('ctrl', 'control')
            .replace('opt', 'alt')
            .replace('option', 'alt');
    },

    // Get current key combination from event
    getKeyCombo(e) {
        const parts = [];
        if (e.metaKey) parts.push('meta');
        if (e.ctrlKey) parts.push('control');
        if (e.altKey) parts.push('alt');
        if (e.shiftKey) parts.push('shift');

        const key = e.key.toLowerCase();
        if (!['meta', 'control', 'alt', 'shift'].includes(key)) {
            parts.push(key);
        }

        return parts.join('+');
    },

    // Handle keydown events
    handleKeydown(e) {
        if (!this.enabled) return;

        // Don't trigger shortcuts when typing in inputs
        const tagName = e.target.tagName.toLowerCase();
        const isEditable = e.target.isContentEditable;
        const isInput = ['input', 'textarea', 'select'].includes(tagName);

        // Allow some shortcuts even in inputs
        const allowInInput = ['escape', 'meta+k', 'control+k', 'meta+/', 'control+/'];
        const combo = this.getKeyCombo(e);

        if (isInput && !isEditable && !allowInInput.includes(combo)) {
            return;
        }

        const shortcut = this.shortcuts.get(combo);
        if (shortcut) {
            e.preventDefault();
            shortcut.callback(e);
        }
    },

    // Show help modal with all shortcuts
    showHelp() {
        // Group shortcuts by category
        const categories = {};
        this.shortcuts.forEach((value, key) => {
            if (!categories[value.category]) {
                categories[value.category] = [];
            }
            categories[value.category].push({
                keys: value.keys,
                description: value.description
            });
        });

        // Create modal content
        let html = '<div class="shortcuts-modal">';
        html += '<h2>Keyboard Shortcuts</h2>';

        for (const [category, shortcuts] of Object.entries(categories)) {
            html += `<div class="shortcut-category">`;
            html += `<h3>${category}</h3>`;
            html += '<table class="shortcut-list">';
            shortcuts.forEach(s => {
                const displayKeys = s.keys
                    .replace('meta', '⌘')
                    .replace('control', 'Ctrl')
                    .replace('alt', 'Alt')
                    .replace('shift', 'Shift')
                    .replace('+', ' + ')
                    .toUpperCase();
                html += `<tr><td><kbd>${displayKeys}</kbd></td><td>${s.description}</td></tr>`;
            });
            html += '</table></div>';
        }

        html += '<p class="shortcut-tip">Press <kbd>Escape</kbd> to close</p>';
        html += '</div>';

        // Show in notification or create modal
        this.showShortcutsModal(html);
    },

    showShortcutsModal(html) {
        // Remove existing modal
        const existing = document.querySelector('.keyboard-shortcuts-overlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'keyboard-shortcuts-overlay';
        overlay.innerHTML = html;
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(8px);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            overflow-y: auto;
        `;

        const modal = overlay.querySelector('.shortcuts-modal');
        modal.style.cssText = `
            background: #1a1a2e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            padding: 2rem;
            max-width: 800px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            color: white;
        `;

        // Style elements
        const style = document.createElement('style');
        style.textContent = `
            .shortcuts-modal h2 {
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
                background: linear-gradient(135deg, #6366f1, #ec4899);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            .shortcut-category {
                margin-bottom: 1.5rem;
            }
            .shortcut-category h3 {
                font-size: 1rem;
                color: #6366f1;
                margin-bottom: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            .shortcut-list {
                width: 100%;
                border-collapse: collapse;
            }
            .shortcut-list tr {
                border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            }
            .shortcut-list td {
                padding: 0.5rem 0;
            }
            .shortcut-list td:first-child {
                width: 150px;
            }
            .shortcut-list kbd {
                display: inline-block;
                padding: 4px 8px;
                background: rgba(99, 102, 241, 0.2);
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-radius: 4px;
                font-family: monospace;
                font-size: 0.85rem;
                color: #818cf8;
            }
            .shortcut-tip {
                margin-top: 1.5rem;
                text-align: center;
                color: rgba(255, 255, 255, 0.5);
                font-size: 0.875rem;
            }
            .shortcut-tip kbd {
                padding: 2px 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(overlay);

        // Close on click outside or Escape
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });

        const closeOnEscape = (e) => {
            if (e.key === 'Escape') {
                overlay.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        };
        document.addEventListener('keydown', closeOnEscape);
    },

    // Register default shortcuts
    registerDefaultShortcuts() {
        // Help
        this.register('?', () => this.showHelp(), 'Show keyboard shortcuts', 'Help');
        this.register('shift+/', () => this.showHelp(), 'Show keyboard shortcuts', 'Help');

        // Navigation
        this.register('g+h', () => scrollToElement('.hero'), 'Go to Home/Hero', 'Navigation');
        this.register('g+f', () => scrollToElement('#features'), 'Go to Features', 'Navigation');
        this.register('g+w', () => scrollToElement('#how-it-works'), 'Go to How It Works', 'Navigation');
        this.register('g+c', () => scrollToElement('#customize'), 'Go to Customize', 'Navigation');
        this.register('g+d', () => scrollToElement('#demo'), 'Go to Demo', 'Navigation');

        // Actions
        this.register('meta+k', () => showCommandPalette(), 'Open Command Palette', 'Actions');
        this.register('control+k', () => showCommandPalette(), 'Open Command Palette', 'Actions');
        this.register('/', () => focusSearch(), 'Focus Search', 'Actions');
        this.register('escape', () => closeAllModals(), 'Close Modals/Escape', 'Actions');

        // Modal shortcuts
        this.register('s', () => openSignInModal(), 'Open Sign In', 'Quick Actions');
        this.register('d', () => launchDemo(), 'Launch Demo', 'Quick Actions');

        // Theme shortcuts
        this.register('t+1', () => applyTheme('glassy'), 'Apply Glassy Theme', 'Themes');
        this.register('t+2', () => applyTheme('midnight'), 'Apply Midnight Theme', 'Themes');
        this.register('t+3', () => applyTheme('neon'), 'Apply Neon Theme', 'Themes');
        this.register('t+r', () => resetCustomization(), 'Reset Theme', 'Themes');

        // Sidebar
        this.register('b', () => toggleSidebar(), 'Toggle Guides Sidebar', 'UI');

        // Scroll
        this.register('j', () => window.scrollBy(0, 100), 'Scroll Down', 'Scroll');
        this.register('k', () => window.scrollBy(0, -100), 'Scroll Up', 'Scroll');
        this.register('space', () => window.scrollBy(0, window.innerHeight * 0.8), 'Page Down', 'Scroll');
        this.register('shift+space', () => window.scrollBy(0, -window.innerHeight * 0.8), 'Page Up', 'Scroll');
        this.register('g+g', () => window.scrollTo(0, 0), 'Go to Top', 'Scroll');
        this.register('shift+g', () => window.scrollTo(0, document.body.scrollHeight), 'Go to Bottom', 'Scroll');
    }
};

// Helper functions for keyboard shortcuts
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function showCommandPalette() {
    // Create command palette if it doesn't exist
    let palette = document.querySelector('.command-palette-overlay');
    if (palette) {
        palette.remove();
        return;
    }

    const commands = [
        { name: 'Go to Features', action: () => scrollToElement('#features'), icon: '🎯' },
        { name: 'Go to How It Works', action: () => scrollToElement('#how-it-works'), icon: '📖' },
        { name: 'Go to Customize', action: () => scrollToElement('#customize'), icon: '🎨' },
        { name: 'Go to Demo', action: () => scrollToElement('#demo'), icon: '🚀' },
        { name: 'Open Sign In', action: () => openSignInModal(), icon: '🔑' },
        { name: 'Launch Demo Mode', action: () => launchDemo(), icon: '▶️' },
        { name: 'Apply Glassy Theme', action: () => applyTheme('glassy'), icon: '✨' },
        { name: 'Apply Midnight Theme', action: () => applyTheme('midnight'), icon: '🌙' },
        { name: 'Apply Neon Theme', action: () => applyTheme('neon'), icon: '⚡' },
        { name: 'Reset Theme', action: () => resetCustomization(), icon: '🔄' },
        { name: 'Toggle Guides Sidebar', action: () => toggleSidebar(), icon: '📚' },
        { name: 'Show Keyboard Shortcuts', action: () => KeyboardShortcuts.showHelp(), icon: '⌨️' },
        { name: 'Go to Documentation', action: () => window.location.href = 'docs/getting-started.html', icon: '📄' },
    ];

    const overlay = document.createElement('div');
    overlay.className = 'command-palette-overlay';
    overlay.innerHTML = `
        <div class="command-palette">
            <input type="text" class="command-input" placeholder="Type a command..." autofocus>
            <div class="command-list">
                ${commands.map((cmd, i) => `
                    <div class="command-item" data-index="${i}">
                        <span class="command-icon">${cmd.icon}</span>
                        <span class="command-name">${cmd.name}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
        z-index: 10002;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 20vh;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .command-palette {
            background: #1a1a2e;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            width: 100%;
            max-width: 500px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .command-input {
            width: 100%;
            padding: 16px 20px;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 1rem;
            outline: none;
        }
        .command-input::placeholder {
            color: rgba(255, 255, 255, 0.4);
        }
        .command-list {
            max-height: 300px;
            overflow-y: auto;
        }
        .command-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 20px;
            cursor: pointer;
            transition: background 0.15s ease;
        }
        .command-item:hover, .command-item.selected {
            background: rgba(99, 102, 241, 0.2);
        }
        .command-icon {
            font-size: 1.25rem;
        }
        .command-name {
            color: white;
        }
        .command-item.hidden {
            display: none;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(overlay);

    const input = overlay.querySelector('.command-input');
    const items = overlay.querySelectorAll('.command-item');
    let selectedIndex = 0;

    // Filter commands on input
    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        items.forEach((item, i) => {
            const name = commands[i].name.toLowerCase();
            if (name.includes(query)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
        // Select first visible item
        const visibleItems = [...items].filter(i => !i.classList.contains('hidden'));
        items.forEach(i => i.classList.remove('selected'));
        if (visibleItems.length > 0) {
            visibleItems[0].classList.add('selected');
            selectedIndex = [...items].indexOf(visibleItems[0]);
        }
    });

    // Keyboard navigation
    input.addEventListener('keydown', (e) => {
        const visibleItems = [...items].filter(i => !i.classList.contains('hidden'));
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            items[selectedIndex]?.classList.remove('selected');
            const currentVisible = visibleItems.indexOf(items[selectedIndex]);
            selectedIndex = [...items].indexOf(visibleItems[(currentVisible + 1) % visibleItems.length]);
            items[selectedIndex]?.classList.add('selected');
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            items[selectedIndex]?.classList.remove('selected');
            const currentVisible = visibleItems.indexOf(items[selectedIndex]);
            selectedIndex = [...items].indexOf(visibleItems[(currentVisible - 1 + visibleItems.length) % visibleItems.length]);
            items[selectedIndex]?.classList.add('selected');
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const selected = items[selectedIndex];
            if (selected && !selected.classList.contains('hidden')) {
                commands[selectedIndex].action();
                overlay.remove();
            }
        } else if (e.key === 'Escape') {
            overlay.remove();
        }
    });

    // Click to select
    items.forEach((item, i) => {
        item.addEventListener('click', () => {
            commands[i].action();
            overlay.remove();
        });
    });

    // Close on click outside
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // Focus input
    input.focus();
}

function focusSearch() {
    const searchInput = document.querySelector('input[type="search"], input[type="text"][placeholder*="search" i]');
    if (searchInput) {
        searchInput.focus();
    } else {
        showCommandPalette();
    }
}

function closeAllModals() {
    // Close sign in modal
    const signInModal = document.getElementById('signInModal');
    if (signInModal?.classList.contains('active')) {
        signInModal.classList.remove('active');
        document.body.style.overflow = '';
        return;
    }

    // Close command palette
    const palette = document.querySelector('.command-palette-overlay');
    if (palette) {
        palette.remove();
        return;
    }

    // Close shortcuts modal
    const shortcuts = document.querySelector('.keyboard-shortcuts-overlay');
    if (shortcuts) {
        shortcuts.remove();
        return;
    }

    // Close sidebar
    const sidebar = document.getElementById('glassSidebar');
    if (sidebar?.classList.contains('active')) {
        sidebar.classList.remove('active');
        return;
    }
}

function openSignInModal() {
    const modal = document.getElementById('signInModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function launchDemo() {
    openDemoApp();
}

// Initialize keyboard shortcuts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    KeyboardShortcuts.init();
});

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

// ===================================
// Demo App & Quick Capture System
// ===================================

// Task storage
let demoTasks = JSON.parse(localStorage.getItem('hyperplanner_demo_tasks')) || [];

// Open demo app
function openDemoApp() {
    const overlay = document.getElementById('demoAppOverlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Initialize quick capture
        initQuickCapture();

        // Render existing tasks
        renderDemoTasks();

        // Focus the input
        setTimeout(() => {
            const input = document.getElementById('quickCaptureInput');
            if (input) input.focus();
        }, 100);
    }
}

// Close demo app
function closeDemoApp() {
    const overlay = document.getElementById('demoAppOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize Quick Capture
function initQuickCapture() {
    const input = document.getElementById('quickCaptureInput');
    const preview = document.getElementById('quickCapturePreview');

    if (!input) return;

    // Live preview as user types
    input.addEventListener('input', (e) => {
        const text = e.target.value.trim();
        if (text.length > 0) {
            const parsed = parseTaskInput(text);
            updatePreview(parsed, preview);
        } else {
            preview.classList.remove('active');
        }
    });

    // Add task on Enter
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            addQuickCapture();
        }
    });
}

// Parse task input with smart recognition
function parseTaskInput(text) {
    const result = {
        title: text,
        context: null,
        priority: null,
        tags: [],
        date: null,
        dateType: null // 'today', 'upcoming', or null for inbox
    };

    // Extract @context
    const contextMatch = text.match(/@(\w+)/g);
    if (contextMatch) {
        result.context = contextMatch[0].substring(1);
        result.title = result.title.replace(contextMatch[0], '').trim();
    }

    // Extract !priority
    const priorityMatch = text.match(/!(high|medium|low|urgent)/i);
    if (priorityMatch) {
        result.priority = priorityMatch[1].toLowerCase();
        if (result.priority === 'urgent') result.priority = 'high';
        result.title = result.title.replace(priorityMatch[0], '').trim();
    }

    // Extract #tags
    const tagMatches = text.match(/#(\w+)/g);
    if (tagMatches) {
        result.tags = tagMatches.map(t => t.substring(1));
        tagMatches.forEach(t => {
            result.title = result.title.replace(t, '').trim();
        });
    }

    // Extract dates
    const datePatterns = [
        { pattern: /\btoday\b/i, type: 'today', value: 'Today' },
        { pattern: /\btomorrow\b/i, type: 'upcoming', value: 'Tomorrow' },
        { pattern: /\bnext week\b/i, type: 'upcoming', value: 'Next Week' },
        { pattern: /\bnext month\b/i, type: 'upcoming', value: 'Next Month' },
        { pattern: /\beod\b/i, type: 'today', value: 'End of Day' },
        { pattern: /\basap\b/i, type: 'today', value: 'ASAP' },
        { pattern: /\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i, type: 'upcoming', value: null },
        { pattern: /\b(\d{1,2})(am|pm)\b/i, type: 'today', value: null },
        { pattern: /\b(\d{1,2}):(\d{2})\s*(am|pm)?\b/i, type: 'today', value: null },
        { pattern: /\bin (\d+) (day|days|week|weeks|month|months)\b/i, type: 'upcoming', value: null }
    ];

    for (const dp of datePatterns) {
        const match = text.match(dp.pattern);
        if (match) {
            result.date = dp.value || match[0];
            result.dateType = dp.type;
            result.title = result.title.replace(match[0], '').trim();
            break;
        }
    }

    // Clean up multiple spaces
    result.title = result.title.replace(/\s+/g, ' ').trim();

    return result;
}

// Update preview display
function updatePreview(parsed, previewEl) {
    if (!previewEl) return;

    let html = `<span class="parsed-title">${escapeHtml(parsed.title)}</span>`;

    if (parsed.context) {
        html += `<span class="parsed-context">@${parsed.context}</span>`;
    }

    if (parsed.priority) {
        html += `<span class="parsed-priority ${parsed.priority}">!${parsed.priority}</span>`;
    }

    parsed.tags.forEach(tag => {
        html += `<span class="parsed-tag">#${tag}</span>`;
    });

    if (parsed.date) {
        html += `<span class="parsed-date">${parsed.date}</span>`;
    }

    previewEl.innerHTML = html;
    previewEl.classList.add('active');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add task from Quick Capture
function addQuickCapture() {
    const input = document.getElementById('quickCaptureInput');
    const preview = document.getElementById('quickCapturePreview');

    if (!input || !input.value.trim()) return;

    const parsed = parseTaskInput(input.value.trim());

    // Determine which column the task should go to
    let column = 'inbox';
    if (parsed.dateType === 'today') {
        column = 'today';
    } else if (parsed.priority === 'high') {
        column = 'today';
    }

    // Create task object
    const task = {
        id: Date.now().toString(),
        title: parsed.title || input.value.trim(),
        context: parsed.context,
        priority: parsed.priority,
        tags: parsed.tags,
        date: parsed.date,
        dateType: parsed.dateType,
        column: column,
        completed: false,
        createdAt: new Date().toISOString()
    };

    // Add to tasks array
    demoTasks.unshift(task);

    // Save to localStorage
    saveDemoTasks();

    // Clear input and preview
    input.value = '';
    preview.classList.remove('active');
    preview.innerHTML = '';

    // Re-render tasks
    renderDemoTasks();

    // Show notification
    showNotification('Task added!', 'success');
}

// Save tasks to localStorage
function saveDemoTasks() {
    localStorage.setItem('hyperplanner_demo_tasks', JSON.stringify(demoTasks));
}

// Render demo tasks to panels
function renderDemoTasks() {
    const inboxTasks = document.getElementById('inboxTasks');
    const todayTasks = document.getElementById('todayTasks');
    const inProgressTasks = document.getElementById('inProgressTasks');
    const doneTasks = document.getElementById('doneTasks');

    if (!inboxTasks || !todayTasks || !inProgressTasks || !doneTasks) return;

    // Clear panels
    inboxTasks.innerHTML = '';
    todayTasks.innerHTML = '';
    inProgressTasks.innerHTML = '';
    doneTasks.innerHTML = '';

    // Sort tasks into panels based on column property
    const inbox = [];
    const today = [];
    const inProgress = [];
    const done = [];

    demoTasks.forEach(task => {
        if (task.column === 'done' || task.completed) {
            done.push(task);
        } else if (task.column === 'inprogress') {
            inProgress.push(task);
        } else if (task.column === 'today') {
            today.push(task);
        } else {
            inbox.push(task);
        }
    });

    // Render each panel
    inbox.forEach(task => inboxTasks.appendChild(createTaskCard(task)));
    today.forEach(task => todayTasks.appendChild(createTaskCard(task)));
    inProgress.forEach(task => inProgressTasks.appendChild(createTaskCard(task)));
    done.forEach(task => doneTasks.appendChild(createTaskCard(task)));

    // Update counts
    const inboxCountEl = document.getElementById('inboxCount');
    const todayCountEl = document.getElementById('todayCount');
    const inProgressCountEl = document.getElementById('inProgressCount');
    const doneCountEl = document.getElementById('doneCount');

    if (inboxCountEl) inboxCountEl.textContent = inbox.length;
    if (todayCountEl) todayCountEl.textContent = today.length;
    if (inProgressCountEl) inProgressCountEl.textContent = inProgress.length;
    if (doneCountEl) doneCountEl.textContent = done.length;
}

// Create task card element
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.id = task.id;

    let metaHtml = '';

    if (task.context) {
        metaHtml += `<span class="task-meta-item context">@${escapeHtml(task.context)}</span>`;
    }

    if (task.priority) {
        metaHtml += `<span class="task-meta-item priority-${task.priority}">!${task.priority}</span>`;
    }

    task.tags.forEach(tag => {
        metaHtml += `<span class="task-meta-item tag">#${escapeHtml(tag)}</span>`;
    });

    if (task.date) {
        metaHtml += `<span class="task-meta-item date">${escapeHtml(task.date)}</span>`;
    }

    card.innerHTML = `
        <div class="task-card-title">${escapeHtml(task.title)}</div>
        <div class="task-card-meta">${metaHtml}</div>
        <div class="task-card-actions">
            <button class="task-action-btn complete" onclick="completeTask('${task.id}')">Complete</button>
            <button class="task-action-btn delete" onclick="deleteTask('${task.id}')">Delete</button>
        </div>
    `;

    return card;
}

// Complete a task
function completeTask(taskId) {
    const task = demoTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        saveDemoTasks();
        renderDemoTasks();
        showNotification('Task completed!', 'success');
    }
}

// Delete a task
function deleteTask(taskId) {
    demoTasks = demoTasks.filter(t => t.id !== taskId);
    saveDemoTasks();
    renderDemoTasks();
    showNotification('Task deleted', 'info');
}

// Update demo button handlers
document.addEventListener('DOMContentLoaded', () => {
    // Update all demo buttons to open the demo app
    const demoBtns = document.querySelectorAll('.cta-demo, .cta-demo-main, .cta-demo-final, .demo-link');
    demoBtns.forEach(btn => {
        btn.removeEventListener('click', () => {});
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openDemoApp();
        });
    });

    // Close demo on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('demoAppOverlay');
            if (overlay && overlay.classList.contains('active')) {
                closeDemoApp();
            }
        }
    });
});

// Also update startDemo to open the demo app
function startDemoOriginal() {
    // Backup of original startDemo
}

// Override startDemo to launch demo app
const originalStartDemo = typeof startDemo === 'function' ? startDemo : null;
window.startDemo = function() {
    // Save welcome data
    localStorage.setItem('hyperplanner_welcome_data', JSON.stringify(welcomeData));
    localStorage.setItem('hyperplanner_welcome_complete', 'true');
    localStorage.setItem('hyperplanner_mode', 'demo');

    hideWelcomeScreen();

    // Open demo app instead of just showing notification
    setTimeout(() => {
        openDemoApp();
        // Load sample data if it's the first time
        if (!localStorage.getItem('hyperplanner_demo_initialized')) {
            loadSampleData();
            localStorage.setItem('hyperplanner_demo_initialized', 'true');
        }
    }, 300);
};

// ===================================
// Enhanced Demo App Functions
// ===================================

// Toggle Theme Lab Panel
function toggleThemePanel() {
    const themeLab = document.getElementById('demoThemeLab');
    if (themeLab) {
        themeLab.classList.toggle('active');
    }
}

// Apply Demo Theme
function applyDemoTheme(themeName) {
    const root = document.documentElement;
    const demoApp = document.querySelector('.demo-app');

    // Remove previous theme classes
    demoApp.classList.remove('theme-glassy', 'theme-midnight', 'theme-neon');

    switch(themeName) {
        case 'glassy':
            root.style.setProperty('--primary', '#6366f1');
            root.style.setProperty('--secondary', '#ec4899');
            root.style.setProperty('--bg-primary', '#0f0f1a');
            root.style.setProperty('--bg-secondary', '#1a1a2e');
            break;
        case 'midnight':
            root.style.setProperty('--primary', '#3b82f6');
            root.style.setProperty('--secondary', '#8b5cf6');
            root.style.setProperty('--bg-primary', '#000000');
            root.style.setProperty('--bg-secondary', '#0a0a0a');
            break;
        case 'neon':
            root.style.setProperty('--primary', '#a855f7');
            root.style.setProperty('--secondary', '#ec4899');
            root.style.setProperty('--bg-primary', '#0a0a0f');
            root.style.setProperty('--bg-secondary', '#12121a');
            break;
    }

    // Update active state on theme buttons
    document.querySelectorAll('.theme-preset').forEach(preset => {
        if (preset.dataset.theme === themeName) {
            preset.classList.add('active');
        } else {
            preset.classList.remove('active');
        }
    });

    demoApp.classList.add(`theme-${themeName}`);
    showNotification(`${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme applied!`, 'success');
}

// Adjust Demo Blur
function adjustDemoBlur(value) {
    const root = document.documentElement;
    root.style.setProperty('--blur-md', `${value}px`);
}

// Adjust Demo Radius
function adjustDemoRadius(value) {
    const root = document.documentElement;
    root.style.setProperty('--radius-md', `${value}px`);
    root.style.setProperty('--radius-lg', `${parseInt(value) + 4}px`);
}

// Adjust Demo Shadow
function adjustDemoShadow(value) {
    const root = document.documentElement;
    const shadows = [
        '0 2px 8px rgba(0, 0, 0, 0.2)',
        '0 4px 16px rgba(0, 0, 0, 0.4)',
        '0 8px 32px rgba(0, 0, 0, 0.5)',
        '0 16px 64px rgba(0, 0, 0, 0.6)'
    ];
    root.style.setProperty('--shadow-md', shadows[parseInt(value)]);
}

// Switch Demo View
function switchDemoView(viewName) {
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        if (btn.dataset.view === viewName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Update views
    document.querySelectorAll('.demo-view').forEach(view => {
        view.classList.remove('active');
    });

    const targetView = document.getElementById(`${viewName}View`);
    if (targetView) {
        targetView.classList.add('active');

        // Re-render tasks for the new view
        if (viewName === 'list') {
            renderListView();
        } else if (viewName === 'calendar') {
            renderCalendarView();
        }
    }
}

// Render List View
function renderListView() {
    const listContent = document.getElementById('listTasks');
    if (!listContent) return;

    listContent.innerHTML = '';

    // Get non-completed tasks
    const activeTasks = demoTasks.filter(t => !t.completed);

    activeTasks.forEach(task => {
        const card = createTaskCard(task);
        card.classList.add('list-task-card');
        listContent.appendChild(card);
    });
}

// Render Calendar View
function renderCalendarView() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    // Clear all day containers
    days.forEach(day => {
        const dayContainer = document.getElementById(`cal${day}`);
        if (dayContainer) {
            dayContainer.innerHTML = '';
        }
    });

    // For demo purposes, distribute tasks across the week
    const activeTasks = demoTasks.filter(t => !t.completed && t.dateType);

    activeTasks.forEach((task, index) => {
        const dayIndex = index % 5;
        const dayName = days[dayIndex];
        const dayContainer = document.getElementById(`cal${dayName}`);

        if (dayContainer) {
            const miniCard = document.createElement('div');
            miniCard.className = 'calendar-task-mini';
            miniCard.style.cssText = `
                font-size: 0.7rem;
                padding: 0.375rem 0.5rem;
                background: var(--glass);
                border: 1px solid var(--glass-border);
                border-radius: 4px;
                color: var(--text-secondary);
            `;
            miniCard.textContent = task.title.substring(0, 20) + (task.title.length > 20 ? '...' : '');
            if (task.priority === 'high') {
                miniCard.style.borderLeft = '3px solid #ef4444';
            }
            dayContainer.appendChild(miniCard);
        }
    });
}

// Load Sample Data
function loadSampleData() {
    const sampleTasks = [
        {
            id: Date.now() + '-1',
            title: 'Team standup meeting',
            context: 'work',
            priority: 'medium',
            tags: ['meeting'],
            date: 'Today 10am',
            dateType: 'today',
            column: 'today',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-2',
            title: 'Review Q1 goals and metrics',
            context: 'work',
            priority: 'high',
            tags: ['planning', 'review'],
            date: 'Tomorrow',
            dateType: 'upcoming',
            column: 'inbox',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-3',
            title: 'Finish design mockups for new feature',
            context: 'creative',
            priority: 'high',
            tags: ['design'],
            date: 'Today',
            dateType: 'today',
            column: 'inprogress',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-4',
            title: 'Gym session - leg day',
            context: 'personal',
            priority: 'low',
            tags: ['health', 'fitness'],
            date: 'Today 6pm',
            dateType: 'today',
            column: 'today',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-5',
            title: 'Read 30 pages of current book',
            context: 'personal',
            priority: 'low',
            tags: ['learning', 'reading'],
            date: null,
            dateType: null,
            column: 'inbox',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-6',
            title: 'Customize HyperPlanner theme',
            context: 'fun',
            priority: 'medium',
            tags: ['customize', 'theme'],
            date: null,
            dateType: null,
            column: 'inprogress',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: Date.now() + '-7',
            title: 'Prepared weekly review template',
            context: 'work',
            priority: null,
            tags: ['template'],
            date: 'Last week',
            dateType: null,
            column: 'done',
            completed: true,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: Date.now() + '-8',
            title: 'Code review for pull request #123',
            context: 'work',
            priority: 'high',
            tags: ['code', 'review'],
            date: 'Tomorrow',
            dateType: 'upcoming',
            column: 'today',
            completed: false,
            createdAt: new Date().toISOString()
        }
    ];

    demoTasks = sampleTasks;
    saveDemoTasks();
    renderDemoTasks();
    showNotification('Sample tasks loaded! Try dragging them between columns.', 'success');
}

// ===================================
// Smart Terms Autocomplete
// ===================================

const smartTerms = [
    // Context suggestions
    {term: "@work", category: "context", description: "Work tasks"},
    {term: "@personal", category: "context", description: "Personal tasks"},
    {term: "@home", category: "context", description: "Home tasks"},
    {term: "@gym", category: "context", description: "Fitness tasks"},
    {term: "@study", category: "context", description: "Study tasks"},
    {term: "@creative", category: "context", description: "Creative work"},
    {term: "@errand", category: "context", description: "Errands"},
    {term: "@focus", category: "context", description: "Deep work"},
    // Priority
    {term: "!high", category: "priority", description: "High priority"},
    {term: "!medium", category: "priority", description: "Medium priority"},
    {term: "!low", category: "priority", description: "Low priority"},
    {term: "!urgent", category: "priority", description: "Urgent priority"},
    // Tags
    {term: "#meeting", category: "tag", description: "Meeting tag"},
    {term: "#planning", category: "tag", description: "Planning tag"},
    {term: "#design", category: "tag", description: "Design tag"},
    {term: "#coding", category: "tag", description: "Coding tag"},
    {term: "#health", category: "tag", description: "Health tag"},
    {term: "#fitness", category: "tag", description: "Fitness tag"},
    {term: "#reading", category: "tag", description: "Reading tag"},
    // Time phrases
    {term: "today", category: "time", description: "Due today"},
    {term: "tomorrow", category: "time", description: "Due tomorrow"},
    {term: "next week", category: "time", description: "Due next week"},
    {term: "eod", category: "time", description: "End of day"},
    {term: "asap", category: "time", description: "As soon as possible"},
    {term: "this weekend", category: "time", description: "This weekend"}
];

let autocompleteActive = false;
let autocompleteIndex = -1;
let autocompleteSuggestions = [];

function initSmartAutocomplete() {
    const input = document.getElementById('quickCaptureInput');
    if (!input) return;

    // Create autocomplete dropdown
    const dropdown = document.createElement('div');
    dropdown.id = 'autocompleteDropdown';
    dropdown.className = 'autocomplete-dropdown';
    dropdown.style.display = 'none';
    input.parentElement.appendChild(dropdown);

    input.addEventListener('input', handleAutocompleteInput);
    input.addEventListener('keydown', handleAutocompleteKeydown);

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            hideAutocomplete();
        }
    });
}

function handleAutocompleteInput(e) {
    const input = e.target;
    const value = input.value;
    const cursorPos = input.selectionStart;

    // Get the word being typed
    const textBeforeCursor = value.substring(0, cursorPos);
    const match = textBeforeCursor.match(/[@!#][\w-]*$/);

    if (match) {
        const query = match[0];
        const prefix = query[0];
        const searchTerm = query.substring(1).toLowerCase();

        // Filter suggestions
        autocompleteSuggestions = smartTerms.filter(term => {
            const matchesPrefix = term.term.startsWith(prefix);
            const matchesSearch = term.term.toLowerCase().includes(searchTerm) ||
                                term.description.toLowerCase().includes(searchTerm);
            return matchesPrefix && matchesSearch;
        }).slice(0, 5);

        if (autocompleteSuggestions.length > 0) {
            showAutocomplete(autocompleteSuggestions, input);
            trackFeatureEngagement('smart_autocomplete_shown');
        } else {
            hideAutocomplete();
        }
    } else {
        hideAutocomplete();
    }
}

function handleAutocompleteKeydown(e) {
    if (!autocompleteActive) return;

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        autocompleteIndex = Math.min(autocompleteIndex + 1, autocompleteSuggestions.length - 1);
        updateAutocompleteHighlight();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        autocompleteIndex = Math.max(autocompleteIndex - 1, 0);
        updateAutocompleteHighlight();
    } else if (e.key === 'Enter' && autocompleteIndex >= 0) {
        e.preventDefault();
        selectAutocompleteSuggestion(autocompleteIndex);
    } else if (e.key === 'Escape') {
        hideAutocomplete();
    }
}

function showAutocomplete(suggestions, input) {
    const dropdown = document.getElementById('autocompleteDropdown');
    if (!dropdown) return;

    autocompleteActive = true;
    autocompleteIndex = 0;

    dropdown.innerHTML = suggestions.map((suggestion, index) => `
        <div class="autocomplete-item ${index === 0 ? 'highlighted' : ''}"
             data-index="${index}"
             onclick="selectAutocompleteSuggestion(${index})">
            <span class="autocomplete-term">${suggestion.term}</span>
            <span class="autocomplete-description">${suggestion.description}</span>
        </div>
    `).join('');

    dropdown.style.display = 'block';
}

function hideAutocomplete() {
    const dropdown = document.getElementById('autocompleteDropdown');
    if (dropdown) {
        dropdown.style.display = 'none';
        autocompleteActive = false;
        autocompleteIndex = -1;
    }
}

function updateAutocompleteHighlight() {
    const items = document.querySelectorAll('.autocomplete-item');
    items.forEach((item, index) => {
        if (index === autocompleteIndex) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}

function selectAutocompleteSuggestion(index) {
    const suggestion = autocompleteSuggestions[index];
    const input = document.getElementById('quickCaptureInput');

    if (!suggestion || !input) return;

    // Replace the partial term with the full suggestion
    const value = input.value;
    const cursorPos = input.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPos);
    const match = textBeforeCursor.match(/[@!#][\w-]*$/);

    if (match) {
        const beforeMatch = textBeforeCursor.substring(0, textBeforeCursor.length - match[0].length);
        const afterCursor = value.substring(cursorPos);
        input.value = beforeMatch + suggestion.term + ' ' + afterCursor;
        input.selectionStart = input.selectionEnd = beforeMatch.length + suggestion.term.length + 1;
    }

    hideAutocomplete();
    input.focus();
    trackFeatureEngagement('smart_autocomplete_used');

    // Trigger preview update
    input.dispatchEvent(new Event('input'));
}

// ===================================
// Drag and Drop Functionality
// ===================================

let draggedTask = null;
let draggedElement = null;

function initDragAndDrop() {
    // Will be called after tasks are rendered
    setupDraggableCards();
    setupDropZones();
}

function setupDraggableCards() {
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.setAttribute('draggable', 'true');
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
    });
}

function setupDropZones() {
    const panels = document.querySelectorAll('.demo-panel-content');
    panels.forEach(panel => {
        panel.addEventListener('dragover', handleDragOver);
        panel.addEventListener('drop', handleDrop);
        panel.addEventListener('dragenter', handleDragEnter);
        panel.addEventListener('dragleave', handleDragLeave);
    });
}

function handleDragStart(e) {
    draggedElement = e.target;
    draggedTask = demoTasks.find(t => t.id === e.target.dataset.id);

    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);

    trackFeatureEngagement('drag_started');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');

    // Remove all drag-over indicators
    document.querySelectorAll('.demo-panel-content').forEach(panel => {
        panel.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    if (e.currentTarget === e.target) {
        e.currentTarget.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    e.currentTarget.classList.remove('drag-over');

    if (!draggedTask) return false;

    // Determine which column was dropped into
    const panel = e.currentTarget.closest('.demo-panel');
    const newColumn = panel.dataset.column;

    if (newColumn && draggedTask.column !== newColumn) {
        // Update task column
        draggedTask.column = newColumn;

        // Mark as completed if dropped in done column
        if (newColumn === 'done') {
            draggedTask.completed = true;
        } else {
            draggedTask.completed = false;
        }

        saveDemoTasks();
        renderDemoTasks();
        initDragAndDrop(); // Re-init drag and drop

        showNotification(`Task moved to ${newColumn}!`, 'success');
        trackFeatureEngagement('drag_completed');
    }

    return false;
}

// ===================================
// Analytics Tracking
// ===================================

const analyticsData = {
    session_start: Date.now(),
    features_engaged: {},
    view_switches: 0,
    tasks_created: 0,
    tasks_completed: 0,
    theme_changes: 0,
    drag_and_drops: 0
};

function trackFeatureEngagement(featureName) {
    if (!analyticsData.features_engaged[featureName]) {
        analyticsData.features_engaged[featureName] = 0;
    }
    analyticsData.features_engaged[featureName]++;

    // Save to localStorage for demo persistence
    localStorage.setItem('hyperplanner_demo_analytics', JSON.stringify(analyticsData));
}

function logAnalytics() {
    console.log('📊 Demo Analytics:', analyticsData);
    console.log('⏱️ Session duration:', Math.round((Date.now() - analyticsData.session_start) / 1000), 'seconds');
    console.log('🎯 Most engaged feature:', getMostEngagedFeature());
}

function getMostEngagedFeature() {
    const features = analyticsData.features_engaged;
    let maxFeature = null;
    let maxCount = 0;

    for (const [feature, count] of Object.entries(features)) {
        if (count > maxCount) {
            maxCount = count;
            maxFeature = feature;
        }
    }

    return maxFeature || 'None';
}

// ===================================
// Interactive Tour
// ===================================

const tourSteps = [
    {
        element: '#quickCaptureInput',
        title: '✨ Smart Capture',
        message: 'Type naturally! Use @context, !priority, #tags, and dates like "tomorrow 2pm"',
        position: 'bottom'
    },
    {
        element: '.view-switcher',
        title: '📊 Multiple Views',
        message: 'Switch between Kanban, List, and Calendar views. Your choice, your way!',
        position: 'bottom'
    },
    {
        element: '.demo-theme-toggle',
        title: '🎨 Theme Lab',
        message: 'Customize everything! Click here to adjust colors, blur, shadows, and more.',
        position: 'left'
    },
    {
        element: '.demo-panel:first-child',
        title: '🔄 Drag & Drop',
        message: 'Drag tasks between columns to organize your work. It\'s that simple!',
        position: 'top'
    }
];

let currentTourStep = 0;
let tourActive = false;

function startTour() {
    if (localStorage.getItem('hyperplanner_tour_completed')) {
        return;
    }

    tourActive = true;
    currentTourStep = 0;
    showTourStep(0);
    trackFeatureEngagement('tour_started');
}

function showTourStep(stepIndex) {
    // Remove previous tooltip
    const existingTooltip = document.querySelector('.tour-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    if (stepIndex >= tourSteps.length) {
        endTour();
        return;
    }

    const step = tourSteps[stepIndex];
    const element = document.querySelector(step.element);

    if (!element) {
        // Skip to next step if element not found
        showTourStep(stepIndex + 1);
        return;
    }

    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tour-tooltip';
    tooltip.innerHTML = `
        <div class="tour-header">
            <h4>${step.title}</h4>
            <button class="tour-close" onclick="endTour()">×</button>
        </div>
        <p>${step.message}</p>
        <div class="tour-footer">
            <span class="tour-progress">${stepIndex + 1} / ${tourSteps.length}</span>
            <div class="tour-buttons">
                ${stepIndex > 0 ? '<button class="btn-tour-prev" onclick="prevTourStep()">← Back</button>' : ''}
                <button class="btn-tour-next" onclick="nextTourStep()">
                    ${stepIndex < tourSteps.length - 1 ? 'Next →' : 'Got it!'}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    positionTooltip(tooltip, element, step.position);

    // Highlight element
    element.classList.add('tour-highlight');

    // Remove highlight from previous elements
    document.querySelectorAll('.tour-highlight').forEach(el => {
        if (el !== element) {
            el.classList.remove('tour-highlight');
        }
    });
}

function positionTooltip(tooltip, element, position) {
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top, left;

    switch (position) {
        case 'bottom':
            top = rect.bottom + 10;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            break;
        case 'top':
            top = rect.top - tooltipRect.height - 10;
            left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
            break;
        case 'left':
            top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            left = rect.left - tooltipRect.width - 10;
            break;
        case 'right':
            top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
            left = rect.right + 10;
            break;
        default:
            top = rect.bottom + 10;
            left = rect.left;
    }

    // Keep tooltip on screen
    top = Math.max(10, Math.min(top, window.innerHeight - tooltipRect.height - 10));
    left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));

    tooltip.style.top = top + 'px';
    tooltip.style.left = left + 'px';
}

function nextTourStep() {
    currentTourStep++;
    if (currentTourStep >= tourSteps.length) {
        endTour();
    } else {
        showTourStep(currentTourStep);
    }
}

function prevTourStep() {
    currentTourStep = Math.max(0, currentTourStep - 1);
    showTourStep(currentTourStep);
}

function endTour() {
    tourActive = false;

    // Remove tooltip
    const tooltip = document.querySelector('.tour-tooltip');
    if (tooltip) {
        tooltip.remove();
    }

    // Remove all highlights
    document.querySelectorAll('.tour-highlight').forEach(el => {
        el.classList.remove('tour-highlight');
    });

    // Mark tour as completed
    localStorage.setItem('hyperplanner_tour_completed', 'true');
    trackFeatureEngagement('tour_completed');

    showNotification('🎉 Tour completed! Enjoy exploring HyperPlanner!', 'success');
}

// Update openDemoApp to initialize new features
const originalOpenDemoApp = openDemoApp;
window.openDemoApp = function() {
    originalOpenDemoApp();

    // Initialize new features after a short delay
    setTimeout(() => {
        initSmartAutocomplete();
        initDragAndDrop();

        // Start tour if first time
        setTimeout(() => startTour(), 1000);

        trackFeatureEngagement('demo_opened');
    }, 300);
};

// Override renderDemoTasks to re-init drag and drop
const originalRenderDemoTasks = renderDemoTasks;
window.renderDemoTasks = function() {
    originalRenderDemoTasks();
    // Re-initialize drag and drop after rendering
    setTimeout(() => initDragAndDrop(), 100);
};

// Track view switches
const originalSwitchDemoView = switchDemoView;
window.switchDemoView = function(viewName) {
    originalSwitchDemoView(viewName);
    analyticsData.view_switches++;
    trackFeatureEngagement(`view_switched_${viewName}`);
};

// Track theme changes
const originalApplyDemoTheme = applyDemoTheme;
window.applyDemoTheme = function(themeName) {
    originalApplyDemoTheme(themeName);
    analyticsData.theme_changes++;
    trackFeatureEngagement(`theme_changed_${themeName}`);
};

// Track task creation
const originalAddQuickCapture = addQuickCapture;
window.addQuickCapture = function() {
    originalAddQuickCapture();
    analyticsData.tasks_created++;
    trackFeatureEngagement('task_created');
};

// Track task completion
const originalCompleteTask = completeTask;
window.completeTask = function(taskId) {
    originalCompleteTask(taskId);
    analyticsData.tasks_completed++;
    trackFeatureEngagement('task_completed');
};

// Log analytics on demo close
const originalCloseDemoApp = closeDemoApp;
window.closeDemoApp = function() {
    logAnalytics();
    originalCloseDemoApp();
};
