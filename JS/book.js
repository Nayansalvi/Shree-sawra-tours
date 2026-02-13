document.addEventListener("DOMContentLoaded", () => {
const passengers = document.getElementById("passengers");
const packageSelect = document.getElementById("package");
const carSelect = document.getElementById("car");
const priceBox = document.getElementById("price");
const bookButton = document.getElementById("bookBtn");

// Additional cost per passenger
const perPersonCharge = 500;

// Extra car-type cost (optional)
const carCost = {
  small: 0,
  suv: 500,
  luxury: 1000
};

// Calculate function
function calculatePrice() {
  const packagePrice = parseInt(packageSelect.value) || 0;
  const numPersons = parseInt(passengers.value) || 0;
  const carType = carSelect.value;

  if (packagePrice > 0 && numPersons > 0) {
    const total =
      packagePrice + numPersons * perPersonCharge + (carCost[carType] || 0);
    priceBox.textContent = total;
  } else {
    priceBox.textContent = 0;
  }
}

// Listen for changes
passengers.addEventListener("input", calculatePrice);
packageSelect.addEventListener("change", calculatePrice);
carSelect.addEventListener("change", calculatePrice);

// Book Now button click
bookButton.addEventListener("click", async () => {

  const bookingData = {
    packagePrice: parseInt(packageSelect.value) || 0,
    numPersons: parseInt(passengers.value) || 1,
    carType: carSelect.value,
    total: parseInt(priceBox.textContent) || 0,
    date: new Date().toLocaleString()
  };

  console.log("Booking Data:", bookingData);

  alert("Booking successful!");
});
})