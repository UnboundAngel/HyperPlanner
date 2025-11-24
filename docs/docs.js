// ===================================
// HyperPlanner Documentation JavaScript
// Shared functionality for all doc pages
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // ===================================
    // FAQ Accordion
    // ===================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isOpen = item.classList.contains('open');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('open');
            });

            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });

    // ===================================
    // Smooth Scroll for In-Page Anchors ONLY
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only handle actual in-page anchors, not placeholder "#" links
            if (href && href.length > 1 && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Update URL hash without jumping
                    history.pushState(null, null, href);
                }
            }
        });
    });

    // ===================================
    // Active Section Highlighting
    // ===================================
    const sections = document.querySelectorAll('.doc-section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');

    function updateActiveSection() {
        if (sections.length === 0) return;

        let currentSection = '';
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // ===================================
    // Mobile Sidebar Toggle
    // ===================================
    const sidebar = document.querySelector('.doc-sidebar');

    // Create mobile toggle button if sidebar exists
    if (sidebar) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'sidebar-mobile-toggle';
        toggleBtn.innerHTML = '☰ Menu';
        toggleBtn.style.cssText = `
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            z-index: 1001;
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
        `;
        document.body.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            toggleBtn.innerHTML = sidebar.classList.contains('mobile-open') ? '✕ Close' : '☰ Menu';
        });

        // Show toggle on mobile
        function checkMobile() {
            if (window.innerWidth <= 1024) {
                toggleBtn.style.display = 'block';
            } else {
                toggleBtn.style.display = 'none';
                sidebar.classList.remove('mobile-open');
            }
        }

        window.addEventListener('resize', checkMobile);
        checkMobile();

        // Close sidebar when clicking a link on mobile
        sidebar.querySelectorAll('.sidebar-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    sidebar.classList.remove('mobile-open');
                    toggleBtn.innerHTML = '☰ Menu';
                }
            });
        });
    }

    // ===================================
    // Code Block Copy Button
    // ===================================
    document.querySelectorAll('.code-block').forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'code-copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            padding: 4px 12px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            color: rgba(255, 255, 255, 0.7);
            font-size: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
        `;

        block.style.position = 'relative';
        block.appendChild(copyBtn);

        copyBtn.addEventListener('click', async () => {
            const code = block.querySelector('code')?.textContent || block.textContent;
            try {
                await navigator.clipboard.writeText(code.trim());
                copyBtn.textContent = 'Copied!';
                copyBtn.style.background = 'rgba(16, 185, 129, 0.3)';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                    copyBtn.style.background = 'rgba(255, 255, 255, 0.1)';
                }, 2000);
            } catch (err) {
                copyBtn.textContent = 'Failed';
            }
        });
    });

    // ===================================
    // Search Functionality (if search input exists)
    // ===================================
    const searchInput = document.querySelector('.doc-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sidebarLinks = document.querySelectorAll('.sidebar-link');

            sidebarLinks.forEach(link => {
                const text = link.textContent.toLowerCase();
                if (text.includes(query) || query === '') {
                    link.style.display = '';
                } else {
                    link.style.display = 'none';
                }
            });
        });
    }

    // ===================================
    // Print Functionality
    // ===================================
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // ===================================
    // Keyboard Navigation
    // ===================================
    document.addEventListener('keydown', (e) => {
        // Escape to close mobile sidebar
        if (e.key === 'Escape' && sidebar?.classList.contains('mobile-open')) {
            sidebar.classList.remove('mobile-open');
        }

        // / to focus search
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            const search = document.querySelector('.doc-search');
            if (search && document.activeElement !== search) {
                e.preventDefault();
                search.focus();
            }
        }
    });

    // ===================================
    // Lazy Load Images
    // ===================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('HyperPlanner Docs initialized');
});

// Add mobile sidebar styles dynamically
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 1024px) {
        .doc-sidebar {
            position: fixed;
            left: -300px;
            top: 80px;
            bottom: 0;
            width: 280px;
            transition: left 0.3s ease;
            z-index: 1000;
        }

        .doc-sidebar.mobile-open {
            left: 0;
            box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
        }
    }
`;
document.head.appendChild(mobileStyles);
