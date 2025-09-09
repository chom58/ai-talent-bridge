// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    
    // Toggle mobile menu
    if (mobileMenuToggle && mobileNavOverlay) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNavOverlay.classList.toggle('active');
            document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === this) {
                mobileMenuToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Handle language switcher in mobile menu
    const mobileLangBtns = mobileNavOverlay?.querySelectorAll('.lang-btn');
    mobileLangBtns?.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            // Sync with main language switcher
            document.querySelectorAll('.lang-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.lang === lang);
            });
            // Trigger language change
            if (window.changeLanguage) {
                window.changeLanguage(lang);
            }
        });
    });
    
    // Smooth scroll adjustment for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hide floating CTA when form is visible on mobile
    if (window.innerWidth <= 768) {
        const floatingCTA = document.querySelector('.floating-cta');
        const registerForm = document.querySelector('#register');
        
        if (floatingCTA && registerForm) {
            window.addEventListener('scroll', function() {
                const formRect = registerForm.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (formRect.top < windowHeight && formRect.bottom > 0) {
                    floatingCTA.style.display = 'none';
                } else {
                    floatingCTA.style.display = 'block';
                }
            });
        }
    }
    
    // Responsive image lazy loading
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});