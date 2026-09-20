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
