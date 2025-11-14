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
  async function bookingWithNoCors() {
  const bookingData = {
    packagePrice: parseInt(packageSelect.value) || 0,
    numPersons: parseInt(passengers.value) || 1,
    carType: carSelect.value,
    total: parseInt(priceBox.textContent) || 0,
    date: new Date().toLocaleString()
  };

  try {
    const res = await fetch("https://shreesawratours.vercel.app/api/book", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData),
      mode: "no-cors" // This bypasses CORS but you won't get response
    });

    console.log("Request sent with no-cors mode");
    alert("✅ Booking request sent! (Check backend logs to confirm)");
  } catch (err) {
    console.error("Error:", err);
    alert("❌ Still failed: " + err.message);
  }
}
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
    const res = await fetch("https://shreesawratours-backend.vercel.app/api/book", {
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
// ================================
// 🔍 STEP 1: Test Backend Connection
// ================================
// Run this first in browser console to test if backend is alive


// Run this to test: testBackend();

// ================================
// 🚀 STEP 2: Your Fixed Booking Code
// ================================

/*bookButton.addEventListener("click", async () => {
  console.log("🚀 Book Now clicked!");
  
  const packagePrice = parseInt(packageSelect.value) || 0;
  const numPersons = parseInt(passengers.value) || 1;
  const carType = carSelect.value;
  const total = parseInt(priceBox.textContent) || 0;

  if (!packagePrice) {
    alert("Please select a package first!");
    return;
  }

  if (!carType) {
    alert("Please select a car type!");
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

  console.log("📦 Booking data to send:", bookingData);

  try {
    console.log("📡 Sending request to: https://shreesawratours.vercel.app/api/book");
    
    const res = await fetch("https://shreesawratours-backend.vercel.app/", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookingData),
      mode: "cors" // Explicitly set CORS mode
    });

    console.log("📡 Response received. Status:", res.status);
    console.log("📡 Response headers:", res.headers);

    // Check if response is ok
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("📥 Response data:", data);

    if (data.success) {
      alert("✅ Booking saved successfully!");
      console.log("✅ Booking details:", data.booking);
      
      // Optional: Reset form or redirect
      // packageSelect.value = "";
      // passengers.value = "1";
      // carSelect.value = "";
    } else {
      alert("❌ Error: " + (data.message || "Unknown error"));
      console.error("❌ Server error:", data);
    }
  } catch (err) {
    console.error("❌ Full error details:", err);
    console.error("❌ Error name:", err.name);
    console.error("❌ Error message:", err.message);
    
    // More specific error messages
    if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
      alert("⚠️ Network error! Possible causes:\n" +
            "1. Backend is not deployed\n" +
            "2. CORS is blocking the request\n" +
            "3. Wrong URL\n" +
            "4. Internet connection issue");
    } else {
      alert("⚠️ Error: " + err.message);
    }
  }
});*/

// ================================
// 🔧 ALTERNATIVE: Try with different CORS settings
// ================================

// If the above doesn't work, try this version with no-cors mode
// (Note: no-cors won't give you the response data, but will tell you if request is sent)



// ================================
// 📋 CHECKLIST FOR DEBUGGING
// ================================
/*
Run these checks in order:

1. Open browser console and run: testBackend()
   - This will tell you if your backend is reachable

2. Check your Vercel deployment:
   - Go to: https://shreesawratours.vercel.app/
   - You should see a JSON response

3. Check Vercel logs:
   - Go to Vercel dashboard → Your project → Logs
   - Look for errors

4. Verify CORS is enabled in your backend:
   - Make sure you have: app.use(cors())
   - Or use: app.use(cors({ origin: '*' }))

5. Check MongoDB connection:
   - Verify MONGODB_URI is set in Vercel environment variables
   - Check MongoDB Atlas network access (allow all IPs: 0.0.0.0/0)

6. Test with Postman or curl:
   curl -X POST https://shreesawratours.vercel.app/api/book \
   -H "Content-Type: application/json" \
   -d '{"packagePrice":5000,"numPersons":2,"carType":"Sedan","total":10000}'

7. If still failing, the issue might be:
   - Vercel function timeout
   - MongoDB connection timeout
   - Wrong API endpoint
   - CORS policy blocking
*/
});
})
