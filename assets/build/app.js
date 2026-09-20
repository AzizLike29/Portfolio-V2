document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
});
;
// setting copy phone and email
function copyText(getId, copyType) {
  try {
    var textElement = document.getElementById(getId);
    var textCopy = textElement.innerText;

    navigator.clipboard
      .writeText(textCopy)
      .then(function () {
        // ubah icon ke icon paste check
        var iconElement = document.querySelector("#" + getId + " + .bi-copy");
        if (iconElement) {
          iconElement.classList.remove("bi-copy");
          iconElement.classList.add("bi-clipboard-check");
          setTimeout(function () {
            iconElement.classList.remove("bi-clipboard-check");
            iconElement.classList.add("bi-copy");
          }, 1000);
        }

        showNotification("success", copyType + " copied: " + textCopy);
      })
      .catch(function (err) {
        console.error("Error Copy: ", err);
        showNotification("error", "Failed to copy " + copyType);
      });
  } catch (err) {
    console.error("Error Copy Text: ", err);
    showNotification("error", "An unexpected error occurred");
  }
}

// custom in-page notification
function showNotification(type, message) {
  var notif = document.getElementById('customNotification');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'customNotification';
    notif.style.position = 'fixed';
    notif.style.top = '20px';
    notif.style.right = '20px';
    notif.style.padding = '10px 16px';
    notif.style.borderRadius = '4px';
    notif.style.zIndex = '9999';
    notif.style.fontSize = '14px';
    notif.style.color = '#fff';
    notif.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
    notif.style.display = 'none';
    document.body.appendChild(notif);
  }

  notif.textContent = message;
  notif.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
  notif.style.display = 'block';

  clearTimeout(notif.hideTimeout);
  notif.hideTimeout = setTimeout(function () {
    notif.style.display = 'none';
  }, 1500);
}

document.querySelectorAll('[data-copy-target]').forEach(function (copyButton) {
  function handleCopy() {
    copyText(copyButton.dataset.copyTarget, copyButton.dataset.copyType);
  }

  copyButton.addEventListener('click', handleCopy);
  copyButton.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCopy();
    }
  });
});

;
const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function generateEmailBody() {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; background-color: #ffffff;">
      
      <!-- Header -->
      <div style="background-color: #111827; padding: 24px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 20px; font-weight: 600;">
          New Contact Form Submission
        </h1>
      </div>
      
      <!-- Content -->
      <div style="padding: 32px 24px; background-color: #ffffff; border: 1px solid #e5e7eb;">
        
        <!-- Contact Details -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Contact Details
          </h2>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; font-weight: 600; color: #6b7280; width: 100px;">
                Name
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; color: #111827;">
                ${fullName.value}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; font-weight: 600; color: #6b7280;">
                Email
              </td>
              <td style="padding: 12px 0; border-bottom: 1px solid #f9fafb; color: #111827;">
                <a href="mailto:${email.value
    }" style="color: #10b981; text-decoration: none;">
                  ${email.value}
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #6b7280;">
                Subject
              </td>
              <td style="padding: 12px 0; color: #111827; font-weight: 500;">
                ${subject.value}
              </td>
            </tr>
          </table>
        </div>
        
        <!-- Message -->
        <div style="margin-bottom: 32px;">
          <h2 style="color: #111827; font-size: 16px; font-weight: 600; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
            Message
          </h2>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 6px; color: #111827; line-height: 1.7;">
            ${message.value.replace(/\n/g, "<br>")}
          </div>
        </div>
        
        <!-- Reply Button -->
        <div style="text-align: center; margin-bottom: 24px;">
          <a href="mailto:${email.value
    }" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 4px;">
            Reply to ${fullName.value}
          </a>
        </div>
        
        <!-- Timestamp -->
        <div style="text-align: center; padding: 16px; background-color: #f9fafb; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">
            Received on ${new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #f9fafb;">
        <p style="margin: 0; font-size: 13px; color: #6b7280;">
          This email was sent from your portfolio contact form.
        </p>
      </div>
    </div>
  `;
}

function sendEmail() {
  // Audio Email
  const successAudio = new Audio("assets/audio/success-tone.mp3");
  const errorAudio = new Audio("assets/audio/error-tone.mp3");

  // Set Volume Audio
  successAudio.volume = 1.0;
  errorAudio.volume = 1.0;

  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.classList.remove("d-none");

  emailjs.send("service_qxtabei", "template_9bhjbzo", {
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  }).then(() => {
    loadingIndicator.classList.add("d-none");
    // Audio Success Play
    successAudio.currentTime = 0;
    successAudio.play().catch(() => { });

    Swal.fire({
      title: "Success!",
      text: "Congrats, Sent message succesfully!",
      icon: "success",
    });
  }).catch(() => {
    // Audio Error Play
    errorAudio.currentTime = 0;
    errorAudio.play().catch(() => { });

    Swal.fire({
      title: "Error!",
      text: "Failed to send the email. Please try again later.",
      icon: "error",
    });
  });
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();

  if (
    !fullName.classList.contains("error") &&
    !email.classList.contains("error") &&
    !subject.classList.contains("error") &&
    !message.classList.contains("error")
  ) {
    sendEmail();
    form.reset();
  }
});
;
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
        try {
            const res = await fetch(url);
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
        applyI18n();
    }

    // Init bahasa awal. English copy is already in the HTML.
    const initial = localStorage.getItem('lang') || 'en';
    if (initial === 'en') {
        const region = langToRegion.en;
        if (flagEl) flagEl.textContent = toFlagEmoji(region);
        document.documentElement.setAttribute('lang', 'en');
        langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === 'en'));
    } else {
        setLangUI(initial);
    }

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
;
(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    const currentHour = new Date().getHours();
    return currentHour >= 6 && currentHour < 18 ? "light" : "dark";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      const currentHour = new Date().getHours();
      const isDaytime = currentHour >= 6 && currentHour < 18;
      const autoTheme = isDaytime ? "light" : "dark";

      document.documentElement.setAttribute("data-bs-theme", autoTheme);
      showActiveTheme("auto");
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
      showActiveTheme(theme);
    }
    setStoredTheme(theme);
  };

  const showActiveTheme = (theme) => {
    const themeIcon = document.querySelector(".theme-icon-active");
    if (!themeIcon) return;

    themeIcon.classList.remove(
      "bi-sun-fill",
      "bi-moon-stars-fill",
      "bi-circle-half"
    );

    let iconClass;
    if (theme === "light") {
      iconClass = "bi-sun-fill";
    } else if (theme === "dark") {
      iconClass = "bi-moon-stars-fill";
    } else {
      const currentHour = new Date().getHours();
      iconClass =
        currentHour >= 6 && currentHour < 18
          ? "bi-sun-fill"
          : "bi-moon-stars-fill";
    }

    themeIcon.classList.add(iconClass);

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.toggle(
        "active",
        element.getAttribute("data-bs-theme-value") === theme
      );
    });
  };

  // Set tema pada saat halaman dimuat
  window.addEventListener("DOMContentLoaded", () => {
    setTheme(getPreferredTheme());

    // Toggle tema
    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setTheme(theme);
      });
    });

    // Update ikon setiap menit untuk tema "auto"
    setInterval(() => {
      if (getStoredTheme() === "auto") {
        setTheme("auto");
      }
    }, 60000);
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });
})();

// Kode untuk gotopbtn tidak diubah
document.addEventListener("DOMContentLoaded", function () {
  var goTopBtn = document.querySelector(".gotopbtn");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      goTopBtn.style.opacity = "1";
    } else {
      goTopBtn.style.opacity = "0";
    }
  });
  goTopBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Tooltips
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );

  // Carousel
  const carouselEl = document.querySelector("#carouselExampleInterval");
  if (carouselEl) {
    new bootstrap.Carousel(carouselEl);
  }
});


// Separator filter project
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', function () {
    const filter = this.dataset.filter;
    const badge = document.getElementById('activeFilterBadge');

    // active state dropdown
    document.querySelectorAll('[data-filter]').forEach(item =>
      item.classList.remove('active')
    );
    this.classList.add('active');

    badge.textContent = this.textContent.trim();

    // immediately open the tab according to the filter
    const tabButton = document.getElementById(`${filter}-tab`);
    if (tabButton) {
      bootstrap.Tab.getOrCreateInstance(tabButton).show();
    }
  });
});
;
function closeOffcanvas() {
  var offcanvasElement = document.getElementById("offcanvasNavbar");
  if (!offcanvasElement || !window.bootstrap) return;
  var offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
  setTimeout(function () {
    offcanvas.hide();
  }, 150);
}

document.querySelectorAll("[data-close-offcanvas]").forEach(function (link) {
  link.addEventListener("click", closeOffcanvas);
});

;
// ---- Helper: load an external script once, return a Promise ----
const __loadedScripts = {};
function loadScriptOnce(src) {
  if (__loadedScripts[src]) return __loadedScripts[src];
  __loadedScripts[src] = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return __loadedScripts[src];
}

function loadStylesheetOnce(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = resolve;
    link.onerror = reject;
    document.head.appendChild(link);
  });
}

function whenIdle(fn) {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(fn, { timeout: 2500 });
  } else {
    setTimeout(fn, 1);
  }
}

// ---- AOS after first paint so hero LCP is not blocked ----
whenIdle(() => {
  Promise.all([
    loadStylesheetOnce("assets/vendor/aos.css"),
    loadScriptOnce("assets/vendor/aos.js"),
  ])
    .then(() => {
      if (window.AOS) AOS.init({ once: true, duration: 800 });
    })
    .catch(() => {});
});

// ---- Lazy-load EmailJS + SweetAlert2 on first contact-form interaction ----
(() => {
  const form = document.querySelector("#contact form, form");
  if (!form) return;

  let triggered = false;
  const ensureEmailLibs = () => {
    if (triggered) return;
    triggered = true;
    Promise.all([
      loadScriptOnce(
        "https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"
      ),
      loadScriptOnce("https://cdn.jsdelivr.net/npm/sweetalert2@11"),
    ])
      .then(() => {
        if (window.emailjs) emailjs.init("fYB6BIFA5x6qsuyz7");
      })
      .catch(() => {
        triggered = false; // allow retry
      });
  };

  form.addEventListener("focusin", ensureEmailLibs, { once: false });
  form.addEventListener("pointerenter", ensureEmailLibs, { once: true });
})();

// ---- Lazy-load ViewerJS on first click of a viewable image ----
(() => {
  const viewerCss =
    "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.2/viewer.min.css";
  const viewerJs =
    "https://cdnjs.cloudflare.com/ajax/libs/viewerjs/1.10.2/viewer.min.js";

  document.addEventListener(
    "click",
    function (e) {
      const img = e.target.closest(".image");
      if (!img) return;
      if (img.dataset.viewerReady) return;

      loadStylesheetOnce(viewerCss);

      loadScriptOnce(viewerJs).then(() => {
        if (window.Viewer) {
          const viewer = new Viewer(img);
          img.dataset.viewerReady = "1";
          viewer.show();
        }
      });
    },
    true
  );
})();
