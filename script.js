document.addEventListener("DOMContentLoaded", () => {
    // 1. Dynamic Cursor
    const cursorDot = document.getElementById("cursorDot");
    const cursorRing = document.getElementById("cursorRing");
    if (cursorDot && cursorRing) {
        window.addEventListener("mousemove", (e) => {
            cursorDot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            cursorRing.style.transform = `translate(${e.clientX - 18}px, ${e.clientY - 18}px)`;
        });
    }

    // 2. Typing Effect
    const typedTextSpan = document.getElementById("typed-text");
    const roles = [
        "Full Stack Web Developer",
        "Competitive Programmer (157+ Solves)",
        "Software Engineering Student",
        "Hardware & Robotics Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
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
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 3. Theme Toggle
    const themeToggleBtn = document.getElementById("themeToggle");
    themeToggleBtn?.addEventListener("click", () => {
        if (document.documentElement.classList.contains("dark")) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
    });

    // 4. Mobile Menu Toggle
    const mobileBtn = document.getElementById("mobileBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mLinks = document.querySelectorAll(".m-link");

    mobileBtn?.addEventListener("click", () => {
        const isOpen = !mobileMenu.classList.contains("opacity-0");
        if (isOpen) {
            mobileMenu.classList.add("opacity-0", "pointer-events-none");
        } else {
            mobileMenu.classList.remove("opacity-0", "pointer-events-none");
        }
    });

    mLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu?.classList.add("opacity-0", "pointer-events-none");
        });
    });

    // 5. Scroll Reveal
    const reveals = document.querySelectorAll(".reveal");
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 50) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // 6. Card Mouse Glow Effect
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

    // 7. Project Filter
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => {
                b.classList.remove("active", "bg-red-600", "text-white");
                b.classList.add("border", "border-neutral-300", "dark:border-neutral-800", "text-neutral-600", "dark:text-neutral-400");
            });

            btn.classList.add("active", "bg-red-600", "text-white");
            btn.classList.remove("border", "border-neutral-300", "dark:border-neutral-800", "text-neutral-600", "dark:text-neutral-400");

            const filter = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || filter === category) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 8. Random Dev Quote Generator
    const quotes = [
        { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { quote: "Experience is the name everyone gives to their mistakes.", author: "Oscar Wilde" },
        { quote: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
        { quote: "Make it work, make it right, make it fast.", author: "Kent Beck" },
        { quote: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" }
    ];

    const quoteBtn = document.getElementById("new-quote-btn");
    const quoteText = document.getElementById("quote-text");
    const quoteAuthor = document.getElementById("quote-author");

    quoteBtn?.addEventListener("click", () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        if (quoteText && quoteAuthor) {
            quoteText.style.opacity = "0";
            quoteAuthor.style.opacity = "0";
            setTimeout(() => {
                quoteText.textContent = `"${quotes[randomIndex].quote}"`;
                quoteAuthor.textContent = `— ${quotes[randomIndex].author}`;
                quoteText.style.opacity = "1";
                quoteAuthor.style.opacity = "1";
            }, 200);
        }
    });

    // 9. Contact Form Toast
    const contactForm = document.getElementById("contactForm");
    const toast = document.getElementById("toast");

    contactForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        if (toast) {
            toast.classList.add("show");
            contactForm.reset();
            setTimeout(() => {
                toast.classList.remove("show");
            }, 4000);
        }
    });
});
