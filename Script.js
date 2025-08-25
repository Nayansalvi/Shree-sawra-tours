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

// ==== SCROLL HEADER SHRINK EFFECT (optional) ====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('shrink');
  } else {
    header.classList.remove('shrink');
  }
});
const contactForm = document.querySelector('.contact form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    alert('Your message has been sent! Thank you for contacting us.');
  });
}
const testimonials = [
  "“Amazing trip with Shree Sawara Tours!”",
  "“Best travel service in Rajasthan.”",
  "“Affordable and super comfortable rides.”",
 "Travel is the only thing you buy that makes you richer."
];

let index = 0;
function changeTestimonial() {
  const box = document.querySelector(".testimonials p");
  box.textContent = testimonials[index];
  index = (index + 1) % testimonials.length;
}

setInterval(changeTestimonial, 3000); // every 3 sec
