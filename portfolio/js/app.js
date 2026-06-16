// Lemonade portfolio interactions: theme toggle, color swatches, toast demos.

(function () {
    'use strict';

    // --- Theme toggle (checkbox checked = dark, the SDK default) ---
    const root = document.documentElement;
    const toggle = document.getElementById('themeToggle');
    const apply = (dark) => root.setAttribute('data-theme', dark ? 'dark' : 'light');
    toggle.addEventListener('change', () => apply(toggle.checked));

    // --- Color swatches, read live from the active theme's computed tokens ---
    const swatch = (label, varName) => {
        const val = getComputedStyle(root).getPropertyValue(varName).trim();
        return `
            <div class="pf-swatch">
                <div class="chip" style="background:${val || 'var(' + varName + ')'}"></div>
                <span class="label">${label}</span>
                <span class="val">${varName}</span>
            </div>`;
    };

    const groups = {
        brandSwatches: [
            ['Lemon', '--lemon-yellow'],
            ['Bright', '--lemon-yellow-bright'],
            ['Amber', '--lemon-amber'],
            ['Leaf', '--lemon-green'],
        ],
        surfaceSwatches: [
            ['Primary', '--bg-primary'],
            ['Secondary', '--bg-secondary'],
            ['Tertiary', '--bg-tertiary'],
            ['Quaternary', '--bg-quaternary'],
            ['Border', '--border-primary'],
        ],
        statusSwatches: [
            ['Success', '--success-color'],
            ['Warning', '--warning-color'],
            ['Info', '--info-color'],
            ['Action', '--action-color'],
            ['Error', '--error-color'],
        ],
    };

    function renderSwatches() {
        for (const [id, list] of Object.entries(groups)) {
            const el = document.getElementById(id);
            if (el) el.innerHTML = list.map(([l, v]) => swatch(l, v)).join('');
        }
    }
    renderSwatches();
    // Re-read tokens when the theme flips so theme-reactive chips update.
    toggle.addEventListener('change', () => requestAnimationFrame(renderSwatches));

    // --- Toasts ---
    const ICONS = { success: '✓', info: 'ℹ', warning: '⚠', error: '✕' };
    const MESSAGES = {
        success: 'Model loaded successfully.',
        info: 'Server running at localhost:13305.',
        warning: 'A newer backend version is available.',
        error: 'Failed to reach the inference backend.',
    };
    const container = document.getElementById('toasts');

    function showToast(type) {
        const t = document.createElement('div');
        t.className = `lm-toast ${type}`;
        t.innerHTML = `
            <span class="icon">${ICONS[type]}</span>
            <span class="msg">${MESSAGES[type]}</span>
            <button class="close" aria-label="Dismiss">✕</button>`;
        const remove = () => {
            t.style.transition = 'opacity .2s ease, transform .2s ease';
            t.style.opacity = '0';
            t.style.transform = 'translateX(100%)';
            setTimeout(() => t.remove(), 200);
        };
        t.querySelector('.close').addEventListener('click', remove);
        t.addEventListener('click', remove);
        container.appendChild(t);
        setTimeout(remove, 4000);
    }

    document.querySelectorAll('[data-toast]').forEach((btn) =>
        btn.addEventListener('click', () => showToast(btn.dataset.toast))
    );
})();
