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
    emoji.style.opacity = 0;
    anime.set(".home .letter", { opacity: 0 });
  }
})
  .add({
    // Animate each letter appearing one by one
    targets: ".home .letter",
    opacity: [0, 1],
    easing: "easeInOutQuad",
    duration: 400,
    delay: (el, i) => 100 * i
  })
  .add({
    // Show emoji after letters appear
    targets: ".wave",
    opacity: [0, 1],
    duration: 400,
    easing: "easeInOutQuad"
  })
  .add({
    // Fade out the whole block after a delay
    targets: ".home-wrapper",
    opacity: 0,
    duration: 800,
    easing: "easeOutExpo",
    delay: 1000
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
  loop: true
});
