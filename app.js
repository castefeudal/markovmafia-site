document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    
    // Modal functionality
    const modal = document.getElementById('contactModal');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const closeModal = document.getElementById('closeModal');
    const modalBackdrop = document.querySelector('.modal__backdrop');

    console.log('Modal elements:', { modal, ctaButtons: ctaButtons.length, closeModal, modalBackdrop });

    // Open modal function
    function openModal() {
        console.log('Opening modal...');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close modal function
    function hideModal() {
        console.log('Closing modal...');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // Bind events to CTA buttons
    ctaButtons.forEach((button, index) => {
        console.log(`Binding event to button ${index}:`, button);
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('CTA button clicked');
            openModal();
        });
    });

    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                hideModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.section-title, .about__text, .principles, .service-card, .brand-card, .contact__text');
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Enhanced hover effects for cards
    const serviceCards = document.querySelectorAll('.service-card');
    const brandCards = document.querySelectorAll('.brand-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    brandCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn--primary');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px)';
        });
    });

    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero__content');
        
        if (hero && heroContent && scrolled < hero.offsetHeight) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Add typing effect to hero title
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
        const originalText = heroName.textContent;
        heroName.textContent = '';
        heroName.style.opacity = '1';
        
        let i = 0;
        const typeSpeed = 100;
        
        function typeWriter() {
            if (i < originalText.length) {
                heroName.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add glowing effect to important elements
    const glowElements = document.querySelectorAll('.hero__name, .section-title');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 20px rgba(50, 184, 198, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)';
            this.style.transition = 'text-shadow 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
        });
    });

    // Smooth scroll for any internal links
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });

    // Add loading effect
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate hero elements on load
        const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .btn--primary');
        heroElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'all 0.6s ease-out';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 1500 + (index * 200));
        });
    });

    // Add dynamic background particles effect
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 2px;
            height: 2px;
            background: rgba(50, 184, 198, 0.2);
            pointer-events: none;
            border-radius: 50%;
            z-index: 1;
        `;
        
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0px)', opacity: 0.8 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: 4000 + Math.random() * 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            if (particle && particle.parentNode) {
                particle.remove();
            }
        };
    }
    
    // Create particles periodically
    setInterval(createParticle, 500);

    console.log('App initialization complete');
});