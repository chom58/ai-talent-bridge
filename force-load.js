// 強制的に背景画像を読み込み、最高品質で表示

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Force Load Script Starting...');
    
    const heroSection = document.querySelector('.hero-section');
    const existingImg = heroSection.querySelector('.hero-bg-img');
    
    // 既存の背景関連要素を全て削除
    const removeElements = ['.hero-overlay', '.hero-background'];
    removeElements.forEach(selector => {
        const el = heroSection.querySelector(selector);
        if (el) el.remove();
    });
    
    // 新しい高品質画像を作成
    if (!existingImg) {
        console.log('📸 Creating new background image element...');
        
        const bgImg = document.createElement('img');
        bgImg.className = 'hero-bg-img';
        bgImg.src = 'images/project-gene-background.png';
        bgImg.alt = 'Career Path Background';
        bgImg.loading = 'eager'; // 即座に読み込み
        bgImg.decoding = 'sync'; // 同期的にデコード
        
        // スタイルを直接適用
        bgImg.style.cssText = `
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            z-index: 1 !important;
            opacity: 1 !important;
            filter: none !important;
        `;
        
        // 画像読み込み成功時
        bgImg.onload = function() {
            console.log('✅ Background image loaded successfully!');
            heroSection.classList.add('has-bg-img');
            
            // CSSでも背景を設定（二重保証）
            heroSection.style.backgroundImage = `url('${bgImg.src}')`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
        };
        
        // 画像読み込み失敗時
        bgImg.onerror = function() {
            console.error('❌ Failed to load background image');
            // フォールバックとして直接背景を設定
            heroSection.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e293b 100%)';
        };
        
        // hero-sectionの最初の子要素として挿入
        heroSection.insertBefore(bgImg, heroSection.firstChild);
    }
    
    // 全てのbackdrop-filterを強制的に無効化
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.backdropFilter && computed.backdropFilter !== 'none') {
            console.log(`🔧 Removing backdrop-filter from:`, el.className);
            el.style.backdropFilter = 'none';
            el.style.webkitBackdropFilter = 'none';
        }
    });
    
    // バッジのスタイルを強制的に更新
    const badges = document.querySelectorAll('.trust-badges .badge');
    badges.forEach(badge => {
        badge.style.background = '#000000';
        badge.style.backdropFilter = 'none';
        badge.style.webkitBackdropFilter = 'none';
        badge.style.border = '2px solid #10B981';
    });
    
    // アイコンのサイズを確保
    const badgeIcons = document.querySelectorAll('.badge-icon');
    badgeIcons.forEach(icon => {
        icon.style.fontSize = '1.5rem';
        icon.style.filter = 'none';
    });
    
    console.log('✨ Force Load Script Completed!');
});