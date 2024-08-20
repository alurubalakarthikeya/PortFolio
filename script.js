const menuBar = document.getElementById('menuBar');
const menuItems = document.getElementById('menu-items');
const nav = document.getElementById('navbar'); // Use getElementById for a single element

function ToggleMenu() {
  if (menuItems.style.display === 'block' || menuItems.style.display === '') {
    // Hide the menu items and revert the menu bar
    menuItems.style.display = 'none';
    menuBar.classList.remove('open');
    nav.style.height = '10%' // Remove cross
  } else {
    // Show the menu items and center them
    menuItems.style.display = 'block';
    nav.style.display = 'flex';
    nav.style.height = '120%';
    nav.style.alignItems = 'center';
    nav.style.justifyContent = 'center';
    menuBar.classList.add('open'); // Add cross
  }
}

var typed = new Typed(".text", {
  strings: ["Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer","Web Developer","Graphic Designer","UI/UX Designer","Digital Marketer"],
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

window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', handleScrollEnd);
function updateIconPosition() {
  const buttonContainer = document.querySelector('.navigator');
  const icon = buttonContainer.querySelector('i');
  const documentHeight = document.documentElement.scrollHeight; 
  const viewportHeight = window.innerHeight;
  const scrollPosition = window.scrollY; 
  const scrollPercentage = (scrollPosition / (documentHeight - viewportHeight)) * 100;
  const containerHeight = buttonContainer.offsetHeight;
  const iconHeight = icon.offsetHeight;
  const maxPosition = containerHeight - iconHeight;
  const newPosition = (scrollPercentage / 100) * maxPosition; 
  icon.style.top = `${newPosition}px`;
}
document.addEventListener('scroll', updateIconPosition);
window.addEventListener('load', updateIconPosition);


