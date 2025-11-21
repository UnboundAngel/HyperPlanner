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
            document.title = '👋 Come back to HyperPlanner!';
            // Change favicon to waving hand emoji
            favicon.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👋</text></svg>";
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
