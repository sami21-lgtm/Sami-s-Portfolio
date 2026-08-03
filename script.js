document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. Theme Switcher (Dark Emerald <-> Spider-Man Red Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById("themeToggle");
    const htmlElem = document.documentElement;

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            if (htmlElem.classList.contains("spider-mode")) {
                htmlElem.classList.remove("spider-mode");
                htmlElem.classList.add("dark");
                localStorage.setItem("theme", "dark");
            } else {
                htmlElem.classList.remove("dark");
                htmlElem.classList.add("spider-mode");
                localStorage.setItem("theme", "spider");
            }
        });
    }

    // ==========================================
    // 2. Mobile Navigation Menu Toggle
    // ==========================================
    const mobileBtn = document.getElementById("mobileBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mLinks = document.querySelectorAll(".m-link");

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.contains("opacity-100");
            
            if (isOpen) {
                mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
                mobileMenu.classList.add("opacity-0", "pointer-events-none");
            } else {
                mobileMenu.classList.remove("opacity-0", "pointer-events-none");
                mobileMenu.classList.add("opacity-100", "pointer-events-auto");
            }
        });

        mLinks.forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("opacity-100", "pointer-events-auto");
                mobileMenu.classList.add("opacity-0", "pointer-events-none");
            });
        });
    }

    // ==========================================
    // 3. Dynamic Glow Mouse Cursor Tracking
    // ==========================================
    const cursorDot = document.getElementById("cursorDot");
    const cursorRing = document.getElementById("cursorRing");

    if (cursorDot && cursorRing) {
        window.addEventListener("mousemove", (e) => {
            const clientX = e.clientX;
            const clientY = e.clientY;

            cursorDot.style.transform = `translate(${clientX - 4}px, ${clientY - 4}px)`;
            cursorRing.style.transform = `translate(${clientX - 18}px, ${clientY - 18}px)`;
        });
    }

    // ==========================================
    // 4. Hero Section Typing Effect Animation
    // ==========================================
    const typedTextSpan = document.getElementById("typed-text");
    const roles = [
        "Software Engineering Student",
        "Full Stack Web Developer",
        "Competitive Programmer (157+ Solves)",
        "Robotics Enthusiast"
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedTextSpan) return;

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
            typeSpeed = 2000; // Pause at end of text
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before typing next string
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ==========================================
    // 5. Interactive Web Shooting Animation Effect
    // ==========================================
    const interactiveSpidey = document.getElementById("interactiveSpidey");
    const webShot = document.getElementById("webShot");

    if (interactiveSpidey && webShot) {
        interactiveSpidey.addEventListener("click", () => {
            webShot.classList.add("active");
            
            setTimeout(() => {
                webShot.classList.remove("active");
            }, 500);
        });
    }

    // ==========================================
    // 6. Scroll Reveal Observer
    // ==========================================
    const reveals = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 50;

            if (elementTop < windowHeight - elementVisible) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger initial check

    // ==========================================
    // 7. Interactive Glow Card Mouse Tracking
    // ==========================================
    const glowCards = document.querySelectorAll(".glow-card");

    glowCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // ==========================================
    // 8. Contact Form Handling
    // ==========================================
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent successfully.");
            contactForm.reset();
        });
    }
});
