// Cursor Follow Effect
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

if (dot && ring) {
    document.addEventListener('mousemove', e => {
        dot.style.transform = `translate3d(${e.clientX - 4}px, ${e.clientY - 4}px, 0)`;
        ring.style.transform = `translate3d(${e.clientX - 18}px, ${e.clientY - 18}px, 0)`;
    });
}

// Navbar Scroll Effect & Active Highlight
const nav = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('bg-neutral-950/95', 'backdrop-blur-lg', 'border-b', 'border-neutral-800', 'h-16');
        nav.classList.remove('h-20');
    } else {
        nav.classList.remove('bg-neutral-950/95', 'backdrop-blur-lg', 'border-b', 'border-neutral-800', 'h-16');
        nav.classList.add('h-20');
    }
    
    let cur = '';
    sections.forEach(s => {
        const top = s.offsetTop;
        if (pageYOffset >= top - 160) {
            cur = s.getAttribute('id');
        }
    });
    
    navLinks.forEach(l => {
        l.classList.remove('active', 'text-red-500');
        if (l.getAttribute('href') === `#${cur}`) {
            l.classList.add('active', 'text-red-500');
        }
    });
});

// Scroll Reveal Trigger
const reveals = document.querySelectorAll('.reveal, .reveal-right');
function checkReveal() {
    reveals.forEach(r => {
        const t = r.getBoundingClientRect().top;
        if (t < window.innerHeight - 80) {
            r.classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

// Mobile Menu Toggle
const mBtn = document.getElementById('mobileBtn');
const mMenu = document.getElementById('mobileMenu');
const l1 = document.getElementById('l1');
const l2 = document.getElementById('l2');
const l3 = document.getElementById('l3');

if (mBtn) {
    mBtn.addEventListener('click', () => {
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
    });
}

// Project Category Filtering
const fBtns = document.querySelectorAll('.filter-btn');
const pItems = document.querySelectorAll('#projectsGrid > div');

fBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        fBtns.forEach(b => {
            b.classList.remove('bg-red-600', 'text-white');
            b.classList.add('text-neutral-400');
        });
        btn.classList.add('bg-red-600', 'text-white');
        
        const f = btn.dataset.filter;
        pItems.forEach(it => {
            const cat = it.dataset.category;
            if (f === 'all' || cat === f) {
                it.style.display = 'flex';
                setTimeout(() => it.style.opacity = '1', 50);
            } else {
                it.style.opacity = '0';
                setTimeout(() => it.style.display = 'none', 300);
            }
        });
    });
});

// Form Submission Notification
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
