// AI Talent Bridge - Job Seeker Platform JS
// Lightweight performance-optimized script

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation and submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                field.addEventListener('input', function() {
                    this.classList.remove('error');
                }, { once: true });
            }
        });
        
        if (!isValid) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // Show success message
        const button = this.querySelector('.btn-submit');
        const originalContent = button.innerHTML;
        button.innerHTML = '<span class="btn-icon">✅</span><span class="btn-text"><span class="btn-main">登録完了！</span></span>';
        button.disabled = true;
        
        // Reset after 3 seconds
        setTimeout(() => {
            button.innerHTML = originalContent;
            button.disabled = false;
            this.reset();
            
            // Show thank you message
            alert('ご登録ありがとうございます！\n24時間以内に担当者よりご連絡いたします。');
        }, 3000);
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.trust-item, .benefit-card, .story-card, .process-step, .team-member').forEach(el => {
    observer.observe(el);
});

// Team profile toggle functionality
function toggleTeamDetail(detailId, button) {
    const detail = document.getElementById(detailId);
    if (detail) {
        detail.classList.toggle('show');
        button.textContent = detail.classList.contains('show') ? '閉じる ←' : 'もっと見る →';
    }
}

// Make function globally available
window.toggleTeamDetail = toggleTeamDetail;

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .header {
        transition: all 0.3s ease;
    }
    
    .form-input.error {
        border-color: var(--danger);
        animation: shake 0.3s;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Performance monitoring (optional)
if (window.performance && performance.mark) {
    performance.mark('js-loaded');
    
    window.addEventListener('load', () => {
        performance.mark('page-loaded');
        performance.measure('page-load-time', 'js-loaded', 'page-loaded');
        
        const measure = performance.getEntriesByName('page-load-time')[0];
        console.log(`Page load time: ${measure.duration.toFixed(2)}ms`);
    });
}