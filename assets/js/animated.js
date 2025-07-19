// Target the text element and emoji
const textWrapper = document.querySelector(".home");
const emoji = document.querySelector(".wave");

// Split each character into individual spans
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

// Hide the emoji initially
emoji.style.opacity = 0;

// Define the animation timeline for text and emoji
anime.timeline({
  loop: true,
  complete: () => {
    emoji.style.opacity = 0; // Reset emoji visibility at the end of each loop
  }
})
  .add({
    // Animate each letter appearing one by one
    targets: ".home .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (el, i) => 150 * (i + 1),
  })
  .add({
    // Show emoji after letters appear
    targets: ".wave",
    opacity: [0, 1],
    duration: 500,
    easing: "easeInOutQuad",
    begin: () => {
      emoji.style.opacity = 1; // Ensure emoji is visible
    }
  })
  .add({
    // Fade out the whole block after a delay
    targets: ".fw-semibold",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

// Define continuous waving animation for the emoji
anime({
  targets: ".wave",
  rotate: [
    { value: -20, duration: 150 },
    { value: 20, duration: 150 },
    { value: -10, duration: 150 },
    { value: 10, duration: 150 },
    { value: 0, duration: 150 },
  ],
  easing: "easeInOutSine",
  duration: 1000,
  loop: true
});
