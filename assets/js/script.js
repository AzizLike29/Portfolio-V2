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

  // Perubahan tema light dan dark
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== "light" && storedTheme !== "dark") {
        setTheme(getPreferredTheme());
      }
    });

  // Halaman tema aktif
  window.addEventListener("DOMContentLoaded", () => {
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