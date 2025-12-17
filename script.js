// ====================== HAMBURGER MENU ====================== //
// I toggle the 'show' class to open/close the mobile navigation.

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

if (hamburgerBtn && navMenu) {

  // Clicking the hamburger opens/closes menu
  hamburgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  // Clicking a link inside menu closes it automatically
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
  });
}


// ====================== HIDING NAV ON SCROLL ====================== //
// I track scroll direction to hide the navbar when scrolling down
// and show it again when scrolling up.

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Hide navbar when scrolling down
  if (currentScroll > lastScroll && currentScroll > 80) {
    navbar.classList.add("hide");
  } 
  // Show navbar when scrolling up
  else {
    navbar.classList.remove("hide");
  }

  lastScroll = currentScroll;
});


/* ===================== NAVBAR TYPING EFFECT ===================== */
/*
  This script creates a smooth typing + deleting effect
  for HTML-like tags in the navbar (e.g. <h1>, <h2>).

  Important rule I followed here:
  👉 NEVER manipulate already-rendered HTML.
  👉 I always work with the original pure string and re-render it.
*/

const typingText = document.getElementById("typingText");

/*
  These are the pure strings (no HTML formatting here).
  I keep them clean so I can safely control the typing effect.
*/
const phrases = [
  "<h1> Hello World </h1>",
  "<h2> Seja Bem Vindo </h2>"
];

/* Index of the current phrase */
let phraseIndex = 0;

/* Controls how many characters are currently visible */
let charIndex = 0;

/* Flag that tells if I'm typing or deleting */
let isDeleting = false;

/*
  I use random intervals to simulate a more "human" typing speed.
  This avoids a robotic animation feeling.
*/
const typingSpeed = () => Math.random() * (120 - 80) + 80;
const deletingSpeed = () => Math.random() * (60 - 40) + 40;

/* Pause after finishing typing a full phrase */
const pauseAfterTyping = 1000;

/*
  This function converts ONLY the pure text into styled HTML.
  I do this character by character to avoid bugs like:
  >> <h1>Hello</h1> turning into broken symbols.
*/
function formatPureText(pureText) {
  let result = "";

  for (let char of pureText) {
    if (char === "<") {
      result += `<span class="tag">&lt;</span>`;
    } else if (char === ">") {
      result += `<span class="tag">&gt;</span>`;
    } else {
      result += char;
    }
  }

  return result;
}

/*
  Main loop responsible for:
  - Typing characters one by one
  - Pausing at the end
  - Deleting everything smoothly
  - Switching to the next phrase
*/
function typeLoop() {
  const fullText = phrases[phraseIndex];

  /* TYPING MODE */
  if (!isDeleting) {
    charIndex++;

    /*
      I slice the original string instead of editing the DOM directly.
      This keeps the animation predictable and bug-free.
    */
    const currentPure = fullText.slice(0, charIndex);
    typingText.innerHTML = formatPureText(currentPure);

    /* When typing is complete, wait before deleting */
    if (charIndex === fullText.length) {
      setTimeout(() => (isDeleting = true), pauseAfterTyping);
    }

    setTimeout(typeLoop, typingSpeed());

  /* DELETING MODE */
  } else {
    charIndex--;

    const currentPure = fullText.slice(0, charIndex);
    typingText.innerHTML = formatPureText(currentPure);

    /*
      When everything is deleted:
      - Reset state
      - Move to the next phrase
    */
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeLoop, deletingSpeed());
  }
}

/* Starts the typing animation */
typeLoop();
