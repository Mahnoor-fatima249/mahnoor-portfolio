// ============================================
// PROFESSIONAL PORTFOLIO - CLEAN JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Splash screen first
    setupSplashScreen();
    
    // Basic setup
    loadTheme();
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
    setupCardFlip();
    setupSkillRings();
    setupFloatingNav();
    setupChatbot();
    setupGSAPAnimations();
    typeEffect();
    fetchGitHubStats();
});

// ---------- SPLASH SCREEN ----------
function setupSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const particles = document.getElementById('splashParticles');
    if (!splash) return;

    // Create particles
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.className = 'splash-particle';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 3 + 's';
        p.style.animationDuration = (Math.random() * 2 + 2) + 's';
        const size = Math.random() * 3 + 1;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        particles.appendChild(p);
    }

    // Hide splash after 3 seconds
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

function typeEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;
    const current = typingPhrases[phraseIndex];
    if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        el.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    let speed = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === current.length) {
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
    const ws = document.getElementById('welcome-screen');
    ws.classList.add('fade-out');
    document.body.style.overflow = 'auto';
    setTimeout(() => ws.style.display = 'none', 700);
}

// ---------- THEME TOGGLE ----------
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
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
}

function loadTheme() {
    const saved = localStorage.getItem('portfolio-theme') || 'light';
    const icon = document.getElementById('theme-icon');
    document.documentElement.setAttribute('data-theme', saved);
    if (saved === 'dark' && icon) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ---------- HAMBURGER MENU ----------
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function closeMenu() {
    document.getElementById('navLinks').classList.remove('active');
    document.querySelector('.hamburger').classList.remove('active');
}

// ---------- SCROLL REVEAL ----------
function setupScrollReveal() {
    // First make elements animatable (hidden)
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('animate-init'));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- NAV SCROLL ----------
function setupNavScroll() {
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ---------- ACTIVE NAV ----------
function setupActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navBtns = document.querySelectorAll('.nav-btn');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });
        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('href') === '#' + current);
        });
    });
}

// ---------- SCROLL TO TOP ----------
function setupScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
}

// ---------- SMOOTH SCROLL ----------
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
}

// ---------- MOUSE BLUR ----------
function setupMouseBlur() {
    const blur = document.getElementById('mouseBlur');
    if (!blur) return;
    document.addEventListener('mousemove', (e) => {
        blur.style.left = e.clientX + 'px';
        blur.style.top = e.clientY + 'px';
        blur.classList.add('active');
    });
    document.addEventListener('mouseleave', () => blur.classList.remove('active'));
}

// ---------- SCROLL PROGRESS ----------
function setupScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = progress + '%';
    });
}

// ---------- TILT EFFECT ----------
function setupTiltEffect() {
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / 15;
            const y = (rect.height / 2 - (e.clientY - rect.top)) / 15;
            card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

// ---------- CARD FLIP ----------
function setupCardFlip() {
    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
}

// ---------- COUNTERS ----------
function setupCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.counter').forEach(c => observer.observe(c));
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '+';
    const duration = 2000;
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(progress * target).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ---------- BACKGROUND PARTICLES ----------
function createParticles() {
    const container = document.getElementById('bgParticles');
    if (!container) return;
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.classList.add('bg-particle');
        const size = Math.random() * 120 + 30;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = (Math.random() * 20 + 15) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        container.appendChild(p);
    }
}

// ---------- SKILL RINGS ----------
function setupSkillRings() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skill-ring-fill').forEach(ring => observer.observe(ring));
}

// ---------- FLOATING NAV ----------
function setupFloatingNav() {
    const nav = document.getElementById('floatingNav');
    if (!nav) return;
    const sections = document.querySelectorAll('section[id]');
    const dots = nav.querySelectorAll('.floating-nav-dot');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + window.innerHeight / 3;
        let currentId = '';
        sections.forEach(s => { if (scrollY >= s.offsetTop) currentId = s.id; });
        dots.forEach(d => d.classList.toggle('active', d.dataset.section === currentId));
        nav.classList.toggle('visible', window.scrollY > 400);
    });
}

// ---------- GSAP ANIMATIONS ----------
function setupGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    try {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray('.container').forEach((section, i) => {
            gsap.from(section, {
                scrollTrigger: { trigger: section, start: 'top 95%' },
                y: 20, duration: 0.5, delay: i * 0.03, ease: 'power2.out'
            });
        });
    } catch(e) {}
}

// ---------- AI CHATBOT ----------
function setupChatbot() {
    const toggle = document.getElementById('chatbotToggle');
    const win = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const input = document.getElementById('chatbotInput');
    const send = document.getElementById('chatbotSend');
    const messages = document.getElementById('chatbotMessages');

    if (!toggle || !win) return;

    const responses = {
        skills: "Mahnoor is skilled in:\n\n Python (90%) | Django (80%) | FastAPI (85%)\n React (75%) | AI/LLM (85%) | Docker (70%)\n\nShe also knows JavaScript, Java, C++, and has strong DSA fundamentals!",
        projects: "Mahnoor has built 42+ projects including:\n\n AI Study Assistant - LLM-powered learning\n AI Agentic Dev - Autonomous AI workflows\n PAK Job Finder - Job portal\n AI News Platform - Smart news app\n\nCheck out the Projects section for more!",
        experience: "Mahnoor's experience:\n\n Current: Backend Developer @ NexeAgent\n Technical Director @ WICS\n Team Lead @ National Hackathons\n Intern @ TEYZIX CORE & DecodeLabs\n\nShe's a proven leader with 3+ internships!",
        contact: "You can reach Mahnoor through:\n\n LinkedIn: mahnoor-fatima-529b91301\n GitHub: Mahnoor-fatima249\n Instagram: @mahnoor_backend\n\nOr use the Contact form on this portfolio!",
        education: "Mahnoor is pursuing:\n\n BSIT at Virtual University of Pakistan\n Currently in 6th Semester\n HEC GenAI Top Performer (96.08%!)\n\nShe's focused on software engineering and AI!",
        default: "Ask me about Mahnoor's skills, projects, experience, education, or contact info!"
    };

    toggle.addEventListener('click', () => {
        win.classList.toggle('active');
        if (win.classList.contains('active')) input.focus();
    });

    closeBtn.addEventListener('click', () => win.classList.remove('active'));

    function addMessage(text, isUser) {
        const div = document.createElement('div');
        div.className = 'chatbot-message ' + (isUser ? 'user' : 'bot');
        div.innerHTML = '<div class="chatbot-msg-avatar"><i class="fas fa-' + (isUser ? 'user' : 'robot') + '"></i></div><div class="chatbot-msg-content"><p>' + text.replace(/\n/g, '<br>') + '</p></div>';
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    function handleResponse(q) {
        const l = q.toLowerCase();
        let r = responses.default;
        if (l.includes('skill') || l.includes('know') || l.includes('technology')) r = responses.skills;
        else if (l.includes('project') || l.includes('work') || l.includes('built')) r = responses.projects;
        else if (l.includes('experience') || l.includes('job') || l.includes('intern')) r = responses.experience;
        else if (l.includes('contact') || l.includes('reach') || l.includes('linkedin')) r = responses.contact;
        else if (l.includes('education') || l.includes('study') || l.includes('university')) r = responses.education;
        setTimeout(() => addMessage(r, false), 400);
    }

    send.addEventListener('click', () => {
        const t = input.value.trim();
        if (t) { addMessage(t, true); input.value = ''; handleResponse(t); }
    });

    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') send.click(); });

    document.querySelectorAll('.chatbot-suggestion').forEach(btn => {
        btn.addEventListener('click', () => {
            addMessage(btn.dataset.question, true);
            handleResponse(btn.dataset.question);
        });
    });
}

// ---------- LIVE GITHUB STATS ----------
function fetchGitHubStats() {
    const followersEl = document.getElementById('gh-followers');
    const followingEl = document.getElementById('gh-following');
    
    // Show skeleton loading
    if (followersEl) followersEl.classList.remove('loaded');
    if (followingEl) followingEl.classList.remove('loaded');
    
    fetch('https://api.github.com/users/Mahnoor-fatima249')
        .then(res => res.json())
        .then(data => {
            if (followersEl) {
                followersEl.textContent = data.followers || '--';
                followersEl.classList.add('loaded');
            }
            if (followingEl) {
                followingEl.textContent = data.following || '--';
                followingEl.classList.add('loaded');
            }
        })
        .catch(() => {
            if (followersEl) followersEl.classList.add('loaded');
            if (followingEl) followingEl.classList.add('loaded');
        });
}
