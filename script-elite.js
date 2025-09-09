// AI Talent Bridge Elite JavaScript - Minimal & Clean

class AITalentBridgeElite {
    constructor() {
        this.init();
    }

    init() {
        // Loading screen
        this.initLoadingScreen();
        
        // Initialize components after DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            this.initComponents();
        }
    }

    initComponents() {
        // Particle canvas disabled for performance
        // this.initParticleCanvas();
        this.initScrollAnimations();
        this.initCountUp();
        this.initFAQ();
        this.initScrollTop();
        this.initSmoothScroll();
    }

    // Loading Screen
    initLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                    setTimeout(() => loadingScreen.remove(), 500);
                }
            }, 800);
        });
    }

    // Disabled Particle Canvas for Performance
    initParticleCanvas() {
        // Completely disabled to improve performance
        // Canvas animation was causing performance issues
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }

    // Simplified Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Only observe section titles for lighter animation
        const animatedElements = document.querySelectorAll(
            '.section-title, .section-subtitle'
        );
        
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Count Up Animation - Optimized
    initCountUp() {
        const counters = document.querySelectorAll('.count-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 1500; // Reduced duration
                    const start = Date.now();
                    const increment = target / 30; // Fewer updates
                    
                    const updateCounter = () => {
                        const now = Date.now();
                        const progress = Math.min((now - start) / duration, 1);
                        const current = Math.floor(progress * target);
                        
                        entry.target.textContent = current;
                        
                        if (progress < 1) {
                            setTimeout(updateCounter, 50); // Use setTimeout instead of RAF
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    
                    updateCounter();
                }
            });
        }, { rootMargin: '50px' }); // Add margin for earlier loading
        
        counters.forEach(counter => observer.observe(counter));
    }

    // FAQ Accordion
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const isActive = item.classList.contains('active');
                question.setAttribute('aria-expanded', isActive);
            });
        });
    }

    // Scroll to Top
    initScrollTop() {
        const scrollBtn = document.querySelector('.scroll-top');
        if (!scrollBtn) return;

        // Show/hide based on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll for Anchor Links
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Initialize the application
const app = new AITalentBridgeElite();

// Profile Modal Functions
function toggleProfile(member) {
    const modal = document.getElementById('profileModal');
    const profileDetails = modal.querySelectorAll('.profile-detail');
    
    // Hide all profiles
    profileDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show selected profile
    const selectedProfile = document.getElementById(`profile-${member}`);
    if (selectedProfile) {
        selectedProfile.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
    }
}

function closeProfile() {
    const modal = document.getElementById('profileModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
    
    // Hide all profiles
    const profileDetails = modal.querySelectorAll('.profile-detail');
    profileDetails.forEach(detail => {
        detail.classList.remove('active');
    });
}

// ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProfile();
    }
});