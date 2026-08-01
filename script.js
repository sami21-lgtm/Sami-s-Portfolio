document.addEventListener('DOMContentLoaded', () => {
    // 1. Typing Animation
    const typedTextSpan = document.getElementById('typed-text');
    const roles = [
        "Software Engineer",
        "Competitive Programmer",
        "Full-Stack Web Developer",
        "Robotics Hardware Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }
    if (typedTextSpan) typeEffect();

    // 2. Theme Switcher Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. Custom Interactive Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (window.innerWidth >= 1024 && cursorDot && cursorRing) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.transform = `translate3d(${posX - 4}px, ${posY - 4}px, 0)`;
            cursorRing.style.transform = `translate3d(${posX - 18}px, ${posY - 18}px, 0)`;
        });
    }

    // 4. Glow-card Mouse Tracking Effect
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 5. Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => revealObserver.observe(el));

    // 6. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mLinks = document.querySelectorAll('.m-link');
    const l1 = document.getElementById('l1');
    const l2 = document.getElementById('l2');
    const l3 = document.getElementById('l3');

    let menuOpen = false;
    function toggleMobileMenu() {
        menuOpen = !menuOpen;
        if (menuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            l1.style.transform = 'rotate(45deg) translate(5px, 5px)';
            l2.style.opacity = '0';
            l3.style.transform = 'rotate(-45deg) translate(3px, -4px)';
            l3.style.width = '1.5rem';
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            l1.style.transform = 'none';
            l2.style.opacity = '1';
            l3.style.transform = 'none';
            l3.style.width = '1rem';
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);
    mLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));

    // 7. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 8. Projects Filter Buttons Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-emerald-500', 'text-neutral-950', 'active');
                b.classList.add('border', 'border-neutral-300', 'dark:border-neutral-800', 'text-neutral-600', 'dark:text-neutral-400');
            });
            btn.classList.add('bg-emerald-500', 'text-neutral-950', 'active');
            btn.classList.remove('border', 'border-neutral-300', 'dark:border-neutral-800', 'text-neutral-600', 'dark:text-neutral-400');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 9. Dynamic Random Dev Quote Generator (3rd Image Feature)
    const devQuotes = [
        { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
        { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { quote: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra font-mono" },
        { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { quote: "Software is a great combination between artistry and engineering.", author: "Bill Gates" }
    ];

    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');

    function getRandomQuote() {
        if (!quoteText || !quoteAuthor) return;
        const randomIndex = Math.floor(Math.random() * devQuotes.length);
        const selected = devQuotes[randomIndex];

        quoteText.style.opacity = '0';
        quoteAuthor.style.opacity = '0';

        setTimeout(() => {
            quoteText.textContent = `"${selected.quote}"`;
            quoteAuthor.textContent = `— ${selected.author}`;
            quoteText.style.opacity = '1';
            quoteAuthor.style.opacity = '1';
        }, 200);
    }

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', getRandomQuote);
    }

    // 10. Contact Form Handling with Toast Notification
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.reset();

            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3500);
        });
    }
});
