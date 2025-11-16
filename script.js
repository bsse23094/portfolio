document.addEventListener("DOMContentLoaded", () => {
    console.log("Minimal Portfolio loaded");
    createParticles();
    initFloatingNav();
    initTypingAnimation();
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: "smooth"
                });
                if (navMenu && navMenu.classList.contains("active")) {
                    menuToggle.classList.remove("active");
                    navMenu.classList.remove("active");
                }
            }
        });
    });
    const skillBars = document.querySelectorAll(".skill-progress");
    const skillsSection = document.querySelector(".skills-section");
    if (skillsSection) {
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        bar.style.width = bar.getAttribute("data-width") + "%";
                    });
                }
            });
        }, {threshold: 0.2}).observe(skillsSection);
    }
    const statNumbers = document.querySelectorAll(".stat-number");
    const aboutSection = document.querySelector(".about-section");
    if (aboutSection) {
        new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(number => {
                        const target = parseInt(number.getAttribute("data-count"));
                        let current = 0;
                        const step = target / 120;
                        const counter = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                clearInterval(counter);
                                current = target;
                            }
                            number.textContent = Math.floor(current);
                        }, 16);
                    });
                }
            });
        }, {threshold: 0.2}).observe(aboutSection);
    }
    initScrollProgress();
});
function createParticles() {
    const container = document.querySelector(".particles-container");
    if (!container) return;
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        const left = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        particle.style.cssText = `left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s`;
        container.appendChild(particle);
    }
}
function initFloatingNav() {
    const nav = document.querySelector(".floating-nav");
    if (!nav) return;
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 100 && currentScroll > lastScroll) {
            nav.classList.add("contracted");
        } else if (currentScroll < lastScroll) {
            nav.classList.remove("contracted");
        }
        lastScroll = currentScroll;
    });
}
function initTypingAnimation() {
    const roles = [
        "Frontend Developer",
        "Full Stack Developer",
        "UX/UI Designer",
        "Creative Developer"
    ];
    const typingElement = document.querySelector(".typing-text");
    if (!typingElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}
function initScrollProgress() {
    const progressBar = document.querySelector(".scroll-progress-bar");
    if (!progressBar) return;
    window.addEventListener("scroll", () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + "%";
    });
}
