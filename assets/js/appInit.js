// ---- AOS (scroll animations) ----
if (window.AOS) {
  AOS.init({ once: true, duration: 800 });
}

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

      // load CSS once
      if (!document.querySelector(`link[href="${viewerCss}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = viewerCss;
        document.head.appendChild(link);
      }

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