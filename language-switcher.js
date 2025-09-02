// Language Switcher Logic
let currentLang = 'en'; // Default to English

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    
    // Set initial language
    switchLanguage(savedLang);
    
    // Add click handlers to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});

// Main language switching function
function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update page content
    updatePageContent(lang);
    
    // Save preference
    localStorage.setItem('preferredLang', lang);
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
}

// Update all content based on selected language
function updatePageContent(lang) {
    const t = translations[lang];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const value = getNestedProperty(t, key);
        if (value) {
            element.textContent = value;
        }
    });
    
    // Update elements with data-i18n-list attribute (comma-separated lists)
    document.querySelectorAll('[data-i18n-list]').forEach(element => {
        const key = element.dataset.i18nList;
        const values = getNestedProperty(t, key);
        if (values && Array.isArray(values)) {
            element.textContent = values.join(', ');
        }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.dataset.i18nPlaceholder;
        const value = getNestedProperty(t, key);
        if (value) {
            element.placeholder = value;
        }
    });
    
    // Special handling for multi-line descriptions (preserve line breaks)
    updateMultilineContent(lang);
    
    // Update form elements
    updateFormElements(lang);
    
    // Update document title
    updatePageTitle(lang);
}

// Helper function to get nested object properties
function getNestedProperty(obj, path) {
    const keys = path.split('.');
    let value = obj;
    
    for (const key of keys) {
        if (value && typeof value === 'object' && key in value) {
            value = value[key];
        } else {
            return null;
        }
    }
    
    return value;
}

// Update content that needs special line break handling
function updateMultilineContent(lang) {
    // Hero description with line breaks
    const heroDesc = document.querySelector('[data-i18n="hero.description"]');
    if (heroDesc) {
        if (lang === 'ja') {
            heroDesc.innerHTML = 'Tokyo AI コミュニティの公式パートナーが<br>あなたに最適な企業との出会いを創出します';
        } else {
            heroDesc.innerHTML = 'As Tokyo AI Community\'s official partner,<br>we connect exceptional AI talent with ideal opportunities.';
        }
    }
    
    // Trust card titles with line breaks (remove line breaks for English)
    if (lang === 'en') {
        // Remove line breaks from trust card titles
        document.querySelectorAll('.trust-card h3').forEach(h3 => {
            if (h3.dataset.i18n) {
                const text = getNestedProperty(translations[lang], h3.dataset.i18n);
                if (text) {
                    h3.innerHTML = text;
                }
            }
        });
    }
}

// Update form-specific elements
function updateFormElements(lang) {
    const t = translations[lang];
    
    // Update the terms checkbox label with proper link structure
    const termsLabel = document.querySelector('label[for="terms"]');
    if (termsLabel && t.register && t.register.form) {
        const termsHtml = `
            <a href="terms.html" target="_blank" data-i18n="register.form.termsLink">${t.register.form.termsLink}</a>・<a href="privacy-policy.html" target="_blank" data-i18n="register.form.privacyLink">${t.register.form.privacyLink}</a> <span data-i18n="register.form.terms">${t.register.form.terms}</span>
        `;
        
        // Keep the checkbox, update only the label text
        const checkbox = termsLabel.previousElementSibling;
        if (checkbox && checkbox.type === 'checkbox') {
            termsLabel.innerHTML = termsHtml;
        }
    }
}

// Update page title based on language
function updatePageTitle(lang) {
    if (lang === 'ja') {
        document.title = 'AI Talent Bridge | AIエンジニアのためのキャリア支援 - Tokyo AI Community公式パートナー';
    } else {
        document.title = 'AI Talent Bridge | Career Support for AI Engineers - Tokyo AI Community Official Partner';
    }
}

// Export for use in other scripts if needed
window.switchLanguage = switchLanguage;
window.currentLang = currentLang;