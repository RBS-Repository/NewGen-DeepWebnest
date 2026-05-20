/**
 * RiftNest — Core Script
 * Theme toggle + logo swap
 */



function applyTheme() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateLogo(theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateLogo(next);
    updateThemeIcon(next);
}

function updateLogo(theme) {
    const logo = document.getElementById('header-logo');
    if (!logo) return;
    logo.src = theme === 'dark' ? 'images/darkmode-logo.jpg' : 'images/lightmode-logo.jpg';
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// Legacy helpers used by sub-pages
function navigateTo(page) { window.location.href = page; }
function goBack() { window.location.href = 'index.html'; }

// ===== WELCOME POPUP =====
function initWelcomePopup() {
    const overlay = document.getElementById('welcome-popup');
    if (!overlay) return;

    if (sessionStorage.getItem('welcomeShown')) {
        overlay.remove();
        return;
    }

    // Show popup after a brief delay for a smooth entrance
    setTimeout(() => {
        overlay.classList.add('active');
    }, 300);

    function dismissPopup() {
        overlay.classList.remove('active');
        sessionStorage.setItem('welcomeShown', 'true');
        // Remove from DOM after animation completes
        setTimeout(() => overlay.remove(), 500);
    }

    // Close button
    const closeBtn = document.getElementById('welcome-close');
    if (closeBtn) closeBtn.addEventListener('click', dismissPopup);

    // Explore Now button
    const enterBtn = document.getElementById('welcome-enter');
    if (enterBtn) enterBtn.addEventListener('click', dismissPopup);

    // Click outside modal to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) dismissPopup();
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            dismissPopup();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    initWelcomePopup();

    // Make photo previews follow the cursor
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.link-card:hover');
        cards.forEach(card => {
            const preview = card.querySelector('.photo-preview');
            if (preview) {
                const rect = card.getBoundingClientRect();
                preview.style.left = (e.clientX - rect.left) + 'px';
                preview.style.top = (e.clientY - rect.top + 20) + 'px';
                preview.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    });
});

// Expose globally
window.toggleTheme = toggleTheme;

// Track outbound link clicks
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: link.href,
                    transport_type: 'beacon'
                });
            }
        });
    });
});