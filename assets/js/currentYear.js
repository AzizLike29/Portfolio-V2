document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
    const images = document.querySelectorAll(".image");
    images.forEach((image) => {
        new Viewer(image);
    });
});