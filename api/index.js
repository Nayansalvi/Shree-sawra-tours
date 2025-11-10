const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection String (use environment variable in production)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://nayansalvi001_db_user:<nayan123salvi>@mywebsite.tulh7sb.mongodb.net/?appName=MyWebsite";

// Connect to MongoDB with better error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// Define Booking Schema
const bookingSchema = new mongoose.Schema({
  packagePrice: {
    type: Number,
    required: true
  },
  numPersons: {
    type: Number,
    required: true
  },
  carType: {
    type: String,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString()
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Booking API is running',
    endpoints: {
      'POST /api/book': 'Create a new booking',
      'GET /api/bookings': 'Get all bookings',
      'GET /api/bookings/:id': 'Get booking by ID',
      'DELETE /api/bookings/:id': 'Delete booking by ID'
    }
  });
});

// POST endpoint to save booking
app.post('/api/book', async (req, res) => {
  try {
    await connectDB();

    const { packagePrice, numPersons, carType, total, date } = req.body;

    // Validate required fields
    if (!packagePrice || !numPersons || !carType || !total) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: packagePrice, numPersons, carType, total'
      });
    }

    // Create new booking
    const newBooking = new Booking({
      packagePrice,
      numPersons,
      carType,
      total,
      date: date || new Date().toISOString()
    });

    // Save to MongoDB
    const savedBooking = await newBooking.save();

    console.log('✅ New booking saved:', savedBooking._id);
    res.status(201).json({
      success: true,
      message: 'Booking saved successfully',
      booking: savedBooking
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err.message
    });
  }
});

// GET endpoint to retrieve all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    await connectDB();

    const bookings = await Booking.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bookings',
      error: err.message
    });
  }
});

// GET endpoint to retrieve a single booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    await connectDB();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    const booking = await Booking.findById(req.params.id);
    
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
      message: 'Failed to retrieve booking',
      error: err.message
    });
  }
});

// DELETE endpoint to remove a booking
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    await connectDB();

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid booking ID format'
      });
    }

    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!deletedBooking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Booking deleted successfully',
      booking: deletedBooking
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to delete booking',
      error: err.message
    });
  }
});

// Export the Express app for Vercel
module.exports = app;

// For local development only
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}


