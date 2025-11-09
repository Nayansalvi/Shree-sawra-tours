const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const BOOKINGS_FILE = path.join(__dirname, 'bookings.json');

// Middleware
app.use(cors());
app.use(express.json());

// Ensure bookings.json exists
async function initializeBookingsFile() {
  try {
    await fs.access(BOOKINGS_FILE);
  } catch {
    // File doesn't exist, create it with empty array
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify([], null, 2));
    console.log('✅ Created bookings.json file');
  }
}

// Read bookings from file
async function readBookings() {
  try {
    const data = await fs.readFile(BOOKINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading bookings:', err);
    return [];
  }
}

// Write bookings to file
async function writeBookings(bookings) {
  try {
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
    return true;
  } catch (err) {
    console.error('Error writing bookings:', err);
    return false;
  }
}

// POST endpoint to save booking
app.post('/api/book', async (req, res) => {
  try {
    const { packagePrice, numPersons, carType, total, date } = req.body;

    // Validate required fields
    if (!packagePrice || !numPersons || !carType || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Read existing bookings
    const bookings = await readBookings();

    // Create new booking with unique ID
    const newBooking = {
      id: Date.now(),
      packagePrice,
      numPersons,
      carType,
      total,
      date: date || new Date().toLocaleString(),
      createdAt: new Date().toISOString()
    };

    // Add to bookings array
    bookings.push(newBooking);

    // Save to file
    const saved = await writeBookings(bookings);

    if (saved) {
      console.log('✅ New booking saved:', newBooking.id);
      res.json({
        success: true,
        message: 'Booking saved successfully',
        booking: newBooking
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to save booking'
      });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET endpoint to retrieve all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await readBookings();
    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings'
    });
  }
});

// GET endpoint to retrieve a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const bookings = await readBookings();
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    
    if (booking) {
      res.json({
        success: true,
        booking
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve booking'
    });
  }
});

// DELETE endpoint to remove a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const bookings = await readBookings();
    const filteredBookings = bookings.filter(b => b.id !== parseInt(req.params.id));
    
    if (bookings.length === filteredBookings.length) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    await writeBookings(filteredBookings);
    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking'
    });
  }
});

// Start server
/*async function startServer() {
  await initializeBookingsFile();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Bookings stored in: ${BOOKINGS_FILE}`);
  });
}

startServer();*/
// ✅ Initialize bookings file once
initializeBookingsFile();

// ❌ Don't use app.listen() — Vercel handles this automatically
// ✅ Just export the app for Vercel
module.exports = app;