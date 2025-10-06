const testimonials = [
  "“Best travel service with kailash ji.”",
  "“Very neat and clean car and driver is also very nice.”",
  "“Never have this much fun in my life i reccoment every one .”",
   "driver is so good and car is also very clean",
   "Travel is the only thing you buy that makes you richer."
];

let index = 0;
function changeTestimonial() {
  const box = document.querySelector(".testimonials p");
  box.textContent = testimonials[index];
  index = (index + 1) % testimonials.length;
}

setInterval(changeTestimonial, 3000); // every 3 sec