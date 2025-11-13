document.addEventListener("DOMContentLoaded", () => {
const passengers = document.getElementById("passengers");
const packageSelect = document.getElementById("package");
const carSelect = document.getElementById("car");
const priceBox = document.getElementById("price");
const bookButton = document.querySelector("button");

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
console.log("JS loaded!");
console.log("Passengers element:", document.getElementById("passengers"));
passengers.addEventListener("input", calculatePrice);
packageSelect.addEventListener("change", calculatePrice);
carSelect.addEventListener("change", calculatePrice);

// Book Now button click
bookButton.addEventListener("click", async () => {
  console.log("🚀 Book Now clicked!");
  const packagePrice = parseInt(packageSelect.value) || 0;
  const numPersons = parseInt(passengers.value) || 1;
  const carType = carSelect.value;
  const total = parseInt(priceBox.textContent) || 0;

  if (!packagePrice) {
    alert("Please select a package first!");
    return;
  }

  // Booking data to send
  const bookingData = {
    packagePrice,
    numPersons,
    carType,
    total,
    date: new Date().toLocaleString()
  };

  console.log("📦 Sending booking data:", bookingData);

  try {
    // ✅ FIXED: Added /api/book to the endpoint
    const res = await fetch("https://shreesawratours.vercel.app/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    console.log("📡 Response status:", res.status);

    const data = await res.json();
    console.log("📥 Response data:", data);

    if (data.success) {
      alert("✅ Booking saved successfully!");
      console.log("✅ Booking ID:", data.booking._id);
    } else {
      alert("❌ Error while saving booking: " + (data.message || "Unknown error"));
    }
  } catch (err) {
    console.error("❌ Connection error:", err);
    alert("⚠️ Could not connect to the server! Check console for details.");
  }
});
});