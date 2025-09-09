// Advanced Interactions - AI Talent Bridge

document.addEventListener('DOMContentLoaded', function() {
    
    // Magnetic Hover Effect - REDUCED movement
    const magneticElements = document.querySelectorAll('.magnetic-hover');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Reduced magnetic effect
            el.style.setProperty('--mouse-x', `${x * 0.03}px`); // was 0.1
            el.style.setProperty('--mouse-y', `${y * 0.03}px`); // was 0.1
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.setProperty('--mouse-x', '0px');
            el.style.setProperty('--mouse-y', '0px');
        });
    });
    
    // Ripple Effect on Click
    function createRipple(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });
    
    // Cursor Trail Effect - DISABLED for better UX
    // const cursorTrail = document.createElement('div');
    // cursorTrail.className = 'cursor-trail';
    // document.body.appendChild(cursorTrail);
    // 
    // let mouseX = 0, mouseY = 0;
    // let cursorX = 0, cursorY = 0;
    // 
    // document.addEventListener('mousemove', (e) => {
    //     mouseX = e.clientX;
    //     mouseY = e.clientY;
    // });
    // 
    // function animateCursor() {
    //     const dx = mouseX - cursorX;
    //     const dy = mouseY - cursorY;
    //     
    //     cursorX += dx * 0.1;
    //     cursorY += dy * 0.1;
    //     
    //     cursorTrail.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    //     
    //     requestAnimationFrame(animateCursor);
    // }
    // 
    // animateCursor();
    
    // Tilt Effect on Cards - REDUCED for better UX
    const tiltElements = document.querySelectorAll('.glass');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Reduced rotation values for subtler effect
            const rotateX = (y - centerY) / 50; // was /10
            const rotateY = (centerX - x) / 50; // was /10
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`; // reduced scale
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Scroll Progress Indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #00D9FF, #8B5CF6, #F59E0B);
        z-index: 100;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    });
    
    // Text Scramble Effect
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-cyan">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }
    
    // Apply text scramble to headings on hover - DISABLED for better UX
    // const headings = document.querySelectorAll('h1, h2, h3');
    // headings.forEach(heading => {
    //     const fx = new TextScramble(heading);
    //     const originalText = heading.innerText;
    //     
    //     heading.addEventListener('mouseenter', () => {
    //         fx.setText(originalText);
    //     });
    // });
    
    // Parallax Depth Effect - REDUCED for better UX
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = (el.dataset.parallax || 0.5) * 0.2; // Reduced speed significantly
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Sound Effects (Optional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playHoverSound() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    
    // Apply hover sound to interactive elements
    document.querySelectorAll('button, a').forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (audioContext.state === 'running') {
                playHoverSound();
            }
        });
    });
    
    // Enable audio on first user interaction
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });
    
    // Smooth Reveal Animation - REDUCED movement
    const revealElements = document.querySelectorAll('.glass');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)'; // reduced from 30px
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'; // slower transition
        revealOnScroll.observe(el);
    });
    
    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00D9FF;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Performance Monitor - DISABLED to improve performance
    // The FPS monitor itself can cause performance issues
    // Uncomment only when debugging
    /*
    let fps = 0;
    let lastTime = performance.now();
    
    function updateFPS() {
        const currentTime = performance.now();
        fps = Math.round(1000 / (currentTime - lastTime));
        lastTime = currentTime;
        
        if (fps < 30) {
            console.warn('Performance warning: FPS dropped to', fps);
        }
        
        requestAnimationFrame(updateFPS);
    }
    
    if (window.location.hostname === 'localhost') {
        updateFPS();
    }
    */
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}