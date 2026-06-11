document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("current-year").textContent =
        new Date().getFullYear();
    // ViewerJS is now loaded on-demand (see appInit.js) when an image is clicked.
});
