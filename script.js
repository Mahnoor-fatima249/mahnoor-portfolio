// ============================================
// PROFESSIONAL PORTFOLIO - INTERACTIVE JS
// ============================================

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
    const icon = document.getElementById('theme-icon');
    html.classList.add('theme-transitioning');

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

    setTimeout(() => html.classList.remove('theme-transitioning'), 600);
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

// ---------- COUNTER ANIMATION ----------
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

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
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

// ---------- INITIALIZE ----------
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';

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
});
