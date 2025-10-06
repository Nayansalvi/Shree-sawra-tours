const testimonials = [
  "“Amazing trip with Shree Sawara Tours!”",
  "“Best travel service in Rajasthan.”",
  "“Affordable and super comfortable rides.”",
   "With the rating of 5 stars on Google.",
   
];

let index = 0;
function changeTestimonial() {
  const box = document.querySelector(".testimonials p");
  box.textContent = testimonials[index];
  index = (index + 1) % testimonials.length;
}

setInterval(changeTestimonial, 3000); // every 3 sec