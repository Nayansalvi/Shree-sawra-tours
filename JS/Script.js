// ==== NAVIGATION TOGGLE ====
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('nav ul');

menuToggle.addEventListener('change', () => {
  if (menuToggle.checked) {
    navLinks.classList.add('open');
  } else {
    navLinks.classList.remove('open');
  }
});

// ==== ACTIVE NAV LINK BASED ON PAGE ====
const links = document.querySelectorAll('nav a');
const currentUrl = window.location.href;

links.forEach(link => {
  if (currentUrl.includes(link.href)) {
    link.classList.add('active');
  }
});


