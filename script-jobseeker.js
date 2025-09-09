// スムーズスクロール
function scrollToForm() {
    const formSection = document.getElementById('consultation-form');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToProcess() {
    const processSection = document.getElementById('process');
    if (processSection) {
        processSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ヘッダーのスクロール処理
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // 下スクロール時 - ヘッダーを隠す
        header.style.transform = 'translateY(-100%)';
    } else {
        // 上スクロール時 - ヘッダーを表示
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// フォーム送信処理
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // ここで実際の送信処理を行う
            console.log('フォーム送信データ:', data);
            
            // 成功メッセージの表示
            showSuccessMessage();
            
            // フォームのリセット
            contactForm.reset();
        });
    }
    
    // アンカーリンクのスムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // FAQアコーディオンのアニメーション
    const faqItems = document.querySelectorAll('.faq-items details');
    faqItems.forEach(item => {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // 他のFAQを閉じる
                faqItems.forEach(otherItem => {
                    if (otherItem !== this && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
    
    // 数値のカウントアップアニメーション
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateNumber(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // 数値要素の監視
    document.querySelectorAll('.feature-card .number').forEach(el => {
        numberObserver.observe(el);
    });
    
    // 大きな数値の監視
    const bigNumber = document.querySelector('.big-number');
    if (bigNumber) {
        numberObserver.observe(bigNumber);
    }
});

// 数値アニメーション関数
function animateNumber(element) {
    const text = element.textContent;
    
    // テキストベースの値（Quality, Full, Longなど）や1:1はアニメーションしない
    if (text === '1:1' || text === 'Quality' || text === 'Full' || text === 'Long') {
        return;
    }
    
    const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (isNaN(targetNumber)) return;
    
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = targetNumber / steps;
    
    let current = 0;
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            current = targetNumber;
            clearInterval(timer);
        }
        
        // 元のフォーマットを保持しながら数値を更新
        if (text.includes('%')) {
            element.textContent = Math.floor(current) + '%+';
        } else if (text.includes('社')) {
            element.textContent = Math.floor(current) + '社';
        } else if (text.includes('ヶ月')) {
            element.textContent = Math.floor(current) + 'ヶ月';
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepDuration);
}

// Step2を表示する関数
function showStep2() {
    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

// 成功メッセージの表示
function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <h3>送信完了しました</h3>
            <p>担当者より1営業日以内にご連絡いたします</p>
        </div>
    `;
    
    document.body.appendChild(successMessage);
    
    // スタイルの追加
    const style = document.createElement('style');
    style.textContent = `
        .success-message {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .success-content {
            background: var(--surface);
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            border: 2px solid var(--primary);
            box-shadow: 0 10px 40px rgba(0, 212, 255, 0.3);
        }
        
        .success-icon {
            display: inline-block;
            width: 60px;
            height: 60px;
            line-height: 60px;
            background: var(--gradient-primary);
            color: white;
            border-radius: 50%;
            font-size: 2rem;
            margin-bottom: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // 3秒後に自動的に閉じる
    setTimeout(() => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            successMessage.remove();
            style.remove();
        }, 300);
    }, 3000);
    
    // クリックでも閉じる
    successMessage.addEventListener('click', () => {
        successMessage.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            successMessage.remove();
            style.remove();
        }, 300);
    });
}

// パーティクルエフェクト（オプション）
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${10 + Math.random() * 20}s infinite linear;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // アニメーションスタイルの追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            from {
                transform: translateY(100vh) translateX(0);
            }
            to {
                transform: translateY(-100vh) translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ページ読み込み時にパーティクルを生成（パフォーマンスを考慮してオプション）
// window.addEventListener('load', createParticles);

// ページの可視性が変わった時の処理
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // ページが非表示になった時
        console.log('ページが非表示になりました');
    } else {
        // ページが表示された時
        console.log('ページが表示されました');
    }
});

// スクロールベースのアニメーション
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .step-card, .role-card, .benefit');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
    
    // アニメーションスタイルの追加
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

// DOMContentLoadedでアニメーションを初期化
document.addEventListener('DOMContentLoaded', animateOnScroll);