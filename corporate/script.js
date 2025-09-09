// Initialize translations and handle language switching
document.addEventListener('DOMContentLoaded', function() {
    // Load translations script
    const script = document.createElement('script');
    script.src = 'translations.js';
    document.head.appendChild(script);
    
    script.onload = function() {
        // Initialize language after translations are loaded
        if (typeof initializeLanguage === 'function') {
            initializeLanguage();
        }
        
        // Update navigation links
        updateNavigationLinks();
        
        // Update hero section
        updateHeroSection();
        
        // Update all sections
        updateAllSections();
    };
});

function updateNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLang = window.currentLanguage || 'ja';
    
    // Update nav link texts based on sections
    const navTexts = [
        translations[currentLang].nav.challenges,
        translations[currentLang].nav.solution,
        translations[currentLang].nav.process,
        translations[currentLang].nav.team
    ];
    
    navLinks.forEach((link, index) => {
        if (navTexts[index]) {
            link.textContent = navTexts[index];
        }
    });
    
    // Update register button
    const registerBtn = document.querySelector('.nav-cta');
    if (registerBtn) {
        registerBtn.textContent = translations[currentLang].nav.register;
    }
    
    // Update badge
    const badge = document.querySelector('.logo-badge');
    if (badge) {
        badge.textContent = translations[currentLang].nav.badge;
    }
}

function updateHeroSection() {
    const currentLang = window.currentLanguage || 'ja';
    const heroTrans = translations[currentLang].hero;
    
    // Update hero texts
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = heroTrans.subtitle;
    }
    
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.innerHTML = `${heroTrans.title1}<br><span class="gradient-text">${heroTrans.title2}</span>`;
    }
    
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        heroDesc.textContent = heroTrans.description;
    }
    
    const heroCta = document.querySelector('.hero-cta-primary');
    if (heroCta) {
        heroCta.textContent = heroTrans.cta;
    }
    
    // Update hero features
    const features = document.querySelectorAll('.hero-feature');
    const featureKeys = ['network', 'community', 'support', 'free'];
    features.forEach((feature, index) => {
        if (featureKeys[index] && heroTrans.features[featureKeys[index]]) {
            const valueEl = feature.querySelector('.feature-value');
            if (valueEl) {
                valueEl.textContent = heroTrans.features[featureKeys[index]];
            }
        }
    });
}

function updateAllSections() {
    const currentLang = window.currentLanguage || 'ja';
    
    // Update Challenges Section
    updateChallengesSection(currentLang);
    
    // Update Solution Section
    updateSolutionSection(currentLang);
    
    // Update Process Section
    updateProcessSection(currentLang);
    
    // Update Trust/Stats Section
    updateTrustSection(currentLang);
    
    // Update Team Section
    updateTeamSection(currentLang);
    
    // Update CTA Section
    updateCtaSection(currentLang);
    
    // Update Footer
    updateFooter(currentLang);
}

function updateChallengesSection(lang) {
    const section = document.querySelector('.challenges-section');
    if (!section) return;
    
    const trans = translations[lang].challenges;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    // Update challenge cards
    const cards = section.querySelectorAll('.challenge-card');
    const items = ['item1', 'item2', 'item3'];
    
    cards.forEach((card, index) => {
        if (items[index] && trans[items[index]]) {
            const cardTitle = card.querySelector('h3');
            const cardDesc = card.querySelector('p');
            
            if (cardTitle) cardTitle.textContent = trans[items[index]].title;
            if (cardDesc) cardDesc.textContent = trans[items[index]].description;
        }
    });
}

function updateSolutionSection(lang) {
    const section = document.querySelector('.solution-section');
    if (!section) return;
    
    const trans = translations[lang].solution;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    // Update solution cards
    const cards = section.querySelectorAll('.solution-card');
    const cardKeys = ['card1', 'card2', 'card3'];
    
    cards.forEach((card, index) => {
        if (cardKeys[index] && trans[cardKeys[index]]) {
            const cardTitle = card.querySelector('h3');
            const cardDesc = card.querySelector('p');
            
            if (cardTitle) cardTitle.textContent = trans[cardKeys[index]].title;
            if (cardDesc) cardDesc.textContent = trans[cardKeys[index]].description;
        }
    });
}

function updateProcessSection(lang) {
    const section = document.querySelector('.process-section');
    if (!section) return;
    
    const trans = translations[lang].process;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    // Update timeline steps
    const steps = section.querySelectorAll('.timeline-step');
    const stepKeys = ['step1', 'step2', 'step3', 'step4'];
    
    steps.forEach((step, index) => {
        if (stepKeys[index] && trans.steps[stepKeys[index]]) {
            const stepTitle = step.querySelector('h3');
            const stepDesc = step.querySelector('p');
            
            if (stepTitle) stepTitle.textContent = trans.steps[stepKeys[index]].title;
            if (stepDesc) stepDesc.textContent = trans.steps[stepKeys[index]].description;
        }
    });
    
    // Update CTA button
    const ctaBtn = section.querySelector('.process-cta');
    if (ctaBtn) ctaBtn.textContent = trans.cta;
}

function updateTrustSection(lang) {
    const section = document.querySelector('.trust-section');
    if (!section) return;
    
    const trans = translations[lang].trust;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    // Update stats
    const stats = section.querySelectorAll('.stat-card');
    const statKeys = ['stat1', 'stat2', 'stat3'];
    
    stats.forEach((stat, index) => {
        if (statKeys[index] && trans.stats[statKeys[index]]) {
            const number = stat.querySelector('.stat-number');
            const label = stat.querySelector('.stat-label');
            
            if (number) number.textContent = trans.stats[statKeys[index]].number;
            if (label) label.textContent = trans.stats[statKeys[index]].label;
        }
    });
    
    // Update partners text
    const partnersText = section.querySelector('.partners-text');
    if (partnersText) partnersText.textContent = trans.partners;
}

function updateTeamSection(lang) {
    const section = document.querySelector('.team-section');
    if (!section) return;
    
    const trans = translations[lang].team;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.section-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    // Update team members
    const members = section.querySelectorAll('.team-member');
    const memberKeys = ['member1', 'member2'];
    
    members.forEach((member, index) => {
        if (memberKeys[index] && trans[memberKeys[index]]) {
            const name = member.querySelector('.member-name');
            const role = member.querySelector('.member-role');
            const bio = member.querySelector('.member-bio');
            
            if (name) name.textContent = trans[memberKeys[index]].name;
            if (role) role.textContent = trans[memberKeys[index]].role;
            if (bio) bio.textContent = trans[memberKeys[index]].bio;
        }
    });
}

function updateCtaSection(lang) {
    const section = document.querySelector('.cta-section');
    if (!section) return;
    
    const trans = translations[lang].cta;
    
    const title = section.querySelector('h2');
    if (title) title.textContent = trans.title;
    
    const subtitle = section.querySelector('.cta-subtitle');
    if (subtitle) subtitle.textContent = trans.subtitle;
    
    const primaryBtn = section.querySelector('.cta-primary');
    if (primaryBtn) primaryBtn.textContent = trans.primaryButton;
    
    const secondaryBtn = section.querySelector('.cta-secondary');
    if (secondaryBtn) secondaryBtn.textContent = trans.secondaryButton;
}

function updateFooter(lang) {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const trans = translations[lang].footer;
    
    // Update company info
    const companyName = footer.querySelector('.company-name');
    if (companyName) companyName.textContent = trans.companyInfo.name;
    
    const companyAddr = footer.querySelector('.company-address');
    if (companyAddr) companyAddr.textContent = trans.companyInfo.address;
    
    const companyTel = footer.querySelector('.company-tel a');
    if (companyTel) companyTel.textContent = trans.companyInfo.tel;
    
    // Update copyright
    const copyright = footer.querySelector('.copyright');
    if (copyright) copyright.textContent = trans.copyright;
    
    // Update links
    const privacyLink = footer.querySelector('.privacy-link');
    if (privacyLink) privacyLink.textContent = trans.privacyPolicy;
    
    const termsLink = footer.querySelector('.terms-link');
    if (termsLink) termsLink.textContent = trans.termsOfService;
}

// Re-run updates when language changes
window.addEventListener('languageChanged', function() {
    updateNavigationLinks();
    updateHeroSection();
    updateAllSections();
});