// 1. Dynamic Typing Text Effect
const phrases = [
    "Front-End Developer",
    "Competitive Programmer",
    "Software Engineering Student",
    "Robotics Enthusiast"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextSpan = document.getElementById("typed-text");

function typeEffect() {
    if (!typedTextSpan) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

// 2. Interactive Radial Glow Following Mouse on Cards
document.querySelectorAll(".glow-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    });
});

// 3. Custom Follow Cursor
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");

if (dot && ring) {
    window.addEventListener("mousemove", e => {
        dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        ring.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
    });
}

// 4. Scroll Reveal via IntersectionObserver
const observerOptions = { threshold: 0.15 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// 5. Navbar Sticky Shrink & Active Highlight
const nav = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        nav.classList.add('bg-neutral-950/95', 'backdrop-blur-xl', 'border-b', 'border-neutral-800', 'h-16');
        nav.classList.remove('h-20');
    } else {
        nav.classList.remove('bg-neutral-950/95', 'backdrop-blur-xl', 'border-b', 'border-neutral-800', 'h-16');
        nav.classList.add('h-20');
    }

    let currentSection = '';
    sections.forEach(s => {
        const top = s.offsetTop;
        if (pageYOffset >= top - 180) {
            currentSection = s.getAttribute('id');
        }
    });

    navLinks.forEach(l => {
        l.classList.remove('active', 'text-emerald-400');
        if (l.getAttribute('href') === `#${currentSection}`) {
            l.classList.add('active', 'text-emerald-400');
        }
    });
});

// 6. Mobile Menu Logic
const mBtn = document.getElementById('mobileBtn');
const mMenu = document.getElementById('mobileMenu');
const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');
const mLinks = document.querySelectorAll('.m-link');

function toggleMenu() {
    if (mMenu.classList.contains('opacity-0')) {
        mMenu.classList.remove('opacity-0', 'pointer-events-none');
        mMenu.classList.add('opacity-100', 'pointer-events-auto');
        l1.style.transform = 'rotate(45deg) translate(5px, 5px)';
        l2.style.opacity = '0';
        l3.style.transform = 'rotate(-45deg) translate(4px, -5px)';
        l3.style.width = '1.5rem';
        document.body.style.overflow = 'hidden';
    } else {
        mMenu.classList.add('opacity-0', 'pointer-events-none');
        mMenu.classList.remove('opacity-100', 'pointer-events-auto');
        l1.style.transform = '';
        l2.style.opacity = '1';
        l3.style.transform = '';
        l3.style.width = '1rem';
        document.body.style.overflow = '';
    }
}

if (mBtn) mBtn.addEventListener('click', toggleMenu);
mLinks.forEach(l => l.addEventListener('click', () => { if (!mMenu.classList.contains('opacity-0')) toggleMenu(); }));

// 7. Project Filtering System
const fBtns = document.querySelectorAll('.filter-btn');
const pItems = document.querySelectorAll('#projectsGrid > div');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => {
            b.classList.remove('bg-emerald-500', 'text-neutral-950');
            b.classList.add('text-neutral-400');
        });
        btn.classList.add('bg-emerald-500', 'text-neutral-950');

        const filter = btn.dataset.filter;
        pItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'flex';
                setTimeout(() => item.style.opacity = '1', 50);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// 8. Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        e.target.reset();
        setTimeout(() => toast.classList.remove('show'), 4000);
    });
}
