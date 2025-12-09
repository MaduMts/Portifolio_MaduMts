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
