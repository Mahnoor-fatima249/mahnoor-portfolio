// ============================================
// PROFESSIONAL PORTFOLIO - INTERACTIVE JS
// ============================================

// ---------- SPLASH SCREEN ----------
function setupSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const splashParticles = document.getElementById('splashParticles');
    if (!splash) return;

    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'splash-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.animationDuration = (Math.random() * 2 + 2) + 's';
        const size = Math.random() * 3 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        splashParticles.appendChild(p);
    }

    setTimeout(() => {
        splash.classList.add('hide');
        document.body.style.overflow = 'auto';
        setTimeout(() => splash.remove(), 700);
    }, 3200);
}

// ---------- TYPING EFFECT ----------
const typingPhrases = [
    "Agentic AI Developer",
    "Backend Engineer",
    "LLM & RAG Specialist",
    "Hackathon Team Lead",
    "Building AI Products"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typingText');

function typeEffect() {
    if (!typingElement) return;
    const currentPhrase = typingPhrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

// ---------- WELCOME SCREEN ----------
function openPortfolio(event) {
    event.preventDefault();
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.classList.add('fade-out');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
    }, 700);
}

// ---------- HAMBURGER MENU ----------
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ---------- THEME TOGGLE ----------
function toggleTheme() {
    const html = document.documentElement;
    const btn = document.querySelector('.theme-toggle-btn');
    const icon = document.getElementById('theme-icon');
    html.classList.add('theme-transitioning');
    btn.classList.add('theme-spin');

    setTimeout(() => {
        if (html.getAttribute('data-theme') === 'dark') {
            html.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('portfolio-theme', 'light');
        } else {
            html.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('portfolio-theme', 'dark');
        }
        btn.classList.remove('theme-spin');
        setTimeout(() => html.classList.remove('theme-transitioning'), 500);
    }, 200);
}

function loadTheme() {
    const saved = localStorage.getItem('portfolio-theme') || 'light';
    const icon = document.getElementById('theme-icon');
    document.documentElement.setAttribute('data-theme', saved);
    if (saved === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ---------- SCROLL REVEAL ----------
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- NAV SCROLL EFFECT ----------
function setupNavScroll() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// ---------- ACTIVE NAV LINK ----------
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navBtns = document.querySelectorAll('.nav-btn');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === '#' + current) {
                btn.classList.add('active');
            }
        });
    });
}

// ---------- SCROLL TO TOP ----------
function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// ---------- BACKGROUND PARTICLES ----------
function createParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('bg-particle');
        const size = Math.random() * 150 + 40;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 25 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        container.appendChild(particle);
    }
}

// ---------- SMOOTH SCROLL FOR ALL ANCHORS ----------
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ---------- MOUSE BLUR EFFECT ----------
function setupMouseBlur() {
    const blur = document.getElementById('mouseBlur');
    if (!blur) return;

    document.addEventListener('mousemove', (e) => {
        blur.style.left = e.clientX + 'px';
        blur.style.top = e.clientY + 'px';
        blur.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        blur.classList.remove('active');
    });
}

// ---------- SCROLL PROGRESS BAR ----------
function setupScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

// ---------- 3D TILT EFFECT ----------
function setupTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ---------- INTERACTIVE TIMELINE ----------
function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const desc = item.querySelector('.timeline-desc');

        if (!content || !desc) return;

        content.style.cursor = 'pointer';
        desc.style.maxHeight = '0';
        desc.style.overflow = 'hidden';
        desc.style.transition = 'max-height 0.4s ease, margin 0.4s ease';
        desc.style.marginTop = '0';

        content.addEventListener('click', () => {
            const isOpen = desc.style.maxHeight !== '0px' && desc.style.maxHeight !== '';

            timelineItems.forEach(otherItem => {
                const otherDesc = otherItem.querySelector('.timeline-desc');
                if (otherDesc && otherItem !== item) {
                    otherDesc.style.maxHeight = '0px';
                    otherDesc.style.marginTop = '0';
                    otherItem.querySelector('.timeline-content')?.classList.remove('active');
                }
            });

            if (isOpen) {
                desc.style.maxHeight = '0px';
                desc.style.marginTop = '0';
                content.classList.remove('active');
            } else {
                desc.style.maxHeight = desc.scrollHeight + 'px';
                desc.style.marginTop = '8px';
                content.classList.add('active');
            }
        });
    });

    const firstItem = document.querySelector('.timeline-item .timeline-desc');
    if (firstItem) {
        firstItem.style.maxHeight = firstItem.scrollHeight + 'px';
        firstItem.style.marginTop = '8px';
        firstItem.closest('.timeline-content')?.classList.add('active');
    }
}

// ---------- KONAMI CODE EASTER EGG ----------
function setupKonamiCode() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function showEasterEgg() {
    const overlay = document.createElement('div');
    overlay.className = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="easter-egg-card">
            <div class="easter-egg-emoji">🎮</div>
            <h2>Konami Code Activated!</h2>
            <p>You found the secret! You're a true explorer.</p>
            <button onclick="this.closest('.easter-egg-overlay').remove()" class="action-btn primary-btn">Close</button>
        </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('active'), 10);
}

// ---------- PARALLAX SCROLLING ----------
function setupParallax() {
    const orbs = document.querySelectorAll('.bg-orb');
    const heroGlow = document.querySelector('.hero-glow');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.03;
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });

        if (heroGlow) {
            heroGlow.style.transform = `translate(${scrollY * 0.02}px, ${scrollY * 0.05}px)`;
        }
    });
}

// ---------- CUSTOM CURSOR ----------
function setupCustomCursor() {
    if (window.innerWidth < 768) return;

    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .tilt-card, .timeline-content, .skill-tag');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-expand');
            cursorDot.classList.add('cursor-dot-expand');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-expand');
            cursorDot.classList.remove('cursor-dot-expand');
        });
    });
}

// ---------- STAGGER REVEAL ----------
function setupStaggerReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('stagger-visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stagger-item').forEach(el => observer.observe(el));
}

// ---------- MAGNETIC BUTTONS ----------
function setupMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// ---------- SCROLL COLOR SHIFT ----------
function setupScrollColorShift() {
    const sections = document.querySelectorAll('section[id]');
    const root = document.documentElement;

    const colorSchemes = {
        'about': { accent: '#0288d1', light: '#0ea5e9', dark: '#0277bd' },
        'education': { accent: '#7c3aed', light: '#8b5cf6', dark: '#6d28d9' },
        'skills': { accent: '#059669', light: '#10b981', dark: '#047857' },
        'services': { accent: '#d97706', light: '#f59e0b', dark: '#b45309' },
        'experience': { accent: '#dc2626', light: '#ef4444', dark: '#b91c1c' },
        'projects': { accent: '#0288d1', light: '#0ea5e9', dark: '#0277bd' },
        'leetcode': { accent: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
        'testimonials': { accent: '#8b5cf6', light: '#a78bfa', dark: '#7c3aed' },
        'achievements': { accent: '#f59e0b', light: '#fbbf24', dark: '#d97706' },
        'certifications': { accent: '#06b6d4', light: '#22d3ee', dark: '#0891b2' },
        'contact': { accent: '#0288d1', light: '#0ea5e9', dark: '#0277bd' }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                const colors = colorSchemes[sectionId];
                if (colors) {
                    root.style.setProperty('--accent', colors.accent);
                    root.style.setProperty('--accent-light', colors.light);
                    root.style.setProperty('--accent-dark', colors.dark);
                    root.style.setProperty('--accent-glow', colors.accent + '14');
                    root.style.setProperty('--accent-glow-strong', colors.accent + '2e');
                }
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// ---------- CARD FLIP ----------
function setupCardFlip() {
    const flipCards = document.querySelectorAll('.flip-card');

    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ---------- TEXT SCRAMBLE ----------
function setupTextScramble() {
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    scrambleElements.forEach(el => {
        const originalText = el.textContent;
        let isScrambling = false;

        el.addEventListener('mouseenter', () => {
            if (isScrambling) return;
            isScrambling = true;
            let iterations = 0;
            const maxIterations = originalText.length * 2;

            const interval = setInterval(() => {
                el.textContent = originalText.split('').map((char, index) => {
                    if (index < iterations / 2) return originalText[index];
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');

                iterations++;
                if (iterations >= maxIterations) {
                    clearInterval(interval);
                    el.textContent = originalText;
                    isScrambling = false;
                }
            }, 30);
        });
    });
}

// ---------- CLICK PARTICLES ----------
function setupClickParticles() {
    document.addEventListener('click', (e) => {
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.left = e.clientX + 'px';
            particle.style.top = e.clientY + 'px';
            particle.style.setProperty('--angle', (i * 45) + 'deg');
            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    });
}

// ---------- SECTION ACTIVE INDICATOR ----------
function setupSectionIndicator() {
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-active');
            } else {
                entry.target.classList.remove('section-active');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));
}

// ---------- MOUSE TRAIL ----------
function setupMouseTrail() {
    if (window.innerWidth < 768) return;
    let lastX = 0, lastY = 0;
    let trailTimeout;

    document.addEventListener('mousemove', (e) => {
        clearTimeout(trailTimeout);
        trailTimeout = setTimeout(() => {
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 8) {
                createTrailParticle(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }, 16);
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-trail-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    const hue = Math.random() * 40 + 190;
    particle.style.background = `hsl(${hue}, 80%, 60%)`;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 600);
}

// ---------- TYPING ON SCROLL ----------
function setupTypingOnScroll() {
    const headers = document.querySelectorAll('.typing-header');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                typeHeader(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    headers.forEach(h => observer.observe(h));
}

function typeHeader(el) {
    const text = el.dataset.text || el.textContent;
    el.textContent = '';
    el.style.visibility = 'visible';
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    el.appendChild(cursor);

    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            el.insertBefore(document.createTextNode(text[i]), cursor);
            i++;
        } else {
            clearInterval(interval);
            setTimeout(() => cursor.remove(), 1500);
        }
    }, 50);
}

// ---------- DYNAMIC PAGE TITLE ----------
function setupDynamicTitle() {
    const sections = document.querySelectorAll('section[id]');
    const baseTitle = 'Mahnoor Fatima | AI & Backend Engineer';
    const sectionTitles = {
        'about': '👋 Hi, I\'m Mahnoor',
        'education': '🎓 Education',
        'skills': '⚡ Skills & Tech Stack',
        'services': '💼 What I Do',
        'experience': '🚀 Experience',
        'projects': '📂 Projects',
        'leetcode': '💻 LeetCode Progress',
        'testimonials': '💬 Recommendations',
        'achievements': '🏆 Achievements',
        'certifications': '📜 Certifications',
        'contact': '📬 Get In Touch'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.title = sectionTitles[id] || baseTitle;
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
}

// ---------- FLOATING QUICK NAV ----------
function setupFloatingNav() {
    const floatingNav = document.getElementById('floatingNav');
    if (!floatingNav) return;

    const sections = document.querySelectorAll('section[id]');
    const dots = floatingNav.querySelectorAll('.floating-nav-dot');

    function updateNav() {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let currentId = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                currentId = section.getAttribute('id');
            }
        });

        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === currentId);
        });

        floatingNav.classList.toggle('visible', window.scrollY > 400);
    }

    window.addEventListener('scroll', updateNav);
    updateNav();
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// ---------- KEYBOARD NAVIGATION ----------
function setupKeyboardNav() {
    const sections = document.querySelectorAll('section[id]');
    const sectionIds = Array.from(sections).map(s => s.id);

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        const scrollY = window.scrollY + window.innerHeight / 3;
        let currentIndex = 0;

        sections.forEach((s, i) => {
            if (scrollY >= s.offsetTop) currentIndex = i;
        });

        if (e.key === 'ArrowDown' || e.key === 'j') {
            e.preventDefault();
            const next = Math.min(currentIndex + 1, sectionIds.length - 1);
            document.getElementById(sectionIds[next]).scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' || e.key === 'k') {
            e.preventDefault();
            const prev = Math.max(currentIndex - 1, 0);
            document.getElementById(sectionIds[prev]).scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ---------- SMOOTH COUNTER WITH COMMAS ----------
function setupCounters() {
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        element.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ---------- SECTION TYPING HEADERS ----------
function setupSectionHeaders() {
    const headers = document.querySelectorAll('.section-typing-header');
    if (!headers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.dataset.text || entry.target.textContent;
                entry.target.textContent = '';
                entry.target.style.visibility = 'visible';

                const cursor = document.createElement('span');
                cursor.className = 'typing-cursor';
                entry.target.appendChild(cursor);

                let i = 0;
                const interval = setInterval(() => {
                    if (i < text.length) {
                        entry.target.insertBefore(document.createTextNode(text[i]), cursor);
                        i++;
                    } else {
                        clearInterval(interval);
                        setTimeout(() => cursor.style.display = 'none', 1200);
                    }
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    headers.forEach(h => {
        h.style.visibility = 'hidden';
        observer.observe(h);
    });
}

// ---------- SKILL RINGS ANIMATION ----------
function setupSkillRings() {
    const rings = document.querySelectorAll('.skill-ring-fill');
    if (!rings.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    rings.forEach(ring => observer.observe(ring));
}

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';

    setupSplashScreen();
    loadTheme();
    typeEffect();
    createParticles();
    setupScrollReveal();
    setupCounters();
    setupNavScroll();
    setupActiveNav();
    setupScrollTop();
    setupSmoothScroll();
    setupMouseBlur();
    setupScrollProgress();
    setupTiltEffect();
    setupTimeline();
    setupKonamiCode();
    setupParallax();
    setupCustomCursor();
    setupStaggerReveal();
    setupMagneticButtons();
    setupScrollColorShift();
    setupCardFlip();
    setupTextScramble();
    setupClickParticles();
    setupSectionIndicator();
    setupMouseTrail();
    setupTypingOnScroll();
    setupDynamicTitle();
    setupFloatingNav();
    setupKeyboardNav();
    setupSectionHeaders();
    setupSkillRings();
    
    // New features
    setupChatbot();
    setupKeyboardShortcuts();
    setupGSAPAnimations();
    setupSkillsTreeAnimation();
});

// ============================================
// AI CHATBOT WIDGET
// ============================================
function setupChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const window_ = document.getElementById('chatbotWindow');
    const close = document.getElementById('chatbotClose');
    const input = document.getElementById('chatbotInput');
    const send = document.getElementById('chatbotSend');
    const messages = document.getElementById('chatbotMessages');
    const suggestions = document.querySelectorAll('.chatbot-suggestion');

    if (!toggle || !window_) return;

    const responses = {
        skills: "Mahnoor is skilled in:\n\n Python (90%) | Django (80%) | FastAPI (85%)\n React (75%) | AI/LLM (85%) | Docker (70%)\n\nShe also knows JavaScript, Java, C++, and has strong DSA fundamentals!",
        projects: "Mahnoor has built 42+ projects including:\n\n AI Study Assistant - LLM-powered learning\n AI Agentic Dev - Autonomous AI workflows\n PAK Job Finder - Job portal\n AI News Platform - Smart news app\n\nCheck out the Projects section for more!",
        experience: "Mahnoor's experience:\n\n Current: Backend Developer @ NexeAgent\n Technical Director @ WICS\n Team Lead @ National Hackathons\n Intern @ TEYZIX CORE & DecodeLabs\n\nShe's a proven leader with 3+ internships!",
        contact: "You can reach Mahnoor through:\n\n LinkedIn: mahnoor-fatima-529b91301\n GitHub: Mahnoor-fatima249\n Instagram: @mahnoor_backend\n\nOr use the Contact form on this portfolio!",
        education: "Mahnoor is pursuing:\n\n BSIT at Virtual University of Pakistan\n Currently in 6th Semester\n HEC GenAI Top Performer (96.08%!)\n\nShe's focused on software engineering and AI!",
        default: "I can tell you about Mahnoor's skills, projects, experience, education, or how to contact her. Just click a suggestion or type your question!"
    };

    function toggleChat() {
        window_.classList.toggle('active');
        if (window_.classList.contains('active')) {
            input.focus();
        }
    }

    function addMessage(text, isUser = false) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        msgDiv.innerHTML = `
            <div class="chatbot-msg-avatar"><i class="fas fa-${isUser ? 'user' : 'robot'}"></i></div>
            <div class="chatbot-msg-content"><p>${text.replace(/\n/g, '<br>')}</p></div>
        `;
        messages.appendChild(msgDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleResponse(question) {
        const lower = question.toLowerCase();
        let response = responses.default;

        if (lower.includes('skill') || lower.includes('technology') || lower.includes('know')) {
            response = responses.skills;
        } else if (lower.includes('project') || lower.includes('work') || lower.includes('built')) {
            response = responses.projects;
        } else if (lower.includes('experience') || lower.includes('job') || lower.includes('intern')) {
            response = responses.experience;
        } else if (lower.includes('contact') || lower.includes('reach') || lower.includes('email') || lower.includes('linkedin')) {
            response = responses.contact;
        } else if (lower.includes('education') || lower.includes('study') || lower.includes('university')) {
            response = responses.education;
        }

        setTimeout(() => addMessage(response), 500);
    }

    toggle.addEventListener('click', toggleChat);
    close.addEventListener('click', toggleChat);

    send.addEventListener('click', () => {
        const text = input.value.trim();
        if (text) {
            addMessage(text, true);
            input.value = '';
            handleResponse(text);
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            send.click();
        }
    });

    suggestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            addMessage(question, true);
            handleResponse(question);
        });
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
function setupKeyboardShortcuts() {
    const modal = document.getElementById('shortcutsModal');

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key) {
            case '?':
                e.preventDefault();
                modal.classList.toggle('active');
                break;
            case 't':
            case 'T':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    toggleTheme();
                }
                break;
            case 'g':
            case 'G':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    window.open('https://github.com/Mahnoor-fatima249', '_blank');
                }
                break;
            case 'c':
            case 'C':
                if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    scrollToSection('contact');
                }
                break;
            case 'Escape':
                modal.classList.remove('active');
                document.getElementById('chatbotWindow')?.classList.remove('active');
                break;
        }
    });
}

// ============================================
// GSAP SCROLL ANIMATIONS
// ============================================
function setupGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.container').forEach((section, i) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.05,
            ease: 'power3.out'
        });
    });

    // Animate skill tags
    gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag,
                start: 'top 90%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.03,
            ease: 'back.out(1.7)'
        });
    });

    // Animate project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Animate timeline items
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%'
            },
            x: -50,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Animate stat boxes
    gsap.utils.toArray('.stat-box').forEach((box, i) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: 'top 90%'
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            ease: 'power2.out'
        });
    });

    // Parallax for background orbs
    gsap.utils.toArray('.bg-orb').forEach((orb, i) => {
        gsap.to(orb, {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: (i + 1) * 100,
            ease: 'none'
        });
    });

    // Hero section animations
    gsap.from('.hero-badge', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 3.5
    });

    gsap.from('.hero-title', {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 3.7
    });

    gsap.from('.tagline', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 3.9
    });

    gsap.from('.hero-desc', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 4.1
    });

    gsap.from('.hero-actions', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 4.3
    });

    gsap.from('.hero-image-box', {
        x: 100,
        opacity: 0,
        duration: 0.8,
        delay: 4,
        ease: 'power3.out'
    });
}

// ============================================
// SKILLS TREE ANIMATION
// ============================================
function setupSkillsTreeAnimation() {
    const tree = document.querySelector('.skills-tree');
    if (!tree) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tree.classList.add('animated');
                animateTreeNodes();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(tree);
}

function animateTreeNodes() {
    const branches = document.querySelectorAll('.tree-branch');
    const center = document.querySelector('.tree-center-node');

    if (typeof gsap !== 'undefined') {
        gsap.from(center, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)'
        });

        branches.forEach((branch, i) => {
            gsap.from(branch, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                delay: 0.3 + (i * 0.15),
                ease: 'power3.out'
            });
        });
    }
}

// ---------- DYNAMIC PAGE TITLE ----------
function setupDynamicTitle() {
    const sections = document.querySelectorAll('section[id]');
    const baseTitle = 'Mahnoor Fatima | AI & Backend Engineer';
    const sectionTitles = {
        'about': '👋 Hi, I\'m Mahnoor',
        'education': '🎓 Education',
        'skills': '⚡ Skills & Tech Stack',
        'services': '💼 What I Do',
        'experience': '🚀 Experience',
        'projects': '📂 Projects',
        'github-stats': '📊 GitHub Activity',
        'leetcode': '💻 LeetCode Progress',
        'testimonials': '💬 Recommendations',
        'blog': '📝 Tech Blog',
        'achievements': '🏆 Achievements',
        'certifications': '📜 Certifications',
        'contact': '📬 Get In Touch'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.title = sectionTitles[id] || baseTitle;
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(s => observer.observe(s));
}
