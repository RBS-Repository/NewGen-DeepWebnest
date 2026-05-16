/**
 * NewGen WebNest — Core Script
 * Theme toggle + logo swap
 */

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
});

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

// Expose globally
window.toggleTheme = toggleTheme;