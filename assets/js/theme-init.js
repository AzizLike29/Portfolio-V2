(function () {
  var theme = localStorage.getItem("theme");
  if (!theme || theme === "auto") {
    var currentHour = new Date().getHours();
    theme = currentHour >= 6 && currentHour < 18 ? "light" : "dark";
  }
  document.documentElement.setAttribute("data-bs-theme", theme);
})();
