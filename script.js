// AI Talent Bridge - 未来的インタラクティブ機能

document.addEventListener('DOMContentLoaded', function() {
    
    // ローダーはすでにHTML内で削除済み
    
    // モバイルメニューの制御
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // モバイルメニューのリンククリック時に閉じる
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // カウンターアニメーション
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    // 単位を追加
                    if (counter.textContent === '95') {
                        counter.textContent = '95';
                    }
                }
            };
            
            // Intersection Observerで表示時にアニメーション開始
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && current === 0) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    };
    
    animateCounters();
    
    // スクロール連動アニメーション（パフォーマンス最適化）
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // 遅延読み込み用のIntersection Observer
    const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    lazyImageObserver.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    // data-src属性を持つ画像を監視
    document.querySelectorAll('img[data-src]').forEach(img => {
        lazyImageObserver.observe(img);
    });
    
    const slideUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                slideUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    document.querySelectorAll('.glass').forEach(el => {
        if (!el.closest('.hero-section')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            slideUpObserver.observe(el);
        }
    });
    
    // パララックス効果 - REDUCED for better UX & Performance
    let ticking = false;
    let scrollTimeout;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(el => {
            const speed = (el.dataset.speed || 0.5) * 0.2; // Much slower
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    // デバウンス処理でパフォーマンス向上
    function handleScroll() {
        // 即座に実行
        requestTick();
        
        // 連続スクロール中は追加処理を遅延
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            requestTick();
        }, 100);
    }
    
    // Passive listenerでパフォーマンス向上
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // マウス追従エフェクト - DISABLED for better UX
    // const heroSection = document.querySelector('.hero-section');
    // if (heroSection) {
    //     heroSection.addEventListener('mousemove', (e) => {
    //         const { clientX, clientY } = e;
    //         const { innerWidth, innerHeight } = window;
    //         
    //         const xPos = (clientX / innerWidth - 0.5) * 20;
    //         const yPos = (clientY / innerHeight - 0.5) * 20;
    //         
    //         const floatingElements = document.querySelectorAll('.animate-float');
    //         floatingElements.forEach(el => {
    //             el.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
    //         });
    //     });
    // }
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // タイピングアニメーション
    class TypeWriter {
        constructor(element, texts, speed = 100) {
            this.element = element;
            this.texts = texts;
            this.speed = speed;
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.type();
        }
        
        type() {
            const currentText = this.texts[this.textIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }
            
            let typeSpeed = this.speed;
            
            if (this.isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(() => this.type(), typeSpeed);
        }
    }
    
    // グロー効果の動的更新
    const glowElements = document.querySelectorAll('.neon-glow');
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.filter = 'brightness(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.filter = 'brightness(1)';
        });
    });
    
    // チャットボット機能
    const chatbot = document.querySelector('.fixed button');
    if (chatbot) {
        chatbot.addEventListener('click', () => {
            // チャットウィンドウの表示（実装例）
            const chatWindow = document.createElement('div');
            chatWindow.className = 'fixed bottom-24 right-8 w-80 h-96 bg-navy-800 rounded-2xl shadow-2xl p-4 z-50';
            chatWindow.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-white font-bold">AI Assistant</h3>
                    <button class="text-gray-400 hover:text-white" onclick="this.parentElement.parentElement.remove()">✕</button>
                </div>
                <div class="bg-navy-900 rounded-lg p-4 h-72 overflow-y-auto mb-4">
                    <div class="text-gray-300 text-sm">
                        <p class="mb-2">こんにちは！AI人材採用についてご質問はありますか？</p>
                    </div>
                </div>
                <input type="text" placeholder="メッセージを入力..." class="w-full bg-navy-900 text-white rounded-lg px-4 py-2 text-sm">
            `;
            
            // 既存のチャットウィンドウがあれば削除
            const existingChat = document.querySelector('.fixed.bottom-24');
            if (existingChat) {
                existingChat.remove();
            } else {
                document.body.appendChild(chatWindow);
            }
        });
    }
    
    // フォーム送信処理（最初のフォーム用）
    const firstForm = document.querySelector('form');
    if (firstForm && !firstForm.id) { // IDがないフォームの場合
        firstForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // アニメーション付き成功メッセージ
            const button = firstForm.querySelector('button[type="submit"]');
            if (button) {
                const originalText = button.textContent;
                button.textContent = '送信中...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = '✓ 送信完了！';
                    button.classList.add('bg-green-500');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.classList.remove('bg-green-500');
                        firstForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // パーティクル生成
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1 h-1 bg-cyan rounded-full opacity-50';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        const container = document.querySelector('.fixed.inset-0');
        if (container && container.children.length < 20) {
            container.appendChild(particle);
            
            // 古いパーティクルを削除
            setTimeout(() => {
                particle.remove();
            }, 15000);
        }
    }
    
    // 定期的にパーティクルを生成
    setInterval(createParticle, 3000);
    
    // リサイズ時の処理
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // リサイズ完了後の処理
            console.log('Resize completed');
        }, 250);
    });
    
    // ページロード完了時のアニメーション
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // ローディング画面を確実に削除
        const loader = document.querySelector('#loader');
        if (loader && loader.parentNode) {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 300);
        }
        
        // スクロールリビールアニメーション
        const revealElements = document.querySelectorAll('.scroll-reveal');
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
        
        // ボタンにshine効果を追加
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.classList.add('btn-shine');
        });
        
        // カードにホバーエフェクトを追加
        document.querySelectorAll('.glass').forEach(card => {
            card.classList.add('hover-lift');
        });
        
        // FAQトグルを再初期化（ページ完全読み込み後）
        setupFAQToggles();
    });
    
    // プロフィール詳細のトグル機能（グローバルに定義）
    window.toggleDetail = function(detailId, button) {
        const detail = document.getElementById(detailId);
        if (detail) {
            detail.classList.toggle('show');
            button.textContent = detail.classList.contains('show') ? 
                '閉じる ←' : 'もっと見る →';
        }
    };
    
    // グローバルスコープに確実に追加
    if (typeof window.toggleDetail === 'undefined') {
        console.error('toggleDetail function not defined properly');
    }
    
    // FAQトグル機能（シンプル版）
    const setupFAQToggles = () => {
        const faqButtons = document.querySelectorAll('.faq-toggle');
        console.log('FAQ buttons found:', faqButtons.length);
        
        faqButtons.forEach((button, index) => {
            // 既存のリスナーを削除
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // 新しいリスナーを追加
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('FAQ clicked:', index);
                
                const content = this.nextElementSibling;
                const arrow = this.querySelector('svg');
                
                if (!content) {
                    console.error('Content not found');
                    return;
                }
                
                // トグル処理
                const isHidden = content.classList.contains('hidden');
                
                // すべてのFAQを閉じる
                document.querySelectorAll('.faq-content').forEach(c => {
                    c.classList.add('hidden');
                });
                document.querySelectorAll('.faq-toggle svg').forEach(a => {
                    a.classList.remove('rotate-180');
                });
                
                // クリックしたFAQを開く（閉じていた場合）
                if (isHidden) {
                    content.classList.remove('hidden');
                    if (arrow) {
                        arrow.classList.add('rotate-180');
                    }
                }
            });
        });
    };
    
    // ページロード時とDOMContentLoaded時の両方で初期化
    setupFAQToggles();
    
    // 念のため、少し遅れて再初期化
    setTimeout(setupFAQToggles, 500);
    
    // フォームバリデーション
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 簡単なバリデーション
            const company = document.getElementById('company').value.trim();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!company || !name || !email || !message) {
                alert('必須項目をすべて入力してください。');
                return;
            }
            
            // メールアドレスの簡単な検証
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('有効なメールアドレスを入力してください。');
                return;
            }
            
            // 送信成功のアニメーション
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="relative z-10">送信中...</span>';
            submitButton.disabled = true;
            
            // 実際の送信処理（ここではシミュレーション）
            setTimeout(() => {
                submitButton.innerHTML = '<span class="relative z-10">✓ 送信完了</span>';
                submitButton.classList.add('bg-green-500');
                
                // フォームをリセット
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    submitButton.classList.remove('bg-green-500');
                    
                    // サンクスメッセージ
                    alert('お問い合わせありがとうございます。\n担当者より2営業日以内にご連絡させていただきます。');
                }, 2000);
            }, 1500);
        });
    }
    
    // デバッグ情報
    console.log('%cAI Talent Bridge', 'color: #00D9FF; font-size: 24px; font-weight: bold;');
    console.log('%c次世代AI人材採用プラットフォーム', 'color: #F59E0B; font-size: 16px;');
    console.log('%c© 2024 Value Create Inc.', 'color: #8B5CF6; font-size: 12px;');
});