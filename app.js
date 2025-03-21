require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const authRoutes = require("./routes/auth");
const salonRoutes = require("./routes/salon");
const serviceRoutes = require("./routes/service");
const bookingRoutes = require("./routes/booking");
const reviewRoutes = require("./routes/review");
const viewDataRoutes = require("./routes/viewData");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Log MONGO_URI to verify it's being loaded
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/salons", salonRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/data", viewDataRoutes);

// Basic route
app.get("/api", (req, res) => {
  res.json({ message: "VivaHub Backend is Running!" });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to VivaHub API",
    endpoints: {
      auth: "/api/auth",
      salon: "/api/salons",
      service: "/api/services",
      booking: "/api/bookings"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
