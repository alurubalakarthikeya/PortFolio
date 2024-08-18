const menuBar = document.getElementById('menuBar');
const menuItems = document.getElementById('menu-items');
const nav = document.getElementById('navbar'); // Use getElementById for a single element

function ToggleMenu() {
  if (menuItems.style.display === 'block' || menuItems.style.display === '') {
    // Hide the menu items and revert the menu bar
    menuItems.style.display = 'none';
    menuBar.classList.remove('open'); // Remove cross
  } else {
    // Show the menu items and center them
    menuItems.style.display = 'block';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'center';
    menuBar.classList.add('open'); // Add cross
  }
}

var typed = new Typed(".text", {
  strings: ["Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer"],
  typeSpeed: 150,
  backSpeed: 150,
  looped: true
})

document.addEventListener("DOMContentLoaded", function() {
  const loader = document.getElementById('loader');
  const content = document.querySelector('.content');
  const welcomeSection = document.querySelector('.welcome-section');

  // IntersectionObserver to detect when .welcome-section is in view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Hide the loader and show the content
        loader.style.display = 'none';
        content.style.display = 'block';
        // Stop observing
        observer.disconnect();
      }
    });
  }, { threshold: 0.1 });

  // Start observing the .welcome-section
  observer.observe(welcomeSection);
});



