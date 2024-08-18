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
  window.addEventListener("load", function() {
    const loader = document.getElementById('loader');
    loader.style.display = 'none';
    const content = document.querySelector('.content');
    content.style.display = 'block';
  });
});


