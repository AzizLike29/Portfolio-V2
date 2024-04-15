function closeOffcanvas() {
  var offcanvasElement = document.getElementById("offcanvasNavbar");
  var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
  setTimeout(function () {
    offcanvas.hide();
  }, 150);
}
