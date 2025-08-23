document.addEventListener("DOMContentLoaded", () => {
    console.log("Portfolio loaded successfully.");
    
    // Only initialize cursor and rain effects on non-touch devices
      if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
        initCustomCursor();
    } else {
        // Remove cursor elements if they exist
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursor) cursor.remove();
        if (cursorFollower) cursorFollower.remove();
    }

    const loadSplineScene = () => {
        const script = document.createElement('script');
        script.src = 'https://prod.spline.design/Xn87K2bzQCsNM9e0/scene.splinecode';
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            const app = new Spline.Application();
            app.start(document.getElementById('spline-container'));
        };
    };
    
    // Only load on larger screens (optional)
    if (window.innerWidth > 768) {
        loadSplineScene();
    }

    createRain();


    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }
    
    // Intersection Observer for skill bars
    const skillsSection = document.querySelector('.skills-section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Animate stats counter
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
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
    
    // Intersection Observer for stats
    const aboutSection = document.querySelector('.about-section');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just show an alert
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let isActive = false;
    let isClicking = false;
    let isHidden = false;
    
    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Animate follower with smooth delay
    function animateFollower() {
        // Calculate follower position with delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        // Apply positions
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    // Start animation
    animateFollower();
    
    // Hover effects
    const hoverElements = document.querySelectorAll(
        'a, button, .portfolio-item, .menu-toggle, input, textarea, [data-cursor-hover]'
    );
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-active');
            cursorFollower.classList.add('cursor-follower-active');
            isActive = true;
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-active');
            cursorFollower.classList.remove('cursor-follower-active');
            isActive = false;
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        isClicking = true;
        cursor.classList.add('cursor-click');
        cursorFollower.classList.add('cursor-follower-click');
    });
    
    document.addEventListener('mouseup', () => {
        isClicking = false;
        cursor.classList.remove('cursor-click');
        cursorFollower.classList.remove('cursor-follower-click');
    });
    
    // Hide cursor when not moving
    let timeout;
    document.addEventListener('mousemove', () => {
        // Show cursor if hidden
        if (isHidden) {
            cursor.classList.remove('cursor-hidden');
            cursorFollower.classList.remove('cursor-follower-hidden');
            isHidden = false;
        }
        
        // Clear previous timeout
        clearTimeout(timeout);
        
        // Hide cursor after inactivity
        timeout = setTimeout(() => {
            if (!isActive && !isClicking) {
                cursor.classList.add('cursor-hidden');
                cursorFollower.classList.add('cursor-follower-hidden');
                isHidden = true;
            }
        }, 1500);
    });
}

function createRain() {
    console.log('Creating rain effect...');
    
    const rainContainer = document.querySelector('.gotham-rain');
    
    function generateRaindrop() {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        
        // Random properties
        const left = Math.random() * 100;
        const width = Math.random() * 1.5 + 0.5; // Slightly thicker raindrops
        const height = Math.random() * 25 + 15; // Longer raindrops
        const delay = Math.random() * 5;
        const duration = Math.random() * 0.5 + 0.5;
        const opacity = Math.random() * 0.5 + 0.3; // More visible
        const angle = Math.random() * 20 - 10;
        const speed = Math.random() * 0.5 + 0.5;
        
        // Apply styles
        raindrop.style.cssText = `
            left: ${left}vw;
            width: ${width}px;
            height: ${height}px;
            animation-delay: ${delay}s;
            animation-duration: ${speed}s;
            opacity: ${opacity};
            transform: rotate(${angle}deg);
            background: linear-gradient(to bottom, transparent, rgba(220, 220, 220, 0.8));
        `;
        
        rainContainer.appendChild(raindrop);
        
        // Remove after animation
        setTimeout(() => {
            if (raindrop.parentNode) {
                raindrop.remove();
            }
        }, (speed + delay) * 1000);
    }

    // Initial rain - more dense
    for (let i = 0; i < 150; i++) {
        generateRaindrop();
    }

    // Continuous rain with random intervals
    function addRaindrop() {
        if (document.querySelectorAll('.raindrop').length < 250) {
            generateRaindrop();
        }
        setTimeout(addRaindrop, Math.random() * 50 + 30); // Faster rain generation
    }
    
    addRaindrop();
    
    console.log('Rain effect created successfully');
}

// In the DOMContentLoaded event, update the smooth scrolling for all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
});