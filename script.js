// Portfolio Script - Modern Developer Portfolio

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeIcon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Toggle theme on click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', newTheme);
    });
    
    // ===== TYPING ANIMATION =====
    const typingText = document.getElementById('typing-text');
    const texts = ["Mehdi Idrissi Kaitouni", "Développeur", "Créatif", "Passionné"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex++;
            if (textIndex === texts.length) textIndex = 0;
            setTimeout(type, 500);
        } else {
            const typingSpeed = isDeleting ? 50 : 100;
            const speedVariation = Math.random() * 50;
            setTimeout(type, typingSpeed + speedVariation);
        }
    }
    
    setTimeout(type, 1000);
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        // Navbar background on scroll
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
            navbar.style.padding = '20px 0';
        }
        
        // Active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 300) {
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
    
    // ===== MOBILE MENU TOGGLE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ===== SKILLS ANIMATION =====
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = `${width}%`;
        });
    }
    
    // Animate skills when they come into view
    const skillsSection = document.getElementById('skills');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);
    
    // ===== PROJECTS FILTER =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';

            const response = await fetch('https://formsubmit.co/ajax/mehdi.idrissi.kaitouni83@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Echec envoi formulaire');
            }

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
            submitBtn.style.backgroundColor = '#4CAF50';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        } catch (error) {
            submitBtn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> Erreur, réessayez';
            submitBtn.style.backgroundColor = '#E74C3C';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
    
    // ===== FLOATING ELEMENTS ANIMATION =====
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        // Randomize animation delay and duration
        const randomDelay = Math.random() * 5;
        const randomDuration = 6 + Math.random() * 4;
        
        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;
    });
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    const scrollRevealOptions = {
        distance: '50px',
        origin: 'bottom',
        duration: 1000,
        delay: 200,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        interval: 200
    };
    
    // Apply scroll reveal to elements
    function applyScrollReveal() {
        const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .project-card, .skill-category, .about-content, .contact-info');
        
        revealElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            const elementObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        elementObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            elementObserver.observe(element);
        });
    }
    
    // Initialize scroll reveal after page load
    setTimeout(applyScrollReveal, 500);
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== INITIALIZE ANIMATIONS =====
    // Add some initial animation to hero elements
    const heroElements = document.querySelectorAll('.hero-subtitle, .hero-title, .hero-role, .hero-desc, .hero-buttons, .hero-stats');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 150));
    });
});