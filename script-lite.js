// AI Talent Bridge - 軽量版スクリプト

document.addEventListener('DOMContentLoaded', function() {
    
    // モバイルメニューの制御（シンプル版）
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('translate-x-full');
        });
    }
    
    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.add('translate-x-full');
        });
    }
    
    // スムーススクロール
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
    
    // FAQトグル（シンプル版）
    document.querySelectorAll('.faq-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const content = this.parentElement.querySelector('.faq-content');
            const arrow = this.querySelector('svg');
            
            if (content) {
                content.classList.toggle('hidden');
                if (arrow) {
                    arrow.classList.toggle('rotate-180');
                }
            }
        });
    });
    
    // プロフィール詳細トグル
    window.toggleDetail = function(detailId, button) {
        const detail = document.getElementById(detailId);
        if (detail) {
            detail.classList.toggle('show');
            button.textContent = detail.classList.contains('show') ? '閉じる ←' : 'もっと見る →';
        }
    };
});

// Lucide Icons初期化
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}