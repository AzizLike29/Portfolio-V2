// Setting mode dark and light
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
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const currentHour = new Date().getHours();
      const isDaytime = currentHour >= 6 && currentHour < 18;
      const autoTheme = isDaytime ? "light" : "dark";

      document.documentElement.setAttribute("data-bs-theme", autoTheme);
      // tema auto
      setStoredTheme(autoTheme);
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector("#bd-theme");

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector("#bd-theme-text");
    const activeThemeIcon = document.querySelector(".theme-icon-active");
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`
    );
    const iconOfActiveBtn =
      btnToActive.querySelector("icon use").dataset.themeIcon;

    document.querySelectorAll("[data-bs-theme-value]").forEach((element) => {
      element.classList.remove("active");
      element.setAttribute("aria-pressed", "false");
    });

    btnToActive.classList.add("active");
    btnToActive.setAttribute("aria-pressed", "true");
    activeThemeIcon.classList.remove(activeThemeIcon.dataset.themeIconActive);
    activeThemeIcon.classList.add(iconOfActiveBtn);
    activeThemeIcon.dataset.iconActive = iconOfActiveBtn;
    const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
    themeSwitcher.setAttribute("aria-label", themeSwitcherLabel);

    if (focus) {
      themeSwitcher.focus();
    }
  };

  // Set tema pada saat halaman dimuat
  setTheme(getPreferredTheme());

  // perubahan tema light dan dark
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
        showActiveTheme(getPreferredTheme());
      }
    });

  // halaman tema aktif
  window.addEventListener("DOMContentLoaded", () => {
    showActiveTheme(getPreferredTheme());

    // toogle tema
    document.querySelectorAll("[data-bs-theme-value]").forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const theme = toggle.getAttribute("data-bs-theme-value");
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();

// setting gotopbtn
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
});

// Animated JS
var textWrapper = document.querySelector(".home");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

anime
  .timeline({ loop: true })
  .add({
    targets: ".home .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 2250,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    targets: ".home",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

// setting copy phone and email
function copyText(getId, copyType) {
  try {
    var textElement = document.getElementById(getId);
    var textCopy = textElement.innerText;

    navigator.clipboard
      .writeText(textCopy)
      .then(function () {
        console.log("Success Copy " + copyType + ": " + textCopy);
      })
      .catch(function (err) {
        console.error("Error Copy: ", err);
      });
  } catch (err) {
    console.error("Error Copy Text: ", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  copyText("emailAddress", "email");
  copyText("phoneNumber", "telep");
});
