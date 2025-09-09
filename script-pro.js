// AI Talent Bridge Professional JavaScript

class AITalentBridge {
    constructor() {
        this.init();
    }

    init() {
        // Loading screen
        this.initLoadingScreen();
        
        // Initialize all components after DOM load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initComponents());
        } else {
            this.initComponents();
        }
    }

    initComponents() {
        // Core features
        this.initParticleNetwork();
        this.initCustomCursor();
        this.initScrollAnimations();
        this.initCountUpAnimation();
        this.initValueCreationHexagon();
        this.initTeamSection();
        this.initTimeline();
        this.initFAQ();
        this.initScrollTop();
        this.initSmoothScroll();
        this.initMicroInteractions();
        this.initMobileFeatures();
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
            }, 1500);
        });
    }

    // Particle Network with Canvas
    initParticleNetwork() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off walls
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        const createParticles = () => {
            const particleCount = window.innerWidth < 768 ? 30 : 50;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };
        createParticles();

        // Draw connections
        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        const opacity = (1 - distance / 150) * 0.3;
                        ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            drawConnections();
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Mouse interaction
        canvas.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            particles.forEach(particle => {
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.vx += (dx / distance) * force * 0.02;
                    particle.vy += (dy / distance) * force * 0.02;
                }
            });
        });
    }

    // Custom Cursor
    initCustomCursor() {
        if (window.innerWidth < 1024) return; // Disable on mobile/tablet

        const cursor = document.createElement('div');
        cursor.className = 'cursor';
        document.body.appendChild(cursor);
        document.body.classList.add('custom-cursor');

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor movement
        const animateCursor = () => {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .faq-question, .value-node, .team-member');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Stagger animations for grid items
                    if (entry.target.closest('.stats-grid, .value-cards, .timeline-track')) {
                        const siblings = entry.target.parentElement.children;
                        Array.from(siblings).forEach((sibling, index) => {
                            setTimeout(() => {
                                sibling.classList.add('visible');
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe elements
        const animatedElements = document.querySelectorAll(
            '.section-title, .section-subtitle, .stat-card, .value-card, ' +
            '.timeline-item, .team-member, .faq-item'
        );
        animatedElements.forEach(el => observer.observe(el));
    }

    // Count Up Animation
    initCountUpAnimation() {
        const counters = document.querySelectorAll('.count-up');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const duration = 2000;
                    const start = Date.now();
                    
                    const updateCounter = () => {
                        const now = Date.now();
                        const progress = Math.min((now - start) / duration, 1);
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(easeOutQuart * target);
                        
                        entry.target.textContent = current.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            entry.target.textContent = target.toLocaleString();
                        }
                    };
                    
                    updateCounter();
                }
            });
        });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // Value Creation Hexagon
    initValueCreationHexagon() {
        const container = document.querySelector('.hexagon-container');
        if (!container) return;

        // Create SVG hexagon with animated connections
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "hexagon-svg");
        svg.setAttribute("viewBox", "0 0 900 600");
        
        // Define gradient
        const defs = document.createElementNS(svgNS, "defs");
        const gradient = document.createElementNS(svgNS, "linearGradient");
        gradient.setAttribute("id", "hexGradient");
        gradient.innerHTML = `
            <stop offset="0%" stop-color="#0F172A"/>
            <stop offset="100%" stop-color="#0099CC"/>
        `;
        defs.appendChild(gradient);
        svg.appendChild(defs);

        // Create hexagon points
        const centerX = 450;
        const centerY = 300;
        const radius = 150;
        const points = [];
        
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            points.push({ x, y, angle });
        }

        // Draw center hexagon
        const hexagon = document.createElementNS(svgNS, "polygon");
        const hexPoints = points.map(p => `${p.x},${p.y}`).join(' ');
        hexagon.setAttribute("points", hexPoints);
        hexagon.setAttribute("fill", "url(#hexGradient)");
        hexagon.setAttribute("stroke", "#00D9FF");
        hexagon.setAttribute("stroke-width", "2");
        hexagon.setAttribute("opacity", "0.9");
        svg.appendChild(hexagon);

        // Add center text
        const centerText = document.createElementNS(svgNS, "text");
        centerText.setAttribute("x", centerX);
        centerText.setAttribute("y", centerY);
        centerText.setAttribute("text-anchor", "middle");
        centerText.setAttribute("dominant-baseline", "middle");
        centerText.setAttribute("fill", "white");
        centerText.setAttribute("font-size", "24");
        centerText.setAttribute("font-weight", "bold");
        centerText.innerHTML = "VALUE CREATE";
        svg.appendChild(centerText);

        // Add value nodes
        const values = [
            { text: "企業価値", iconPath: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10", description: "技術力向上" },
            { text: "人材価値", iconPath: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", description: "キャリア実現" },
            { text: "社会価値", iconPath: "M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0 M12 2v20 M2 12h20 M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z", description: "イノベーション" }
        ];

        // Create outer nodes at 3 corners (top, bottom-left, bottom-right)
        const nodePositions = [
            { x: centerX, y: centerY - 200 }, // top
            { x: centerX - 173, y: centerY + 100 }, // bottom-left
            { x: centerX + 173, y: centerY + 100 }  // bottom-right
        ];

        values.forEach((value, index) => {
            const pos = nodePositions[index];
            
            // Node circle
            const circle = document.createElementNS(svgNS, "circle");
            circle.setAttribute("cx", pos.x);
            circle.setAttribute("cy", pos.y);
            circle.setAttribute("r", "60");
            circle.setAttribute("fill", "white");
            circle.setAttribute("stroke", "#00D9FF");
            circle.setAttribute("stroke-width", "3");
            circle.setAttribute("class", "value-node-svg");
            svg.appendChild(circle);

            // Node text
            const text = document.createElementNS(svgNS, "text");
            text.setAttribute("x", pos.x);
            text.setAttribute("y", pos.y - 10);
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("font-size", "16");
            text.setAttribute("font-weight", "bold");
            text.setAttribute("fill", "#0F172A");
            text.innerHTML = value.text;
            svg.appendChild(text);

            // Node icon (SVG path)
            const iconGroup = document.createElementNS(svgNS, "g");
            iconGroup.setAttribute("transform", `translate(${pos.x - 12}, ${pos.y - 5})`);
            
            const iconPaths = value.iconPath.split(' ');
            iconPaths.forEach(pathData => {
                if (pathData.startsWith('M') || pathData.startsWith('L') || pathData.startsWith('C')) {
                    const iconPath = document.createElementNS(svgNS, "path");
                    iconPath.setAttribute("d", pathData);
                    iconPath.setAttribute("stroke", "#0099CC");
                    iconPath.setAttribute("stroke-width", "1.5");
                    iconPath.setAttribute("fill", "none");
                    iconPath.setAttribute("transform", "scale(1)");
                    iconGroup.appendChild(iconPath);
                } else if (pathData.match(/^\d/)) {
                    // Handle circle definitions
                    const circle = document.createElementNS(svgNS, "circle");
                    const coords = pathData.match(/(\d+)/g);
                    if (coords && coords.length >= 3) {
                        circle.setAttribute("cx", coords[0]);
                        circle.setAttribute("cy", coords[1]);
                        circle.setAttribute("r", coords[2]);
                        circle.setAttribute("stroke", "#0099CC");
                        circle.setAttribute("stroke-width", "1.5");
                        circle.setAttribute("fill", "none");
                        iconGroup.appendChild(circle);
                    }
                }
            });
            
            svg.appendChild(iconGroup);

            // Animated connection lines
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", centerX);
            line.setAttribute("y1", centerY);
            line.setAttribute("x2", pos.x);
            line.setAttribute("y2", pos.y);
            line.setAttribute("stroke", "#00D9FF");
            line.setAttribute("stroke-width", "2");
            line.setAttribute("stroke-dasharray", "5,5");
            line.setAttribute("opacity", "0.5");
            
            // Animate dash offset
            const animateLine = document.createElementNS(svgNS, "animate");
            animateLine.setAttribute("attributeName", "stroke-dashoffset");
            animateLine.setAttribute("from", "10");
            animateLine.setAttribute("to", "0");
            animateLine.setAttribute("dur", "1s");
            animateLine.setAttribute("repeatCount", "indefinite");
            line.appendChild(animateLine);
            
            svg.appendChild(line);

            // Interactive hover effect
            circle.addEventListener('mouseenter', () => {
                circle.setAttribute("r", "65");
                circle.setAttribute("fill", "#E0F2FE");
            });

            circle.addEventListener('mouseleave', () => {
                circle.setAttribute("r", "60");
                circle.setAttribute("fill", "white");
            });
        });

        // Add animated particles
        for (let i = 0; i < 10; i++) {
            const particle = document.createElementNS(svgNS, "circle");
            particle.setAttribute("r", "2");
            particle.setAttribute("fill", "#00D9FF");
            particle.setAttribute("opacity", "0.6");
            
            const animateX = document.createElementNS(svgNS, "animateMotion");
            animateX.setAttribute("path", `M ${Math.random() * 900} ${Math.random() * 600} Q ${Math.random() * 900} ${Math.random() * 600} ${Math.random() * 900} ${Math.random() * 600}`);
            animateX.setAttribute("dur", `${10 + Math.random() * 10}s`);
            animateX.setAttribute("repeatCount", "indefinite");
            
            particle.appendChild(animateX);
            svg.appendChild(particle);
        }

        container.appendChild(svg);
    }

    // Team Section Enhancements
    initTeamSection() {
        const teamPhotos = document.querySelectorAll('.team-photo');
        
        teamPhotos.forEach(photo => {
            // Add grayscale filter by default (already in CSS)
            // Add hover parallax effect
            const member = photo.closest('.team-member');
            if (member) {
                member.addEventListener('mousemove', (e) => {
                    const rect = member.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width - 0.5;
                    const y = (e.clientY - rect.top) / rect.height - 0.5;
                    
                    photo.style.transform = `scale(1.05) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
                });

                member.addEventListener('mouseleave', () => {
                    photo.style.transform = 'scale(1) rotateY(0) rotateX(0)';
                });
            }
        });
    }

    // Timeline Enhancements
    initTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Add sequential reveal animation
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 200);
        });
    }

    // FAQ Accordion
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            question.addEventListener('click', () => {
                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item with smooth animation
                item.classList.toggle('active');
                
                // Add spring animation
                if (item.classList.contains('active')) {
                    answer.style.animation = 'springIn 0.5s ease-out';
                }
            });

            // Keyboard accessibility
            question.setAttribute('tabindex', '0');
            question.setAttribute('role', 'button');
            question.setAttribute('aria-expanded', 'false');
            
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }

    // Scroll to Top
    initScrollTop() {
        const scrollBtn = document.querySelector('.scroll-top');
        if (!scrollBtn) return;

        // Show/hide based on scroll position
        let lastScrollY = 0;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 300) {
                scrollBtn.classList.add('visible');
                
                // Hide when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY) {
                    scrollBtn.style.transform = 'translateY(100px)';
                } else {
                    scrollBtn.style.transform = 'translateY(0)';
                }
            } else {
                scrollBtn.classList.remove('visible');
            }
            
            lastScrollY = currentScrollY;
        });

        // Smooth scroll to top
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scroll
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const offset = 80; // Account for fixed header if any
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Micro Interactions
    initMicroInteractions() {
        // Button ripple effect
        const buttons = document.querySelectorAll('.cta-primary, .faq-question');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Card 3D tilt effect
        const cards = document.querySelectorAll('.stat-card, .value-card, .team-member');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                const tiltX = (y - 0.5) * 10;
                const tiltY = (x - 0.5) * -10;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Mobile Features
    initMobileFeatures() {
        if (window.innerWidth > 768) return;

        // Touch feedback
        document.addEventListener('touchstart', (e) => {
            const target = e.target.closest('a, button, .faq-question');
            if (target) {
                target.style.transform = 'scale(0.98)';
            }
        });

        document.addEventListener('touchend', (e) => {
            const target = e.target.closest('a, button, .faq-question');
            if (target) {
                setTimeout(() => {
                    target.style.transform = 'scale(1)';
                }, 100);
            }
        });

        // Swipe gestures for timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
            let startX = 0;
            let scrollLeft = 0;

            timeline.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - timeline.offsetLeft;
                scrollLeft = timeline.scrollLeft;
            });

            timeline.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - timeline.offsetLeft;
                const walk = (x - startX) * 2;
                timeline.scrollLeft = scrollLeft - walk;
            });
        }

        // Show fixed CTA on scroll
        const fixedCTA = document.querySelector('.fixed-cta');
        if (fixedCTA) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.scrollY;
                
                if (currentScroll > 500 && currentScroll > lastScroll) {
                    fixedCTA.style.transform = 'translateX(-50%) translateY(100px)';
                } else if (currentScroll > 500) {
                    fixedCTA.style.transform = 'translateX(-50%) translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
        }
    }
}

// Initialize the application
const app = new AITalentBridge();

// Add spring animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes springIn {
        0% {
            transform: scaleY(0);
            transform-origin: top;
        }
        50% {
            transform: scaleY(1.1);
        }
        100% {
            transform: scaleY(1);
        }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);