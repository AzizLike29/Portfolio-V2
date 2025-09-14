document.addEventListener('DOMContentLoaded', () => {
    const langToRegion = { en: 'US', id: 'ID' };
    const I18N_BASE = new URL('./assets/js/locales/', document.baseURI);

    const flagEl = document.getElementById('langFlag');
    const langBtns = document.querySelectorAll('[data-lang]');

    function toFlagEmoji(countryCode) {
        const cc = (countryCode || '').toUpperCase();
        if (!/^[A-Z]{2}$/.test(cc)) return '🏳️';
        const OFFSET = 0x1F1E6;
        return String.fromCodePoint(
            cc.charCodeAt(0) - 65 + OFFSET,
            cc.charCodeAt(1) - 65 + OFFSET
        );
    }

    // Ambil nilai dari path "a.b.c" di object
    function getByPath(obj, path) {
        return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), obj);
    }

    let currentDict = {};

    // Terapkan terjemahan ke semua elemen yang punya data-i18n atau data-i18n-attr
    function applyI18n() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const raw = (el.getAttribute('data-i18n') || '').trim();
            let useHTML = false;
            let key = raw;

            // Dukung prefix [html]key.path
            if (raw.startsWith('[html]')) {
                useHTML = true;
                key = raw.slice(6).trim();
            }

            const val = getByPath(currentDict, key);
            if (val == null) return;

            if (useHTML) {
                el.innerHTML = val;     // inject sebagai HTML
            } else {
                el.textContent = val;   // teks biasa
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const spec = el.getAttribute('data-i18n-attr');
            spec.split(';').forEach(pair => {
                const [attr, key] = pair.split(':').map(s => s.trim());
                if (!attr || !key) return;
                const val = getByPath(currentDict, key);
                if (val != null) el.setAttribute(attr, val);
            });
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const val = getByPath(currentDict, key);
            if (val != null) el.setAttribute('placeholder', val);
        });
    }

    // Load kamus JSON sesuai bahasa
    async function loadDict(lang) {
        const url = new URL(`${lang}.json`, I18N_BASE).toString();
        console.log('[i18n] GET', url);
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (e) {
            console.warn('Gagal memuat kamus', lang, e);
            // Fallback ke en bila bukan en
            return lang !== 'en' ? loadDict('en') : {};
        }
    }

    async function setLangUI(lang) {
        const region = langToRegion[lang] || 'US';
        if (flagEl) flagEl.textContent = toFlagEmoji(region);

        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('lang', lang);

        // Tandai item aktif di dropdown
        langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

        currentDict = await loadDict(lang);
        console.log("[i18n] Loaded dictionary", lang, currentDict);
        applyI18n();
    }

    // Init bahasa awal
    const initial = localStorage.getItem('lang') || 'en';
    setLangUI(initial);

    // Handler klik bahasa
    langBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const lang = btn.dataset.lang;
            await setLangUI(lang);

            // Tutup tombol dropdown
            if (window.bootstrap) {
                const wrapper = btn.closest('.dropdown');
                const toggler = wrapper && wrapper.querySelector('.dropdown-toggle');
                if (toggler) bootstrap.Dropdown.getOrCreateInstance(toggler).hide();
            }
        });
    });
});